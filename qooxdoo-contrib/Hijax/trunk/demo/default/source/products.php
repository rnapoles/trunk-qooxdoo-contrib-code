<?php include("header.php"); ?>

<h2>Products Page</h2>
<p>
  Example for a form with:
  <ul>
    <li>multiple input fields having the same name</li>
    <li>multiple submit buttons</li>
  </ul>
</p>

<form method="post" action="products-form.php">
  What toppings do you want on your pizza:<br>
  <input type="checkbox" name="topping[]" value="Broccoli"> Broccoli<br>
  <input type="checkbox" name="topping[]" value="Green peppers"> Green peppers<br>
  <input type="checkbox" name="topping[]" value="Mushrooms"> Mushrooms<br>
  <input type="checkbox" name="topping[]" value="Onions"> Onions<br>
  <input type="checkbox" name="topping[]" value="Olives"> Olives<br>
  <input type="checkbox" name="topping[]" value="Spinach"> Spinach<br>
  <input type="checkbox" name="topping[]" value="Basil"> Basil<br>
  <input type="checkbox" name="topping[]" value="Chili"> Chili<br>
  <input type="checkbox" name="topping[]" value="Garlic"> Garlic<br>
  <input type="checkbox" name="topping[]" value="Oregano"> Oregano<br>
  <input type="checkbox" name="topping[]" value="Bacon"> Bacon<br>
  <input type="checkbox" name="topping[]" value="Salami"> Salami<br>

  <input type="submit" name="order" value="Order now">
  <input type="submit" name="favorite" value="Remember as favorite">
</form>

<?php include("footer.php"); ?>