import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter the name of the Category"],
    },
    slug: {
      type: String,
      required: [true, "please enter the slug of the category"],
    },
    description: {
      type: String,
      required: [true, "please enter the description of the Category"],
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export default mongoose.model("Category", categorySchema);
