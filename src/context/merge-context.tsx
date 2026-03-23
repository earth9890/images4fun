"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import type { MergeAction, MergeState } from "@/lib/types";

const initialState: MergeState = {
  images: [],
  layout: "horizontal",
  gap: 0,
  bgColor: "#ffffff",
  result: null,
  status: "idle",
  error: null,
};

function mergeReducer(state: MergeState, action: MergeAction): MergeState {
  switch (action.type) {
    case "ADD_IMAGES":
      return { ...state, images: [...state.images, ...action.payload], result: null, status: "idle" };
    case "REMOVE_IMAGE": {
      const img = state.images.find((i) => i.id === action.payload);
      if (img) URL.revokeObjectURL(img.url);
      return { ...state, images: state.images.filter((i) => i.id !== action.payload), result: null, status: "idle" };
    }
    case "REORDER_IMAGES":
      return { ...state, images: action.payload, result: null, status: "idle" };
    case "SET_LAYOUT":
      return { ...state, layout: action.payload };
    case "SET_GAP":
      return { ...state, gap: action.payload };
    case "SET_BG_COLOR":
      return { ...state, bgColor: action.payload };
    case "SET_RESULT": {
      if (state.result?.url) URL.revokeObjectURL(state.result.url);
      return { ...state, result: action.payload, status: "done" };
    }
    case "SET_STATUS":
      return { ...state, status: action.payload };
    case "SET_ERROR":
      return { ...state, status: "error", error: action.payload };
    case "RESET": {
      state.images.forEach((img) => URL.revokeObjectURL(img.url));
      if (state.result?.url) URL.revokeObjectURL(state.result.url);
      return initialState;
    }
    default:
      return state;
  }
}

const MergeContext = createContext<MergeState>(initialState);
const MergeDispatchContext = createContext<Dispatch<MergeAction>>(() => {});

export function MergeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(mergeReducer, initialState);
  return (
    <MergeContext.Provider value={state}>
      <MergeDispatchContext.Provider value={dispatch}>
        {children}
      </MergeDispatchContext.Provider>
    </MergeContext.Provider>
  );
}

export function useMerge() {
  return useContext(MergeContext);
}

export function useMergeDispatch() {
  return useContext(MergeDispatchContext);
}
