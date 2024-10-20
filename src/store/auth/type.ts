import { type UserItem } from "../user/type";

export type AuthStore = {
  auth: UserItem | null;
  loading: boolean;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<any>;
  register: (user: Partial<UserItem>) => Promise<UserItem>;
  logout: () => Promise<any>;
  check: (token?: string) => Promise<any>;
  updatePassword: (data: {
    password: string;
    c_password: string;
  }) => Promise<any>;
  getMe: () => Promise<any>;
};
