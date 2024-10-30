// src/middlewares/authMiddleware.ts
import type { Request, Response, NextFunction } from 'express';

// Extending the Request interface to include userId
declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'chave-secreta';
    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.userId = decoded.id; // Armazena o ID do usuário para uso nas rotas
    next(); // Continua para a próxima função
  } catch (error) {
    res.status(401).json({ error: 'Token inválido.' });
  }
};