<?php include("header.php"); ?>

<h2>Services Page</h2>
<div class="exampleDescr">
  Example for a form submitting to the same page.
</div>

<?php
//print_r($_REQUEST);

if ($_REQUEST["msg"]) {
  // Simulating server-side work
  sleep(1);

  echo "<p>Your message was added:<pre>".$_REQUEST["msg"]."</pre></p>";

  echo "<p>You may post another message:</p>";
} else {
  echo "<p>Post a message:</p>";
}
?>

<form class="label-form" method="post" action="services.php">
  <label for="msg">Your Message</label><textarea name="msg"></textarea>
  <br/>
  <input class="button_submit" type="submit" value="Post Message"/>
</form>

<?php include("footer.php"); ?>