import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import type { SacramentStore } from "./type";

const sacramentStore = create<SacramentStore>((set) => ({
  sacrament: null,
  loading: false,
  sacramentList: [],
  isEditing: false,
  createSacrament: async (sacrament) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/sacrament`, sacrament);
      toast.success("Sacrament créé avec succès");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateSacrament: async ({ id, sacrament }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(`/sacrament/${id}`, sacrament);
      set({ sacrament: null });
      toast.success("Sacrament modifié avec succès");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteSacrament: async (id) => {
    try {
      const response = await axios.delete(`/sacrament/${id}`);
      toast.success("Sacrament supprimé avec succès");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getSacrament: async (id, args) => {
    try {
      set({ loading: true });
      let params: any = {};
      if (args) {
        params = {
          args: JSON.stringify(args),
        };
      }
      const response = await axios.get(`/sacrament/${id}`, { params });
      set({ sacrament: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getSacraments: async (args) => {
    try {
      set({ loading: true });
      let params: any = {};
      if (args) {
        params = { args: JSON.stringify(args) };
      }
      const response = await axios.get(`/sacrament`, { params });
      set({ sacramentList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editSacrament: async (id) => {
    try {
      const response = await axios.get(`/sacraments/${id}`);
      set({ sacrament: response.data, isEditing: true });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ sacrament: null, isEditing: false }),
}));

export default sacramentStore;
