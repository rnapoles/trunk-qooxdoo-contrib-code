/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#resource(custom.image:image)

// List all static resources that should be copied into the build version,
// if the resource filter option is enabled (default: disabled)
#embed(qx.icontheme/32/status/dialog-information.png)
#embed(custom.image/test.png)

************************************************************************ */

/**
 * Your custom application
 */
qx.Class.define("custom.Application",
{
  extend : qx.application.Gui || qx.application.Standalone,




    /*
*****************************************************************************
MEMBERS
*****************************************************************************
*/

  members :
  {
    main : function()
    {
      this.base(arguments);

      var bVersion_0_7 =
        qx.core.Version.major == 0 && qx.core.Version.minor == 7;
      var bVersion_0_8 =
        qx.core.Version.major == 0 && qx.core.Version.minor == 8;

      // We don't yet support any version other than 0.7.x and 0.8.x
      if (! bVersion_0_7 && ! bVersion_0_8)
      {
        throw new Error("Unsupported version: " +
                        "major=" + qx.core.Version.major + ", " +
                        "minor=" + qx.core.Version.minor);
      }
      
      if (bVersion_0_8)
      {
        var o = new qx.ui.layout.Composite();
        o.set(
          {
            width : 800,
            height : 500,
            backgroundColor : "white"
          });
        this.getRoot().add(o, { top : 100, left : 100 });
      }
      else
      {
        var o = new qx.ui.basic.Terminator();
        o.set(
          {
            top : 100,
            left : 100,
            width : 800,
            height : 500,
            backgroundColor : "white"
          });
        o.addToDocument();
      }

      function doWZ(e)
      {
        var wz = new ssvg.engine.WalterZorn();
        var el;

        if (bVersion_0_8)
        {
          el = o.getContentElement().getDomElement();
        }
        else
        {
          el = o.getElement();
        }

        wz.setContainer(el);

        wz.setClipSize({ width : o.getWidth(), height : o.getHeight() });

        wc = 800 >> 1;
        dy = 0;

        wz.setColor("#ff9900");
        wz.drawEllipse(16, 240+dy, 59, 130);
        wz.setFont("arial,helvetica,sans-serif", "11px",
                   ssvg.engine.WalterZorn.Font.PLAIN);
        wz.drawString(35, 180+dy, "<nobr>.drawEllipse(&nbsp;)<\/nobr>");
        wz.drawString(360, 66+dy, ".fillPolygon(&nbsp;)");
        wz.drawLine(62, 197+dy, 48, 234+dy);
        wz.drawLine(48, 234+dy, 45, 224+dy);
        wz.drawLine(49, 234+dy, 57, 228+dy);
        wz.setColor("#008800");
        wz.drawEllipse((250+wc+300)>>1, 4+dy, 64, 64);
        wz.drawString(((wc+280)>>1)-100,
                      190+dy,
                      "These are not image files.<br>" +
                      "Shapes &amp; text have been dynamically drawn with " +
                      "<br>ssvg.engine.WalterZorn");

        wz.setStroke(2);
        wz.setColor("#ff99b6");
        wz.drawLine(120, -60+dy, 265, 150+dy);
        wz.setColor("#ff0080");
        wz.setStroke(1);
        wz.drawString(190, 145+dy, "<nobr>.drawLine(&nbsp;)<\/nobr>");
        var polylx=
          new Array(420, ((wc+280)>>1)+240, ((wc+280)>>1)+120, (wc<<1)-100);
        var polyly=new Array(160+dy, 112+dy, 350+dy, 450+dy);
        wz.drawPolyLine(polylx, polyly);
        wz.drawString(((wc+280)>>1)+126, 155+dy, ".drawPolyLine(&nbsp;)");

        wz.setColor("#ffe600");
        wz.fillPolygon(
          new Array(383, 390, 397, 420, 397, 390, 383, 360),
          new Array(23+dy, 0+dy, 23+dy, 30+dy, 37+dy, 60+dy, 37+dy, 30+dy));

        var polygx=new Array(177, 247, 115);
        var polygy=new Array(24+dy, 45+dy, 140+dy);
        wz.setColor("#0000cc");
        wz.drawPolygon(polygx, polygy);
        wz.drawString(256, 30+dy, ".drawPolygon(&nbsp;)");

        wz.setColor("#aabbff");
        wz.setStroke(5);
        wz.drawEllipse(300, 110+dy, 80, 50);

        // Smiley
        wz.fillEllipse(wc+292, 36+dy, 15, 15);
        wz.setColor("#990099");
        wz.setStroke(ssvg.engine.WalterZorn.Stroke.DOTTED);
        wz.drawRect(wc+280, dy, 40, 50);
        wz.drawString(wc+210, 20+dy, "<nobr>.drawRect(&nbsp;)<\/nobr>");
        wz.setStroke(1);
        wz.drawEllipse(wc+292, 36+dy, 14, 14);
        wz.setColor("#000033");
        wz.fillRect(wc+295, 41+dy, 2, 2);
        wz.fillRect(wc+302, 41+dy, 2, 2);
        wz.drawLine(wc+295, 45+dy, wc+296, 46+dy);
        wz.drawLine(wc+297, 47+dy, wc+301, 47+dy);
        wz.drawLine(wc+301, 47+dy, wc+303, 45+dy);
        wz.setColor("#0000cc");
        wz.drawString(wc+214, 36+dy, ".fillEllipse(&nbsp;)");

        // Pie
        wz.setColor("#0000ff");
        wz.drawString(wc+240, 120+dy, ".fillArc(&nbsp;)");
        wz.setColor("#999999");
        wz.fillEllipse(wc+210, 150+dy, 120, 80);
        wz.setColor("#ff8080");
        wz.fillArc(wc+210, 140+dy, 120, 80, 330, 40);
        wz.setColor("#8080ff");
        wz.fillArc(wc+210, 140+dy, 120, 80, 40, 140);
        wz.setColor("#ff80ff");
        wz.fillArc(wc+210, 140+dy, 120, 80, 140, 180);
        wz.setColor("#80bb80");
        wz.fillArc(wc+210, 140+dy, 120, 80, 180, 280);
        wz.setColor("#ffcc66");
        wz.fillArc(wc+210, 140+dy, 120, 80, 280, 330);

        wz.paint();
      }

      if (bVersion_0_8)
      {
        o.addListener("appear", doWZ);
      }
      else
      {
        o.addEventListener("appear", doWZ);
      }

/*
      console.warn("About to create 'g' element");
      var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      var appender = new qx.log.appender.FireBug();
      g.setAttribute('transform',
                     'matrix(0 1 1 0 0 0) translate(1 0)');
      var l = g.transform.baseVal.getItem(0).matrix;
      var r = g.transform.baseVal.getItem(1).matrix;
      var m = l.multiply(r);
      qx.dev.Debug.debugObject(m, "m", 10, appender);
*/
    },


    /**
     * TODOC
     *
     * @type member
     */
    close : function()
    {
      this.base(arguments);

      // Prompt user
      // return "Do you really want to close the application?";
    },


    /**
     * TODOC
     *
     * @type member
     */
    terminate : function() {
      this.base(arguments);
    }
  },




    /*
*****************************************************************************
SETTINGS
*****************************************************************************
*/

    settings : {
    "custom.resourceUri" : "./resource"
      }
});
