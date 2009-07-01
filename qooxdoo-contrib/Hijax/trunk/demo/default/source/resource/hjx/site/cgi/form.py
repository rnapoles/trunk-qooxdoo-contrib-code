#!/usr/bin/env python
htmlHeader = """
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>Contact Form</title>
  <link rel="stylesheet" type="text/css" media="all" href="css/main.css" />
  <script type="text/javascript" src="../qxinline.js"></script>
  <script type="text/javascript" src="../hjx.Settings.js"></script>
  <script type="text/javascript" src="../hjx.Hijax.js"></script>
  <script type="text/javascript" src="../hjx.Form.js"></script>
  <script type="text/javascript">  
    qx.bom.Lifecycle.onReady(hjx.Hijax.main, hjx.Hijax);
  </script>
</head>
<body>
  <h1>Contact Us</h1>
  <ul id="nav">
    <li><a href="main.html">Index</a></li>
    <li><a href="about.html">About Us</a></li>
    <li><a href="products.html">Products</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="cgi/form.py">Contact Us</a></li>
  </ul>
"""

htmlFooter = """
</body>
</html>
"""

def index(req):
  content = """
    <div id="content">
      <h2>Contact Form</h2>  
      <form method="post" action="cgi/form.py/send" id="contact_form">
        <label for="subject_text">Subject</label><input type="text" name="subject_text"/>
        <br/>
        <label for="email_email">E-Mail Address</label><input type="text" name="email_email"/>
        <br/>
        <label for="message_textarea">Your Message</label><textarea name="message_textarea"></textarea>
        <br/>
        <input id="button_submit" type="submit" value="Send Message"/>
      </form>
    </div>
  """
  out = htmlHeader + content + htmlFooter
  return out

def send(req, subject_text, email_email, message_textarea):  
  content = "<div id=\"content\">"
  content += "  <h2>Message sent</h2>"
  content += "  <p>Subject: %s</p>" %subject_text
  content += "  <p>E-Mail Address: %s</p>" %email_email
  content += "  <p>Your Message: %s</p>" %message_textarea
  content += "</div>"
  out = htmlHeader + content + htmlFooter
  return out