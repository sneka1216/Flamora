import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter the name of the product"],
    },
    sku: {
      type: String,
      required: [true, "please enter the sku of the product"],
    },
    description: {
      type: String,
      required: [true, "please enter the description of the product"],
    },
    shortDescription: {
      type: String,
      required: [true, "please enter the short description of the product"],
    },
    colour: {
      type: String,
      required: [true, "please enter the colour of the product"],
    },
    colourCode: {
      type: String,
      required: [true, "please enter the colour code of the product"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please specify a category"],
    },
    price: {
      type: Number,
      required: [true, "please enter the price of the product"],
    },
    image: {
      type: [String],
      required: [true, "please enter the image of the product"],
    },
    stock: {
      type: String,
      required: [true, "please enter the stock of the product"],
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.model("Product", productSchema);
