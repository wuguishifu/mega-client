'use client';

import { useCallback, useState } from 'react';

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

  const handleOpenChange = useCallback((value: boolean) => {
    setOpen(value);
  }, []);

  return (
    <DropdownMenu onOpenChange={handleOpenChange} open={open}>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{item.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <RenameItemDialog closeDropdownMenu={() => setOpen(false)} item={item}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Rename Item</DropdownMenuItem>
        </RenameItemDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
