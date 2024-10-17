export type UserItem = {
  id: string;
  name: string;
  email: string;
  role: Role;
  image: string | null;
  isActive: boolean;
  createdAt: string;
};

export type Role = "ADMIN" | "EVEQUE" | "PRETRE" | "APV";
export type Genre = "H" | "F";

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
    id: string;
    user: Partial<UserItem>;
  }) => Promise<UserItem>;
  deleteUser: (id: string) => Promise<UserItem>;
  getUser: (id: string, args?: any) => Promise<UserItem>;
  getUsers: (args?: any) => Promise<UserItem[]>;
  editUser: (id: string) => Promise<any>;
  cancelEdit: () => void;
};
