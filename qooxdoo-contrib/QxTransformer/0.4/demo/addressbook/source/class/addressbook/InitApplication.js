/* ************************************************************************

   qxtransformer - xml->javascript converter

   http://qxtransformer.org
   http://qooxdoo.org

   Copyright:
     2008 Siarhei Barysiuk and Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Siarhei Barysiuk (sbarysiuk)

************************************************************************ */

qx.Class.define("addressbook.InitApplication",
{
  extend : qx.application.Standalone,
  include : [ addressbook.Controller ],

  members :
  {
    /**
     * Executes an initialization of controller.
     * Enables logging for the application.
     *
     * @return {void} 
     */
    main : function()
    {
      this.base(arguments);

      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      this.init();
    }
  }
});