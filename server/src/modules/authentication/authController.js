import UserService from '../users/service';
import AuthService from './authService';
import TokenService from './tokenService';
import model from '../../models';
import Joi from '../../utils/pjoi';
import { LoginParams, RegisterParams, ResetPasswordParams, ForgotPasswordParams } from './validation';
import { ItemConflictError, BadRequestError, ItemNotFoundError, ValidationError } from '../../utils/errors';
import { AuthorizationError } from './errors';
import config from '../../configs';

class AuthController {
  login(_, args, ctx) {
    try {
      return new Promise((resolve, reject) => {
        const loginData = args;
        let user;
        Joi.validate(args, LoginParams)
          .then(validParams => {       
            console.log('username pas: ', loginData);     
            return UserService.getUserByUsername(loginData.username);
          })
          .then(u => {
            if(!u) {
              console.log('login not found user!');
              throw new AuthorizationError('Wrong username or password!');
            }
            user = u;
            // return u.isValidPassword(loginData.password)
            return u.password === loginData.password
          })
          .then(isValid => {
            if (!isValid) {
              console.log('login passwor not match');
              throw new AuthorizationError('Wrong username or password!');
            }
            const jwtData = {
              id: user.id,
              username: user.username,
              role: user.role
            };
            return AuthService.generateToken(jwtData);
          })
          .then(jwtToken => {
            console.log('generate token success');
            resolve({
              authToken: jwtToken
            });
          })
          .catch(err => {
            reject(err);
          });
      })
    } catch(err) {
      reject(err);
    }
  };

  ownerLogin(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const query = {
          where: {
            role: 'owner'
          }
        }
        return UserService.getUserByQuery(query)
          .then(owners => {
            const owner = owners[0];
            if (!owner) {
              return reject('Not found!');
            }

            if (owner.code === args.code) {
              const jwtData = {
                id: owner.id,
                username: owner.username,
                role: owner.role
              };
              return AuthService.generateToken(jwtData);
            } else {
              return null;
            }
          })
          .then(jwtToken => {
            if (!jwtToken) {
              return reject(new Error('Something went wrong!'));
            }
            return resolve({
              authToken: jwtToken
            });
          })
          .catch(err => {
            return reject(err);
          })
      } catch(err) {
        return reject(err);
      }
    });
  }

  logout(_, args, ctx) {
    try {
      const auth_token = req.body.auth_token || req.query.auth_token || req.headers['x-auth-token'];
      if(!auth_token) {
        throw new BadRequestError('Missing access token!');
      }
      TokenService.removeToken(auth_token)
        .then(result => {
          res.json({
            success: true
          });
        })
        .catch(err => {
          next(err);
        });
    } catch(err) {
      next(err);
    }
  };
}

export default new AuthController();
