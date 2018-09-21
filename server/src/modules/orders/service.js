require('module-alias/register')
import sequelize from 'sequelize';
import models from '../../models';
const Order = models.Order;

class OrderService {
  createOrder(newOrder) {
    return new Promise((resolve, reject) => {
      let { items } = newOrder;
      if (typeof items !== 'string') {
        items = JSON.stringify(items);
      }

      Order.create({ ...newOrder, items })
        .then(createdOrder => {
          resolve(createdOrder);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getOrderById(orderId) {
    return new Promise((resolve, reject) => {
      return Order.findOne({
        where: {
          id: orderId
        }
      })
        .then(order => {
          return resolve(order);
        })
        .catch(err => {
          return reject(err);
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

  styledOrder(order) {
    let items = order.items;
    if (typeof items === 'string') {
      items = JSON.parse(items);
    }
    return {
      ...order,
      items: items
    };
  }
}

export default new OrderService();