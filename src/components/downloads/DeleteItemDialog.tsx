import { useCallback, useState } from 'react';

import { useDeleteItemMutation } from '../../api/downloadsApiSlice';
import { Download } from '../../contract/types/downloads';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';

export function DeleteItemDialog({
  children,
  item,
  closeDropdownMenu,
}: {
  children: React.ReactNode;
  item: Download;
  closeDropdownMenu: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    closeDropdownMenu();
    setOpen(false);
  }, [closeDropdownMenu]);

  const handleOpenChange = useCallback((value: boolean) => (value ? setOpen(value) : handleClose()), [handleClose]);

  const [deleteItem, { isLoading }] = useDeleteItemMutation();

  const handleDelete = useCallback(async () => {
    await deleteItem({ path: item.path }).unwrap();
    handleClose();
  }, [deleteItem, item.path, handleClose]);

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete <strong>{item.name}</strong>? This action cannot be undone.
        </DialogDescription>
        <div className="mt-4 flex justify-end items-center gap-4">
          <Button variant="outline" onClick={handleClose} className="cursor-pointer">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} className="cursor-pointer">
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
