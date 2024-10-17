import { DataTable } from "@/components/pages/user/table/data-table";
import userStore from "@/store/user";
import { useEffect } from "react";
import { columns } from "./table/columns";

export default function ListUser() {
  const { userList, getUsers } = userStore();
  useEffect(() => {
    getUsers();
  }, []);
  return <DataTable columns={columns} data={userList} />;
}
