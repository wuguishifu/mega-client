'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { useRenameItemMutation } from '../../api/downloadsApiSlice';
import { Download } from '../../contract/types/downloads';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Required' }),
  })
  .refine((data) => !data.name.includes('/'), {
    message: 'Invalid name',
    path: ['name'],
  });

type FormSchema = z.infer<typeof formSchema>;

export function RenameItemDialog({
  children,
  item,
  closeDropdownMenu,
}: {
  children: React.ReactNode;
  item: Download;
  closeDropdownMenu: () => void;
}) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const [renameItem, { isLoading }] = useRenameItemMutation();

  const handleSubmit = useCallback(
    (values: FormSchema) => {
      if (isLoading) {
        return;
      }

      const newPath = item.path.substring(0, item.path.lastIndexOf('/') + 1) + values.name;
      renameItem({ oldPath: item.path, newPath });
      closeDropdownMenu();
    },
    [renameItem, isLoading, item.path, closeDropdownMenu],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Rename Item</DialogTitle>
        <DialogDescription>
          You can change the name of the item, you cannot change the path structure.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder={item.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" size="sm" disabled={isLoading}>
                Rename
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
