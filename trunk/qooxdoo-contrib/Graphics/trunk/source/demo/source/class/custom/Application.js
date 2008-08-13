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
  extend : qx.application.Gui,




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

      function doWZ(e)
      {
        var wz = new graphics.engine.WalterZorn();

        var el = o.getElement();
        wz.setContainer(el);

        wz.setClipSize({ width : o.getWidth(), height : o.getHeight() });

        wc = 800 >> 1;
        dy = 0;

        wz.setColor("#ff9900");
        wz.drawEllipse(16, 240+dy, 59, 130);
        wz.setFont("arial,helvetica,sans-serif", "11px",
                   graphics.engine.WalterZorn.Font.PLAIN);
        wz.drawString("<nobr>.drawEllipse(&nbsp;)<\/nobr>",35, 180+dy);
        wz.drawString(".fillPolygon(&nbsp;)", 360, 66+dy);
        wz.drawLine(62, 197+dy, 48, 234+dy);
        wz.drawLine(48, 234+dy, 45, 224+dy);
        wz.drawLine(49, 234+dy, 57, 228+dy);
        wz.setColor("#008800");
        wz.drawOval((250+wc+300)>>1, 4+dy, 64, 64);
        wz.drawString("These are not image files.<br>" +
                        "Shapes &amp; text have been dynamically drawn with " +
                        "<br>graphics.engine.WalterZorn",
                        ((wc+280)>>1)-100, 190+dy);

        wz.setStroke(2);
        wz.setColor("#ff99b6");
        wz.drawLine(120, -60+dy, 265, 150+dy);
        wz.setColor("#ff0080");
        wz.setStroke(1);
        wz.drawString("<nobr>.drawLine(&nbsp;)<\/nobr>", 190, 145+dy);
        var polylx=
          new Array(420, ((wc+280)>>1)+240, ((wc+280)>>1)+120, (wc<<1)-100);
        var polyly=new Array(160+dy, 112+dy, 350+dy, 450+dy);
        wz.drawPolyline(polylx, polyly);
        wz.drawString(".drawPolyline(&nbsp;)", ((wc+280)>>1)+126, 155+dy);

        wz.setColor("#ffe600");
        wz.fillPolygon(
          new Array(383, 390, 397, 420, 397, 390, 383, 360),
          new Array(23+dy, 0+dy, 23+dy, 30+dy, 37+dy, 60+dy, 37+dy, 30+dy));

        var polygx=new Array(177, 247, 115);
        var polygy=new Array(24+dy, 45+dy, 140+dy);
        wz.setColor("#0000cc");
        wz.drawPolygon(polygx, polygy);
        wz.drawString(".drawPolygon(&nbsp;)", 256, 30+dy);

        wz.setColor("#aabbff");
        wz.setStroke(5);
        wz.drawOval(300, 110+dy, 80, 50);

        // Smiley
        wz.fillOval(wc+292, 36+dy, 15, 15);
        wz.setColor("#990099");
        wz.setStroke(graphics.engine.WalterZorn.Stroke.DOTTED);
        wz.drawRect(wc+280, dy, 40, 50);
        wz.drawString("<nobr>.drawRect(&nbsp;)<\/nobr>", wc+210, 20+dy);
        wz.setStroke(1);
        wz.drawOval(wc+292, 36+dy, 14, 14);
        wz.setColor("#000033");
        wz.fillRect(wc+295, 41+dy, 2, 2);
        wz.fillRect(wc+302, 41+dy, 2, 2);
        wz.drawLine(wc+295, 45+dy, wc+296, 46+dy);
        wz.drawLine(wc+297, 47+dy, wc+301, 47+dy);
        wz.drawLine(wc+301, 47+dy, wc+303, 45+dy);
        wz.setColor("#0000cc");
        wz.drawString(".fillEllipse(&nbsp;)", wc+214, 36+dy);

        // Pie
        wz.setColor("#0000ff");
        wz.drawString(".fillArc(&nbsp;)", wc+240, 120+dy);
        wz.setColor("#999999");
        wz.fillOval(wc+210, 150+dy, 120, 80);
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

      o.addEventListener("appear", doWZ);
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
