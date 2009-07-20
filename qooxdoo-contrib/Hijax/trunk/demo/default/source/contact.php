<?php include("header.php"); ?>

<h2><a name="top">Contact Form</a></h2>  

<div class="exampleDescr">
  Example for a form.
</div>

<form class="label-form" method="post" action="contact-form.php" id="contact_form">
  <label for="subject_text">Subject</label><input type="text" name="subject_text"/>
  <br/>
  <label for="email_email">E-Mail Address</label><input type="text" name="email_email"/>
  <br/>
  <label for="message_textarea">Your Message</label><textarea name="message_textarea"></textarea>
  <br/>
  <input class="button_submit" type="submit" value="Send Message"/>
</form>

<div class="exampleDescr">
Example for a anchor-link to another page.
</div>

<p>
  <a href="#top">Jump to top (of this page)</a><br>
  <a href="about.php#bottom">Jump to bottom of about page</a>
</p>

<?php include("footer.php"); ?>
