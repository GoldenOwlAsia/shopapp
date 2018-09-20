import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { token, apiKey, nonAuthSecuredPaths } from '../configs';
import UserTokenService from '../modules/authentication/tokenService';
import { AuthorizationError } from '../modules/authentication/errors';
import UserService from '../modules/users/service';
import moment from 'moment';

const authenticate = (req, res, next) => {
  try {
    // get api token
    const api_token = (req.body || {}).api_token || req.query.api_token || req.headers['x-access-token'];
    // check api token
    if (_.includes(apiKey, api_token) || true) { // remove true to enable api_key token
      // path with user's authentication is no needed
      if (_.find(nonAuthSecuredPaths, (p) => _.includes(req.path, p))) return next();
      // check user's authentication
      const auth_token = (req.body || {}).auth_token || req.query.auth_token || req.headers['x-auth-token'];
      if (auth_token && auth_token !== 'null') {
        jwt.verify(auth_token, token.secretKey, (err, decoded) => {
          // failed
          if (err) throw new AuthorizationError();
          // Check token is valid
          UserTokenService.getToken(auth_token)
            .then(token => {
              if (!token) {
                console.log('token not found!');
                return next(new AuthorizationError());
              }
              const jwtData = JSON.parse(decoded.data);
              return UserService.getUserById(jwtData.id);
            })
            .then(u => {
              if(!u) {
                return next(new AuthorizationError());
              }
              req.user= u;
              next();
            })
            .catch(err => {
              console.log('auth middleware err: ', err);
              return next(new AuthorizationError());
            });
        });
      } else {
        req.user = null;
        next();
      }
    } else {
      // without api-key
      req.user = null;
      next();
    }
  } catch (err) {
    console.log('Come here?????');
    next(err);
  }
};

export default authenticate;
