import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";
export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords Do Not Match!");
    }
    try {
      const res = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      set({ user: res.data.user, loading: false });
      toast.success(`Welcome, ${name}`);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An unexpected error occured");
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      set({ user: res.data.user, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "An unexpected error occured");
    }
  },

  logout: async () => {
    try {
      await axios.get("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(error.response.data.message || "An unexpected error occured");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");

      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ user: null, checkingAuth: false });
      toast.error(error.response.message || "An unexpected error occured");
    }
  },
}));
