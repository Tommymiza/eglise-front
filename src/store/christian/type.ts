import { ApvItem } from "../apv/type";
import { ChurchItem } from "../church/type";
import { SacramentItem } from "../sacrament/type";

export type ChristianItem = {
  id: string;
  name: string;
  surname: string;
  bateme_name: string;
  genre: Genre;
  birthdate: string;
  apv_id: string;
  apv: ApvItem;
  sacraments: ChristianSacrament[];
  createdAt: string;
  updatedAt: string;
};

export type ChristianSacrament = {
  id: string;
  christian_id: string;
  sacrament_id: string;
  church_id: string;
  christian: ChristianItem;
  sacrament: SacramentItem;
  church: ChurchItem;
  createdAt: string;
  updatedAt: string;
};

export type Genre = "H" | "F";

export type ChristianStore = {
  christian: ChristianItem | null;
  christianList: ChristianItem[];
  loading: boolean;
  isEditing: boolean;
  createChristian: (
    christian: Partial<ChristianItem>
  ) => Promise<ChristianItem>;
  createManyChristianSacrament: (data: {
    selected: ChristianItem[];
    sacrament_id: string;
    createdAt: string;
    church_id: string;
  }) => Promise<ChristianSacrament>;
  updateChristian: ({
    id,
    christian,
  }: {
    id: string;
    christian: Partial<ChristianItem>;
  }) => Promise<ChristianItem>;
  deleteChristian: (id: string) => Promise<ChristianItem>;
  getChristian: (id: string, args?: any) => Promise<ChristianItem>;
  getChristians: (args?: any) => Promise<ChristianItem[]>;
  editChristian: (id: string) => Promise<any>;
  cancelEdit: () => void;
};
