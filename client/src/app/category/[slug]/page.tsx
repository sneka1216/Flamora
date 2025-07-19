import ProductIndex from "@/components/ProductListing";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

const CategoryPage = ({ params }: any) => {
  const { slug } = params;

  return (
    <>
      <ProductIndex slug={slug} />
    </>
  );
};

export default CategoryPage;
