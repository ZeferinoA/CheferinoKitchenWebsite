// orders.js – Byte Bistro sample order data

const orders = [
  {
    customer: "Victoria",
    date: "2025-04-21",
    delivery: true,
    tipPercent: 20,
    entrees: [
      { name: "Curry Bowl", quantity: 1 },
      { name: "Recursive Ravioli", quantity: 2 }
    ],
    drinks: [
      { name: "Iced Tea", quantity: 2 }
    ],
    desserts: [],
    addOns: []
  },
  {
    customer: "Willy",
    date: "2025-04-21",
    delivery: false,
    tipPercent: 15,
    entrees: [],
    drinks: [
      { name: "Soda", quantity: 1 }
    ],
    desserts: [
      { name: "Lava Cake", quantity: 1 }
    ],
    addOns: []
  },
  {
    customer: "Alex Byte",
    date: "2025-04-22",
    delivery: true,
    tipPercent: 18,
    entrees: [
      { name: "Veggie Mac", quantity: 2 }
    ],
    drinks: [
      { name: "Coffee", quantity: 1 },
      { name: "Soda", quantity: 1 }
    ],
    desserts: [
      { name: "Byte Brownie", quantity: 1 },
      { name: "Lava Cake", quantity: 1 }
    ],
    addOns: ["extra cheese"]
  },
  {
    customer: "Riley",
    date: "2025-04-22",
    delivery: false,
    tipPercent: 10,
    entrees: [
      { name: "Tofu Tacos", quantity: 1 }
    ],
    drinks: [],
    desserts: [],
    addOns: ["side of rice"]
  },
  {
    customer: "Sammy",
    date: "2025-04-23",
    delivery: true,
    tipPercent: 15,
    entrees: [
      { name: "Recursive Ravioli", quantity: 1 },
      { name: "Byte Burger", quantity: 1 }
    ],
    drinks: [
      { name: "Iced Tea", quantity: 1 }
    ],
    desserts: [
      { name: "Vanilla Cheesecake", quantity: 1 }
    ],
    addOns: ["extra salsa"]
  },
  {
    customer: "Jordan",
    date: "2025-04-23",
    delivery: false,
    tipPercent: 0,
    entrees: [
      { name: "Veggie Mac", quantity: 1 }
    ],
    drinks: [
      { name: "Coffee", quantity: 1 }
    ],
    desserts: [],
    addOns: []
  },
  {
    customer: "Remy",
    date: "2025-04-25",
    delivery: false,
    tipPercent: 10,
    entrees: [
      { name: "Byte Burger", quantity: 1 },
      { name: "Veggie Mac", quantity: 2 },
      { name: "Recursive Ravioli", quantity: 1 }
    ],
    drinks: [],
    desserts: [],
    addOns: []
  }
];

module.exports = orders;
