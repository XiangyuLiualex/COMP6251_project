const ret = {
  login: [
    {
      id: 1,
      email: "armin@email.com",
      password: "admin",
    },
    {
      id: 2,
      email: "user1@email.com",
      password: "user",
    },
    {
      id: 3,
      email: "user2@email.com",
      password: "user",
    },
  ],
  products: [
    {
      id: 1,
      name: "Product 1",
      description: "This is a product",
      price: 103,
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is another product",
      price: 200,
    },
  ],
  orders: [
    {
      id: 1,
      userId: 1,
      products: [
        {
          id: 1,
          quantity: 2,
        },
      ],
    },
  ],
};

export default ret;
