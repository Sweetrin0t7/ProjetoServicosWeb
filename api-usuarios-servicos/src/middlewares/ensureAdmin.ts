import { Request, Response, NextFunction } from 'express';

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
  //verifica se a role foi extraída do token no middleware anterior
  if (req.userRole !== 'ADMIN') {
    res.status(403).json({ message: 'Acesso restrito a administradores.' });
    return ;
  }

  return next();
}
