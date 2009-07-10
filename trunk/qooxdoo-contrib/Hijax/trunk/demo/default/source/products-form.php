<?php include("header.php"); ?>

<?php
//print_r($_REQUEST);

if ($_REQUEST["order"]) {
  echo "You <b>ordered</b> a pizza with the following toppings:";
} else {
  echo "You <b>favorite pizza</b> was saved. It has the following toppings:";
}
?>
<br>

<ul>
<?php
$toppings = $_POST['topping'];
if ($toppings) {
  foreach ($toppings as $key => $value) {
    echo "<li>$value</li>";
  }
}
?>
</ul>

<?php include("footer.php"); ?>