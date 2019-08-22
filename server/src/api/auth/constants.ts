export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY || 'secretKey',
  expiresIn: Number(process.env.JWT_EXPIRES) || 3600,
};

export const googleClient = {
  clientID: process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_CLIENT_SECRET',
};
