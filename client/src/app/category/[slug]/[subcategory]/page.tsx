import ProductIndex from "@/components/ProductListing";
import React from "react";
export const dynamicParams = true;
interface PageProps {
  params: {
    slug: string;
    subcategory: string;
  };
}

const SubCategoryPage = async ({ params }: PageProps) => {
  const { slug, subcategory } = params;

  return <ProductIndex slug={slug} subcategory={subcategory} />;
};

export default SubCategoryPage;
