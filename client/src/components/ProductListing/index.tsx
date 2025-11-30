"use client";
import React from "react";
import ProductTile from "./productTile";

interface ProductIndexProps {
  hit: any;
  // sendEvent: any;
  // parentCategory: string;
  // subCategory?: string;
}

const ProductIndex = ({ hit }: ProductIndexProps) => {
  return <ProductTile productData={hit} />;
};

export default ProductIndex;
