import { DataTable } from "@/components/pages/apv/table/data-table";
import apvStore from "@/store/apv";
import churchStore from "@/store/church";
import { useEffect } from "react";
import { columns } from "./table/columns";

export default function ListApv() {
  const { apvList, getApvs } = apvStore();
  const { getChurchs } = churchStore();
  useEffect(() => {
    getApvs({
      include: {
        church: true,
        christians: true,
      },
    });
    getChurchs();
  }, []);
  return <DataTable columns={columns} data={apvList} />;
}
