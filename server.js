const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Byte Bistro server running at http://localhost:${PORT}`);
});

const fs = require('fs');
const reviewsFile = path.join(__dirname, 'reviews.json');

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
