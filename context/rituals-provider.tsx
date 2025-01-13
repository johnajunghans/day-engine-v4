'use client'

import { Ritual } from "@/lib/types/rhythm-types";
import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

type RitualsAction =
  | { type: "INSERT"; payload: Ritual }
  | { type: "UPDATE"; payload: Ritual }
  | { type: "DELETE"; payload: number };

interface RitualsContextProps {
    state: Ritual[],
    dispatch: Dispatch<RitualsAction>
}

const ritualsReducer = (state: Ritual[], action: RitualsAction): Ritual[] => {
    switch (action.type) {
      case "INSERT":
        return [...state, action.payload];
      case "UPDATE":
        return state.map(ritual => ritual.id === action.payload.id ? action.payload : ritual)
      case "DELETE":
        return state.filter(ritual => ritual.id !== action.payload);
      default:
        throw new Error(`Unhandled action type: ${action}`);
    }
  };

const RitualsContext = createContext<RitualsContextProps | undefined>(undefined)

export const RitualsProvider = ({ children, initialValue }: { children: ReactNode, initialValue: Ritual[] }) => {
    const [state, dispatch] = useReducer(ritualsReducer, initialValue);

    return (
        <RitualsContext.Provider value={{ state, dispatch }}>
            { children }
        </RitualsContext.Provider>
    )
}

export const useRituals = () => {
    const context = useContext(RitualsContext)
    if (!context) {
        throw Error("A component is attempting to access Rituals Context that is not within its scope.")
    }
    return context
}