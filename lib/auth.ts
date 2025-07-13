import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'your-secret-key'  // Use a strong secret in .env

export const createToken = (payload: object) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
