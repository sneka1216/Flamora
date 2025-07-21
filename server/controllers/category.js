import express from "express";
import Category from "../models/category.js";

const categoryController = express.Router();

categoryController.post("/addCategory", async (req, res) => {
  try {
    const { name, slug, description, parentName } = req.body;

    let parentCategoryId = null;

    if (parentName) {
      const parentCategory = await Category?.findOne({ name: parentName });
      if (!parentCategory) {
        return res?.status(400)?.json({ msg: "Parent category not found" });
      }
      parentCategoryId = parentCategory._id;
    }

    const category = await Category?.create({
      name,
      slug,
      description,
      parent: parentCategoryId,
    });

    res.status(201).json({ msg: "Category added successfully", category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error", err });
  }
});

categoryController.get("/getCategoryById/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id).populate("parent");

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.status(200).json(category);
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

categoryController.get("/getAllCategory", async (req, res) => {
  try {
    const allCategory = await Category.find();
    if (!allCategory) {
      return res.status(404).json({ msg: "error fetching category" });
    }

    res.status(200).json(allCategory);
  } catch (err) {
    console.error("Error fetching Categories");
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default categoryController;
