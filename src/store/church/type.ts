import { ApvItem } from "../apv/type";
import { ChristianSacrament } from "../christian/type";

export type ChurchItem = {
  id: string;
  name: string;
  diocese: string;
  district: string;
  createdAt: string;
  updatedAt: string;
  apvs: ApvItem[];
  christianSacraments: ChristianSacrament[];
};

export type ChurchStore = {
  church: ChurchItem | null;
  churchList: ChurchItem[];
  loading: boolean;
  isEditing: boolean;
  createChurch: (church: Partial<ChurchItem>) => Promise<ChurchItem>;
  updateChurch: ({
    id,
    church,
  }: {
    id: string;
    church: Partial<ChurchItem>;
  }) => Promise<ChurchItem>;
  deleteChurch: (id: string) => Promise<ChurchItem>;
  getChurch: (id: string, args?: any) => Promise<ChurchItem>;
  getChurchs: (args?: any) => Promise<ChurchItem[]>;
  editChurch: (id: string) => Promise<any>;
  cancelEdit: () => void;
};
