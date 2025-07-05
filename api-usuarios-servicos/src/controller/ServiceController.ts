import { Request, Response } from 'express';
import { ServiceService } from '../service/ServiceService';

export class ServiceController {
  private service = new ServiceService();

  // Cria um novo serviço associado ao usuário logado
  create = async (req: Request, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    try {
      const service = await this.service.create(req.body, req.userId);
      return res.status(201).json(service);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  // Lista os serviços do usuário autenticado
  listMyServices = async (req: Request, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    try {
      const services = await this.service.listByUser(req.userId);
      return res.json(services);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  // Atualiza serviço do usuário
  update = async (req: Request, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    try {
      const updatedService = await this.service.update(Number(req.params.id), req.body, req.userId);
      return res.json(updatedService);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  // Deleta serviço do usuário
  delete = async (req: Request, res: Response) => {
    if (!req.userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    try {
      await this.service.delete(Number(req.params.id), req.userId);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
