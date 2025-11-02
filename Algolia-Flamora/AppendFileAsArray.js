import fs from "fs";

export const appendToFileAsArray = (filePath, newEntry) => {
  try {
    let data = [];

    if (fs.existsSync(filePath)) {
      const existing = fs.readFileSync(filePath, "utf-8");
      if (existing.trim()) {
        data = JSON?.parse(existing);
      }
    }

    data.push(newEntry);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error appending to file:", err);
  }
};
