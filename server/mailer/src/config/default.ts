import path from 'path';
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const customConfig: {
  hostname: string;
  apiPort: number;
  port: number;
  dbUri: string;

  isDebug: boolean;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  redisCacheExpiresIn: number;
  routes: {
    [key: string]: {
      [key: string]: string;
    }
  };

  accessTokenPrivateKey: string;
  accessTokenPublicKey: string;
  refreshTokenPrivateKey: string;
  refreshTokenPublicKey: string;
  emailFrom: string;
  smtp: {
    host: string;
    port: number;
    user: string;
    pass: string;
  };
} = {
  hostname: process.env.HOSTNAME as string,
  apiPort: process.env.API_PORT as number,
  port: process.env.PORT as number,
  dbUri: process.env.DATABASE_URL as string,

  isDebug: process.env.IS_DEBUG as boolean,
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,
  redisCacheExpiresIn: 60,

  
  routes: {
    'auth': {
      'verifyEmail': '/auth/v1/verify-email'
    }
  },

  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY as string,

  emailFrom: process.env.EMAIL_FROM as string,
  smtp: {
    host: process.env.SMTP_HOST as string,
    port: Number(process.env.SMTP_PORT as string),
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
  },
};

export default customConfig;
