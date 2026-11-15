import jwt from 'jsonwebtoken';
import { db } from '../db.js';

export const requireAdminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Authentication token is required.' });
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET || 'campital_dev_jwt_secret_998877665544332211';
    
    const decoded = jwt.verify(token, jwtSecret);
    const user = await db.adminUsers.findById(decoded.id);

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Unauthorized: Admin user account is inactive or not found.' });
    }

    req.adminUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token.' });
  }
};

