import { ClientItem } from "../client/type";
import { DocumentItem } from "../file/type";
import { GroupItem } from "../group/type";
import { UrifrontItem } from "../urifront/type";

export type UserItem = {
  id: number;
  name: string;
  email: string;
  image?: string | null;
  password?: string;
  client?: ClientItem;
  c_pass?: string;
  group_id: number;
  group: GroupItem;
  uriFronts?: UrifrontItem[];
  document?: DocumentItem[];
  is_active: boolean;
  date_desactivated?: string | null;
};

export type UserStore = {
  user: UserItem | null;
  userList: UserItem[];
  loading: boolean;
  isEditing: boolean;
  createUser: (user: Partial<UserItem>) => Promise<UserItem>;
  updateUser: ({
    id,
    user,
  }: {
    id: number;
    user: Partial<UserItem> & { password: string; c_password: string };
  }) => Promise<UserItem>;
  deleteUser: (id: number) => Promise<UserItem>;
  getUser: (id: number) => Promise<UserItem>;
  getUsers: () => Promise<UserItem[]>;
  editUser: (id: number) => Promise<any>;
  cancelEdit: () => void;
};
