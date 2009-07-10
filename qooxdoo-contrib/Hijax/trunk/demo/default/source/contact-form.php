<?php include("header.php"); ?>

<?php
// Simulating server-side work
sleep(1);
?>

<h2>Message sent</h2>
<p>Subject: <?php echo $_REQUEST["subject_text"]; ?></p>
<p>E-Mail Address: <?php echo $_REQUEST["email_email"]; ?></p>
<p>Your Message: <?php echo $_REQUEST["message_textarea"]; ?></p>

<?php include("footer.php"); ?>
