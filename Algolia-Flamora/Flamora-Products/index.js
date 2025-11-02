import fetch from "node-fetch";

async function fetchProducts() {
  const response = await fetch(
    "https://flamora.onrender.com/product/allProduct"
  );
  const data = await response.json();
  return data;
}

export default fetchProducts;
