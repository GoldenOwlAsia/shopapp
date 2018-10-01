import EventEmitter from 'events';
import NotificationService from './service';
import { resolve } from 'url';
import { rejects } from 'assert';

class NotificationEvent extends EventEmitter {};

const notificationEvent = new NotificationEvent();

notificationEvent.on('createNotification', function(params) {
  console.log('start create notification event');
  return NotificationService.createNotification({ ...params })
    .then(result => {
      return resolve(result);
    })
    .catch(err => {
      return rejects(err);
    });
});



export default notificationEvent;