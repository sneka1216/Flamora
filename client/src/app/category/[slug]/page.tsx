import React from "react";
import ProductIndex from "@/components/ProductListing";
export const dynamicParams = true;
interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = params;

  return <ProductIndex slug={slug} />;
};

export default CategoryPage;
