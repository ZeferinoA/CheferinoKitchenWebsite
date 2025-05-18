// Attach event listeners to each .menu-item
document.querySelectorAll('.menu-item').forEach((item) => {
  item.addEventListener('click', handleItemClick);
  item.querySelector('.qty-input').addEventListener('input', updateSelectedItems);
});

// Handles click on a menu item 
function handleItemClick(event) {
  const item = event.currentTarget;
  const name = item.dataset.name;
  const price = item.dataset.price;
  const category = item.dataset.category;

 // Log clicked item   
 // COMPLETE console.log the name, price and category
  console.log(name);
  console.log(price); 
  console.log(category);  

  // Toggle visibility of the quantity input
   const qtyInput = item.querySelector('.qty-input');
  if (qtyInput.style.display === 'none') {
    qtyInput.style.display = 'block';
    qtyInput.focus();
  } else {
  // Hide the input and clear the value     
    qtyInput.style.display = 'none';
    qtyInput.value = '';
    removeSelectedItems(); // Remove selected list if quantity is cleared   }
  }
}

  // Handles quantity input changes
function updateSelectedItems(event) {
  const qtyInput = event.target; // the number input box that was changed

  // Use closest() to safely find the menu-item container even if structure changes
  const item = qtyInput.closest('.menu-item');
  const name = item.dataset.name;
  const qty = qtyInput.value;

  // Log the updated quantity for that specific item
  console.log(`Updated quantity: ${name} × ${qty}`);
 
 // Add functionality for updating and cancelling items //
}

function removeSelectedItems(item) {
// Future: In Activity 10 remove from order list and sidebar
// In Activity 9 console.log the name of item removed.
  const name = item.dataset.name;
  console.log("Removed " + name);
}