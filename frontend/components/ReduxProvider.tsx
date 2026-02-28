"use client";
import { useState } from "react";
import { Provider } from "react-redux";
import { getStore } from "../store/store";
import AuthInitializer from "./AuthInitializer";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // We use useState with a function.
  // This function ONLY runs once when the component mounts.
  // This avoids the "accessing refs during render" error.
  const [store] = useState(() => getStore());

  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
