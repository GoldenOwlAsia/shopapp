import models from '../../models';
import { createUserSchema } from './validation';
import Joi from '../../utils/pjoi';
import { ItemNotFoundError } from '../../utils/errors';
import uuidv1 from 'uuid/v1';
const User = models.User;

class UserService {
  createUser(params) {
    return new Promise((resolve, reject) => {
      Joi.validate(params, createUserSchema)
        .then(params => {
          console.log('create params: ', params);
          return User.create(params);
        })
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          console.log('create user error: ', err);
          reject(err);
        });
    });
  };

  getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {username: username}
      })
        .then(u => {
          return resolve(u);
        })
        .catch(err => {
          return reject(err);
        })
    })
  }

  getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {email: email}
      })
        .then(u => {
          resolve(u);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  getUserById(id) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {id: id}
      })
        .then(u => {
          return resolve(u);
        })
        .catch(err => {
          return reject(err);
        });
    });
  };

  getUserByQuery(query) {
    return new Promise((resolve, reject) => {
      return User.findAll(query)
        .then(users => {
          return resolve(users);
        })
        .catch(err => {
          return reject(err);
        });
    });
  };

  updateUserById(id, params) {
    return new Promise((resolve, reject) => {
      User.findOne({where: {id: id}})
        .then(u => {
          if(!u) {
            return reject(new ItemNotFoundError());
          }

          return u.update(params);
        })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  generateAvatarUrl() {
    return uuidv1();
  }
  
  styleUserResponse(user) {
    let result = user.toJSON();
    delete result.password;
    return result;
  };
}

export default new UserService();
