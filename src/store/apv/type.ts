import { ChristianItem } from "../christian/type";
import { ChurchItem } from "../church/type";

export type ApvItem = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  church_id: string;
  church: ChurchItem;
  christians: ChristianItem[];
};

export type ApvStore = {
  apv: ApvItem | null;
  apvList: ApvItem[];
  loading: boolean;
  isEditing: boolean;
  createApv: (apv: Partial<ApvItem>) => Promise<ApvItem>;
  updateApv: ({
    id,
    apv,
  }: {
    id: string;
    apv: Partial<ApvItem>;
  }) => Promise<ApvItem>;
  deleteApv: (id: string) => Promise<ApvItem>;
  getApv: (id: string, args?: any) => Promise<ApvItem>;
  getApvs: (args?: any) => Promise<ApvItem[]>;
  editApv: (id: string) => Promise<any>;
  cancelEdit: () => void;
};
