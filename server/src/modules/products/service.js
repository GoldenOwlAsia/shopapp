import models from '../../models';
import uuidv1 from 'uuid/v1';
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

  getProducts() {
    return new Promise((resolve, reject) => {
      return Product.findAll()
        .then(prods => {
          return resolve(prods);
        })
        .catch(err => {
          return reject(err);
        });
    })
  }

  getProductById(prodId) {
    return new Promise((resolve, reject) => {
      return Product.findOne({
        where: {
          id: prodId
        }
      })
      .then(prod => {
        return resolve(prod);
      })
      .catch(err => {
        return reject(err);
      });
    })
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

  generateProductUrl() {
    return uuidv1();
  }

  styleProductResponse(product) {
    let result = { ...(product.toJSON()) };
    if (result.images) {
      result.images = JSON.parse(result.images);
    }
    if (result.quantity > 0) {
      result.status = 'Available';
    }

    return result;
  }
}

export default new ProductService();