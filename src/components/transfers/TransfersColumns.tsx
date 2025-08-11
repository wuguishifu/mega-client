'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { TransferIcon } from './TransferIcon';
import { transfersApi } from '../../api/transfersApiSlice';
import { Transfer } from '../../contract/types/transfers';
import { store } from '../../state/store';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Progress } from '../ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const transfersColumns: ColumnDef<Transfer>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: 'Transfer Type',
    cell: ({ row }) => {
      const type = row.getValue<Transfer['type']>('type');
      return <TransferIcon type={type} />;
    },
  },
  {
    accessorKey: 'sourcePath',
    header: 'File',
    cell: ({ row }) => {
      const sourcePath = row.getValue<Transfer['sourcePath']>('sourcePath');
      const lastSlash = sourcePath.lastIndexOf('/');
      const fileName = lastSlash !== -1 ? sourcePath.substring(lastSlash + 1) : sourcePath;

      return (
        <Tooltip delayDuration={500}>
          <TooltipTrigger>
            <span>{fileName}</span>
          </TooltipTrigger>
          <TooltipContent>{sourcePath}</TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
    cell: ({ row }) => {
      const { percent, total } = row.getValue<Transfer['progress']>('progress');
      return (
        <div className="flex items-center gap-2 min-w-48">
          <Progress value={percent} className="flex-1" />
          <div className="flex-1">{total}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'state',
    header: 'Transfer State',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const tag = row.original.tag;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => store.dispatch(transfersApi.endpoints.pauseTransfer.initiate({ tag }))}
              className="cursor-pointer"
            >
              Pause Transfer
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => store.dispatch(transfersApi.endpoints.resumeTransfer.initiate({ tag }))}
              className="cursor-pointer"
            >
              Resume Transfer
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => store.dispatch(transfersApi.endpoints.cancelTransfer.initiate({ tag }))}
              className="cursor-pointer"
            >
              <span className="text-destructive">Cancel Transfer</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
