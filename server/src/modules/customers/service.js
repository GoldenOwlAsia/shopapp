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
}

export default new CustomerService();