import { Product } from "../models/productModel.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    user.cartItems.push(productId);
    await user.save();

    res.json(user.cartItems);
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error : ${error.message}`,
    });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const products = await Product.find({ _id: { $in: req.user.cartItems } });
    const cartItems = products.map((product) => {
      //ek qism ka item find karnai kai liya
      const item = req.user.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );

      if (!item) {
        console.log(
          `Cart item not found or invalid product ID :  ${product.id}`
        );
        return { ...product.toJSON(), quantity: 0 };
      }
      return { ...product.toJSON(), quantity: item.quantity };
    });

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error : ${error.message}`,
    });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { id } = req.body;
    const user = req.user;

    if (!id) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== id);
    }
    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error : ${error.message}`,
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const existingItem = user.cartItems.find((item) => item.id === id);

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter((item) => item.id !== id);
        user.save();
        res.json(user.cartItems);
      }
      existingItem.quantity = quantity;
      user.save();
      res.json(user.cartItems);
    } else {
      res
        .status(404)
        .json({ message: "Product not found!", error: error.message });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
