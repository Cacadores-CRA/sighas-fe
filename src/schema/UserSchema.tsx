import { z } from 'zod';

// Função para validar CPF (como na solução anterior)
function isValidCPF(cpf: string): boolean {
  const cleanedCPF = cpf.replace(/\D/g, '');
  if (cleanedCPF.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleanedCPF)) return false;
  const calculateDigit = (factor: number) =>
    [...cleanedCPF]
      .slice(0, factor - 1)
      .reduce((sum, num, index) => sum + parseInt(num) * (factor - index), 0) %
    11;
  const firstDigit = calculateDigit(10);
  const secondDigit = calculateDigit(11);
  return (
    parseInt(cleanedCPF[9]) === (firstDigit < 2 ? 0 : 11 - firstDigit) &&
    parseInt(cleanedCPF[10]) === (secondDigit < 2 ? 0 : 11 - secondDigit)
  );
}

export const userSchema = z.object({
  cpf: z
    .string()
    .regex(/^[\d.-]+$/, {
      message: 'O CPF deve conter apenas números, pontos e traços.',
    })
    .refine((cpf) => isValidCPF(cpf), {
      message: 'O CPF fornecido é inválido.',
    }),
  name: z
    .string()
    .min(2, { message: 'O nome deve conter no mínimo 2 caracteres.' })
    .max(50, { message: 'O nome deve conter no máximo 50 caracteres.' }),
  surname: z
    .string()
    .min(2, { message: 'O sobrenome deve conter no mínimo 2 caracteres.' })
    .max(50, { message: 'O sobrenome deve conter no máximo 50 caracteres.' }),
  birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'A data de nascimento deve estar no formato YYYY-MM-DD.',
  }),
  email: z.string().email({ message: 'O e-mail deve ser válido.' }),
  username: z
    .string()
    .min(3, {
      message: 'O nome de usuário deve conter no mínimo 3 caracteres.',
    })
    .max(30, {
      message: 'O nome de usuário deve conter no máximo 30 caracteres.',
    }),
  password: z
    .string()
    .min(8, { message: 'A senha deve conter no mínimo 8 caracteres.' }),
  roles: z
    .array(
      z.enum(['ADMIN', 'USER'], {
        errorMap: () => ({ message: 'O papel deve ser "ADMIN" ou "USER".' }),
      })
    )
    .min(1, { message: 'Pelo menos um papel deve ser atribuído ao usuário.' }),
});

export type UserFormData = z.infer<typeof userSchema>;
