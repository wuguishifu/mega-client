import z from 'zod';

export const Transfer = z.object({
  type: z.string(),
  tag: z.string(),
  sourcePath: z.string(),
  progress: z.object({
    percent: z.number(),
    total: z.string(),
  }),
  state: z.string(),
});

export type Transfer = z.infer<typeof Transfer>;
