<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>A Hijaxed Site</title>
  <link rel="stylesheet" type="text/css" media="all" href="resource/hjx/css/main.css" />
  <script type="text/javascript" src="script/hjx.js"></script>
  <script type="text/javascript">
    hjxDemoLoader = {
      // for "build" version one would write
      // qx.event.Registration.addListener(window, "ready", hjx.Hijax.main, hjx.Hijax);
      init : function() {
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
        hjxDemoLoader.hideBlocker();
      },

      ready : function() {
        if (window.qx.$$loader == null) {
          hjxDemoLoader.init();
        } else {
          // This is the source version
          // -> Call the init function after all classes have been loaded
          // Workaround: Normally this should be:
          //       qx.event.Registration.addListener(window, "ready", mamba.Init.init);
          //   But if we would do this that way, we would need the whole qooxdoo event
          //   system, which would be a code overhead we don't want.
          var poller = window.setInterval(function() {
            if(qx.$$loader.uris[0].length == 0) {
              // Length equals 0 for the next to last script actually, which gets
              // loaded while entering this block.
              window.clearInterval(poller);
              hjxDemoLoader.init();
            }
          }, 50);
        }
      },

      showBlocker : function() {
        if (this._blockElem == null) {
          var elem = document.createElement("div");
          elem.id = "block-elem";
          elem.style.position = "fixed";
          elem.style.top      = "0";
          elem.style.left     = "0";
          elem.style.width    = "100%";
          elem.style.height   = "100%";
          elem.style.zIndex   = "1000";
          elem.style.backgroundColor = "black";
          elem.style.opacity  = "0.2";
          elem.style.cursor   = "wait";
  
          document.body.appendChild(elem);
          this._blockElem = elem;
        } else {
          this._blockElem.style.display = "block";
        }
      },

      hideBlocker : function() {
        if (this._blockElem != null) {
          this._blockElem.style.display = "none";
        }
      }
    };
  </script>
</head>
<body onload="hjxDemoLoader.ready()">
  <script type="text/javascript">
    hjxDemoLoader.showBlocker();
  </script>

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

