import { zodResolver } from '@hookform/resolvers/zod';
import { PropsWithChildren, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

import { useLoginMutation } from '../../api/serverSettingsApiSlice';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

export function MegaLogInPopOver({ children, asChild }: PropsWithChildren<{ asChild?: boolean }>) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = useCallback(
    (value: FormSchema) => {
      login(value).then((response) => {
        if (response.data?.email) {
          toast.success('Logged in successfully');
          setOpen(false);
        }
      });
    },
    [login],
  );

  const handleOpenChange = useCallback(
    (value: boolean) => {
      setOpen(value);
      form.reset();
    },
    [form],
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="bo@wuguishifu.dev" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="cursor-pointer">
              Log In
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
