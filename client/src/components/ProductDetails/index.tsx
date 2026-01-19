"use client";
import React, { useEffect, useState } from "react";
import ProductInformation, { Product } from "./productInformation";
import useCart from "@/utils/hooks/useCart";
import { getWithExpiry } from "@/utils/functions/account";

interface ProductDetailsProps {
  slug: string;
}

export type User = {
  _id: string;
  isGuest: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  email: string;
  name: string;
  password: string;
};

export type StoredUser = {
  value: User;
  expiry: number; // timestamp (milliseconds)
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ slug }) => {
  const [product, setProduct] = useState<Product>();
  const { addItem } = useCart();
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    const userData = getWithExpiry("user");
    setUser(userData);
  }, []);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/mongoDB/productBySku/?sku=${slug}`);
        const data = await response?.json();
        setProduct(data);
      } catch (err) {
        console.log("err", err);
      } finally {
        console.log("loading");
      }
    }

    fetchProduct();
  }, [slug]);

  const addItemToCart = async (item: Product) => {
    const payload = {
      user: user?.value?._id,
      products: [
        {
          product: item?._id,
          quantity: 1,
        },
      ],
    };
    await addItem(payload);
  };
  return (
    <div>
      {product && (
        <ProductInformation addItemToCart={addItemToCart} product={product} />
      )}
    </div>
  );
};

export default ProductDetails;
