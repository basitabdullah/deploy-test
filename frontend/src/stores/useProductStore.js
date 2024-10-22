import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios.js";


export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  setProduct: (product) => set({ product }),

  createProduct: async (productData) => {
    set({ loading: true });

    try {
      const res = await axios.post("/product", productData);

      set((prev) => ({
        products: [...prev.products, res.data],
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/product");

      set({ products: res.data, loading: false });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      set({ products: null, loading: false });
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });

    try {
      const res = await axios.get(`/product/category/${category}`);
      set({ products: res.data, loading: false });
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`/product/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product._id !== id), //dekhai gai
        loading: false,
      }));
      toast.success("Product Deleted!");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      set({ loading: false });
    }
  },

  toggleFeaturedProduct: async (id) => {
    try {
      const res = await axios.patch(`/product/${id}`);
      set((prev) => ({
        products: prev.products.map((product) =>
          product._id === id
            ? { ...product, isFeatured: res.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  },

  getRecomemdedProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/product/recommended");
      set({ products: res.data, loading: false });
      
    } catch (error) {
      toast.error(error.response.data.meessage || "Something went wrong");
    }
  },

  getFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/product/featured");
      set({ products: res.data, loading: false });
      
    } catch (error) {
      toast.error(error.response.data.meessage || "Something went wrong");
    }
  },
  searchProducts : async (query,sort,maxprice,category)=>{
    set({ loading: true });
    try {
      const res = await axios.get(`/product/search?query=${query}&sort=${sort}&maxPrice=${maxprice}&category=${category}`);
      set({ products: res.data, loading: false });
      
    } catch (error) {
      toast.error(error.response.data.meessage || "Something went wrong");
    }
  }
  
}))
