import React from "react";
import ProductInformation from "./productInformation";

const ProductDetails = ({ slug }: any) => {
  return (
    <div>
      <ProductInformation slug={slug} />
    </div>
  );
};

export default ProductDetails;
