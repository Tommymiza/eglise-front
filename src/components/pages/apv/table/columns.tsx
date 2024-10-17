import { Button } from "@/components/ui/button";
import { ApvItem } from "@/store/apv/type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<ApvItem>[] = [
  {
    accessorKey: "church.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Eglise
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="p-4 font-bold">{row.getValue("name")}</span>
    ),
    enableSorting: true,
  },
  {
    accessorFn: (row) => row.christians.length,
    header: "Nombre de chrétiens",
  },
];
