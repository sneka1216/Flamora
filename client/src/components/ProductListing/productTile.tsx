"use-client";
import React from "react";
import Link from "next/link";
import { Product } from "../ProductDetails/productInformation";

interface Props {
  slug: string;
  subcategory?: string;
  productData: Product[] | undefined;
}

const ProductTile = ({ slug, subcategory, productData }: Props) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mx-2">
      {productData?.map((product: any) => (
        <div
          key={product?.sku}
          className="py-4 flex flex-col justify-between h-full"
        >
          <Link href={`/productDetails/${product?.sku}`}>
            <div className="relative w-full mb-2">
              <img
                src={product?.image?.[0]}
                alt={product?.name}
                className="object-cover"
              />
            </div>
            <p className="text-sm font-extralight mb-2 min-h-[35px]">
              {product?.name}
            </p>
            <p className="text-xl font-bold text-[#032213] min-h-[25px]">
              ${product?.price?.toFixed(2)}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductTile;
