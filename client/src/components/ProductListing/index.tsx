"use client";
import React from "react";
import ProductTile from "./productTile";
import type { Hit } from "instantsearch.js";

interface ProductIndexProps {
  hit: Hit;
}

const ProductIndex = ({ hit }: ProductIndexProps) => {
  return <ProductTile productData={hit} />;
};

export default ProductIndex;
