"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { CropAction, CropState } from "@/lib/types";

const initialState: CropState = {
  original: null,
  cropRegion: { x: 0, y: 0, w: 0, h: 0 },
  aspectRatio: "free",
  outputFormat: "jpeg",
  quality: 90,
  result: null,
  status: "idle",
  error: null,
};

function cropReducer(state: CropState, action: CropAction): CropState {
  switch (action.type) {
    case "SET_ORIGINAL": {
      if (state.original?.url) URL.revokeObjectURL(state.original.url);
      if (state.result?.url) URL.revokeObjectURL(state.result.url);
      return {
        ...initialState,
        original: action.payload,
        cropRegion: action.payload
          ? { x: 0, y: 0, w: action.payload.width, h: action.payload.height }
          : { x: 0, y: 0, w: 0, h: 0 },
      };
    }
    case "SET_CROP_REGION":
      return { ...state, cropRegion: action.payload };
    case "SET_ASPECT_RATIO":
      return { ...state, aspectRatio: action.payload };
    case "SET_OUTPUT_FORMAT":
      return { ...state, outputFormat: action.payload };
    case "SET_QUALITY":
      return { ...state, quality: action.payload };
    case "SET_RESULT": {
      if (state.result?.url) URL.revokeObjectURL(state.result.url);
      return { ...state, result: action.payload, status: "done" };
    }
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_ERROR":
      return { ...state, status: "error", error: action.payload };
    case "RESET": {
      if (state.original?.url) URL.revokeObjectURL(state.original.url);
      if (state.result?.url) URL.revokeObjectURL(state.result.url);
      return initialState;
    }
    default:
      return state;
  }
}

const CropContext = createContext<CropState>(initialState);
const CropDispatchContext = createContext<Dispatch<CropAction>>(() => {});

export function CropProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cropReducer, initialState);
  return (
    <CropContext.Provider value={state}>
      <CropDispatchContext.Provider value={dispatch}>
        {children}
      </CropDispatchContext.Provider>
    </CropContext.Provider>
  );
}

export function useCrop() {
  return useContext(CropContext);
}

export function useCropDispatch() {
  return useContext(CropDispatchContext);
}
