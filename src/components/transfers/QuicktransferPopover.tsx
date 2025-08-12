'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { useQueueTransferMutation } from '../../api/transfersApiSlice';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const formSchema = z.object({
  url: z.string().url({ message: 'invalid url' }).min(1, { message: 'required' }),
});

type FormSchema = z.infer<typeof formSchema>;

export function QuickTransferPopover({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: '' },
  });

  const [queueTransfer, { isLoading }] = useQueueTransferMutation();

  const handleSubmit = useCallback(
    (values: FormSchema) => {
      queueTransfer(values)
        .unwrap()
        .then(() => setOpen(false));
    },
    [queueTransfer],
  );

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');

  const handleOpenChange = useCallback(
    (value: boolean) => {
      setOpen(value);
      form.reset();
    },
    [form],
  );

  return (
    <Popover onOpenChange={handleOpenChange} open={open}>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent>
        <h1>Queue Transfer</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter URL" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" size="sm">
                Transfer
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
