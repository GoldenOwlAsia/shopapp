import EventEmitter from 'events';
import UserService from './service';
import { resolve } from 'dns';

class UserEvent extends EventEmitter {};

const userEvent = new UserEvent();

userEvent.on('updateUserRevenue', function(userId, products, revenue) {
  console.log('start update user revenue!');
  UserService.getUserById(userId)
    .then(u => {
      if(!u) {
        console.log('Not found user!');
        return reject(null);
      } else {
        const totalRevenue = u.revenue + revenue;
        const soldProducts = u.soldProducts + products;
        return u.update({ revenue: totalRevenue, soldProducts: soldProducts });
      }
    })
    .then(result => {
      console.log('update user revenue event success');
    })
    .catch(err => {
      console.log('update user revenue event');  
      console.log('error: ', err);
    });
});

export default userEvent;