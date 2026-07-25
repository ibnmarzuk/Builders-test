import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { DB } from '../store.js';

const JWT_SECRET = process.env.JWT_SECRET || 'builders_build_jwt_secret_key_2026_super_secure';

export interface AuthRequest extends Request {
  user?: any;
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required. No token provided.' });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin permissions required.' });
  }
  next();
}

export function generateToken(user: { _id: string; email: string; name: string; role: string }) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}
