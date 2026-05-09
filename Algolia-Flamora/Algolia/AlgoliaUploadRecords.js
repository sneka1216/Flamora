import { algoliasearch } from "algoliasearch";

const client = algoliasearch("0NAUEHGFD8", "6f456a4f98c11f5c1a355525a8f32057");

export const processRecords = async (uploadObject) => {
  return await client.saveObjects({
    indexName: "Flamora_index",
    objects: uploadObject,
  });
};
