"use client";
import React, { useEffect, useState } from "react";
import ProductTile from "./productTile";
import { Product } from "../ProductDetails/productInformation";

interface ProductIndexProps {
  hit: any;
  sendEvent: any;
  parentCategory: string;
  subCategory?: string;
}

const ProductIndex = ({
  hit,
  sendEvent,
  parentCategory,
  subCategory,
}: ProductIndexProps) => {
  return <ProductTile productData={hit} />;
};

export default ProductIndex;
