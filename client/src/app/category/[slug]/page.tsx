import ProductIndex from "@/components/ProductListing";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

const CategoryPage = ({ params }: Props) => {
  const { slug } = params;

  return (
    <div>
      <ProductIndex slug={slug} />
    </div>
  );
};

export default CategoryPage;
