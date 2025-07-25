"use client";
import React, { useEffect, useState } from "react";
import ProductInformation, { Product } from "./productInformation";

interface ProductDetailsProps {
  slug: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ slug }) => {
  const [product, setProduct] = useState<Product | undefined>();
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/mongoDB/productBySku/?sku=${slug}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.log("err");
      } finally {
        console.log("loading");
      }
    }

    fetchProduct();
  }, [slug]);
  return (
    <div>
      <ProductInformation product={product} slug={slug} />
    </div>
  );
};

export default ProductDetails;
