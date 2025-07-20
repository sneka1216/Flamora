import React from "react";
import ProductInformation from "./productInformation";

interface ProductDetailsProps {
  slug: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ slug }) => {
  return (
    <div>
      <ProductInformation slug={slug} />
    </div>
  );
};

export default ProductDetails;
