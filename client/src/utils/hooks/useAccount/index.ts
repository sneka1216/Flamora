"use client";
import { getWithExpiry, setWithExpiry } from "@/utils/functions/account";
import { useCallback } from "react";
import { login, registerUser, User } from "./type";

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

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

      setWithExpiry("user", data?.user, ONE_YEAR_MS);
      setWithExpiry("cart", data?.cart, ONE_YEAR_MS);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const login = useCallback(async (payload: login) => {
    try {
      const response = await fetch(
        "https://flamora.onrender.com/customer/login",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();

      setWithExpiry("user", data?.user, ONE_YEAR_MS);
      setWithExpiry("cart", data?.cart, ONE_YEAR_MS);
      return response;
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const register = useCallback(async (payload: registerUser) => {
    try {
      const response = await fetch(
        "https://flamora.onrender.com/customer/signup",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();
      if (data) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  // const mergeCarts = useCallback(
  //   async (guestUserId: string, existingUserId: string) => {
  //     try {
  //       const response = await fetch(
  //         "https://flamora.onrender.com/cart/mergeCart",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             guestUser: guestUserId,
  //             existingUser: existingUserId,
  //           }),
  //         },
  //       );

  //       const data = await response.json();

  //       if (!response.ok) {
  //         console.error("Failed:", data);
  //         return;
  //       }

  //       console.log("Merged carts:", data);

  //       return data;
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   },
  //   [],
  // );

  return { guestUserLogin, updateAccount, login, register };
};

export default useAccount;
