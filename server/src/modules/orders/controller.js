import OrderService from './service';
import models from '../../models';
import AuthService from '../authentication/authService';
import ProductService from '../products/service';
import { ItemNotFoundError } from '../../utils/errors';
import reportEmitter from '../report/events';
import notificationEmiiter from '../notifications/events';
import userEmitter from '../users/events';
import moment from 'moment';

class OrderController {
  getOrder(_, args, ctx) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
  createOrder(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const curUser = AuthService.getCurrentUserFromContext(ctx);
        const { items, customerId, subTotal, tax, grandTotal } = args;
        const createdBy = curUser.id;
        const params = { items, customerId, subTotal, tax, grandTotal, createdBy };
        const productIds = items.map(orderItem => orderItem.id);
        let totalSoldProducts = 0;
        return _getProductsByOrderItems(productIds)
          .then(prods => {
            if (!prods.length || prods.length !== items.length) {
              throw new Error('Bad request!');
            }
            prods = prods.map((prod, index) => {
              const orderItem = items.find(item => item.id === prod.id);
              const remainingQuantity = prod.quantity - orderItem.quantity;
              if (remainingQuantity < 0) {
                throw new Error(`Can not checkout. ${prod.name} has been sold out.`);
              }
              prod.quantity = remainingQuantity;
              totalSoldProducts += orderItem.quantity;
              return prod;
            });

            const updateProductPromises = prods.map(prod => {
              return prod.update({quantity: prod.quantity});
            });

            return Promise.all(updateProductPromises);
          })
          .then(updatedProds => {
            return OrderService.createOrder(params)
          })
          .then(newOrder => {
            userEmitter.emit('updateUserRevenue', curUser.id, totalSoldProducts, newOrder.grandTotal);
            reportEmitter.emit('updateRevenue', moment().toISOString(), grandTotal);
            notificationEmiiter.emit('createNotification', { createdBy, customerId, type: 'New Order', orderId: newOrder.id, content: ' vừa bán sản phẩm cho khách hàng ' });
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
          .then(orders => {
            return resolve(OrderService.styledOrder(orders[0].toJSON()));
          })
          .catch(err => {
            return reject(err);
          });
      } catch(err) {
        console.log('create order err: ', err);
        return reject(err);
      }
    });
  }
  getRecentOrders(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const query = {
          include: [{
            model: models.User,
            as: 'createdByStaff'
          },{
            model: models.Customer,
            as: 'customer'
          }],
          limit: 5,
          order: [['updatedAt', 'DESC']],
        }

        return OrderService.getOrderByQuery(query)
          .then(orders => {
            return resolve(orders.map(o => OrderService.styledOrder(o.toJSON())));
          })
          .catch(err => {
            return reject(err);
          })
      } catch(err) {
        return reject(err);
      }
    });
  }
}

function _getProductsByOrderItems(productIds) {
  return new Promise((resolve, rejecct) => {
    const query = {
      where: {
        id: { $in: productIds }
      }
    }
    return ProductService.getProductsByQuery(query)
      .then(prods => {
        return resolve(prods);
      })
      .catch(err => {
        return reject(err);
      })
  });
}

export default new OrderController();