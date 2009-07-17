<?php include("header.php"); ?>

<h2>Contact Form</h2>  
<form class="label-form" method="post" action="contact-form.php" id="contact_form">
  <label for="subject_text">Subject</label><input type="text" name="subject_text"/>
  <br/>
  <label for="email_email">E-Mail Address</label><input type="text" name="email_email"/>
  <br/>
  <label for="message_textarea">Your Message</label><textarea name="message_textarea"></textarea>
  <br/>
  <input class="button_submit" type="submit" value="Send Message"/>
</form>

<?php include("footer.php"); ?>
