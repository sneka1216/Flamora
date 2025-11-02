import fetch from "node-fetch";

async function fetchCategory() {
  const response = await fetch(
    "https://flamora.onrender.com/category/getAllCategory"
  );
  const data = await response.json();
  return data;
}

export default fetchCategory;
