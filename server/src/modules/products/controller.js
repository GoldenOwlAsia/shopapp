// const products = [
//   {
//     id: 1,
//     name: 'Prod1',
//     category: 'abc',
//     price: 3500000,
//     image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
//     status: 'Available',
//   },
//   {
//     id: 2,
//     name: 'Prod2',
//     category: 'abc',
//     price: 7000000,
//     image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
//     status: 'Available',
//   },
//   {
//     id: 3,
//     name: 'Prod3',
//     category: 'xyz',
//     price: 1500000,
//     image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
//     status: 'Available',
//   },
//   {
//     id: 4,
//     name: 'Prod4',
//     category: 'abc',
//     price: 500000,
//     image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
//     status: 'Available',
//   },
//   {
//     id: 5,
//     name: 'Prod5',
//     category: 'xyz',
//     price: 5000000,
//     image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
//     status: 'Available',
//   },
//   {
//     id: 6,
//     name: 'Prod6',
//     category: 'xyz',
//     price: 9000000,
//     image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
//     status: 'Available',
//   },
//   {
//     id: 7,
//     name: 'Prod7',
//     category: 'xyz',
//     price: 11500000,
//     image: 'http://www.gravityimprint.com/images/large/nike%20shoes%20for%20men-436oip.jpg',
//     status: 'Available',
//   }
// ];

import AuthService from '../authentication/authService';
import { ROLES } from '../../utils/constant';
import ProductService from './service';
import { AuthorizationError } from '../authentication/errors';
import ImageHelper from '../imageHelper';
import { ItemNotFoundError } from '../../utils/errors';

class ProductController {
  getProducts(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const curUser = AuthService.getCurrentUserFromContext(ctx);
        return ProductService.getProducts()
          .then(prods => {
            const results = prods.map(prod => ProductService.styleProductResponse(prod));
            return resolve(results);
          })
          .catch(err => {
            return reject(err);
          })
      } catch(err) {
        return reject(err);
      }
    });
    // return products;
  };

  createProduct(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const curUser = AuthService.getCurrentUserFromContext(ctx);
        if (curUser.role !== ROLES.OWNER) {
          throw new AuthorizationError();
        }

        const params = { ...args };
        const { images } = params;

        if (images && images.length) {
          return _createProductImages(images)
            .then(imageUrls => {
              params.images = JSON.stringify([ ...imageUrls ]);
              return ProductService.createProduct(params)
                .then(prod => {
                  return resolve(ProductService.styleProductResponse(prod));
                })
                .catch(err => {
                  return reject(err);
                });
            })
            .catch(err => reject(err));
        } else {
          if (images) {
            params.images = JSON.stringify(images);
          }

          return ProductService.createProduct(params)
            .then(prod => {
              return resolve(ProductService.styleProductResponse(prod));
            })
            .catch(err => {
              return reject(err);
            });
        }
      } catch(err) {
        return reject(err);
      }
    });
  }

  getProductById(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const curUser = AuthService.getCurrentUserFromContext(ctx);
        const { productId } = args;
        return ProductService.getProductById(productId)
          .then(prod => {
            return resolve(ProductService.styleProductResponse(prod));
          })
          .catch(err => {
            return reject(err);
          })
      } catch(err) {
        return reject(err);
      }
    });
  }

  updateProduct(_, args, ctx) {
    return new Promise((resolve, reject) => {
      try {
        const curUser = AuthService.getCurrentUserFromContext(ctx);
        if (curUser.role !== ROLES.OWNER) {
          return new AuthorizationError();
        }

        const { productId, params } = args;
        const { images } = params;
        const [oldImages, newImages] = (images || []).reduce((result, img) => {
          if (ImageHelper.isBase64ImageString(img)) {
            result[1].push(img);
          } else {
            result[0].push(img);
          }
          return result;
        }, [[], []]);

        if ((newImages || []).length) {
          return _createProductImages(newImages)
            .then(imageUrls => {
              const productImgs = [...oldImages, ...imageUrls];
              params.images = JSON.stringify(productImgs);
              return ProductService.getProductById(productId)
            })
            .then(prod => {
              if (!prod) {
                return reject(new ItemNotFoundError('Not found product!'));
              }
              return prod.update(params)
            })
            .then(updatedProduct => {
              return resolve(ProductService.styleProductResponse(updatedProduct));
            })
            .catch(err => reject(err));
        } else {
          return ProductService.getProductById(productId)
            .then(prod => {
              if (!prod) {
                return reject(new ItemNotFoundError('Not found product!'));
              }

              if (images) {
                params.images = JSON.stringify(images);
              }

              return prod.update(params)
            })
            .then(updatedProduct => {
              return resolve(ProductService.styleProductResponse(updatedProduct));
            })
            .catch(err => {
              return reject(err);
            });
        }
      } catch(err) {
        return reject(err);
      }
    })
  }
}

function _createProductImages(images) {
  return new Promise((resolve, reject) => {
    const promises = images.map((image) => _createProductImage(image));
    Promise.all(promises)
      .then(results => {
        return resolve(results);
      })
      .catch(err => {
        return reject(err);
      });
  })
}

function _createProductImage(base64Content) {
  return new Promise((resolve, reject) => {
    try {
      const avatarUrl = ProductService.generateProductUrl();
      const base64Data = ImageHelper.parseBase64(base64Content);
      return ImageHelper.createImageFromBase64(avatarUrl, base64Data)
        .then(isSuccess => {
          if (!isSuccess) {
            return reject(new Error('Create avatar fail!'));
          }
          return resolve(avatarUrl);
        })
        .catch(err => {
          return reject(err);
        })
    } catch(err) {
      return reject(err);
    }
  });
}

export default new ProductController();