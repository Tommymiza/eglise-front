import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import type { ChurchStore } from "./type";

const churchStore = create<ChurchStore>((set) => ({
  church: null,
  loading: false,
  churchList: [],
  isEditing: false,
  createChurch: async (church) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/church`, church);
      toast.success("Eglise créé avec succès");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateChurch: async ({ id, church }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(`/church/${id}`, church);
      set({ church: null });
      toast.success("Eglise modifié avec succès");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteChurch: async (id) => {
    try {
      const response = await axios.delete(`/church/${id}`);
      toast.success("Eglise supprimé avec succès");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getChurch: async (id, args) => {
    try {
      set({ loading: true });
      let params: any = {};
      if (args) {
        params = {
          args: JSON.stringify(args),
        };
      }
      const response = await axios.get(`/church/${id}`, { params });
      set({ church: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getChurchs: async (args) => {
    try {
      set({ loading: true });
      let params: any = {};
      if (args) {
        params = { args: JSON.stringify(args) };
      }
      const response = await axios.get(`/church`, { params });
      set({ churchList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editChurch: async (id) => {
    try {
      const response = await axios.get(`/churchs/${id}`);
      set({ church: response.data, isEditing: true });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ church: null, isEditing: false }),
}));

export default churchStore;
