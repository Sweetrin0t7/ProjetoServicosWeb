import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { sub: string; role: string };

    req.userId = Number(decoded.sub);
    req.userRole = decoded.role;

    next();
  } catch {
    res.status(401).json({ message: 'Token inválido.' });
    return;
  }
}
