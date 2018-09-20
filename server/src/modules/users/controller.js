import UserService from './service';
import AuthService from '../authentication/authService';
import { ROLES } from '../../utils/constant';
import { AuthorizationError } from '../authentication/errors';
import ImageHelper from '../imageHelper';
import { ItemNotFoundError } from '../../utils/errors';

class UserController {
  createUser(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const curUser = AuthService.getCurrentUserFromContext(ctx);
        if (curUser.role !== ROLES.OWNER) {
          throw new AuthorizationError();
        }
        
        if (args.avatar) {
          const params = { ...args };  
          return _createAvatarFile(args.avatar)
            .then(avatarUrl => {
              params.avatar = avatarUrl;
              return UserService.createUser({...params, role: ROLES.STAFF});
            })
            .then(user => {
              resolve(UserService.styleUserResponse(user));
            })
            .catch(err => {
              return reject(err);
            });
        } else {
          return UserService.createUser({ ...args, role: ROLES.STAFF })
            .then(user => {
              return resolve(UserService.styleUserResponse(user));
            })
            .catch(err => {
              return reject(err);
            });
        }
      }
      catch(err) {
        reject(err);
      }
    });
  };

  createOwner(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        UserService.createUser({ ...args, role: ROLES.OWNER })
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

  getUserById(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const curUser = AuthService.getCurrentUserFromContext(ctx);
        const { userId } = args;
        if (curUser.id === userId || curUser.role === ROLES.OWNER) {
          UserService.getUserById(userId)
            .then(user => {
              if (!user) {
                return reject(new ItemNotFoundError('Not found user!'));
              }
              return resolve(UserService.styleUserResponse(user));
            })
            .catch(err => {
              return reject(err);
            });
        } else {
          throw new AuthorizationError();
        }
      } catch(err) {
        return reject(err);
      }
    });
  };

  updateUserById(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const curUser = AuthService.getCurrentUserFromContext(ctx);
        if (curUser.id !== args.userId && curUser.role !== ROLES.OWNER) {
          throw new AuthorizationError();
        }
        const { userId, params } = args;
        if (params.avatar) {  
          return _createAvatarFile(args.avatar)
            .then(avatarUrl => {
              params.avatar = avatarUrl;
              return UserService.createUser({...params, role: ROLES.STAFF});
            })
            .then(avatarUrl => {
              params.avatar = avatarUrl;
              return UserService.updateUserById(userId, params)
            })
            .then(updatedUser => {
              return resolve(UserService.styleUserResponse(updatedUser));
            })
            .catch(err => {
              return reject(err);
            })
        } else {
          UserService.updateUserById(userId, params)
            .then(user => {
              return resolve(UserService.styleUserResponse(user));
            })
            .catch(err => {
              return reject(err);
            });
        }
      } catch(err) {
        return reject(err);
      }
    });
  };

  getStaffs(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const curUser = AuthService.getCurrentUserFromContext(ctx);
        if (curUser.role !== ROLES.OWNER) {
          throw new AuthorizationError();
        }

        const query = {
          where: {
            role: ROLES.STAFF
          }
        };

        return UserService.getUserByQuery(query)
          .then(staffs => {
            return resolve(staffs);
          })
          .catch(err => {
            return reject(err);
          });
      } catch(err) {
        return reject(err);
      }
    });
  }
}

function _createAvatarFile(base64Content) {
  return new Promise((resolve, reject) => {
    try {
      const avatarUrl = UserService.generateAvatarUrl();
      const base64Data = ImageHelper.parseBase64(base64Content);
      return ImageHelper.createImageFromBase64(avatarUrl, base64Data)
        .then(isSuccess => {
          if (!isSuccess) {
            return reject(new Error('Create avatar fail!'));
          }
          return resolve(avatarUrl);
        })
        .catch(err => {
          return reject(err);
        })
    } catch(err) {
      return reject(err);
    }
  });
}

export default new UserController();
