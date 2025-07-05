
import { z } from 'zod';
import { prisma } from '../utils/prisma';


export class ServiceService {
  // cria novo serviço vinculado ao usuário logado
  async create(data: any, userId: number) {
    const schema = z.object({
      nome: z.string().min(2),
      descricao: z.string().min(5),
    });

    const { nome, descricao } = schema.parse(data);

    return await prisma.servico.create({
      data: {
        nome,
        descricao,
        usuarioId: userId,
      },
    });
  }

  // Lista serviços do usuário logado
  async listByUser(userId: number) {
    return await prisma.servico.findMany({
      where: { usuarioId: userId },
    });
  }

  // Aatualiza serviço se for do usuário
  async update(id: number, data: any, userId: number) {
    const servico = await prisma.servico.findUnique({ where: { id } });
    if (!servico || servico.usuarioId !== userId)
      throw new Error('Serviço não encontrado ou acesso negado');

    const schema = z.object({
      nome: z.string().min(2).optional(),
      descricao: z.string().min(5).optional(),
    });

    const updateData = schema.parse(data);

    return await prisma.servico.update({
      where: { id },
      data: updateData,
    });
  }

  //remove serviço se for do usuário
  async delete(id: number, userId: number) {
    const servico = await prisma.servico.findUnique({ where: { id } });
    if (!servico || servico.usuarioId !== userId)
      throw new Error('Serviço não encontrado ou acesso negado');

    await prisma.servico.delete({ where: { id } });
  }
}
