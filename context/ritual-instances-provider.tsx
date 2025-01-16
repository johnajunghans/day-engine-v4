'use client'

import { DayOfWeek, MappableInstances, RitualInstance } from "@/lib/types/rhythm-types";
import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

interface RitualInstancesProviderProps {
    children: ReactNode,
    initialValue: MappableInstances
}

type RitualInstancesAction =
  | { type: "INSERT"; payload: RitualInstance }
  | { type: "UPDATE"; payload: RitualInstance }
  | { type: "DELETE"; payload: { days: DayOfWeek[], id: number } };


interface RitualContextProps {
    state: MappableInstances
    dispatch: Dispatch<RitualInstancesAction>
}

const ritualInstancesReducer = (state: MappableInstances, action: RitualInstancesAction): MappableInstances => {
    const stateCopy = {...state}
    switch (action.type) {
        case "INSERT": {
            action.payload.days.forEach(day => {
                stateCopy[day] = [...(stateCopy[day] || []), action.payload];
            })
            return stateCopy
        }
        case "UPDATE": {
            action.payload.days.forEach(day => {
                if (!stateCopy[day]) return; // Guard against missing days
        
                // Map through the array, replacing only the matching instance
                const updated = stateCopy[day].map(
                    instance => instance.id === action.payload.id ? action.payload : instance
                );
        
                // Only update state if something actually changed
                if (updated !== stateCopy[day]) {
                    stateCopy[day] = updated;
                }
            });
            return stateCopy;
        }   
        case "DELETE": {
            action.payload.days.forEach(day => {
                if (!stateCopy[day]) return; // Guard against missing days
        
                // Filter out the matching instance
                const filtered = stateCopy[day].filter(instance => instance.id !== action.payload.id);
        
                // Only update state if something actually changed
                if (filtered.length !== stateCopy[day].length) {
                    stateCopy[day] = filtered;
                }
            });
            return stateCopy;
        }
        return stateCopy
      default:
        throw new Error(`Unhandled action type: ${action}`);
    }
  };

const RitualInstancesContext = createContext<RitualContextProps | undefined>(undefined)

export const RitualInstancesProvider = ({ children, initialValue }: RitualInstancesProviderProps) => {
    const [state, dispatch] = useReducer(ritualInstancesReducer, initialValue)

    return (
        <RitualInstancesContext.Provider value={{ state, dispatch }}>
            { children }
        </RitualInstancesContext.Provider>
    )
}

export const useRitualInstances = () => {
    const context = useContext(RitualInstancesContext)
    if (!context) {
        throw new Error("Ritual Instances Context is attempting to be used outside of its scope!")
    }
    return context
}