"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { ConvertAction, ConvertState } from "@/lib/types";

const initialState: ConvertState = {
  original: null,
  outputFormat: "webp",
  quality: 75,
  result: null,
  status: "idle",
  error: null,
};

function convertReducer(state: ConvertState, action: ConvertAction): ConvertState {
  switch (action.type) {
    case "SET_ORIGINAL": {
      if (state.result?.url) URL.revokeObjectURL(state.result.url);
      return {
        ...initialState,
        original: action.payload,
        outputFormat: state.outputFormat,
        quality: state.quality,
      };
    }
    case "SET_OUTPUT_FORMAT":
      return { ...state, outputFormat: action.payload, result: null, status: state.original ? "idle" : "idle" };
    case "SET_QUALITY":
      return { ...state, quality: action.payload, result: null };
    case "SET_RESULT": {
      if (state.result?.url) URL.revokeObjectURL(state.result.url);
      return { ...state, result: action.payload, status: "done" };
    }
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_ERROR":
      return { ...state, status: "error", error: action.payload };
    case "RESET": {
      if (state.result?.url) URL.revokeObjectURL(state.result.url);
      return initialState;
    }
    default:
      return state;
  }
}

const ConvertContext = createContext<ConvertState>(initialState);
const ConvertDispatchContext = createContext<Dispatch<ConvertAction>>(() => {});

export function ConvertProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(convertReducer, initialState);
  return (
    <ConvertContext.Provider value={state}>
      <ConvertDispatchContext.Provider value={dispatch}>
        {children}
      </ConvertDispatchContext.Provider>
    </ConvertContext.Provider>
  );
}

export function useConvert() {
  return useContext(ConvertContext);
}

export function useConvertDispatch() {
  return useContext(ConvertDispatchContext);
}
