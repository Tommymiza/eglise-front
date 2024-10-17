import { DataTable } from "@/components/pages/church/table/data-table";
import churchStore from "@/store/church";
import { useEffect } from "react";
import { columns } from "./table/columns";

export default function ListChurch() {
  const { churchList, getChurchs } = churchStore();
  useEffect(() => {
    getChurchs();
  }, []);
  return <DataTable columns={columns} data={churchList} />;
}
