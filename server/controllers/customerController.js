import express from "express";
import Customer from "../models/customer.js";
import Cart from "../models/cart.js";

const customer = express.Router();

customer.post("/getCustomerByEmail", async (req, res) => {
  const body = req.body;
  const user = await Customer.findOne({ email: body?.email });
  res.send({ user });
});

customer.post("/me", async (req, res) => {
  const body = req?.body;
  try {
    const user = new Customer({
      name: body?.name ?? body?.name,
      email: body?.email ?? body?.email,
      password: body?.password ?? body?.password,
      isGuest: body?.isGuest || true,
    });
    await user?.save();
    const cart = await Cart?.create({
      user: user?._id,
      products: [],
      totalPrice: 0,
    });
    res.send({ user, cart });
  } catch (error) {
    console.log("erros", error);
  }
});

customer.post("/signup", async (req, res) => {
  const body = req.body;
  const existingUser = await Customer?.findOne({ email: body?.email });

  if (existingUser) {
    res.send({
      status: "fails",
      message: "user is already register",
    });
  } else {
    try {
      const user = new Customer({
        name: body?.name,
        email: body?.email,
        password: body?.password,
        isGuest: body?.isGuest || false,
      });
      await user.save();
      const cart = await Cart?.create({
        user: user?._id,
        products: [],
        totalPrice: 0,
      });
      res.send({ user, cart });
    } catch (error) {
      console.log("erros", error);
    }
  }
});

customer.post("/login", async (req, res) => {
  const body = req?.body;
  const user = await Customer?.findOne({ email: body?.email });

  if (!user) {
    res.send("invalid user");
  } else if (user?.password !== body?.password) {
    res.send("invalid credentials");
  } else {
    const cart = await Cart?.findOne({ email: body?.email });
    res.send({ user, cart });
  }
});

customer.put("/updateAccount", async (req, res) => {
  const body = req?.body;
  const user = await Customer?.findOneAndUpdate(
    {
      $or: [{ email: body?.email }, { _id: body?._id }],
    },
    {
      name: body?.name,
      email: body?.email,
      password: body?.password,
      photo: body?.photo,
      isGuest: body?.isGuest,
    },
    { new: true },
  );

  if (user) {
    const updatedUser = await Customer?.findOne({ email: body?.email });
    const cart = await Cart?.findOne({ user: updatedUser?._id });

    res.send({ user: updatedUser, cart });
  } else {
    res.send("failed");
  }
});

customer.delete("/deleteOne", async (req, res) => {
  const body = req.body;
  const user = await Customer.deleteOne({ email: body.email });
  const userCart = await Cart.deleteOne({ user: body?.email });

  if (user && userCart) {
    res.send({ user, userCart });
  } else {
    res.send("failed deletion");
  }
});

customer.delete("/deleteAll", async (req, res) => {
  await Customer.deleteMany();
  await Cart.deleteMany();
  res.send("deleted");
});

export default customer;
