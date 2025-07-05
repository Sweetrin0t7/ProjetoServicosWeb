import { prisma } from '../utils/prisma';

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.usuario.findUnique({ where: { email } });
  }

  async create(data: { nome: string; email: string; senha: string }) {
    return prisma.usuario.create({
      data,
      select: { id: true, nome: true, email: true },
    });
  }

  async listAll() {
    return prisma.usuario.findMany({
      select: { id: true, nome: true, email: true, role: true },
    });
  }

  async findById(id: number) {
    return prisma.usuario.findUnique({ where: { id } });
  }

  async delete(id: number) {
    return prisma.usuario.delete({ where: { id } });
  }
}
