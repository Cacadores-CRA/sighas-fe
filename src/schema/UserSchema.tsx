import { z } from 'zod';

export const userSchema = z.object({
  cpf: z.string().min(11).max(14),
  name: z.string().min(2).max(50),
  surname: z.string().min(2).max(50),
  birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  email: z.string().email(),
  username: z.string().min(3).max(30),
  password: z.string().min(8),
  roles: z.array(z.enum(['ADMIN', 'USER'])).min(1),
});

export type UserFormData = z.infer<typeof userSchema>;
