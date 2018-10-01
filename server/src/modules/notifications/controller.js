import moment from 'moment';
import models from '../../models';
import AuthService from '../authentication/authService';
import { ROLES } from '../../utils/constant';
import { AuthorizationError } from '../authentication/errors';
import NotificationService from './service';

class NotificationController {
  getNotifications(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const curUser = AuthService.getCurrentUserFromContext(ctx);
        if(curUser.role !== ROLES.OWNER) {
          throw new AuthorizationError();
        }
        const query = {
          include: [{
            model: models.User,
            as: 'createdByStaff'
          },{
            model: models.Customer,
            as: 'customer'
          }]
        }
        return NotificationService.getNotificationsByQuery(query)
          .then(results => {
            return resolve(results);
          })
          .catch(err => {
            return reject(err);
          })
      } catch(err) {
        return reject(err);
      };
    });
  }
}

export default new NotificationController();