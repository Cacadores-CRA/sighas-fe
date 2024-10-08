import { z } from 'zod';

export const formForgetPasswordSchema = z.object({
  username: z.string().min(3).max(50),
});

export const formForgetPasswordNewCredentialsSchema = z.object({
  password: z.string().min(8).max(50),
  confirmPassword: z.string().min(8).max(50),
});
