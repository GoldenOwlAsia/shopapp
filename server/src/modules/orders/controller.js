import OrderService from './service';
import models from '../../models';
import AuthService from '../authentication/authService';
import ProductService from '../products/service';
import { ItemNotFoundError } from '../../utils/errors';

class OrderController {
  getOrder(_, args, ctx) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
  createOrder(_, args, ctx) {
    return new Promise((resolve, reject) => {
      const curUser = AuthService.getCurrentUserFromContext(ctx);
      const { items, customerId, subTotal, tax, grandTotal } = args;
      const createdBy = curUser.id;
      const params = { items, customerId, subTotal, tax, grandTotal, createdBy };
      const productIds = items.map(orderItem => orderItem.id);
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