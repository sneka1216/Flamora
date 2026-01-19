import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: function () {
        return !this.isGuest;
      },
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      required: function () {
        return !this.isGuest;
      },
    },
    password: {
      type: String,
      required: function () {
        return !this.isGuest;
      },
    },
    photo: {
      type: String,
    },
    address: {
      type: Object,
    },
    isGuest: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", customerSchema);
