export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY || 'secretKey',
  expiresIn: Number(process.env.JWT_EXPIRES) || 3600,
};
