"use client";
import React from "react";
import ProductTile from "./productTile";
import { Product } from "../ProductDetails/productInformation";

interface ProductIndexProps {
  hit: Product;
  // sendEvent: any;
  // parentCategory: string;
  // subCategory?: string;
}

const ProductIndex = ({ hit }: ProductIndexProps) => {
  return <ProductTile productData={hit} />;
};

export default ProductIndex;
