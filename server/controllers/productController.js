import express from "express";
import Product from "../models/product.js";
import Category from "../models/category.js";

const productController = express.Router();

productController.post("/addProduct", async (req, res) => {
  try {
    const body = req.body;

    const categoryDoc = await Category?.findOne({ name: body?.category });

    if (!categoryDoc) {
      return res.status(400).send({ msg: "Category not found" });
    }

    let subcategoryDoc = null;
    if (body?.subcategory) {
      subcategoryDoc = await Category.findOne({ name: body?.subcategory });
      if (!subcategoryDoc) {
        return res.status(400).send({ msg: "Subcategory not found" });
      }
    }

    const product = await Product.create({
      name: body?.name,
      sku: body?.sku,
      description: body?.description,
      shortDescription: body?.shortDescription,
      colour: body?.colour,
      colourCode: body?.colourCode,
      category: categoryDoc._id,
      subcategory: subcategoryDoc?._id || null,
      price: body?.price,
      image: body?.image,
      stock: body?.stock,
    });

    res.send({ msg: "Product added", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .send({ msg: "Failed to add product", error: error.message });
  }
});

productController.get("/productsByCategory/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const categoryDoc = await Category?.findOne({ slug });
    let products = [];
    if (categoryDoc) {
      products = await Product?.find({
        category: categoryDoc?._id,
      });
    }

    if (products?.length === 0) {
      products = await Product?.find({
        subCategory: categoryDoc?._id,
      });
    }

    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching products by slug:", error);
    res
      .status(500)
      .send({ msg: "Error fetching products", error: error.message });
  }
});

productController.get("/getProductBySku/:sku", async (req, res) => {
  try {
    const { sku } = req.params;

    const product = await Product.findOne({ sku })
      .populate("category")
      .populate("subCategory");

    if (!product) {
      return res.status(404).send({ msg: "Product not found" });
    }

    res.status(200).send(product);
  } catch (error) {
    console.error("Error fetching product by SKU:", error);
    res.status(500).send({
      msg: "Error fetching product",
      error: error.message,
    });
  }
});

productController.get("/allProduct", async (req, res) => {
  const product = await Product.find();
  if (product) {
    res.send(product);
  } else {
    res.send("product query");
  }
});

productController.put("/updateProduct", async (req, res) => {
  const body = req.body;
  const product = await Product.findByIdAndUpdate(
    {
      _id: body._id,
    },
    {
      name: body.name,
      description: body.description,
      image: body.image,
      price: body.price,
      stock: body.stock,
      subCategory: body.subCategory,
    }
  );
  if (product) {
    const updatedProduct = await Product.findOne({ _id: body._id });
    res.send(updatedProduct);
  } else {
    res.send("product updation failed");
  }
});

productController.delete("/deleteProduct", async (req, res) => {
  const body = req.body;
  const product = await Product.findByIdAndDelete(body._id);
  if (product) {
    res.send(product);
  } else {
    res.send("product deletion failed");
  }
});

productController.delete("/deleteAll", async (req, res) => {
  const product = await Product.deleteMany();
  if (product) {
    res.send("deleted");
  } else {
    res.send("product deletion is failed");
  }
});

export default productController;
