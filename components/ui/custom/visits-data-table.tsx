import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  // Pagination,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DataTableProps<TData extends { id: string }, TValue> { // here before TData was as it is but i added extends { id: string } because of the onclick function on the Trow tag
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function VisistsDataTable<TData extends { id: string; }, TValue>({ // here before TData was as it is but i added extends { id: string } because of the onclick function on the Trow tag
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  // const handleRowClick = (patientId: string) => {
  const handleRowClick = () => {
    // router.push(`/Profile/${patientId}`);
    router.push(`/Profile`);
  };
  const handleNewPatientRegistration = (e: any) => {
    e.preventDefault();
    router.push("/Records/Child");
  };
  const handleNewVisistRegistration = (e: any) => {
    e.preventDefault();
    router.push("/Visits/BeforeCard");
  };
  const handleParentRegistration = (e: any) => {
    e.preventDefault();
    router.push("Records/Mother");
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search Patients..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border border-rchsLight"
        />
        <Button
          onClick={handleNewPatientRegistration}
          className="flex flex-col ml-2"
        >
          Register New Patient
        </Button>
        <Button
          onClick={handleNewVisistRegistration}
          className="flex flex-col ml-2"
        >
          Register New Visit
        </Button>
        <Button
          onClick={handleParentRegistration}
          className="flex flex-col ml-2"
        >
          Register Parent
        </Button>
      </div>
      <div className="rounded-md border border-rchsLight">
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
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  // onClick={() => handleRowClick(row.original.id)}
                  onClick={() => handleRowClick()}
                  style={{ cursor: "pointer" }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
