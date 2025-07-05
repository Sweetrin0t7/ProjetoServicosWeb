import { z } from 'zod';

export const registerSchema = z.object({
  nome: z.string().min(6, 'Nome deve ter pelo menos 6 caracteres'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});
