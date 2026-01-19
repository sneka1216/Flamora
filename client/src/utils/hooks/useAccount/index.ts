"use client";
import { getWithExpiry, setWithExpiry } from "@/utils/functions/account";
import { useCallback } from "react";

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  isGuest: boolean;
};
const useAccount = () => {
  const guestUserLogin = useCallback(async () => {
    // Check if user already exists and is still valid
    const storedUser = getWithExpiry("user");
    if (storedUser) {
      return storedUser;
    }

    try {
      const response = await fetch("https://flamora.onrender.com/customer/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isGuest: true }),
      });

      const data = await response.json();

      if (!response.ok) {
        return;
      }

      // Store with expiry
      setWithExpiry("user", data?.user, ONE_YEAR_MS);
      setWithExpiry("cart", data?.cart, ONE_YEAR_MS);

      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const updateAccount = useCallback(async (payload: User) => {
    console.log("updateAccount payload", payload);
    try {
      const response = await fetch(
        "https://flamora.onrender.com/customer/updateAccount",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed:", data);
        return;
      }

      console.log("Updated user:", data);
      setWithExpiry("user", data?.user, ONE_YEAR_MS);
      setWithExpiry("cart", data?.cart, ONE_YEAR_MS);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  return { guestUserLogin, updateAccount };
};

export default useAccount;
