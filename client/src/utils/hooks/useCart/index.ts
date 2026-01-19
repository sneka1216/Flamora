import { setWithExpiry } from "@/utils/functions/account";
import { useCallback } from "react";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export type CartProduct = {
  product: string; // product ID
  quantity: number;
};

export type Cart = {
  user?: string; // user ID
  products: CartProduct[];
};

const useCart = () => {
  const addItem = useCallback(async (payload: Cart) => {
    console.log("addItem payload", payload);
    try {
      const response = await fetch(
        "https://flamora.onrender.com/cart/addTocart",
        {
          method: "POST",
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
      setWithExpiry("cart", data, ONE_YEAR_MS);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  // const getCartByUser = useCallback(async (payload: any) => {
  //   console.log("getCartByUser payload", payload);
  //   try {
  //     const response = await fetch("http://localhost:5000/cart/getCart", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });
  //     const data = await response.json();

  //     return data;
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }, []);

  return { addItem };
};

export default useCart;
