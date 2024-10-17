import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import type { UserStore } from "./type";

const userStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  userList: [],
  isEditing: false,
  createUser: async (user) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/user`, user);
      toast.success("Utilisateur créé avec succès");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateUser: async ({ id, user }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(`/user/${id}`, user);
      set({ user: null });
      toast.success("Utilisateur modifié avec succès");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`/user/${id}`);
      toast.success("Utilisateur supprimé avec succès");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getUser: async (id, args) => {
    try {
      set({ loading: true });
      let params: any = {};
      if (args) {
        params = {
          args: JSON.stringify(args),
        };
      }
      const response = await axios.get(`/user/${id}`, { params });
      set({ user: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getUsers: async (args) => {
    try {
      set({ loading: true });
      let params: any = {};
      if (args) {
        params = { args: JSON.stringify(args) };
      }
      const response = await axios.get(`/user`, { params });
      set({ userList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editUser: async (id) => {
    try {
      const response = await axios.get(`/users/${id}`);
      set({ user: response.data, isEditing: true });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ user: null, isEditing: false }),
}));

export default userStore;
