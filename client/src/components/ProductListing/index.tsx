import React from "react";
import ProductTile from "./productTile";

interface ProductIndexProps {
  slug: string;
  subcategory?: string;
}

const ProductIndex = ({ slug, subcategory }: ProductIndexProps) => {
  return <ProductTile slug={slug} subcategory={subcategory} />;
};

export default ProductIndex;
