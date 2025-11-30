import InstantSearchComponent from "@/components/ProductListing/instantSearch";
import React from "react";
export const dynamicParams = true;
interface PageProps {
  params: {
    parentCategory: string;
    subcategory: string;
  };
}

const SubCategoryPage = async ({ params }: PageProps) => {
  const { parentCategory, subcategory } = params;

  return (
    <InstantSearchComponent
      parentCategory={parentCategory}
      subCategory={subcategory}
    />
  );
};

export default SubCategoryPage;
