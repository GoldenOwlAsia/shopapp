require('module-alias/register')
import sequelize from 'sequelize';
import models from '../../models';
const Customer = models.Customer;

class CustomerService {
  createCustomer(newCustomer) {
    return new Promise((resolve, reject) => {
      Customer.create(newCustomer)
        .then(c => {
          resolve(c);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateById(id, params) {
    return new Promise((resolve, reject) => {
      Customer.findOne({
        where: {id: id}
      })
        .then(customer => {
          if (!customer) {
            return reject(new Error('Not found'));
          }
          return customer.update(params);
        })
        .then(updatedCustomer => {
          return resolve(updatedCustomer);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
}

export default new CustomerService();