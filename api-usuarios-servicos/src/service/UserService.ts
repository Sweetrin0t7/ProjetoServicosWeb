import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { registerSchema } from '../validators/UserValidator';

export class UserService {
  // cria um novo usuário apos validar os dados com Zod
  async register(data: any) {
    const { nome, email, senha } = registerSchema.parse(data);

    const existing = await prisma.usuario.findUnique({ where: { email } });
    if (existing) throw new Error('E-mail já cadastrado.');

    const hashed = await hash(senha, 10);

    const user = await prisma.usuario.create({
      data: { nome, email, senha: hashed },
      select: { id: true, nome: true, email: true },
    });

    return user;
  }

  // realiza autenticação e retorna token JWT
  async login(data: any) {
    const schema = z.object({
      email: z.string().email(),
      senha: z.string(),
    });

    const { email, senha } = schema.parse(data);

    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) throw new Error('Credenciais inválidas');

    const valid = await compare(senha, user.senha);
    if (!valid) throw new Error('Credenciais inválidas');

    const token = sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' },
    );

    return { token };
  }

  // lista todos os usuários (admin)
  async list() {
    return await prisma.usuario.findMany({
      select: { id: true, nome: true, email: true, role: true },
    });
  }

  //busca usuário pelo ID (admin)
  async findById(id: number) {
    const user = await prisma.usuario.findUnique({ where: { id } });
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  }

  // Deleta usuário pelo ID (admin)
  async delete(id: number) {
    await prisma.usuario.delete({ where: { id } });
  }
}
