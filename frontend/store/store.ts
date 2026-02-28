import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};

// Ensure the store is a singleton on the client
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

let store: AppStore | undefined;

export const getStore = () => {
  if (typeof window === "undefined") return makeStore(); // Always new store on server
  if (!store) store = makeStore(); // Create once on client and reuse
  return store;
};
