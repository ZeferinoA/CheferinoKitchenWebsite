<?php
// CS 290 Activity 11 and HW 5
// Basic menu-order confirmation page with submitted values
// including JSON hidden field.
// Modify by adding your header and footer code.
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Order Confirmation</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
  <h1>ADD YOUR HEADER</h1>
</header>

<main>
<?php
// menu-order.php – Confirmation Page

// Get individual form fields
$name = $_POST['name'] ?? '(not provided)';
$tip = $_POST['tip'] ?? '(not selected)';
$delivery = $_POST['dining'];

// Get JSON object
$orderJson = $_POST['orderJson'] ?? '';
$order = json_decode($orderJson, true);

// Display confirmation
echo "<h2>Thank you for your order!</h2>";

echo "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>";
echo "<p><strong>Tip Percentage:</strong> " . htmlspecialchars($tip) . "%</p>";
echo "<p><strong>Dining Method:</strong> " . $delivery . "</p>";

echo "<h3>Order JSON Received:</h3>";
print_r($orderJson);
?>
</main>

<!-- FOOTER START -->

<footer>
  <p>ADD YOUR FOOTER</p>
</footer>
<!-- FOOTER END -->

</body>
</html>

