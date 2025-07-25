"use client";
import React, { useEffect, useState } from "react";
import ProductTile from "./productTile";
import { Product } from "../ProductDetails/productInformation";

interface ProductIndexProps {
  slug: string;
  subcategory?: string;
}

const ProductIndex = ({ slug, subcategory }: ProductIndexProps) => {
  const [productData, setProductData] = useState<Product[] | undefined>();
  let category: string;
  if (subcategory) {
    category = subcategory;
  } else {
    category = slug;
  }
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `/api/mongoDB/productByCategory/?slug=${category}`
        );
        const data = await response.json();

        setProductData(data);
      } catch (err) {
        console.log("err");
      } finally {
        console.log("loading");
      }
    }

    fetchProducts();
  }, [slug]);

  return (
    <ProductTile
      slug={slug}
      productData={productData}
      subcategory={subcategory}
    />
  );
};

export default ProductIndex;
