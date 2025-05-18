/*
  Name: Zeferino Araiza-Flores
  Date: 04/28/2025
  Class: CS 290 – Web Development

  Instructions:
  - Add your name, date, and class above.
  - Provide a detailed comment header before each function describing what it does.
  - Leave all TODO comments in place while working. Remove them only after completing each function.
  - Use clear variable names and add inline comments to explain your logic.
*/

const orders = require('./orders.js');
const deliveryFee = 3.00;

// Byte Bistro Menu – price map
const priceMap = {
  "Veggie Mac": 8.00,
  "Tofu Tacos": 9.50,
  "Byte Burger": 11.25,
  "Curry Bowl": 12.00,
  "Recursive Ravioli": 13.50,
  "Iced Tea": 2.50,
  "Soda": 2.00,
  "Coffee": 2.00,
  "Byte Brownie": 4.00,
  "Lava Cake": 5.00,
  "Vanilla Cheesecake": 4.50,
  "extra salsa": 0.50,
  "extra cheese": 1.00,
  "side of rice": 2.00
};

/*
This function finds the customer order by the javascript command .find and returns the entire order that matches the name wanted in the orders array in order.js
*/
function findOrderByCustomer(orders, name) {
  return orders.find(order => order.customer === name);
}

/*
This function calculates the subtotal by adding the prices of the entrees, desserts, drinks, and add-ons multiplied by their quantities and adds them all up to the subtotal variable and returns that 
*/
function calculateSubtotal(order, prices) {
  let subtotal = 0;
  if (Array.isArray(order.entrees)) {
    order.entrees.forEach(function(item) {
      subtotal += prices[item.name] * item.quantity;
    });
  }
  if (Array.isArray(order.drinks)) {
    order.drinks.forEach(function(item) {
      subtotal += prices[item.name] * item.quantity;
    });
  }
  if (Array.isArray(order.desserts)) {
    order.desserts.forEach(function(item) {
      subtotal += prices[item.name] * item.quantity;
    });
  }
  if (Array.isArray(order.addOns)) {
    order.addOns.forEach(function(item) {
      subtotal += prices[item];
    });
  }

  return subtotal
}

/*
This function calculate the tip amount by multiplying the subtotal by the percent times .01 as it is a percent and returns it
*/
function calculateTip(subtotal, percent) {
  let tipAmount = (subtotal * percent * .01);
  return tipAmount;
}

/*
This function prints the receipt to the console with a name, date, and the order parts seperated by name and including quantity and price, totaling it to the cost as the product of post. All the cost are then accumulated with displaying a subtotal, then tip amount and percent, and adds both for the grand total
*/
function printReceipt(order, prices) {
  console.log("BYTE BISTRO RECEIPT – " + order.customer);
  console.log("Date: " + order.date);
  console.log("----------------------------------------");

  if (Array.isArray(order.entrees)) {
    order.entrees.forEach(function(item) {
      const cost = prices[item.name] * item.quantity;
      console.log("Entrée: " + item.name + " x" + item.quantity + " – $" + cost.toFixed(2));
    });
  }

  if (Array.isArray(order.drinks)) {
    order.drinks.forEach(function(item) {
      const cost = prices[item.name] * item.quantity;
      console.log("Drinks: " + item.name + " x" + item.quantity + " – $" + cost.toFixed(2));
    });
  }

  if (Array.isArray(order.desserts)) {
    order.desserts.forEach(function(item) {
      const cost = prices[item.name] * item.quantity;
      console.log("Desserts: " + item.name + " x" + item.quantity + " – $" + cost.toFixed(2));
    });
  }

  if (Array.isArray(order.addOns)) {
    order.addOns.forEach(function(item) {
      const cost = prices[item];
      console.log("Add-ons: " + item + " – $" + cost.toFixed(2));
    });
  }
  
  let subtotal = calculateSubtotal(order, prices);
  console.log("Subtotal: $" + subtotal.toFixed(2));

  let delivery = order.delivery ? deliveryFee : 0;
  if (delivery > 0) {
    console.log("Delivery Fee: $" + delivery.toFixed(2));
  }

  let percent = order.tipPercent;
  let tipAmount = calculateTip(subtotal, percent);
  console.log("Tip Amount (" + percent + "%): $" + tipAmount.toFixed(2));

  let total = subtotal + delivery + tipAmount;
  console.log("Total: $" + total.toFixed(2));
}

/*
This function adds the orders to a summary based on the date and, if not already added to summary array, is added to the array. It calculates the total orders done on that date by increments, adds the total revenue, and then finds the average by diving total revenue by total orders
*/
function summarizeOrdersByDate(orders) {
  const summary = {};

  orders.forEach(function(order) {
    if (!summary[order.date]) {
      summary[order.date] = { total: 0, count: 0 };
    }
    
    const subtotal = calculateSubtotal(order, priceMap);
    const delivery = order.delivery ? 3.00 : 0;
    const tip = calculateTip(subtotal, order.tipPercent);

    summary[order.date].total += subtotal + delivery + tip;
    summary[order.date].count += 1;
  });

  for (const date in summary) {
    const day = summary[date];
    const average = day.total / day.count;
    console.log(`Date: ${date} | Orders: ${day.count} | Revenue: $${day.total.toFixed(2)} | Avg: $${average.toFixed(2)}`);
  }
}

/*
This function checks all the requirement needs such as a name, date, and at least 1 entree, drink, or dessert with if statements for all cases and returns true if it does and false if it doesn't
*/
function validateOrder(order) {
  if (!order.customer) {
    console.log("No name is provided");
    return false;
  } else if (!order.date) {
    console.log("No date is provided");
    return false;
  } else if ((!Array.isArray(order.entrees) || order.entrees.length === 0) &&
             (!Array.isArray(order.drinks) || order.drinks.length === 0) &&
             (!Array.isArray(order.desserts) || order.desserts.length === 0)) {
    console.log("No entree, dessert, or drink is entered");
    return false;
  }
  return true;
}

/*
This function appends an order to the orders array if the new order is validated by the prior function
*/
function addOrder(orders, newOrder) {
  if (validateOrder(newOrder) == true) {
    orders.push(newOrder);
  }
}

// --- TESTING SECTION (Call Your Functions Below) ---


const order = findOrderByCustomer(orders, "Willy");
if (order) printReceipt(order, priceMap);


// Add a new order
const newOrder = {
  customer: "Test Customer",
  date: "2025-04-23",
  delivery: true,
  tipPercent: 12,
  entrees: [{ name: "Byte Burger", quantity: 1 }],
  drinks: [{ name: "Coffee", quantity: 1 }],
  desserts: [{ name: "Byte Brownie", quantity: 1 }],
  addOns: ["extra cheese"]
};
addOrder(orders, newOrder);


// Invalid order (should fail validation)
const badOrder = {
  customer: "Bad Customer",
  date: "2025-04-24",
  delivery: false,
  tipPercent: 15,
  entrees: [],
  drinks: [],
  desserts: [],
  addOns: []
};
addOrder(orders, badOrder);


// Print all receipts and daily summary
orders.forEach(function(order) {
  printReceipt(order, priceMap);
});
summarizeOrdersByDate(orders);

