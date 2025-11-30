"use-client";
import React from "react";
import Link from "next/link";
import { Product } from "../ProductDetails/productInformation";

interface Props {
  productData: Product;
}

const ProductTile = ({ productData }: Props) => {
  return (
    <div
      key={productData?.sku}
      className="py-4 flex flex-col justify-between h-full"
    >
      <Link href={`/productDetails/${productData?.sku}`}>
        <div className="relative w-full mb-2">
          <img
            src={productData?.image?.[0]}
            alt={productData?.name}
            className="object-cover"
          />
        </div>
        <p className="text-sm font-extralight mb-2 min-h-[35px]">
          {productData?.name}
        </p>
        <p className="text-xl font-bold text-[#032213] min-h-[25px]">
          ${productData?.price?.toFixed(2)}
        </p>
      </Link>
    </div>
  );
};

export default ProductTile;
