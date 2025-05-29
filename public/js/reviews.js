// reviews.js

// Load reviews from the server when the page loads
fetch('/reviews')
  .then(response => response.json())
  .then(data => {
    data.forEach(renderReview);
  });

// Handle form submission
const form = document.getElementById("reviewForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();  // Stop the form from trying to reload the page

  const review = {
    name: document.getElementById("name").value.trim(),
    city: // COMPLETE GET city
    rating: parseInt(document.getElementById("rating").value),
    title: // COMPLETE GET title
    comment: // COMPLETE GET comment
  };

  fetch('/submit-review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  })
  .then(response => response.json())
  .then(() => {
    renderReview(review);  // Add the new review to the page
    form.reset();           // Clear the form fields
  });
});

// Display a single review on the page
function renderReview(review) {
  const container = document.getElementById("reviewList");

  const div = document.createElement("div");
  div.className = "review-box";

  div.innerHTML = `
    <article>
      <div class="stars">${"★".repeat(review.rating)}</div>
      // COMPLETE DISPLAY Title
      <p>${review.comment}</p>
      // COMPLETE DISPLAY Name and City
    </article>
    <hr>
  `;

  container.prepend(div);
}