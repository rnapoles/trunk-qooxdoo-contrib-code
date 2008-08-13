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

      function doSsvg(e)
      {
        var el = o.getElement();
        var ssvg = new graphics.engine.WalterZorn(el);

        ssvg.setClipSize({ width : o.getWidth(), height : o.getHeight() });

        wc = 800 >> 1;
        dy = 0;

        ssvg.setColor("#ff9900");
        ssvg.drawEllipse(16, 240+dy, 59, 130);
        ssvg.setFont("arial,helvetica,sans-serif", "11px",
                   graphics.engine.WalterZorn.Font.PLAIN);
        ssvg.drawString("<nobr>.drawEllipse(&nbsp;)<\/nobr>",35, 180+dy);
        ssvg.drawString(".fillPolygon(&nbsp;)", 360, 66+dy);
        ssvg.drawLine(62, 197+dy, 48, 234+dy);
        ssvg.drawLine(48, 234+dy, 45, 224+dy);
        ssvg.drawLine(49, 234+dy, 57, 228+dy);
        ssvg.setColor("#008800");
        ssvg.drawOval((250+wc+300)>>1, 4+dy, 64, 64);
        ssvg.drawString("These are not image files.<br>" +
                        "Shapes &amp; text have been dynamically drawn with " +
                        "<br>graphics.engine.WalterZorn",
                        ((wc+280)>>1)-100, 190+dy);

        ssvg.setStroke(2);
        ssvg.setColor("#ff99b6");
        ssvg.drawLine(120, -60+dy, 265, 150+dy);
        ssvg.setColor("#ff0080");
        ssvg.setStroke(1);
        ssvg.drawString("<nobr>.drawLine(&nbsp;)<\/nobr>", 190, 145+dy);
        var polylx=
          new Array(420, ((wc+280)>>1)+240, ((wc+280)>>1)+120, (wc<<1)-100);
        var polyly=new Array(160+dy, 112+dy, 350+dy, 450+dy);
        ssvg.drawPolyline(polylx, polyly);
        ssvg.drawString(".drawPolyline(&nbsp;)", ((wc+280)>>1)+126, 155+dy);

        ssvg.setColor("#ffe600");
        ssvg.fillPolygon(
          new Array(383, 390, 397, 420, 397, 390, 383, 360),
          new Array(23+dy, 0+dy, 23+dy, 30+dy, 37+dy, 60+dy, 37+dy, 30+dy));

        var polygx=new Array(177, 247, 115);
        var polygy=new Array(24+dy, 45+dy, 140+dy);
        ssvg.setColor("#0000cc");
        ssvg.drawPolygon(polygx, polygy);
        ssvg.drawString(".drawPolygon(&nbsp;)", 256, 30+dy);

        ssvg.setColor("#aabbff");
        ssvg.setStroke(5);
        ssvg.drawOval(300, 110+dy, 80, 50);

        // Smiley
        ssvg.fillOval(wc+292, 36+dy, 15, 15);
        ssvg.setColor("#990099");
        ssvg.setStroke(graphics.engine.WalterZorn.Stroke.DOTTED);
        ssvg.drawRect(wc+280, dy, 40, 50);
        ssvg.drawString("<nobr>.drawRect(&nbsp;)<\/nobr>", wc+210, 20+dy);
        ssvg.setStroke(1);
        ssvg.drawOval(wc+292, 36+dy, 14, 14);
        ssvg.setColor("#000033");
        ssvg.fillRect(wc+295, 41+dy, 2, 2);
        ssvg.fillRect(wc+302, 41+dy, 2, 2);
        ssvg.drawLine(wc+295, 45+dy, wc+296, 46+dy);
        ssvg.drawLine(wc+297, 47+dy, wc+301, 47+dy);
        ssvg.drawLine(wc+301, 47+dy, wc+303, 45+dy);
        ssvg.setColor("#0000cc");
        ssvg.drawString(".fillEllipse(&nbsp;)", wc+214, 36+dy);

        // Pie
        ssvg.setColor("#0000ff");
        ssvg.drawString(".fillArc(&nbsp;)", wc+240, 120+dy);
        ssvg.setColor("#999999");
        ssvg.fillOval(wc+210, 150+dy, 120, 80);
        ssvg.setColor("#ff8080");
        ssvg.fillArc(wc+210, 140+dy, 120, 80, 330, 40);
        ssvg.setColor("#8080ff");
        ssvg.fillArc(wc+210, 140+dy, 120, 80, 40, 140);
        ssvg.setColor("#ff80ff");
        ssvg.fillArc(wc+210, 140+dy, 120, 80, 140, 180);
        ssvg.setColor("#80bb80");
        ssvg.fillArc(wc+210, 140+dy, 120, 80, 180, 280);
        ssvg.setColor("#ffcc66");
        ssvg.fillArc(wc+210, 140+dy, 120, 80, 280, 330);

        ssvg.paint();
      }

      o.addEventListener("appear", doSsvg);

      if (false)
      {
        var b = new qx.ui.form.Button("Draw");
        b.set(
          {
            top : 400,
              left : 50,
              width : 100,
              height : 30
              });
        b.addToDocument();
        b.addEventListener("execute", doSsvg);
      }
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
