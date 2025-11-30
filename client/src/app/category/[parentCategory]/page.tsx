import React from "react";
import ProductIndex from "@/components/ProductListing";
import InstantSearchComponent from "@/components/ProductListing/instantSearch";
export const dynamicParams = true;
interface CategoryPageProps {
  params: {
    parentCategory: string;
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { parentCategory } = params;

  return <InstantSearchComponent parentCategory={parentCategory} />;
};

export default CategoryPage;
