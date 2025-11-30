"use client";
import React from "react";
import { Configure, Hits, InstantSearch } from "react-instantsearch";
import { algoliasearch } from "algoliasearch";
import ProductIndex from ".";

type InstantSearchComponentProps = {
  parentCategory: string;
  subCategory?: string;
};

const InstantSearchComponent = ({
  parentCategory,
  subCategory,
}: InstantSearchComponentProps) => {
  const categoryName = subCategory ? subCategory : parentCategory;

  const applicationId = process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!;
  const searchApiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEACH_API_KEY!;
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!;

  const searchClient = algoliasearch(applicationId, searchApiKey);

  const filters = subCategory
    ? `subCategorySlug:"${categoryName}"`
    : `categorySlug:"${categoryName}"`;

  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <Configure filters={filters} />

      <Hits
        classNames={{
          list: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
          item: "w-full",
        }}
        hitComponent={(hit) => {
          return (
            <ProductIndex
              hit={hit}
              // sendEvent={sendEvent}
              // parentCategory={parentCategory}
              // subCategory={subCategory}
            />
          );
        }}
      />
    </InstantSearch>
  );
};

export default InstantSearchComponent;
