import ProductIndex from "@/components/ProductListing";
import React from "react";

interface PageProps {
  params: Promise<{
    slug: string;
    subcategory: string;
  }>;
}

const SubCategoryPage = async ({ params }: PageProps) => {
  const { slug, subcategory } = await params;

  return <ProductIndex slug={slug} subcategory={subcategory} />;
};

export default SubCategoryPage;
