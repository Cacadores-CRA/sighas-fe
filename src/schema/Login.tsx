import { z } from 'zod';

export const formLoginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(3).max(50),
});
