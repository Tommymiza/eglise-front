import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import type { ApvStore } from "./type";

const apvStore = create<ApvStore>((set) => ({
  apv: null,
  loading: false,
  apvList: [],
  isEditing: false,
  createApv: async (apv) => {
    try {
      set({ loading: true });
      const response = await axios.post(`/apv`, apv);
      toast.success("APV créé avec succès");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateApv: async ({ id, apv }) => {
    try {
      set({ loading: true });
      const response = await axios.patch(`/apv/${id}`, apv);
      set({ apv: null });
      toast.success("APV modifié avec succès");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteApv: async (id) => {
    try {
      const response = await axios.delete(`/apv/${id}`);
      toast.success("APV supprimé avec succès");
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
  getApv: async (id, args) => {
    try {
      set({ loading: true });
      let params: any = {};
      if (args) {
        params = {
          args: JSON.stringify(args),
        };
      }
      const response = await axios.get(`/apv/${id}`, { params });
      set({ apv: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  getApvs: async (args) => {
    try {
      set({ loading: true });
      let params: any = {};
      if (args) {
        params = {
          args: JSON.stringify(args),
        };
      }
      const response = await axios.get(`/apv`, { params });
      set({ apvList: response.data });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  editApv: async (id) => {
    try {
      const response = await axios.get(`/apvs/${id}`);
      set({ apv: response.data, isEditing: true });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  cancelEdit: () => set({ apv: null, isEditing: false }),
}));

export default apvStore;
