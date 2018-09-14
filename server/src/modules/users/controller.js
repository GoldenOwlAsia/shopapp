import UserService from './service';
import Joi from '../../utils/pjoi';
import { ChangePasswordRequest, ChangeEmailRequest } from './validation';
import { ValidationError, BadRequestError, ItemNotFoundError, ItemConflictError } from '../../utils/errors';
import AuthService from '../authentication/authService';
import configs from '../../configs';
import { resolve } from 'dns';

class UserController {
  createUser(args) {
    return new Promise((resolve, reject) => {
      try {
        UserService.createUser({ ...args, role: 'staff' })
          .then(user => {
            resolve(UserService.styleUserResponse(user));
          })
          .catch(err => {
            reject(err);
          });
      }
      catch(err) {
        reject(err);
      }
    });
  };

  createOwner(args) {
    return new Promise((resolve, reject) => {
      try {
        UserService.createUser({ ...args, role: 'owner' })
          .then(user => {
            resolve(UserService.styleUserResponse(user));
          })
          .catch(err => {
            reject(err);
          });
      } catch(err) {
        reject(err);
      }
    });
  }

  getCurrentUser(args) {
    return new Promise((resolve, reject) => {
      try {
        return UserService.getUserById(args.id)
          .then(user => {
            return resolve(UserService.styleUserResponse(user));
          })
          .catch(err => {
            return reject(err);
          });
      }
      catch(err) {
       return reject(err);
      }
    });
  }

  getUserById(req, res, next) {
    try {
      UserService.getUserById(req.params.id)
        .then(user => {
          res.json({
            user: UserService.styleUserResponse(user)
          });
        })
        .catch(err => {
          next(err);
        });
    } catch(err) {
      next(err);
    }
  };

  updateCurrentUser(req, res, next) {
    try {
      const params = req.body;
      const curUser = req.user;
      UserService.updateUserById(curUser.id, params)
        .then(user => {
          res.json({
            user: UserService.styleUserResponse(user)
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

export default new UserController();
