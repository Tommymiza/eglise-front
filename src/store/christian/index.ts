import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import type { ChristianStore } from "./type";

const christianStore = create<ChristianStore>((set) => ({
  christian: null,
  loading: false,
  christianList: [],
  isEditing: false,
  createChristian: async (christian) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/christian`, christian);
      toast.success("Chrétien créé avec succès");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateChristian: async ({ id, christian }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(`/christian/${id}`, christian);
      set({ christian: null });
      toast.success("Chrétien modifié avec succès");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteChristian: async (id) => {
    try {
      const response = await axios.delete(`/christian/${id}`);
      toast.success("Chrétien supprimé avec succès");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getChristian: async (id, args) => {
    try {
      set({ loading: true });
      let params: any = {};
      if (args) {
        params = {
          args: JSON.stringify(args),
        };
      }
      const response = await axios.get(`/christian/${id}`, { params });
      set({ christian: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getChristians: async (args) => {
    try {
      set({ loading: true });
      let params: any = {};
      if (args) {
        params = { args: JSON.stringify(args) };
      }
      const response = await axios.get(`/christian`, { params });
      set({ christianList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editChristian: async (id) => {
    try {
      const response = await axios.get(`/christians/${id}`);
      set({ christian: response.data, isEditing: true });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ christian: null, isEditing: false }),
}));

export default christianStore;
