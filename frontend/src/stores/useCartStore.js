import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";
export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,
  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response.data.message || "Something went wrong");
    }
  },
  calculateTotals: async () => {
    try {
      const { cart, coupon } = get();
      const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      let total = subtotal;

      if (coupon) {
        const discount = subtotal * (coupon.discountPercentage / 100);
        total = subtotal - discount;
      }

      set({ subtotal, total });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  },

  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart");

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  removeFromCart: async (id) => {
    try {
      await axios.delete(`/cart`, { data: { id } });
      set((prevState) => ({
        cart: prevState.cart.filter((item) => item._id !== id),
      }));
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  },

  updateQuantity: async (id, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(id);
      return;
    }

    await axios.put(`/cart/${id}`, { quantity });
    set((prevState) => ({
      cart: prevState.cart.map((item) =>
        item._id === id ? { ...item, quantity } : item
      ),
    }));
    get().calculateTotals();
  },

  getMyCoupon: async () => {
    try {
      const res = await axios.get("/coupon");
      set({ coupon: res.data });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  },

  validateCoupon: async (code) => {
    try {
      const res = await axios.post("/coupon/validate", { code });
      console.log(res);
      set({ coupon: res.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  },

  removeCoupon: async () => {
    try {
      set({ coupon: null, isCouponApplied: false });
      get().calculateTotals();
      toast.success("Coupon removed");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  },


  clearCart: async () => {
		set({ cart: [], coupon: null, total: 0, subtotal: 0 });
	},
}));
