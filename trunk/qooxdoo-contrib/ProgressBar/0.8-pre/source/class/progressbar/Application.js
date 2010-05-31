/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Alexander Back (aback)

************************************************************************ */

/* ************************************************************************

#asset(progressbar/*)
#asset(qx/icon/Oxygen/16/actions/document-save.png)
#asset(qx/icon/Oxygen/16/actions/dialog-ok.png)

************************************************************************ */

/**
 * progressbar Example application
 */
qx.Class.define("progressbar.Application",
{
  extend : qx.application.Standalone,




  /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */

  members :
  {
    /**
     * Main method - application start point
     *
     * @return {void} 
     */
    main : function()
    {
      this.base(arguments);

      // Add log appenders
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;

        if (qx.bom.client.Engine.MSHTML) {
          qx.log.appender.Console.init();
        }
      }

      var bar1 = new progressbar.ProgressBar();

      bar1.set(
      {
        width          : 300,
        showPcntStatus : true,
        proportion     : "50%"
      });

      this.getRoot().add(bar1,
      {
        top  : 100,
        left : 100
      });

      var bar2 = new progressbar.ProgressBar();

      bar2.set(
      {
        width          : 300,
        showStepStatus : true,
        proportion     : "50/100"
      });

      this.getRoot().add(bar2,
      {
        top  : 150,
        left : 100
      });

      var bar3 = new progressbar.ProgressBar();

      bar3.set(
      {
        width          : 300,
        showStepStatus : true,
        showPcntStatus : true,
        proportion     : "50/100"
      });

      this.getRoot().add(bar3,
      {
        top  : 200,
        left : 100
      });

      var bar4 = new progressbar.ProgressBar();

      bar4.set(
      {
        width          : 300,
        showStepStatus : true,
        showPcntStatus : true
      });

      this.getRoot().add(bar4,
      {
        top  : 250,
        left : 100
      });

      bar4.showOff();
    }
  }
});