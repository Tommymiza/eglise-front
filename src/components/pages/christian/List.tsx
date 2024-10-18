import { DataTable } from "@/components/pages/christian/table/data-table";
import christianStore from "@/store/christian";
import churchStore from "@/store/church";
import { useEffect } from "react";
import { columns } from "./table/columns";

export default function ListChristian() {
  const { christianList, getChristians } = christianStore();
  const { getChurchs } = churchStore();
  useEffect(() => {
    getChristians({
      include: {
        apv: true,
        sacraments: true,
      },
    });
    getChurchs({
      include: {
        apvs: true,
      },
    });
  }, []);
  return <DataTable columns={columns} data={christianList} />;
}
