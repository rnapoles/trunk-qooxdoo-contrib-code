/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2002-2004 Walter Zorn
     2008      Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman (derrell)

     This is derived from Walter Zorn's wz_jsgraphics.js which contains the
     following notice:

          This notice must be untouched at all times.

          wz_jsgraphics.js    v. 3.03
          The latest version is available at
          http://www.walterzorn.com
          or http://www.devira.com
          or http://www.walterzorn.de

          Copyright (c) 2002-2004 Walter Zorn. All rights reserved.
          Created 3. 11. 2002 by Walter Zorn (Web: http://www.walterzorn.com )
          Last modified: 28. 1. 2008

          Performance optimizations for Internet Explorer
          by Thomas Frank and John Holdsworth.
          fillPolygon method implemented by Matthieu Haller.

          High Performance JavaScript Graphics Library.
          Provides methods
          - to draw lines, rectangles, ellipses, polygons
                  with specifiable line thickness,
          - to fill rectangles, polygons, ellipses and arcs
          - to draw text.
          NOTE: Operations, functions and branching have rather been optimized
          to efficiency and speed than to shortness of source code.

          LICENSE: LGPL

          This library is free software; you can redistribute it and/or
          modify it under the terms of the GNU Lesser General Public
          License (LGPL) as published by the Free Software Foundation; either
          version 2.1 of the License, or (at your option) any later version.

          This library is distributed in the hope that it will be useful,
          but WITHOUT ANY WARRANTY; without even the implied warranty of
          MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
          Lesser General Public License for more details.

          You should have received a copy of the GNU Lesser General Public
          License along with this library; if not, write to the Free Software
          Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307
          USA, or see http://www.gnu.org/copyleft/lesser.html
*/



     
/**
 * VectorGraphics library by Walter Zorn, converted for use by qooxdoo.  It
 * provides graphics capabilities: functions to draw circles, ellipses
 * (ovals), oblique lines, polylines and polygons (for instance triangles,
 * rectangles) dynamically into a webpage.
 *
 * Note: This library is low-level, writing into a "canvas" (div).  When used
 * by qooxdoo, it must therefore typically be called from a widget's "appear"
 * event handler.
 */
qx.Class.define("graphics.engine.WalterZorn",
{
  extend : qx.core.Object,

  statics :
  {
    /** Font characteristic */
    Font :
    {
      PLAIN       : 'font-weight:normal;',
      BOLD        : 'font-weight:bold;',
      ITALIC      : 'font-style:italic;',
      ITALIC_BOLD : 'font-style:italic;font-weight:bold'
    },

    /** Stroke characteristics.  This may be used in lieu of a stroke width. */
    Stroke :
    {
      DOTTED      : -1
    },

    /** Horizontal text alignment options for {@link drawStringRect} */
    HAlign :
    {
      LEFT        : "left",
      CENTER      : "center",
      RIGHT       : "right",
      JUSTIFY     : "justify"
    },

    /** Regular expression for faster IE string manipulation */
    _regex  :  /%%([^;]+);([^;]+);([^;]+);([^;]+);([^;]+);/g
  },

  construct : function(cnv, wnd)
  {
    if (! qx.core.Variant.isSet("qx.client", "gecko|mshtml|opera|webkit"))
    {
      throw new Error("Unsupported browser");
    }

    // Initialize stroke width: 1 pixel */
    this.setStroke(1);

    // Initilaize font
    this.setFont("verdana,geneva,helvetica,sans-serif",
                 "12px",
                 graphics.engine.WalterZorn.Font.PLAIN);

    // Initialize drawing color
    this.setColor("#000000");

    // HTML for graphics is built up in this variable
    this._htm = "";
  },

  properties :
  {
    /**
     * The size of the div to which we should clip
     *
     * Value should be an object containing the members 'width' and 'height',
     * or null to indicate no clipping.  No clipping means that drawing can
     * occur outside the boundaries of the canvas to which this class is
     * drawing.  It is slightly faster to avoid the need for clipping, but the
     * caller must then be careful that all drawn elements fall within the
     * canvas if that is a requirement of the application.
     */
    clipSize :
    {
      init : null
    }
  },

  members :
  {
    /** Canvas (div) to which we are drawing */
    _canvas : null,

    /**
     * Specify the container div in which the canvas for drawing is
     * inserted.
     *
     * @param container {div}
     *   The container div in which all drawing should take place.
     */
    setContainer : function(container)
    {
      if (! container)
      {
        throw new Error("Missing container parameter");
      }

      if (this._canvas !== null)
      {
        throw new Error("Container may be set only once");
      }

      // Create new canvas inside container DIV. Thus the drawing and
      // clearing methods won't interfere with the container's inner html.
      // Solution suggested by Vladimir.
      this._canvas = window.document.createElement("div");
      this._canvas.style.fontSize=0;
      container.appendChild(this._canvas);
    },

    /**
     * Specifies the color of the drawing "pen". Once set, this color will be
     * used by the subsequently called drawing methods until it is overridden
     * through another call of setColor(). 
     *
     * @param color {String}
     *   The text or hex representation of the color to use.  The value must
     *   be enclosed in quotation marks, and should be hexadecimal following
     *   the pattern "#rrggbb" (as usual with HTML). Color names available in
     *   HTML (for instance "maroon") may be used as well.
     */
    setColor : function(color)
    {
      this._color = color.toLowerCase();
    },

    /**
     * Specifies the thickness of the drawing "pen" for lines and bounding
     * lines of shapes. Once set, this thickness will be used by the
     * subsequently called drawing methods until it is overridden through
     * another call of setStroke(). Default line thickness, before setStroke()
     * is called, is 1 px.
     *  
     * @param stroke {Integer}
     *   The stroke width to use.  As a special case, the value
     *   graphics.engine.WalterZorn.Stroke.DOTTED may be used to specify that
     *   a single-width dotted line is to be used for strokes.
     */
    setStroke : function(stroke)
    {
      this._stroke = stroke;
      if(!(stroke+1))
      {
        this.drawLine = this._mkLinDott;
        this._mkOv = this._mkOvDott;
        this.drawRect = this._mkRectDott;
      }
      else if(stroke-1 > 0)
      {
        this.drawLine = this._mkLin2D;
        this._mkOv = this._mkOv2D;
        this.drawRect = this._mkRect;
      }
      else
      {
        this.drawLine = this._mkLin;
        this._mkOv = this._mkOv;
        this.drawRect = this._mkRect;
      }
    },

    /**
     * This method can be invoked prior to drawString() to specify or change
     * font-family, -size and -style. 
     *  
     * @param family {String}
     *   A string of comma-separated font families,
     *   e.g. "arial,helvetica,sans-serif"
     *
     * @param size {String}
     *   The font size to use.  The units are required, so, for example, you
     *   could use "11px" or "16pt".
     *
     * @param style {graphics.engine.WalterZorn.Font}
     *   One of the font style settings in graphics.engine.WalterZorn.Font.*
     */
    setFont : function(family, size, style)
    {
      this.fontFamily = family;
      this.fontSize = size;
      this.fontStyle = style || graphics.engine.WalterZorn.Font.PLAIN;
    },

    /**
     * A polyline is a series of connected line segments. xPoints and yPoints
     * are arrays which specify the x and y coordinates of each point as
     * follows:
     * <ul>
     * <li>var xPoints = [x1,x2,x3,x4,x5];</li>
     * <li>var yPoints = [y1,y2,y3,y4,y5];</li>
     * </ul>
     *
     * Line thickness is 1px by default, or what has been specified by a call
     * to setStroke().
     *
     * @param xPoints {Array}
     *   The array of x coordinates
     *
     * @param y {Array}
     *   The array of y coordinates
     */
    drawPolyLine : function(x, y)
    {
      for (var i=x.length - 1; i;)
      {
        --i;
        this.drawLine(x[i], y[i], x[i+1], y[i+1]);
      }
    },

    /**
     * Outline of a rectangle.
     *
     * @param x {Integer}
     *   The x attribute of the point at the top-left corner of the
     *   rectangle.
     *
     * @param y {Integer}
     *   The y attribute of the point at the top-left corner of the
     *   rectangle.
     *
     * @param w {Integer}
     *   The width of the rectangle.
     *
     * @param h {Integer}
     *   The height of the rectangle
     */
    drawRect : function(x, y, w, h)
    {
      // actual implementation is overridden in setStroke()
    },

    /**
     * Draw a rectangle.  The rectangle is filled with the currently
     * selected color.
     *
     * @param x {Integer}
     *   The x attribute of the point at the top-left corner of the
     *   rectangle.
     *
     * @param y {Integer}
     *   The y attribute of the point at the top-left corner of the
     *   rectangle.
     *
     * @param w {Integer}
     *   The width of the rectangle.
     *
     * @param h {Integer}
     *   The height of the rectangle
     */
    fillRect : function(x, y, w, h)
    {
      this._mkDiv(x, y, w, h);
    },

    /**
     * Draw a polygon.  A polygon is a polyline (see {@link drawPolyLine})
     * with an additional line segment from the final point provided for the
     * polyline back to the initial point.
     *
     * Line thickness is 1px by default, or what has been specified by a call
     * to setStroke().
     *
     * @param xPoints {Array}
     *   The array of x coordinates
     *
     * @param y {Array}
     *   The array of y coordinates
     */
    drawPolygon : function(xPoints, yPoints)
    {
      this.drawPolyLine(xPoints, yPoints);
      this.drawLine(xPoints[xPoints.length-1], yPoints[xPoints.length-1],
                    xPoints[0], yPoints[0]);
    },

    /**
     * Draw a filled polygon.  See {@link drawPolygon}
     *
     * @param xPoints {Array}
     *   The array of x coordinates
     *
     * @param y {Array}
     *   The array of y coordinates
     *
     * Notes:
     *
     * fillPolygon method, implemented by Matthieu Haller.  This javascript
     * function is an adaptation of the gdImageFilledPolygon for Walter Zorn
     * lib.  C source of GD 1.8.4 found at http://www.boutell.com/gd/
     *   
     * THANKS to Kirsten Schulz for the polygon fixes!
     *   
     * The intersection finding technique of this code could be improved
     * by remembering the previous intertersection, and by using the slope.
     * That could help to adjust intersections to produce a nice
     * interior_extrema.
     */
    fillPolygon : function(xPoints, yPoints)
    {
      var i;
      var y;
      var miny;
      var maxy;
      var x1;
      var y1;
      var x2;
      var y2;
      var ind1;
      var ind2;
      var ints;

      var n = xPoints.length;
      if(!n)
      {
        return;
      }

      miny = yPoints[0];
      maxy = yPoints[0];
     
      for(i = 1; i < n; i++)
      {
        if(yPoints[i] < miny)
        {
          miny = yPoints[i];
        }

        if(yPoints[i] > maxy)
        {
          maxy = yPoints[i];
        }
      }
     
      for(y = miny; y <= maxy; y++)
      {
        var polyInts = new Array();
     
        ints = 0;

        for(i = 0; i < n; i++)
        {
          if(!i)
          {
            ind1 = n-1;
            ind2 = 0;
          }
          else
          {
            ind1 = i-1;
            ind2 = i;
          }
     
          y1 = yPoints[ind1];
          y2 = yPoints[ind2];
     
          if(y1 < y2)
          {
            x1 = xPoints[ind1];
            x2 = xPoints[ind2];
          }
          else if(y1 > y2)
          {
            y2 = yPoints[ind1];
            y1 = yPoints[ind2];
            x2 = xPoints[ind1];
            x1 = xPoints[ind2];
          }
          else
          {
            continue;
          }

          //  Modified 11. 2. 2004 Walter Zorn
          if((y >= y1) && (y < y2))
          {
            polyInts[ints++] = Math.round((y-y1) * (x2-x1) / (y2-y1) + x1);
          }
          else if((y == maxy) && (y > y1) && (y <= y2))
          {
            polyInts[ints++] = Math.round((y-y1) * (x2-x1) / (y2-y1) + x1);
          }
        }
     
        polyInts.sort(function(x, y) { return (x - y); });
     
        for(i = 0; i < ints; i+=2)
        {
          this._mkDiv(polyInts[i], y, polyInts[i+1]-polyInts[i]+1, 1);
        }
      }
    },

    /*
     * Draw an outline of an ellipse.
     *
     * Line thickness is 1px by default, or what has been specified by a call
     * to setStroke().
     *
     * @param x {Integer}
     *   The x attribute of the point at the top-left corner of the
     *   bounding rectangle.
     *
     * @param y {Integer}
     *   The y attribute of the point at the top-left corner of the
     *   bounding rectangle.
     *
     * @param w {Integer}
     *   The width of the bounding rectangle.
     *
     * @param h {Integer}
     *   The height of the bounding rectangle
     */
    drawEllipse : function(x, y, w, h)
    {
      this._mkOv(x, y, w, h);
    },

    /*
     * Draw and fill an ellipse.
     *
     * @param left {Integer}
     *   The x attribute of the point at the top-left corner of the
     *   bounding rectangle.
     *
     * @param top {Integer}
     *   The y attribute of the point at the top-left corner of the
     *   bounding rectangle.
     *
     * @param w {Integer}
     *   The width of the bounding rectangle.
     *
     * @param h {Integer}
     *   The height of the bounding rectangle
     */
    fillEllipse : function(left, top, w, h)
    {
      var a = w>>1;
      var b = h>>1;
      var wod = w&1;
      var hod = h&1;
      var cx = left+a;
      var cy = top+b;
      var x = 0;
      var y = b;
      var oy = b;
      var aa2 = (a*a)<<1;
      var aa4 = aa2<<1;
      var bb2 = (b*b)<<1;
      var bb4 = bb2<<1;
      var st = (aa2>>1)*(1-(b<<1)) + bb2;
      var tt = (bb2>>1) - aa2*((b<<1)-1);
      var xl;
      var dw;
      var dh;
      
      if(w)
      {
        while(y > 0)
        {
          if(st < 0)
          {
            st += bb2*((x<<1)+3);
            tt += bb4*(++x);
          }
          else if(tt < 0)
          {
            st += bb2*((x<<1)+3) - aa4*(y-1);
            xl = cx-x;
            dw = (x<<1)+wod;
            tt += bb4*(++x) - aa2*(((y--)<<1)-3);
            dh = oy-y;
            this._mkDiv(xl, cy-oy, dw, dh);
            this._mkDiv(xl, cy+y+hod, dw, dh);
            oy = y;
          }
          else
          {
            tt -= aa2*((y<<1)-3);
            st -= aa4*(--y);
          }
        }
      }
      this._mkDiv(cx-a, cy-oy, w, (oy<<1)+hod);
    },

    /**
     * Fills a pie section of an ellipse. Start-angle and end-angle may be
     * integer numbers or decimalpoint values. Like with the other
     * ...Ellipse() functions, X and Y specify the left-top corner of the
     * bounding rectangle.
     *
     * @param left {Integer}
     *   The x attribute of the point at the top-left corner of the
     *   bounding rectangle.
     *
     * @param top {Integer}
     *   The y attribute of the point at the top-left corner of the
     *   bounding rectangle.
     *
     * @param w {Integer}
     *   The width of the bounding rectangle.
     *
     * @param h {Integer}
     *   The height of the bounding rectangle
     *
     * @param angleA {Integer|Float}
     *   Starting angle of the arc
     *
     * @param angleZ {Integer|Float}
     *   Ending angle of the arc
     */
    fillArc : function(left, top, w, h, angleA, angleZ)
    {
      var a = w>>1;
      var b = h>>1;
      var iOdds = (w&1) | ((h&1) << 16);
      var cx = left+a;
      var cy = top+b;
      var x = 0;
      var y = b;
      var ox = x;
      var oy = y;
      var aa2 = (a*a)<<1;
      var aa4 = aa2<<1;
      var bb2 = (b*b)<<1;
      var bb4 = bb2<<1;
      var st = (aa2>>1)*(1-(b<<1)) + bb2;
      var tt = (bb2>>1) - aa2*((b<<1)-1);
      
      // Vars for radial boundary lines
      var xEndA;
      var yEndA;
      var xEndZ;
      var yEndZ;
      
      var iSects = (1 << (Math.floor((angleA %= 360.0)/180.0) << 3))
        | (2 << (Math.floor((angleZ %= 360.0)/180.0) << 3))
        | ((angleA >= angleZ) << 16);
      var aBndA = new Array(b+1);
      var aBndZ = new Array(b+1);
		
      // Set up radial boundary lines
      angleA *= Math.PI/180.0;
      angleZ *= Math.PI/180.0;
      xEndA = cx+Math.round(a*Math.cos(angleA));
      yEndA = cy+Math.round(-b*Math.sin(angleA));
      this._mkLinVirt(aBndA, cx, cy, xEndA, yEndA);
      xEndZ = cx+Math.round(a*Math.cos(angleZ));
      yEndZ = cy+Math.round(-b*Math.sin(angleZ));
      this._mkLinVirt(aBndZ, cx, cy, xEndZ, yEndZ);

      while(y > 0)
      {
        if(st < 0) // Advance x
        {
          st += bb2*((x<<1)+3);
          tt += bb4*(++x);
        }
        else if(tt < 0) // Advance x and y
        {
          st += bb2*((x<<1)+3) - aa4*(y-1);
          ox = x;
          tt += bb4*(++x) - aa2*(((y--)<<1)-3);
          this._mkArcDiv(ox, y, oy, cx, cy, iOdds, aBndA, aBndZ, iSects);
          oy = y;
        }
        else // Advance y
        {
          tt -= aa2*((y<<1)-3);
          st -= aa4*(--y);
          if(y && (aBndA[y] != aBndA[y-1] || aBndZ[y] != aBndZ[y-1]))
          {
            this._mkArcDiv(x, y, oy, cx, cy, iOdds, aBndA, aBndZ, iSects);
            ox = x;
            oy = y;
          }
        }
      }
      this._mkArcDiv(x, 0, oy, cx, cy, iOdds, aBndA, aBndZ, iSects);
      if(iOdds >> 16) // Odd height
      {
        if(iSects >> 16) // Start-angle > end-angle
        {
          var xl = (yEndA <= cy || yEndZ > cy)? (cx - x) : cx;
          this._mkDiv(xl, cy, x + cx - xl + (iOdds & 0xffff), 1);
        }
        else if((iSects & 0x01) && yEndZ > cy)
        {
          this._mkDiv(cx - x, cy, x, 1);
        }
      }
    },

    /**
     * Writes text to the specified location.
     *
     * @param x {Integer}
     *   x attribute of the top-left corner of the text bounding rectangle
     *
     * @param y {Integer}
     *   y attribute of the top-left corner of the text bounding rectangle
     *
     * @param text {String}
     *   Text to be drawn.  (Non-escaped) HTML tags inside the string will
     *   be interpreted. For example, "Some Text<br>more Text" would indeed
     *   create a line break.
     */
    drawString : function(x, y, text)
    {
      this._htm += '<div style="position:absolute;white-space:nowrap;'+
        'left:' + x + 'px;'+
        'top:' + y + 'px;'+
        'font-family:' +  this.fontFamily + ';'+
        'font-size:' + this.fontSize + ';'+
        'color:' + this._color + ';' + this.fontStyle + '">'+
        text +
        '<\/div>';
    },

    /**
     * Like drawString(), but allows setting the width of the text rectangle
     * and specifying the horizontal text-alignment.
     *
     * @param x {Integer}
     *   x attribute of the top-left corner of the text bounding rectangle
     *
     * @param y {Integer}
     *   y attribute of the top-left corner of the text bounding rectangle
     *
     * @param w {Integer}
     *   Width of the text bounding rectangle
     *
     * @param hAlign {String}
     *   Horizontal text alignment.  This must be one of the values of
     *   {@link graphics.engine.WalterZorn.HAlign}.
     *
     * @param text {String}
     *   Text to be drawn.  (Non-escaped) HTML tags inside the string will
     *   be interpreted. For example, "Some Text<br>more Text" would indeed
     *   create a line break.
     */
    drawStringRect : function(x, y, w, hAlign, text)
    {
      this._htm += '<div style="position:absolute;overflow:hidden;'+
        'left:' + x + 'px;'+
        'top:' + y + 'px;'+
        'width:'+w +'px;'+
        'text-align:'+hAlign+';'+
        'font-family:' +  this.fontFamily + ';'+
        'font-size:' + this.fontSize + ';'+
        'color:' + this._color + ';' + this.fontStyle + '">'+
        text +
        '<\/div>';
    },

/*
djl -- do we want to even allow this?  what trouble do we get ourselves into?
    drawImage : function(imgSrc, x, y, w, h, a)
    {
      this._htm += '<div style="position:absolute;'+
        'left:' + x + 'px;'+
        'top:' + y + 'px;'+
        // w (width) and h (height) arguments are now optional.
        // Added by Mahmut Keygubatli, 14.1.2008
        (w ? ('width:' +  w + 'px;') : '') +
        (h ? ('height:' + h + 'px;'):'')+'">'+
        '<img src="' + imgSrc +'"' +
        (w ? (' width="' + w + '"'):'') +
        (h ? (' height="' + h + '"'):'') +
        (a ? (' '+a) : '') + '>'+
        '<\/div>';
    },
*/

    /**
     * Paint the graphics by flushing the drawn elements to the browser.
     * Until this method is called, no graphics will be displayed.
     *
     * This is the slowest part of the graphics operation.  It is recommended
     * to avoid extraneous calls to this method.  Typically it should be
     * called only once following a whole series of drawing method calls.
     */
    paint : qx.core.Variant.select("qx.client",
    {
      "mshtml" : function()
      {
        if (this._canvas)
        {
          this._canvas.insertAdjacentHTML("BeforeEnd", this._htmRpc());
        }
        this._htm = "";
      },

      "default" : function()
      {
        if(this._canvas)
        {
          var x = window.document.createRange();
          x.setStartBefore(this._canvas);
          x = x.createContextualFragment(this._htm);
          this._canvas.appendChild(x);
        }
        this._htm = "";
      }
    }),

    clear : function()
    {
      this._htm = "";
      if(this._canvas)
      {
        this._canvas.innerHTML = "";
      }
    },

    _mkOvQds : function(cx, cy, x, y, w, h, wod, hod)
    {
      var xl = cx - x;
      var xr = cx + x + wod - w;
      var yt = cy - y;
      var yb = cy + y + hod - h;
      
      if(xr > xl+w)
      {
        this._mkDiv(xr, yt, w, h);
        this._mkDiv(xr, yb, w, h);
      }
      else
      {
        w = xr - xl + w;
      }
      this._mkDiv(xl, yt, w, h);
      this._mkDiv(xl, yb, w, h);
    },
	
    _mkArcDiv : function(x, y, oy, cx, cy, iOdds, aBndA, aBndZ, iSects)
    {
      var xrDef = cx + x + (iOdds & 0xffff);
      var y2;
      var h = oy - y;
      var xl;
      var xr;
      var w;

      if(!h)
      {
        h = 1;
      }
      x = cx - x;

      if(iSects & 0xff0000) // Start-angle > end-angle
      {
        y2 = cy - y - h;
        if(iSects & 0x00ff)
        {
          if(iSects & 0x02)
          {
            xl = Math.max(x, aBndZ[y]);
            w = xrDef - xl;
            if(w > 0) this._mkDiv(xl, y2, w, h);
          }

          if(iSects & 0x01)
          {
            xr = Math.min(xrDef, aBndA[y]);
            w = xr - x;
            if(w > 0)
            {
              this._mkDiv(x, y2, w, h);
            }
          }
        }
        else
        {
          this._mkDiv(x, y2, xrDef - x, h);
        }
     
        y2 = cy + y + (iOdds >> 16);
        if(iSects & 0xff00)
        {
          if(iSects & 0x0100)
          {
            xl = Math.max(x, aBndA[y]);
            w = xrDef - xl;
            if(w > 0) this._mkDiv(xl, y2, w, h);
          }
     
          if(iSects & 0x0200)
          {
            xr = Math.min(xrDef, aBndZ[y]);
            w = xr - x;
            if(w > 0)
            {
              this._mkDiv(x, y2, w, h);
            }
          }
        }
        else
        {
          this._mkDiv(x, y2, xrDef - x, h);
        }
      }
      else
      {
        if(iSects & 0x00ff)
        {
          if(iSects & 0x02)
          {
            xl = Math.max(x, aBndZ[y]);
          }
          else
          {
            xl = x;
          }
     
          if(iSects & 0x01)
          {
            xr = Math.min(xrDef, aBndA[y]);
          }
          else
          {
            xr = xrDef;
          }
     
          y2 = cy - y - h;
          w = xr - xl;
          if(w > 0)
          {
            this._mkDiv(xl, y2, w, h);
          }
        }
     
        if(iSects & 0xff00)
        {
          if(iSects & 0x0100)
          {
            xl = Math.max(x, aBndA[y]);
          }
          else
          {
            xl = x;
          }
          
          if(iSects & 0x0200)
          {
            xr = Math.min(xrDef, aBndZ[y]);
          }
          else
          {
            xr = xrDef;
          }
          
          y2 = cy + y + (iOdds >> 16);
          w = xr - xl;
          if(w > 0)
          {
            this._mkDiv(xl, y2, w, h);
          }
        }
      }
    },

    _mkDiv : function(x, y, w, h)
    {
      var clip = [];
      var clipSize = this.getClipSize();
      if (clipSize)
      {
        clip.push('clip:rect(');

        // clip top
        clip.push(y < 0 ? -y : 0);
        clip.push('px,');

        // clip right
        clip.push(x + w > clipSize.width ? clipSize.width - x : w);
        clip.push('px,');

        // clip bottom
        clip.push(y + h > clipSize.height ? clipSize.height - y : h);
        clip.push('px,');

        // clip left
        clip.push(x < 0 ? -x : 0);
        clip.push('px');

        clip.push(');');
      }

      this._htm += '<div style="position:absolute;'+
        'left:' + x + 'px;'+
        'top:' + y + 'px;'+
        'width:' + w + 'px;'+
        'height:' + h + 'px;'+
        'background-color:' + this._color + ';' +
        clip.join('') +
        'overflow:hidden;' +
        '"><\/div>';
    },

    _mkDivIe : function(x, y, w, h)
    {
      this._htm += '%%'+this._color+';'+x+';'+y+';'+w+';'+h+';';
    },

    _htmRpc : function()
    {
      var clip = [];
      var clipSize = this.getClipSize();
      if (clipSize)
      {
        clip.push('clip:rect(');

        // clip top
        clip.push(y < 0 ? -y : 0);
        clip.push('px,');

        // clip right
        clip.push(x + w > clipSize.width ? clipSize.width - x : w);
        clip.push('px,');

        // clip bottom
        clip.push(y + h > clipSize.height ? clipSize.height - y : h);
        clip.push('px,');

        // clip left
        clip.push(x < 0 ? -x : 0);
        clip.push('px');

        clip.push(');');
      }

      return this._htm.replace(
        graphics.engine.WalterZorn._regex,
        '<div style="overflow:hidden;position:absolute;' +
        clip.join('') +
        'background-color:'+
        '$1;left:$2;top:$3;width:$4;height:$5"></div>\n');
    },

    _mkLin : function(x1, y1, x2, y2)
    {
      if(x1 > x2)
      {
        var _x2 = x2;
        var _y2 = y2;
        x2 = x1;
        y2 = y1;
        x1 = _x2;
        y1 = _y2;
      }
      var dx = x2-x1;
      var dy = Math.abs(y2-y1);
      var x = x1;
      var y = y1;
      var yIncr = (y1 > y2)? -1 : 1;

      if(dx >= dy)
      {
        var pr = dy<<1;
        var pru = pr - (dx<<1);
        var p = pr-dx;
        var ox = x;
        
        while(dx > 0)
        {
          --dx;
          ++x;
          if(p > 0)
          {
            this._mkDiv(ox, y, x-ox, 1);
            y += yIncr;
            p += pru;
            ox = x;
          }
          else
          {
            p += pr;
          }
        }
        this._mkDiv(ox, y, x2-ox+1, 1);
      }
      else
      {
        var pr = dx<<1;
        var pru = pr - (dy<<1);
        var p = pr-dy;
        var oy = y;
        
        if(y2 <= y1)
        {
          while(dy > 0)
          {
            --dy;
            if(p > 0)
            {
              this._mkDiv(x++, y, 1, oy-y+1);
              y += yIncr;
              p += pru;
              oy = y;
            }
            else
            {
              y += yIncr;
              p += pr;
            }
          }
          this._mkDiv(x2, y2, 1, oy-y2+1);
        }
        else
        {
          while(dy > 0)
          {
            --dy;
            y += yIncr;
            if(p > 0)
            {
              this._mkDiv(x++, oy, 1, y-oy);
              p += pru;
              oy = y;
            }
            else p += pr;
          }
          this._mkDiv(x2, oy, 1, y2-oy+1);
        }
      }
    },

    _mkLin2D : function(x1, y1, x2, y2)
    {
      if(x1 > x2)
      {
        var _x2 = x2;
        var _y2 = y2;
        x2 = x1;
        y2 = y1;
        x1 = _x2;
        y1 = _y2;
      }
      var dx = x2-x1;
      var dy = Math.abs(y2-y1);
      var x = x1;
      var y = y1;
      var yIncr = (y1 > y2)? -1 : 1;
      var s = this._stroke;
      var _s;

      if(dx >= dy)
      {
        if(dx > 0 && s-3 > 0)
        {
          _s = (s*dx*Math.sqrt(1+dy*dy/(dx*dx))-dx-(s>>1)*dy) / dx;
          _s = (!(s-4)? Math.ceil(_s) : Math.round(_s)) + 1;
        }
        else
        {
          _s = s;
        }
        var ad = Math.ceil(s/2);

        var pr = dy<<1;
        var pru = pr - (dx<<1);
        var p = pr-dx;
        var ox = x;
        
        while(dx > 0)
        {
          --dx;
          ++x;
          if(p > 0)
          {
            this._mkDiv(ox, y, x-ox+ad, _s);
            y += yIncr;
            p += pru;
            ox = x;
          }
          else p += pr;
        }
        this._mkDiv(ox, y, x2-ox+ad+1, _s);
      }
      else
      {
        if(s-3 > 0)
        {
          _s = (s*dy*Math.sqrt(1+dx*dx/(dy*dy))-(s>>1)*dx-dy) / dy;
          _s = (!(s-4)? Math.ceil(_s) : Math.round(_s)) + 1;
        }
        else
        {
          _s = s;
        }
        var ad = Math.round(s/2);

        var pr = dx<<1;
        var pru = pr - (dy<<1);
        var p = pr-dy;
        var oy = y;
        
        if(y2 <= y1)
        {
          ++ad;
          while(dy > 0)
          {
            --dy;
            if(p > 0)
            {
              this._mkDiv(x++, y, _s, oy-y+ad);
              y += yIncr;
              p += pru;
              oy = y;
            }
            else
            {
              y += yIncr;
              p += pr;
            }
          }
          this._mkDiv(x2, y2, _s, oy-y2+ad);
        }
        else
        {
          while(dy > 0)
          {
            --dy;
            y += yIncr;
            if(p > 0)
            {
              this._mkDiv(x++, oy, _s, y-oy+ad);
              p += pru;
              oy = y;
            }
            else
            {
              p += pr;
            }
          }
          this._mkDiv(x2, oy, _s, y2-oy+ad+1);
        }
      }
    },

    _mkLinDott : function(x1, y1, x2, y2)
    {
      if(x1 > x2)
      {
        var _x2 = x2;
        var _y2 = y2;
        x2 = x1;
        y2 = y1;
        x1 = _x2;
        y1 = _y2;
      }
      var dx = x2-x1;
      var dy = Math.abs(y2-y1);
      var x = x1;
      var y = y1;
      var yIncr = (y1 > y2)? -1 : 1;
      var drw = true;
      
      if(dx >= dy)
      {
        var pr = dy<<1;
        var pru = pr - (dx<<1);
        var p = pr-dx;
        
        while(dx > 0)
        {
          --dx;
          if(drw)
          {
            this._mkDiv(x, y, 1, 1);
          }
          drw = !drw;
          if(p > 0)
          {
            y += yIncr;
            p += pru;
          }
          else
          {
            p += pr;
          }
          ++x;
        }
      }
      else
      {
        var pr = dx<<1;
        var pru = pr - (dy<<1);
        var p = pr-dy;
        
        while(dy > 0)
        {
          --dy;
          if(drw)
          {
            this._mkDiv(x, y, 1, 1);
          }
          drw = !drw;
          y += yIncr;
          if(p > 0)
          {
            ++x;
            p += pru;
          }
          else
          {
            p += pr;
          }
        }
      }
      if(drw)
      {
        this._mkDiv(x, y, 1, 1);
      }
    },

    _mkOv : function(left, top, width, height)
    {
      var a = (++width)>>1;
      var b = (++height)>>1;
      var wod = width&1;
      var hod = height&1;
      var cx = left+a;
      var cy = top+b;
      var x = 0;
      var y = b;
      var ox = 0;
      var oy = b;
      var aa2 = (a*a)<<1;
      var aa4 = aa2<<1;
      var bb2 = (b*b)<<1;
      var bb4 = bb2<<1;
      var st = (aa2>>1)*(1-(b<<1)) + bb2;
      var tt = (bb2>>1) - aa2*((b<<1)-1);
      var w;
      var h;
      
      while(y > 0)
      {
        if(st < 0)
        {
          st += bb2*((x<<1)+3);
          tt += bb4*(++x);
        }
        else if(tt < 0)
        {
          st += bb2*((x<<1)+3) - aa4*(y-1);
          tt += bb4*(++x) - aa2*(((y--)<<1)-3);
          w = x-ox;
          h = oy-y;
          if((w&2) && (h&2))
          {
            this._mkOvQds(cx, cy, x-2, y+2, 1, 1, wod, hod);
            this._mkOvQds(cx, cy, x-1, y+1, 1, 1, wod, hod);
          }
          else
          {
            this._mkOvQds(cx, cy, x-1, oy, w, h, wod, hod);
          }
          ox = x;
          oy = y;
        }
        else
        {
          tt -= aa2*((y<<1)-3);
          st -= aa4*(--y);
        }
      }
      w = a-ox+1;
      h = (oy<<1)+hod;
      y = cy-oy;
      this._mkDiv(cx-a, y, w, h);
      this._mkDiv(cx+ox+wod-1, y, w, h);
    },

    _mkOv2D : function(left, top, width, height)
    {
      var s = this._stroke;
      width += s+1;
      height += s+1;
      var a = width>>1;
      var b = height>>1;
      var wod = width&1;
      var hod = height&1;
      var cx = left+a;
      var cy = top+b;
      var x = 0;
      var y = b;
      var aa2 = (a*a)<<1, aa4 = aa2<<1;
      var bb2 = (b*b)<<1, bb4 = bb2<<1;
      var st = (aa2>>1)*(1-(b<<1)) + bb2;
      var tt = (bb2>>1) - aa2*((b<<1)-1);

      if(s-4 < 0 && (!(s-2) || width-51 > 0 && height-51 > 0))
      {
        var ox = 0;
        var oy = b;
        var w;
        var h;
        var pxw;
        
        while(y > 0)
        {
          if(st < 0)
          {
            st += bb2*((x<<1)+3);
            tt += bb4*(++x);
          }
          else if(tt < 0)
          {
            st += bb2*((x<<1)+3) - aa4*(y-1);
            tt += bb4*(++x) - aa2*(((y--)<<1)-3);
            w = x-ox;
            h = oy-y;

            if(w-1)
            {
              pxw = w+1+(s&1);
              h = s;
            }
            else if(h-1)
            {
              pxw = s;
              h += 1+(s&1);
            }
            else
            {
              pxw = h = s;
            }
            this._mkOvQds(cx, cy, x-1, oy, pxw, h, wod, hod);
            ox = x;
            oy = y;
          }
          else
          {
            tt -= aa2*((y<<1)-3);
            st -= aa4*(--y);
          }
        }
        this._mkDiv(cx-a, cy-oy, s, (oy<<1)+hod);
        this._mkDiv(cx+a+wod-s, cy-oy, s, (oy<<1)+hod);
      }
      else
      {
        var _a = (width-(s<<1))>>1;
        var _b = (height-(s<<1))>>1;
        var _x = 0;
        var _y = _b;
        var _aa2 = (_a*_a)<<1;
        var _aa4 = _aa2<<1;
        var _bb2 = (_b*_b)<<1;
        var _bb4 = _bb2<<1;
        var _st = (_aa2>>1)*(1-(_b<<1)) + _bb2;
        var _tt = (_bb2>>1) - _aa2*((_b<<1)-1);
        var pxl = new Array();
        var pxt = new Array();
        var _pxb = new Array();
        
        pxl[0] = 0;
        pxt[0] = b;
        _pxb[0] = _b-1;
        
        while(y > 0)
        {
          if(st < 0)
          {
            pxl[pxl.length] = x;
            pxt[pxt.length] = y;
            st += bb2*((x<<1)+3);
            tt += bb4*(++x);
          }
          else if(tt < 0)
          {
            pxl[pxl.length] = x;
            st += bb2*((x<<1)+3) - aa4*(y-1);
            tt += bb4*(++x) - aa2*(((y--)<<1)-3);
            pxt[pxt.length] = y;
          }
          else
          {
            tt -= aa2*((y<<1)-3);
            st -= aa4*(--y);
          }

          if(_y > 0)
          {
            if(_st < 0)
            {
              _st += _bb2*((_x<<1)+3);
              _tt += _bb4*(++_x);
              _pxb[_pxb.length] = _y-1;
            }
            else if(_tt < 0)
            {
              _st += _bb2*((_x<<1)+3) - _aa4*(_y-1);
              _tt += _bb4*(++_x) - _aa2*(((_y--)<<1)-3);
              _pxb[_pxb.length] = _y-1;
            }
            else
            {
              _tt -= _aa2*((_y<<1)-3);
              _st -= _aa4*(--_y);
              _pxb[_pxb.length-1]--;
            }
          }
        }

        var ox = -wod;
        var oy = b;
        var _oy = _pxb[0];
        var l = pxl.length;
        var w;
        var h;
        
        for(var i = 0; i < l; i++)
        {
          if(typeof _pxb[i] != "undefined")
          {
            if(_pxb[i] < _oy || pxt[i] < oy)
            {
              x = pxl[i];
              this._mkOvQds(cx, cy, x, oy, x-ox, oy-_oy, wod, hod);
              ox = x;
              oy = pxt[i];
              _oy = _pxb[i];
            }
          }
          else
          {
            x = pxl[i];
            this._mkDiv(cx-x, cy-oy, 1, (oy<<1)+hod);
            this._mkDiv(cx+ox+wod, cy-oy, 1, (oy<<1)+hod);
            ox = x;
            oy = pxt[i];
          }
        }
        this._mkDiv(cx-a, cy-oy, 1, (oy<<1)+hod);
        this._mkDiv(cx+ox+wod, cy-oy, 1, (oy<<1)+hod);
      }
    },

    _mkOvDott : function(left, top, width, height)
    {
      var a = (++width)>>1;
      var b = (++height)>>1;
      var wod = width&1;
      var hod = height&1;
      var hodu = hod^1;
      var cx = left+a;
      var cy = top+b;
      var x = 0;
      var y = b;
      var aa2 = (a*a)<<1;
      var aa4 = aa2<<1;
      var bb2 = (b*b)<<1;
      var bb4 = bb2<<1;
      var st = (aa2>>1)*(1-(b<<1)) + bb2;
      var tt = (bb2>>1) - aa2*((b<<1)-1);
      var drw = true;
      
      while(y > 0)
      {
        if(st < 0)
        {
          st += bb2*((x<<1)+3);
          tt += bb4*(++x);
        }
        else if(tt < 0)
        {
          st += bb2*((x<<1)+3) - aa4*(y-1);
          tt += bb4*(++x) - aa2*(((y--)<<1)-3);
        }
        else
        {
          tt -= aa2*((y<<1)-3);
          st -= aa4*(--y);
        }
        if(drw && y >= hodu)
        {
          this._mkOvQds(cx, cy, x, y, 1, 1, wod, hod);
        }
        drw = !drw;
      }
    },

    _mkRect : function(x, y, w, h)
    {
      var s = this._stroke;
      this._mkDiv(x, y, w, s);
      this._mkDiv(x+w, y, s, h);
      this._mkDiv(x, y+h, w+s, s);
      this._mkDiv(x, y+s, s, h-s);
    },

    _mkRectDott : function(x, y, w, h)
    {
      this.drawLine(x, y, x+w, y);
      this.drawLine(x+w, y, x+w, y+h);
      this.drawLine(x, y+h, x+w, y+h);
      this.drawLine(x, y, x, y+h);
    },

     _mkLinVirt : function(aLin, x1, y1, x2, y2)
    {
      var dx = Math.abs(x2-x1);
      var dy = Math.abs(y2-y1);
      var x = x1;
      var y = y1;
      var xIncr = (x1 > x2)? -1 : 1;
      var yIncr = (y1 > y2)? -1 : 1;
      var p;
      var i = 0;
      
      if(dx >= dy)
      {
        var pr = dy<<1;
        var pru = pr - (dx<<1);
        
        p = pr-dx;
        while(dx > 0)
        {
          --dx;
          if(p > 0)    //  Increment y
          {
            aLin[i++] = x;
            y += yIncr;
            p += pru;
          }
          else p += pr;
          x += xIncr;
        }
      }
      else
      {
        var pr = dx<<1;
        var pru = pr - (dy<<1);
        
        p = pr-dy;
        while(dy > 0)
        {
          --dy;
          y += yIncr;
          aLin[i++] = x;
          if(p > 0)    //  Increment x
          {
            x += xIncr;
            p += pru;
          }
          else p += pr;
        }
      }
      
      for(var len = aLin.length, i = len-i; i;)
      {
        aLin[len-(i--)] = x;
      }
    }
  }
});
