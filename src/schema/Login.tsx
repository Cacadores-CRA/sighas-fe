import { z } from 'zod';

export const formLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});
