const products = [
  {
    id: 1,
    name: 'Prod1',
    category: 'abc',
    price: 3500000,
    image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
    status: 'Available',
  },
  {
    id: 2,
    name: 'Prod2',
    category: 'abc',
    price: 7000000,
    image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
    status: 'Available',
  },
  {
    id: 3,
    name: 'Prod3',
    category: 'xyz',
    price: 1500000,
    image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
    status: 'Available',
  },
  {
    id: 4,
    name: 'Prod4',
    category: 'abc',
    price: 500000,
    image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
    status: 'Available',
  },
  {
    id: 5,
    name: 'Prod5',
    category: 'xyz',
    price: 5000000,
    image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
    status: 'Available',
  },
  {
    id: 6,
    name: 'Prod6',
    category: 'xyz',
    price: 9000000,
    image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
    status: 'Available',
  },
  {
    id: 7,
    name: 'Prod7',
    category: 'xyz',
    price: 11500000,
    image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
    status: 'Available',
  }
];

import AuthService from '../authentication/authService';
import { ROLES } from '../../utils/constant';
import ProductService from './service';

class ProductController {
  getProducts(_, args, ctx) {
    return products;
  };

  createProduct(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const curUser = AuthService.getCurrentUserFromContext(ctx);
        if (curUser.role !== ROLES.OWNER) {
          throw new Error('Not Authorize!');
        }

        return ProductService.createProduct(args)
          .then(prod => {
            return resolve(prod);
          })
          .catch(err => {
            return reject(err);
          });
      } catch(err) {
        return reject(err);
      }
    });
  }
}

export default new ProductController();