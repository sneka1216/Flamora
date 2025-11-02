import { algoliasearch } from "algoliasearch";

const client = algoliasearch("Y68H439JFV", "9dd8d40bb4b8978f3833db6c4f7580dd");

export const processRecords = async (uploadObject) => {
  return await client.saveObjects({
    indexName: "Flamora_index",
    objects: uploadObject,
  });
};
