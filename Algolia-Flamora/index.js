import { processRecords } from "./Algolia/AlgoliaUploadRecords.js";
import { appendToFileAsArray } from "./AppendFileAsArray.js";
import fetchCategory from "./Flamora-Category/index.js";
import fetchProducts from "./Flamora-Products/index.js";
import { productMapper } from "./Mapper/index.js";

const products = await fetchProducts();

const category = await fetchCategory();

const productWithCategory = productMapper(products, category);

appendToFileAsArray("finalProducts.json", productWithCategory);

processRecords(productWithCategory)
  .then(() => console.log("Successfully indexed objects!"))
  .catch((err) => console.error(err));
