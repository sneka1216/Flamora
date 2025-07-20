import ProductDetails from "@/components/ProductDetails";
import React from "react";
export const dynamicParams = true;
interface Props {
  params: {
    slug: string;
  };
}

const ProductPage = async ({ params }: Props) => {
  const { slug } = params;

  return (
    <div>
      <ProductDetails slug={slug} />
    </div>
  );
};

export default ProductPage;
