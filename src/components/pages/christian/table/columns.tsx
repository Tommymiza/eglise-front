import { Button } from "@/components/ui/button";
import { ChristianItem } from "@/store/christian/type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<ChristianItem>[] = [
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
    accessorKey: "surname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prénom
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
    accessorKey: "birthdate",
    header: "Date de naissance",
    cell: ({ row }) => (
      <span>{format(row.getValue("birthdate"), "dd/MM/yyyy")}</span>
    ),
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "createdAt",
    header: "Ajouté le",
    cell: ({ row }) => (
      <span>{format(row.getValue("createdAt"), "dd/MM/yyyy")}</span>
    ),
  },
];
