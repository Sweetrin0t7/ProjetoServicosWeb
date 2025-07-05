import { Request, Response } from 'express';
import { UserService } from '../service/UserService';

export class UserController {
  private service = new UserService();

  register = async (req: Request, res: Response) => {
    try {
      const user = await this.service.register(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const token = await this.service.login(req.body);
      return res.json(token);
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  };

  list = async (req: Request, res: Response) => {
    try {
      const users = await this.service.list();
      return res.json(users);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const user = await this.service.findById(Number(req.params.id));
      return res.json(user);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await this.service.delete(Number(req.params.id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
}
