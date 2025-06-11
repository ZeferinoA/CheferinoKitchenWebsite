const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  helpers: {
    eq: (a, b) => a === b
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Cheferino Kitchen server running at http://localhost:${PORT}`);
});

const fs = require('fs');
const reviewsFile = path.join(__dirname, 'data/reviews.json');

app.get('/reviews', (req, res) => {
  fs.readFile(reviewsFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading reviews.json:', err);
      return res.status(500).json({ error: 'Could not load reviews.' });
    }

    let reviews = [];
    try {
      reviews = JSON.parse(data);
    } catch {
      console.error('Invalid JSON format');
    }

    res.json(reviews);
  });
});

app.post('/submit-review', (req, res) => {
  const newReview = req.body;

  fs.readFile(reviewsFile, 'utf8', (err, data) => {
    let reviews = [];

    if (!err && data) {
      try {
        reviews = JSON.parse(data);
      } catch (parseErr) {
        console.error('Error parsing existing reviews:', parseErr);
      }
    }

    reviews.push(newReview);

    fs.writeFile(reviewsFile, JSON.stringify(reviews, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing to reviews.json:', writeErr);
        return res.status(500).json({ error: 'Failed to save review.' });
      }

      res.status(200).json({ message: 'Review saved successfully!' });
    });
  });
});

const ordersFile = path.join(__dirname, 'data/orders.json');

app.get('/manager-dashboard', (req, res) => {
  const cityFilter = req.query.city;
  const deliveryOnly = req.query.deliveryOnly;
  const isDeliveryOnly = deliveryOnly === 'on';

  fs.readFile(ordersFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error loading orders.');

    let orders = JSON.parse(data);

    if (cityFilter && cityFilter !== "All") {
      orders = orders.filter(order => order.city === cityFilter);
    }

    if (isDeliveryOnly) {
      orders = orders.filter(order => order.delivery === true);
    }

    const orderCount = orders.length;
    let totalRevenue = 0;

    // Accumulate summary stats
    orders.forEach(order => {
      totalRevenue += order.total || 0;
    });

    const deliveryCount = orders.filter(order => order.delivery === true).length;
    const averageOrder = orderCount > 0 ? totalRevenue / orderCount : 0;

    res.render('manager-dashboard', {
      title: 'Manager Dashboard',
      isManagerPage: true,
      orders,
      cityFilter,
      orderCount,
      totalRevenue: totalRevenue.toFixed(2),

      deliveryFilter: isDeliveryOnly,
      deliveryCount: deliveryCount,
      averageOrder: averageOrder.toFixed(2),
      showCityColumn: !cityFilter
    });
  });
});