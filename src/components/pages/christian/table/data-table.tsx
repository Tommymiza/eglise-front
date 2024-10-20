"use client";

import {
  type ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Dialog,
  DialogBody,
  DialogTitle,
} from "@/components/tools/custom-dialog";
import DeleteConfirm from "@/components/tools/delete";
import FormDialog from "@/components/tools/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import christianStore from "@/store/christian";
import { ChristianItem } from "@/store/christian/type";
import { Edit2Icon, Plus } from "lucide-react";
import AddFormChristian from "../form/form";
import SacramentForm from "../form/sacrament-form";

export function DataTable({
  data,
  columns,
}: {
  data: ChristianItem[];
  columns: ColumnDef<ChristianItem>[];
}) {
  const { cancelEdit, getChristian, deleteChristian, getChristians } =
    christianStore();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [openSacrament, setOpenSacrament] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleClose = () => {
    cancelEdit();
    setOpen(false);
  };
  const handleEdit = (id: string) => {
    getChristian(id, {
      include: {
        apv: true,
        sacraments: {
          include: {
            sacrament: true,
          },
        },
      },
    });
    setOpen(true);
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteChristian(id);
      getChristians();
    } catch (error) {
      console.log(error);
    }
  };
  const selected = table.getSelectedRowModel().rows.map((r) => r.original);
  return (
    <div className="w-full relative">
      <div className="flex items-center py-4 justify-between">
        <h1 className="font-bold text-xl">Liste des chrétiens</h1>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Filtrer..."
            value={
              (table.getColumn("fullname")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("fullname")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          {selected.length > 0 && (
            <Button
              variant={"secondary"}
              onClick={() => setOpenSacrament(true)}
            >
              <Plus className="w-4" />
              Sacrament
            </Button>
          )}
          <Button onClick={() => setOpen(true)}>
            <Plus className="w-4" />
            Ajout
          </Button>

          <FormDialog open={open} close={handleClose}>
            <AddFormChristian />
          </FormDialog>
          <Dialog open={openSacrament} onClose={() => setOpenSacrament(false)}>
            <DialogTitle>Sacrament</DialogTitle>
            <DialogBody>
              <SacramentForm selected={selected} />
            </DialogBody>
          </Dialog>
        </div>
      </div>

      <div className="rounded-md border dark:border-zinc-800">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
                <TableHead>Actions</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size={"icon"}
                          onClick={() => handleEdit(row.original.id)}
                        >
                          <Edit2Icon className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Modifier</p>
                      </TooltipContent>
                    </Tooltip>
                    <DeleteConfirm fn={() => handleDelete(row.original.id)} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} lignes
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
