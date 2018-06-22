import { config as env } from 'dotenv';
import { JWTOptions } from 'google-auth-library/build/src/auth/jwtclient';

env();

const jwtGtm: JWTOptions = {
  email: process.env.JWT_CLIENT_EMAIL,
  key: process.env.JWT_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/tagmanager.readonly']
};

export default {
  JWT: {
    gtm: jwtGtm
  }
};
