import z from 'zod';

export const Download = z.object({
  name: z.string(),
  path: z.string(),
  type: z.enum(['file', 'directory']),
});

export type Download = z.infer<typeof Download>;
