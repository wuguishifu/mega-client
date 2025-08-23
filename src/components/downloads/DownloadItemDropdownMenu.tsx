'use client';

import { useCallback, useState } from 'react';

import { DeleteItemDialog } from './DeleteItemDialog';
import { RenameItemDialog } from './RenameItemDialog';
import { Download } from '../../contract/types/downloads';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function DownloadItemDropdownMenu({ children, item }: { children: React.ReactNode; item: Download }) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = useCallback((value: boolean) => setOpen(value), []);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <DropdownMenu onOpenChange={handleOpenChange} open={open}>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => navigator.clipboard.writeText(item.name)} className="cursor-pointer">
          Copy Name
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => navigator.clipboard.writeText(item.path)} className="cursor-pointer">
          Copy Full Path
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <RenameItemDialog closeDropdownMenu={handleClose} item={item}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
            Rename Item
          </DropdownMenuItem>
        </RenameItemDialog>
        <DeleteItemDialog closeDropdownMenu={handleClose} item={item}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="text-red-600 focus:text-red-600 cursor-pointer"
          >
            Delete Item
          </DropdownMenuItem>
        </DeleteItemDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
