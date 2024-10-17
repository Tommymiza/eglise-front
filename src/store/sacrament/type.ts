import { ChristianSacrament } from "../christian/type";

export type SacramentItem = {
  id: string;
  name: string;
  christians: ChristianSacrament[];
};

export type SacramentStore = {
  sacrament: SacramentItem | null;
  sacramentList: SacramentItem[];
  loading: boolean;
  isEditing: boolean;
  createSacrament: (
    sacrament: Partial<SacramentItem>
  ) => Promise<SacramentItem>;
  updateSacrament: ({
    id,
    sacrament,
  }: {
    id: string;
    sacrament: Partial<SacramentItem>;
  }) => Promise<SacramentItem>;
  deleteSacrament: (id: string) => Promise<SacramentItem>;
  getSacrament: (id: string, args?: any) => Promise<SacramentItem>;
  getSacraments: (args?: any) => Promise<SacramentItem[]>;
  editSacrament: (id: string) => Promise<any>;
  cancelEdit: () => void;
};
