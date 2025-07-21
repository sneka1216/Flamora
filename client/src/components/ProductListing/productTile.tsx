"use-client";
import React from "react";
import Link from "next/link";
import sampleProduct from "../../mockupData/sampleProduct.json";

interface Product {
  sku: string;
  name: string;
  price: number;
  description: string;
  image: string[];
  category: string;
  subcategory?: string;
}

interface Props {
  slug: string;
  subcategory?: string;
}

const sampleProducts: Product[] = sampleProduct;

const ProductTile = ({ slug, subcategory }: Props) => {
  const filteredProducts = sampleProducts?.filter((product) => {
    if (subcategory) {
      return (
        product?.category === slug?.replace("-", "") &&
        product?.subcategory === subcategory?.replaceAll("-", " ")
      );
    }

    return product?.category === slug?.replaceAll("-", "");
  });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mx-2">
      {filteredProducts?.map((product) => (
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
