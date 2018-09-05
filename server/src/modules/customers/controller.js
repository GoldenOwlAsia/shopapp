const customers = [
  {
    id: 1,
    name: 'Brian',
    dateOfBirth: '07-08-2001',
    gender: 'M'
  },
  {
    id:2,
    name: 'Kim',
    dateOfBirth: '01-03-1993',
    gender: 'M'
  },
  {
    id:3,
    name: 'Joseph',
    dateOfBirth: '18-5-1991',
    gender: 'M'
  },
  {
    id:3,
    name: 'Faith',
    dateOfBirth: '01-09-1991',
    gender: 'F'
  },
  {
    id:5,
    name: 'Joy',
    dateOfBirth: '16-04-1993',
    gender: 'F'
  }
];

import CustomerService from './service';

export default {
  getCustomers: () => {
    return customers;
  },
  getCustomerById: (args) => {
    return customers.filter(c => c.id === args.id)[0];
  },
  createCustomer: (args) => {
    return new Promise((resolve, reject) => {
      const params = {
        name: args.name,
        // dateOfBirth: args.dateOfBirth,
        // address: args.address,
        phoneNumber: args.phoneNumber,
        // gender: args.gender
      };

      CustomerService.createCustomer(params)
        .then(newCustomer => {
          return resolve(newCustomer)
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
}