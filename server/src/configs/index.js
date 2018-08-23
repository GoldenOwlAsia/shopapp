import _ from 'lodash';

const common = {
  apiKey: process.env.API_KEY || '12345678',
  token: {
    secretKey: process.env.TOKEN_SECRET_KEY || 'shop-app-token-secret-key',
    expiredTime: process.env.TOKEN_EXPIRED_TIME || 1
  },
  DOMAIN: process.env.DOMAIN || 'http://localhost:3001',
  nonAuthSecuredPaths: [
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/forgot-password',
    '/api/auth/refresh-token',
  ],
  PAGINATION: {
    ITEMS_PER_PAGE: JSON.parse(process.env.ITEMS_PER_PAGE || 10),
  }
};

let config = _.merge(common, require('./env/' + process.env.NODE_ENV + '.js') || {});
console.log('the config: ', config);
module.exports = config;
