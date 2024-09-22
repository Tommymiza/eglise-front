import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import type { AuthStore } from "./type";

const authStore = create<AuthStore>((set) => ({
  auth: null,
  loading: true,
  login: async (data) => {
    try {
      const response = await axios.post(`/login`, data);
      const token = response.data.token;
      localStorage.setItem("auth", token);
      toast.success("Utilisateur connécté!");
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    }
  },
  check: async (token?: string) => {
    try {
      set({ loading: true });
      if (token) {
        const response = await axios.post("/check-token", {
          token,
        });
        const login = response.data.auth;
        localStorage.setItem("auth", login);
        console.log(login);
        axios.defaults.headers.common["Authorization"] = `Bearer ${login}`;
        const res = await axios.get(`/users/me/`);
        const user = res.data;
        set({ auth: user });
        return;
      }
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("auth")}`;
      const response = await axios.get(`/users/me/`);
      const user = response.data;
      set({ auth: user });
    } catch (error) {
      localStorage.removeItem("auth");
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getMe: async () => {
    try {
      const response = await axios.get(`/users/me`);
      const user = response.data;
      set({ auth: user });
    } catch (error) {
      throw error;
    }
  },
  register: async (data) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/register`, data);
      toast.success("Veuillez verifier votre email.");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updatePassword: async (data) => {
    try {
      await axios.post(`/auth/reset`, data);
      toast.success("Password changed successfully!");
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      await axios.post(`/users/logout`);
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("auth");
      set({ auth: null });
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    }
  },
}));

export default authStore;
