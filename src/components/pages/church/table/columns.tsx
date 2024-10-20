import { Button } from "@/components/ui/button";
import { ChurchItem } from "@/store/church/type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<ChurchItem>[] = [
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
    accessorKey: "diocese",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Diocèse
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "district",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          District
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorFn: (row) => row.apvs?.length,
    header: "APF",
  },
];
