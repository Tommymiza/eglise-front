import { Button } from "@/components/ui/button";
import Chip from "@/components/ui/chip";
import { UserItem } from "@/store/user/type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<UserItem>[] = [
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
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Rôle",
    cell: ({ row }) => <Chip label={row.getValue("role")} />,
  },
  {
    accessorKey: "isActive",
    header: "Actif",
    cell: ({ row }) => (
      <Chip
        className={row.getValue("isActive") ? "bg-green-500" : "bg-red-500"}
        label={row.getValue("isActive") ? "Oui" : "Non"}
      />
    ),
  },
];
