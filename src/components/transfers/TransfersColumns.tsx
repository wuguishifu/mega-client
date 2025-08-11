'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TransferIcon } from './TransferIcon';
import { Transfer } from '../../contract/types/transfers';
import { Progress } from '../ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const transfersColumns: ColumnDef<Transfer>[] = [
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
];
