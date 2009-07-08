<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>Contact Form</title>
  <link rel="stylesheet" type="text/css" media="all" href="css/main.css" />
  <script type="text/javascript" src="../qx.js"></script>
  <script type="text/javascript" src="../Settings.js"></script>
  <script type="text/javascript" src="../../../script/hjx.js"></script>
  <script type="text/javascript">
    // for "build" version one would write
    // qx.event.Registration.addListener(window, "ready", hjx.Hijax.main, hjx.Hijax);
    function ready() {
      hjx.Hijax.main.call(hjx.Hijax);
    }
  </script>
</head>
<body>
  <h1>Contact Us</h1>
  <ul id="nav">
    <li><a href="main.html">Index</a></li>
    <li><a href="about.html">About Us</a></li>
    <li><a href="products.html">Products</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="contact.html">Contact Us</a></li>
  </ul>
  <div id="content">
    <h2>Message sent</h2>
    <p>Subject: <?php echo $_REQUEST["subject_text"]; ?></p>
    <p>E-Mail Address: <?php echo $_REQUEST["email_email"]; ?></p>
    <p>Your Message: <?php echo $_REQUEST["message_textarea"]; ?></p>
  </div>
</body>
</html>
