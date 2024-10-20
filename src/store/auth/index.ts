import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import type { AuthStore } from "./type";

const authStore = create<AuthStore>((set) => ({
  auth: null,
  loading: true,
  login: async (data) => {
    try {
      const response = await axios.post(`/auth/login`, data);
      const token = response.data.token;
      localStorage.setItem("jwt", token);
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
        localStorage.setItem("jwt", login);
        console.log(login);
        axios.defaults.headers.common["Authorization"] = `Bearer ${login}`;
        const res = await axios.get(`/user/me/`);
        const user = res.data;
        set({ auth: user });
        return;
      }
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("jwt")}`;
      const response = await axios.get(`/auth/me/`);
      const user = response.data;
      set({ auth: user });
    } catch (error) {
      localStorage.removeItem("jwt");
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getMe: async () => {
    try {
      const token = localStorage.getItem("jwt");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(`/auth/me`);
      const user = response.data;
      set({ auth: user });
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
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
      toast.success("Mot de passe changé avec succès!");
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwt");
      set({ auth: null });
      window.location.href = "/";
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw error;
    }
  },
}));

export default authStore;
