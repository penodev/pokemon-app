"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Pokemon } from "@prisma/client";
import useSWR from "swr";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { deletePokemonById, getPokemon } from "@/services/pokemon";
import { Loading } from "@/components/ui-components/loading";
import usePokeManageModal from "@/hooks/use-data-group-modal";
import useAction from "@/hooks/use-action";
import { TablePagination } from "@/components/ui-components/table-pagination";

const columns: ColumnDef<Pokemon>[] = [
  {
    id: "actions",
    header: () => {
      const { onOpen } = usePokeManageModal();
      const handleCreate = async () => {
        onOpen();
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='text-xs p-3'>
              <span className=''>Actions</span>
              <ChevronDown className='ml-1 w-4 h-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleCreate}>Create</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 10,
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = row.original;
      const { onOpen } = usePokeManageModal();
      const { toggleDelRow } = useAction();

      const handleDelete = async () => {
        if (!!rowData.id) {
          const res = await deletePokemonById(rowData.id);
          if (!!res) {
            toggleDelRow();
          }
        }
      };

      const handleEdit = async () => {
        onOpen(rowData);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "num",
    header: "Number",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
  {
    accessorKey: "candy",
    header: "Candy",
  },
  {
    accessorKey: "egg",
    header: "Egg",
  },
  {
    accessorKey: "multipliers",
    header: "Multipliers",
  },
  {
    accessorKey: "weaknesses",
    header: "Weaknesses",
  },
  {
    accessorKey: "candyCount",
    header: "Candy Count",
  },
  {
    accessorKey: "spawnChance",
    header: "Spawn Chance",
  },
  {
    accessorKey: "avgSpawns",
    header: "Avg Spawns",
  },
  {
    accessorKey: "spawnTime",
    header: "Spawn Time",
  },
];

export const PokeManageTable = () => {
  const [page, setPage] = useState<number>(1);

  const { data, error } = useSWR(
    getPokemon.url(`currentPage=${page}`),
    getPokemon
  );
  if (error) return <div>Request Failed</div>;
  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className='space-y-4'>
      <DataTable columns={columns} data={data.data || []} />
      <TablePagination
        page={page}
        totalPages={data.meta.totalPages}
        setPage={setPage}
      />
    </div>
  );
};
