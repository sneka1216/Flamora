import { appendToFileAsArray } from "../AppendFileAsArray.js";

export const productMapper = (product, category) => {
  appendToFileAsArray("products.json", product);
  appendToFileAsArray("category.json", category);

  const finalObject = product.map((prod) => {
    if (prod.length === 0) return null;
    const parentCatgory = category.find((cat) => cat?._id === prod?.category);
    const subCategory = category.find((cat) => cat?._id === prod?.subCategory);

    return {
      name: prod.name,
      sku: prod.sku,
      shortDescription: prod.shortDescription,
      colour: prod.colour,
      colourCode: prod.colourCode,
      price: prod.price,
      image: prod.image,
      stock: prod.stock,
      category: parentCatgory
        ? {
            id: parentCatgory._id,
            name: parentCatgory.name,
            slug: parentCatgory.slug,
          }
        : null,
      categorySlug: parentCatgory ? parentCatgory.slug : null,
      subCategorySlug: subCategory ? subCategory.slug : null,
      subCategory: subCategory
        ? {
            id: subCategory._id,
            name: subCategory.name,
            slug: subCategory.slug,
          }
        : null,
    };
  });
  return finalObject;
};
