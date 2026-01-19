import InstantSearchComponent from "@/components/ProductListing/instantSearch";
import React from "react";

export const dynamicParams = true;

interface PageProps {
  params: Promise<{
    parentCategory: string;
    subcategory: string;
  }>;
}

const SubCategoryPage = async ({ params }: PageProps) => {
  const { parentCategory, subcategory } = await params;

  return (
    <InstantSearchComponent
      parentCategory={parentCategory}
      subCategory={subcategory}
    />
  );
};

export default SubCategoryPage;
