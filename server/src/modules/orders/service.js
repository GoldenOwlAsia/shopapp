require('module-alias/register')
import sequelize from 'sequelize';
import models from '../../models';
const Order = models.Order;

class OrderService {
  createOrder(newOrder) {
    return new Promise((resolve, reject) => {
      Order.create(newOrder)
        .then(createdOrder => {
          resolve(createdOrder);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getOrderByQuery(query) {
    return new Promise((resolve, reject) => {
      return Order.findAll(query)
        .then(results => {
          resolve(results);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default new OrderService();