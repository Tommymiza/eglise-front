import { DataTable } from "@/components/pages/sacrament/table/data-table";
import sacramentStore from "@/store/sacrament";
import { useEffect } from "react";
import { columns } from "./table/columns";

export default function ListSacrament() {
  const { sacramentList, getSacraments } = sacramentStore();
  useEffect(() => {
    getSacraments();
  }, []);
  return <DataTable columns={columns} data={sacramentList} />;
}
