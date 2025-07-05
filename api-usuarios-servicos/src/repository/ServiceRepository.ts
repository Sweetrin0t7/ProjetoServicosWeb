import { prisma } from '../utils/prisma';

export class ServiceRepository {
  async create(data: { nome: string; descricao: string; usuarioId: number }) {
    return prisma.servico.create({ data });
  }

  async findByUserId(usuarioId: number) {
    return prisma.servico.findMany({ where: { usuarioId } });
  }

  async findById(id: number) {
    return prisma.servico.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<{ nome: string; descricao: string }>) {
    return prisma.servico.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.servico.delete({ where: { id } });
  }
}
