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
  register(req, res, next) {
    try {
      let user;
      const params = req.body;
      Joi.validate(params, RegisterParams)
        .then(validParams => {
          // Check email existed
          return UserService.getUserByEmail(params.email)
        })
        .then(existedUser => {
          if(existedUser) {
            throw new ItemConflictError('Email existed!');
          }
          return UserService.createUser(params)
        })
        .then(u => {
          user = u;
          const jwtData = {
            id: u.id,
            email: u.email
          };
          return AuthService.generateToken(jwtData);
        })
        .then(jwtToken => {
          const mailTemplateParams = {
            user,
            verfiyAccountUrl: `${config.WEB_DOMAIN}/verify-account?token=${jwtToken}`
          }
          let mailTpl = getConfirmationEmailTemplate(mailTemplateParams);
          mailTpl.toUser = [user.email];
          const emailOpts = MailService.initMailOptions(mailTpl);
          return MailService.sendEmail(emailOpts);
        })
        .then(resulte => {
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

  login(args) {
    try {
      return new Promise((resolve, reject) => {
        const loginData = args;
        let user;
        Joi.validate(args, LoginParams)
          .then(validParams => {
            return UserService.getUserByUsername(loginData.username);
          })
          .then(u => {
            if(!u) {
              throw new AuthorizationError('Wrong username or password!');
            }
            user = u;
            // return u.isValidPassword(loginData.password)
            return u.password === loginData.password
          })
          .then(isValid => {
            if (!isValid) {
              throw new AuthorizationError('Wrong username or password!');
            }
            const jwtData = {
              id: user.id,
              email: user.email
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

  ownerLogin(args) {
    return new Promise((reolve, reject) => {
      try {
        const query = {
          where: {
            role: 'owner'
          }
        }
        return UserService.getUserByQuery(query)
          .then(owners => {
            const owner = owners[0]
            if (!owners || !owner) {
              return reject('Not found!');
            }

            if (owner.code === args.code) {
              const jwtData = {
                id: user.id,
                email: user.email
              };
              return AuthService.generateToken(jwtData);
            } else {
              return null;
            }
          })
          .then(jwtToken => {
            console.log('generate token success');
            resolve({
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

  logout(req, res, next) {
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
