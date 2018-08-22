const products = [
  {
    id: 1,
    name: 'Prod1',
    category: 'abc',
    price: 3500000
  },
  {
    id: 2,
    name: 'Prod2',
    category: 'abc',
    price: 7000000
  },
  {
    id: 3,
    name: 'Prod3',
    category: 'xyz',
    price: 1500000
  },
  {
    id: 4,
    name: 'Prod4',
    category: 'abc',
    price: 500000,
  },
  {
    id: 5,
    name: 'Prod5',
    category: 'xyz',
    price: 5000000,
  },
  {
    id: 6,
    name: 'Prod6',
    category: 'xyz',
    price: 9000000,
  },
  {
    id: 7,
    name: 'Prod7',
    category: 'xyz',
    price: 11500000,
  }
]

export default {
  getProducts: () => {
    return products;
  }
}