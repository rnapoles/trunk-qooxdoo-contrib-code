<?php include("header.php"); ?>

<h2>Products Page</h2>
<div class="exampleDescr">
  Example for a form with:
  <ul>
    <li>multiple input fields having the same name</li>
    <li>multiple submit buttons</li>
  </ul>
</div>

<form method="post" action="products-form.php">
  What toppings do you want on your pizza:<br>
  <input type="checkbox" name="topping[]" value="Broccoli" id="cbBroccoli"> <label for="cbBroccoli">Broccoli</label><br>
  <input type="checkbox" name="topping[]" value="Green peppers" id="cbGreenPeppers"> <label for="cbGreenPeppers">Green peppers</label><br>
  <input type="checkbox" name="topping[]" value="Mushrooms" id="cbMushrooms"> <label for="cbMushrooms">Mushrooms</label><br>
  <input type="checkbox" name="topping[]" value="Onions" id="cbOnions"> <label for="cbOnions">Onions</label><br>
  <input type="checkbox" name="topping[]" value="Olives" id="cbOlives"> <label for="cbOlives">Olives</label><br>
  <input type="checkbox" name="topping[]" value="Spinach" id="cbSpinach"> <label for="cbSpinach">Spinach</label><br>
  <input type="checkbox" name="topping[]" value="Basil" id="cbBasil"> <label for="cbBasil">Basil</label><br>
  <input type="checkbox" name="topping[]" value="Chili" id="cbChili"> <label for="cbChili">Chili</label><br>
  <input type="checkbox" name="topping[]" value="Garlic" id="cbGarlic"> <label for="cbGarlic">Garlic</label><br>
  <input type="checkbox" name="topping[]" value="Oregano" id="cbOregano"> <label for="cbOregano">Oregano</label><br>
  <input type="checkbox" name="topping[]" value="Bacon" id="cbBacon"> <label for="cbBacon">Bacon</label><br>
  <input type="checkbox" name="topping[]" value="Salami" id="cbSalami"> <label for="cbSalami">Salami</label><br>

  <input type="submit" name="order" value="Order now">
  <input type="submit" name="favorite" value="Remember as favorite">
</form>

<?php include("footer.php"); ?>