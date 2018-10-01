import OrderService from '../orders/service';
import models from '../../models';
const Notification = models.Notification;

class NotificationService {
  createNotification(params) {
    return new Promise((resolve, reject) => {
      return Notification.create(params)
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  getNotificationsByQuery(query) {
    return new Promise((resolve, reject) => {
      return Notification.findAll(query)
        .then(results => {
          return resolve(results)
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  styledNotificationResponse(notification) {
    let result = { ...notification.toJSON() };
    result.order = OrderService.styledOrder(result.order);
    return result;
  }
}

export default new NotificationService();