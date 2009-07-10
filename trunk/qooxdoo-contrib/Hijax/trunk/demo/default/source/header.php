<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>A Hijaxed Site</title>
  <link rel="stylesheet" type="text/css" media="all" href="resource/hjx/css/main.css" />
  <script type="text/javascript" src="script/hjx.js"></script>
  <script type="text/javascript">
    // for "build" version one would write
    // qx.event.Registration.addListener(window, "ready", hjx.Hijax.main, hjx.Hijax);
    function ready() {
      // Enable stack traces when logging errors
      /*
      if (qx.log.Logger.__serialize_orig == null) {
        qx.log.Logger.__serialize_orig =  qx.log.Logger.__br; // qx.log.Logger.__serialize;
        qx.log.Logger.__br = function(value, deep){
          var type = this.__bq(value); //__detect(value);
          if (type == "error") {
            return {
              type : "error",
              text : value.toString() + "\n" + qx.dev.StackTrace.getStackTraceFromError(value).join("\n")
            };
          } else {
            return this.__serialize_orig(value, deep);
          }
        }
      }
      */

      hjx.Hijax.main.call(hjx.Hijax);
    }
  </script>
</head>
<body onload="ready()">
  <h1>A Hijaxed Site</h1>
  <ul id="nav">
    <li><a href="index.php">Index</a></li>
    <li><a href="about.php">About Us</a></li>
    <li><a href="products.php">Products</a></li>
    <li><a href="services.php">Services</a></li>
    <li><a href="contact.php">Contact Us</a></li>
  </ul>
  <div id="content">
    <!-- content start -->

