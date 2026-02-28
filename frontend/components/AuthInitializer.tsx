"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "../store/slices/authSlice";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const [isInitializing, setIsInitializing] = useState(true);
  const initialized = useRef(false); // Prevents double-fetching in Strict Mode

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const verifySession = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          },
        );

        const result = await response.json();

        if (response.ok) {
          // Check your console: if user is inside result.data.data, adjust this!
          const userData = result.data?.user || result.data;
          dispatch(setCredentials({ user: userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Session verification failed:", error);
        dispatch(logout());
      } finally {
        setIsInitializing(false);
      }
    };

    verifySession();
  }, [dispatch]);

  if (isInitializing) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return <>{children}</>;
}
