import models from '../../models';
// import { createUserSchema } from './validation';
// import Joi from '../../utils/pjoi';
import { ItemNotFoundError } from'../../utils/errors';
const Product = models.Product;

class ProductService {
  getProductsByQuery(query) {
    return new promise((resolve, reject) => {
      Product.findAll(query)
        .then(prods => {
          return resolve(prods);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  createProduct(params) {
    return new Promise((resolve, reject) => {
      return Product.create(params)
        .then(prod => {
          return resolve(prod);
        })
        .catch(err => {
          return reject(err);
        })
    });
  }
}

export default new ProductService();