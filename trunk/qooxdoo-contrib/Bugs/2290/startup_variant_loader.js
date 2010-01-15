/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Alexander Steitz (aback)

************************************************************************ */

(function()
{
  var engine = "unknown";
  var agent = window.navigator.userAgent;
  
  if (window.opera &&
      Object.prototype.toString.call(window.opera) == "[object Opera]") {
    engine = "opera";
  } else if (window.navigator.userAgent.indexOf("AppleWebKit/") != -1) {
    engine = "webkit";
  } else if (window.controllers && window.navigator.product === "Gecko") {
    engine = "gecko";
  } else if (window.navigator.cpuClass && /MSIE\s+([^\);]+)(\)|;)/.test(agent)) {
    engine = "mshtml";
  }
  else
  {
    var failFunction = window.qxFail;

    if (failFunction && typeof failFunction === "function")
    {
      var engine = failFunction();

      if (engine.NAME) {
	engine = engine.NAME;
      }
    }
    else
    {
      engine = "gecko";
      
      window.alert("Unsupported client: " + agent
	+ "! Assumed gecko client.");
    }
  }

  // this will be filled out from the generator
  var baseScriptName = "<URI_TO_JS_FILENAME_WITHOUT_EXTENSION>";

  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = baseScriptName + "-" + engine + ".js";

  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
})();