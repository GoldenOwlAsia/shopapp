import OrderService from './service';
import models from '../../models';
import AuthService from '../authentication/authService';;

export default {
  getOrder: (_, args, ctx) => {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  },
  createOrder: (_, args, ctx) => {
    return new Promise((resolve, reject) => {
      const curUser = AuthService.getCurrentUserFromContext(ctx);
      const { items, customerId, subTotal, tax, grandTotal } = args;
      const createdBy = curUser.id;
      const params = { items, customerId, subTotal, tax, grandTotal, createdBy };
      OrderService.createOrder(params)
        .then(newOrder => {
          const query = {
            where: {id: newOrder.id},
            include: [{
              model: models.User,
              as: 'createdByStaff'
            },{
              model: models.Customer,
              as: 'customer'
            }]
          };
          return OrderService.getOrderByQuery(query);
        })
        .then(result => {
          return resolve(OrderService.styledOrder(result[0].toJSON()));
        })
        .catch(err => {
          console.log('the error: ', err);
          return reject(err);
        });
    });
  }
}