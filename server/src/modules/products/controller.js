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
]

export default {
  getProducts: (_, args, ctx) => {
    console.log('root???', _);
    console.log('args: ', args);
    // console.log('args: ', args);
    // console.log('context: ', context);
    console.log('user???? ', ctx.user.toJSON());
    return products;
  }
}