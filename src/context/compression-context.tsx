"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { CompressionAction, CompressionState } from "@/lib/types";
import { DEFAULT_SETTINGS } from "@/lib/constants";

const initialState: CompressionState = {
  original: null,
  result: null,
  settings: DEFAULT_SETTINGS,
  status: "idle",
  error: null,
};

function compressionReducer(
  state: CompressionState,
  action: CompressionAction
): CompressionState {
  switch (action.type) {
    case "SET_ORIGINAL": {
      // Revoke previous URLs
      if (state.original?.url) URL.revokeObjectURL(state.original.url);
      if (state.result?.url) URL.revokeObjectURL(state.result.url);
      return {
        ...state,
        original: action.payload,
        result: null,
        status: "idle",
        error: null,
      };
    }
    case "SET_SETTINGS":
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    case "SET_RESULT": {
      // Revoke previous result URL
      if (state.result?.url) URL.revokeObjectURL(state.result.url);
      return {
        ...state,
        result: action.payload,
        status: "done",
        error: null,
      };
    }
    case "SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        status: "error",
        error: action.payload,
      };
    case "RESET": {
      if (state.original?.url) URL.revokeObjectURL(state.original.url);
      if (state.result?.url) URL.revokeObjectURL(state.result.url);
      return initialState;
    }
    default:
      return state;
  }
}

const CompressionContext = createContext<CompressionState>(initialState);
const CompressionDispatchContext = createContext<Dispatch<CompressionAction>>(
  () => {}
);

export function CompressionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(compressionReducer, initialState);

  return (
    <CompressionContext.Provider value={state}>
      <CompressionDispatchContext.Provider value={dispatch}>
        {children}
      </CompressionDispatchContext.Provider>
    </CompressionContext.Provider>
  );
}

export function useCompression() {
  return useContext(CompressionContext);
}

export function useCompressionDispatch() {
  return useContext(CompressionDispatchContext);
}
