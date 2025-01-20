'use client'

import { Color } from "@/app/app/rhythm/(components)/(rituals)/color-selector";
import { DayOfWeek, MappableInstances, Ritual, RitualInstance, weekArray } from "@/lib/types/rhythm-types";
import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

interface RitualInstancesProviderProps {
    children: ReactNode,
    initialValue: MappableInstances
}

type RitualInstancesAction =
    | { type: "INSERT"; payload: RitualInstance }
    | { type: "UPDATE"; payload: { instance: RitualInstance, daysInfo: { daysToUpdate: DayOfWeek[], daysToRemove: DayOfWeek[], daysToAdd: DayOfWeek[] } | undefined } }
    | { type: "DELETE"; payload: { days: DayOfWeek[], id: number } }
    | { type: "RITUAL_UPDATE", payload: Ritual }
    | { type: "RITUAL_DELETE", payload: number };


interface RitualContextProps {
    state: MappableInstances
    dispatch: Dispatch<RitualInstancesAction>
}

const ritualInstancesReducer = (state: MappableInstances, action: RitualInstancesAction): MappableInstances => {
    switch (action.type) {
        case "INSERT": {
            const stateCopy = {...state}
            action.payload.days.forEach(day => {
                stateCopy[day] = [...(stateCopy[day] || []), action.payload];
            })
            return stateCopy
        }
        case "UPDATE": {
            const stateCopy = {...state}
            action.payload.daysInfo?.daysToUpdate.forEach(day => {
                if (!stateCopy[day]) return; // Guard against missing days
        
                // Map through the array, replacing only the matching instance
                const updated = stateCopy[day].map(
                    instance => instance.id === action.payload.instance.id ? action.payload.instance : instance
                );
        
                stateCopy[day] = updated;
            });
            action.payload.daysInfo?.daysToRemove.forEach(day => {
                if (!stateCopy[day]) return;

                const updated = stateCopy[day].filter(
                    instance => instance.id !== action.payload.instance.id
                )

                stateCopy[day] = updated;
            })
            action.payload.daysInfo?.daysToAdd.forEach(day => {
                if (!stateCopy[day]) return;

                const updated = [...(stateCopy[day] || []), action.payload.instance];

                stateCopy[day] = updated;
            })
            // console.log(state, stateCopy)
            return stateCopy;
        }   
        case "DELETE": {
            const stateCopy = {...state}
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
        case "RITUAL_UPDATE": {
            const stateCopy = {...state}
            weekArray.forEach(day => {
                if (!stateCopy[day]) return;
                stateCopy[day] = stateCopy[day].map(instance => instance.ritual_id === action.payload.id ? {...instance, Rituals: { name: action.payload.name, color: action.payload.color as Color }} : instance)
            })
            return stateCopy
        }
        case "RITUAL_DELETE": {
            const stateCopy = {...state}
            weekArray.forEach(day => {
                if (!stateCopy[day]) return;
                stateCopy[day] = stateCopy[day].filter(instance => instance.ritual_id !== action.payload)
            })
            return stateCopy
        }
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