import jwt from 'jsonwebtoken';
import config from '../../configs';
import moment from 'moment';
import TokenService from './tokenService';
import { AuthorizationError } from './errors';

class AuthService {
  generateToken(jwtData) {
    return new Promise((resolve, reject) => {
      let expiredAt = moment();
      expiredAt.add(365, 'd');
      jwtData.expiredAt = expiredAt;
      const jwtToken = jwt.sign({
        data: JSON.stringify(jwtData)
      }, 
      config.token.secretKey,
      {
        expiresIn: '365d'
      });
      
      const newToken = {
        userId: jwtData.id,
        expiredAt: expiredAt.toISOString(),
        token: jwtToken
      };
      
      TokenService.createToken(newToken)
        .then(token => {
          resolve(jwtToken);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  getCurrentUserFromContext(ctx) {
    if (ctx.user) {
      return ctx.user;
    } else {
      throw new AuthorizationError();
    }
  }
};

export default new AuthService();
