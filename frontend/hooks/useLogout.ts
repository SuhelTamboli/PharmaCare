"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/store/slices/authSlice";
import { toast } from "sonner";

export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/logout`,
        {
          method: "POST", // Usually a POST or DELETE request
          headers: { "Content-Type": "application/json" },
          credentials: "include", // CRITICAL: Tells browser to send the cookie to be cleared
        },
      );

      if (response.ok) {
        // 1. Clear Redux state
        dispatch(logout());

        // 2. Notify user
        toast.success("Logged out successfully");

        // 3. Redirect to landing page
        router.push("/");
      } else {
        toast.error("Logout failed on server");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong during logout");

      // Optional: Clear local state anyway if the API fails
      dispatch(logout());
      router.push("/");
    }
  };

  return handleLogout;
};
