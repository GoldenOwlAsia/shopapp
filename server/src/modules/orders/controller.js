import OrderService from './service';
import models from '../../models';

export default {
  getOrder: () => {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  },
  createOrder: (args) => {
    return new Promise((resolve, reject) => {
      const { items, customerId, subTotal, tax, grandTotal, createdBy } = args;
      const params = { items, customerId, subTotal, tax, grandTotal, createdBy };
      console.log('params: ', args);

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