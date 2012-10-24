/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * Abstract base class for the HBox and VBox decorators.
 * This decorator uses three images, which are positioned in a
 * vertical/horizontal line. The first and last image always keep their
 * original size. The center image is stretched.
 */

qx.Class.define("qx.ui.decoration.AbstractBox",
{
  extend: qx.ui.decoration.Abstract,
  implement : [qx.ui.decoration.IDecorator],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param baseImage {String} Base image to use
   * @param insets {Integer|Array} Insets for the grid
   * @param orientation {String} Vertical or horizontal orientation
   */
  construct : function(baseImage, insets, orientation)
  {
    this.base(arguments);
    this._setOrientation(orientation);

    if (qx.ui.decoration.css3.BorderImage.IS_SUPPORTED)
    {
      this.__impl = new qx.ui.decoration.css3.BorderImage();
      if (baseImage) {
        this.__setBorderImage(baseImage, orientation);
      }

      // Initialize properties
      if (insets != null) {
        this.__impl.setInsets(insets);
      }
    }
    else
    {
      this.__impl = new qx.ui.decoration.BoxDiv(baseImage, insets, orientation);
    }

    // ignore the internal used implementation in the dispose debugging [BUG #5343]
    if (qx.core.Environment.get("qx.debug.dispose")) {
      this.__impl.$$ignoreDisposeWarning = true;
    }
  },





  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Base image URL. All the different images needed are named by the default
     * naming scheme:
     *
     * ${baseImageWithoutExtension}-${imageName}.${baseImageExtension}
     *
     * These image names are used:
     *
     * * t: top side (vertical orientation)
     * * b: bottom side (vertical orientation)
     *
     * * l: left side (horizontal orientation)
     * * r: right side (horizontal orientation)
     *
     * * c: center image
     */
    baseImage :
    {
      check : "String",
      nullable : true,
      apply : "_applyBaseImage"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __impl : null,
    _isHorizontal : null,


    /**
     * Helper to set the orientation.
     *
     * @param orientation {String} horizontal or vertical
     */
    _setOrientation : function(orientation) {
      this._isHorizontal = orientation == "horizontal";
    },


    // interface implementation
    getMarkup : function() {
      return this.__impl.getMarkup();
    },


    // interface implementation
    resize : function(element, width, height) {
      this.__impl.resize(element, width, height);
    },


    // interface implementation
    tint : function(element, bgcolor) {
      // do nothing
    },


    // interface implementation
    getInsets : function() {
      return this.__impl.getInsets();
    },


    // property apply
    _applyInsets : function(value, old, name)
    {
      var setter = "set" + qx.lang.String.firstUp(name);
      this.__impl[setter](value);
    },


    // property apply
    _applyBaseImage : function(value, old)
    {
      if (this.__impl instanceof qx.ui.decoration.BoxDiv) {
        this.__impl.setBaseImage(value);
      } else {
        this.__setBorderImage(value);
      }
    },


    /**
     * Configures the border image decorator
     *
     * @param baseImage {String} URL of the base image
     */
    __setBorderImage : function(baseImage)
    {

      this.__impl.setBorderImage(baseImage);

      var base = qx.util.AliasManager.getInstance().resolve(baseImage);
      var split = /(.*)(\.[a-z]+)$/.exec(base);
      var prefix = split[1];
      var ext = split[2];

      var ResourceManager = qx.util.ResourceManager.getInstance();

      // Show a warning message that the baseImage is not available
      // otherwise the developer would only see a property error message
      // without mentioning which resource is missing.
      if (qx.core.Environment.get("qx.debug"))
      {
        if (!ResourceManager.has(base)) {
          this.warn("The border image '" + base + "' is not available!");
        }
      }

      if (this._isHorizontal)
      {
        var leftSlice = ResourceManager.getImageWidth(prefix + "-l" + ext);
        var rightSlice = ResourceManager.getImageWidth(prefix + "-r" + ext);
        this.__impl.setSlice([0, rightSlice, 0, leftSlice]);
    }
      else
      {
        var bottomSlice = ResourceManager.getImageHeight(prefix + "-b" + ext);
        var topSlice = ResourceManager.getImageHeight(prefix + "-t" + ext);
        this.__impl.setSlice([topSlice, 0, bottomSlice, 0]);
      }

    }

  },



  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this.__markup = this.__images = this.__edges = null;
    this.__impl.dispose();
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Abstract base class for the HBox and VBox decorators.
 *
 * This decorator uses three images, which are positioned in a vertical/horizontal
 * line. The first and last image always keep their original size. The center
 * image is stretched.
 */
qx.Class.define("qx.ui.decoration.BoxDiv",
{
  extend : qx.ui.decoration.Abstract,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param baseImage {String} Base image to use
   * @param insets {Integer|Array} Insets for the grid
   * @param orientation {String} Vertical or horizontal orientation
   */
  construct : function(baseImage, insets, orientation)
  {
    this.base(arguments);
    this._setOrientation(orientation);

    // Initialize properties
    if (baseImage != null) {
      this.setBaseImage(baseImage);
    }

    if (insets != null) {
      this.setInsets(insets);
    }
  },





  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Base image URL. All the different images needed are named by the default
     * naming scheme:
     *
     * ${baseImageWithoutExtension}-${imageName}.${baseImageExtension}
     *
     * These image names are used:
     *
     * * t: top side (vertical orientation)
     * * b: bottom side (vertical orientation)
     *
     * * l: left side (horizontal orientation)
     * * r: right side (horizontal orientation)
     *
     * * c: center image
     */
    baseImage :
    {
      check : "String",
      nullable : true,
      apply : "_applyBaseImage"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __markup : null,
    __images : null,
    __edges : null,


    // overridden
    _getDefaultInsets : function()
    {
      return {
        top : 0,
        right : 0,
        bottom : 0,
        left : 0
      };
    },


    // overridden
    _isInitialized: function() {
      return !!this.__markup;
    },


    /**
     * Helper to set the orientation.
     *
     * @param orientation {String} horizontal or vertical
     */
    _setOrientation : function(orientation) {
      this._isHorizontal = orientation == "horizontal";
    },


    /*
    ---------------------------------------------------------------------------
      INTERFACE IMPLEMENTATION
    ---------------------------------------------------------------------------
    */

    // interface implementation
    getMarkup : function()
    {
      if (this.__markup) {
        return this.__markup;
      }

      var Decoration = qx.bom.element.Decoration;
      var images = this.__images;
      var edges = this.__edges;

      var html = [];

      // Outer frame
      // Note: Overflow=hidden is needed for Safari 3.1 to omit scrolling through
      // dragging when the cursor is in the text field in Spinners etc.
      html.push('<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">');

      if (this._isHorizontal)
      {
        html.push(Decoration.create(images.l, "no-repeat", { top: 0, left: 0 }));
        html.push(Decoration.create(images.c, "repeat-x", { top: 0, left: edges.left + "px" }));
        html.push(Decoration.create(images.r, "no-repeat", { top: 0, right : 0 }));
      }
      else
      {
        html.push(Decoration.create(images.t, "no-repeat", { top: 0, left: 0 }));
        html.push(Decoration.create(images.c, "repeat-y", { top: edges.top + "px", left: edges.left + "px" }));
        html.push(Decoration.create(images.b, "no-repeat", { bottom: 0, left:0 }));
      }

      // Outer frame
      html.push('</div>');

      // Store
      return this.__markup = html.join("");
    },


    // interface implementation
    resize : function(element, width, height)
    {
      element.style.width = width + "px";
      element.style.height = height + "px";

      // Compute inner sizes
      var edges = this.__edges;

      if (this._isHorizontal)
      {
        var innerWidth = width - edges.left - edges.right;
        // Fix to keep applied size above zero
        // Makes issues in IE7 when applying value like '-4px'
        innerWidth = innerWidth < 0 ? 0 : innerWidth;
        element.childNodes[1].style.width = innerWidth + "px";
      }
      else
      {
        var innerHeight = height - edges.top - edges.bottom;
        // Fix to keep applied size above zero
        // Makes issues in IE7 when applying value like '-4px'
        innerHeight = innerHeight < 0 ? 0 : innerHeight;
        element.childNodes[1].style.height = innerHeight + "px";
      }

      if ((qx.core.Environment.get("engine.name") == "mshtml"))
      {
        // Internet Explorer as of version 6 or version 7 in quirks mode
        // have rounding issues when working with odd dimensions:
        // right and bottom positioned elements are rendered with a
        // one pixel negative offset which results into some ugly
        // render effects.
        if (
          parseFloat(qx.core.Environment.get("engine.version")) < 7 ||
          (qx.core.Environment.get("browser.quirksmode") &&
           parseFloat(qx.core.Environment.get("engine.version")) < 8)
        ) {
          if (this._isHorizontal) {
            element.childNodes[2].style.marginRight = (width%2 == 1) ? "-1px" : "0";
          } else {
            element.childNodes[2].style.marginBottom = (height%2 == 1) ? "-1px" : "0";
          }
        }
      }
    },


    // interface implementation
    tint : function(element, bgcolor) {
      // not implemented
    },


    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */


    // property apply
    _applyBaseImage : function(value, old)
    {
      if (qx.core.Environment.get("qx.debug"))
      {
        if (this.__markup) {
          throw new Error("This decorator is already in-use. Modification is not possible anymore!");
        }
      }

      var ResourceManager = qx.util.ResourceManager.getInstance();
      if (value)
      {
        var Alias = qx.util.AliasManager.getInstance();

        var base = Alias.resolve(value);
        var split = /(.*)(\.[a-z]+)$/.exec(base);
        var prefix = split[1];
        var ext = split[2];

        // Store images
        var images = this.__images =
        {
          t : prefix + "-t" + ext,
          b : prefix + "-b" + ext,

          c : prefix + "-c" + ext,

          l : prefix + "-l" + ext,
          r : prefix + "-r" + ext
        };

        // Store edges
        this.__edges =
        {
          top : ResourceManager.getImageHeight(images.t),
          bottom : ResourceManager.getImageHeight(images.b),
          left : ResourceManager.getImageWidth(images.l),
          right : ResourceManager.getImageWidth(images.r)
        };
      }
    }
  },



  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this.__markup = this.__images = this.__edges = null;
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * The VBox decorator uses three images, which are rendered in a column.
 *
 * The first and last image always keep their original size. The center
 * image is stretched vertically.
 *
 * This decorator can be used for widgets with a fixed width, which can be
 * stretched vertically.
 */
qx.Class.define("qx.ui.decoration.VBox",
{
  extend : qx.ui.decoration.AbstractBox,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param baseImage {String} Base image to use
   * @param insets {Integer|Array} Insets for the grid
   */
  construct : function(baseImage, insets)
  {
    this.base(arguments, baseImage, insets, "vertical");
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * The HBox decorator uses three images, which are rendered in a row.
 *
 * The first and last image always keep their original size. The center
 * image is stretched horizontally.
 *
 * This decorator can be used for widgets with a fixed height, which can be
 * stretched horizontally.
 */
qx.Class.define("qx.ui.decoration.HBox",
{
  extend : qx.ui.decoration.AbstractBox,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param baseImage {String} Base image to use
   * @param insets {Integer|Array} Insets for the grid
   */
  construct : function(baseImage, insets)
  {
    this.base(arguments, baseImage, insets, "horizontal");
  }
});
/* ************************************************************************

   Copyright:
     2010 Guilherme R. Aiolfi

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
 * Guilherme R. Aiolfi (guilhermeaiolfi)
     * John Spackman (john.spackman@zenesis.com)

   ======================================================================

   This class contains code and resources based on the following work:

 * Aristo
     http://github.com/280north/aristo

     License:
       http://creativecommons.org/licenses/by-sa/3.0/us/

     Authors:
 * 280 North, Inc., http://280north.com/
 * Sofa, http://madebysofa.com/

 ************************************************************************ */

/* ************************************************************************

 #asset(aristo/decoration/*)

 ************************************************************************* */

/**
 * The Aristo decoration theme.
 */
qx.Theme.define("aristo.theme.Decoration", {

	decorations : {

		"main" : {
			decorator : qx.ui.decoration.Uniform,

			style : {
				width : 1,
				color : "border-main"
			}
		},

		"border-invalid" : {
			decorator : qx.ui.decoration.Uniform,

			style : {
				width : 2,
				color : "invalid"
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * BUTTON
		 * ---------------------------------------------------------------------------
		 */

		"button" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/form/button.png",
				insets : 2
			}
		},
		"button-css": {
			decorator: [ qx.ui.decoration.MLinearBackgroundGradient, 
			             qx.ui.decoration.MBorderRadius, 
			             qx.ui.decoration.MSingleBorder ],
            style: {
				startColor: "button-gradient-start",
				endColor: "button-gradient-end",
				radius: 2,
				width: 1,
				color: "border-main"
            }
		},

		"button-hovered" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/form/button-hovered.png",
				insets : 2
			}
		},
		"button-hovered-css": {
			decorator: [ qx.ui.decoration.MLinearBackgroundGradient, 
			             qx.ui.decoration.MBorderRadius, 
			             qx.ui.decoration.MSingleBorder ],
            style: {
				startColor: "button-active-gradient-start",
				endColor: "button-active-gradient-end",
				radius: 2,
				width: 1,
				color: "border-main"
            }
		},
		
		"button-pressed" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/form/button-pressed.png",
				insets : 2
			}
		},
		"button-pressed-css": {
			decorator: [ qx.ui.decoration.MLinearBackgroundGradient, 
			             qx.ui.decoration.MBorderRadius, 
			             qx.ui.decoration.MSingleBorder ],
            style: {
				startColor: "button-gradient-end",
				endColor: "button-gradient-start",
				radius: 2,
				width: 1,
				color: "border-main"
            }
		},

		"button-checked" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/form/button-checked.png",
				insets : 2
			}
		},
		"button-checked-css": { 
			include: "button-pressed-css" 
		},

		"button-disabled" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/form/button-disabled.png",
				insets : 2
			}
		},
		"button-disabled-css": { include: "button-disabled" },
		

		/*******************************************************
		 * SHADOW ******************************
		 */

		"shadow" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/shadow/shadow.png",
				insets : 3
			}
		},
		"shadow-cssXX": {
			decorator: [ qx.ui.decoration.MSingleBorder, qx.ui.decoration.MBorderRadius, qx.ui.decoration.MBoxShadow ],
			
			style: {
				width: 1,
				color: "button-focused-shadow",
				radius: 2,
				shadowLength: 0,
				shadowBlurRadius: 2,
				shadowColor: "button-focused-shadow"
			}
		},
	    "shadow-css" :
	    {
	      decorator : qx.ui.decoration.Single,

	      style :
	      {
	        color : "invalid",
	        width : 1
	      }
	    },

		"shadow-window-inactive" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/shadow/shadow-window.png",
				insets : [ 4, 9, 12, 8 ]
			}
		},

		"shadow-window-active" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/shadow/shadow-window-active.png",
				insets : [ 4, 8, 12, 8 ]
			}
		},

		"red-shadow" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/shadow/red-shadow.png",
				insets : 3
			}
		},
		"gray-shadow" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/shadow/gray-shadow.png",
				insets : 3
			}
		},

		"shadow-popup" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/shadow/shadow-small.png",
				insets : [ 0, 3, 3, 0 ]
			}
		},

		/*******************************************************
		 * INPUT
		 ******************************************************/

		"input" : {
			decorator : qx.ui.decoration.Beveled,

			style : {
				outerColor : "border-input",
				innerColor : "white",
				innerOpacity : 0.5,
				backgroundImage : "aristo/decoration/form/input.png",
				backgroundRepeat : "repeat-x",
				backgroundColor : "white"
			}
		},

		"spinner-input" : {
			decorator : [ qx.ui.decoration.MBackgroundColor ],

			style : {
				backgroundColor : "white"
			}
		},

		"list" : {
			decorator : qx.ui.decoration.Single,
			style : {
				width : 1,
				width : 1,

				color : "#b8b8b8",

				style : "solid"
			}
		},

		"selected" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundColor : "background-item-selected"
			}
		},

		"scrollbar-horizontal" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundImage : "aristo/decoration/scrollbar/scrollbar-bg-horizontal.png",
				backgroundRepeat : "repeat-x"
			}
		},

		"scrollbar-vertical" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundImage : "aristo/decoration/scrollbar/scrollbar-bg-vertical.png",
				backgroundRepeat : "repeat-y"
			}
		},

		"scroll-bt-up" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundImage : "aristo/decoration/scrollbar/scrollbar-bg-button-t.png"
			}
		},
		"scroll-bt-down" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundImage : "aristo/decoration/scrollbar/scrollbar-bg-button-b.png"
			}
		},
		"scroll-bt-up-focused" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundImage : "aristo/decoration/scrollbar/scrollbar-bg-button-focused-t.png"
			}
		},

		"scroll-bt-down-focused" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundImage : "aristo/decoration/scrollbar/scrollbar-bg-button-focused-b.png"
			}
		},

		"scroll-bt-left" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundImage : "aristo/decoration/scrollbar/scrollbar-bg-button-l.png"
			}
		},
		"scroll-bt-right" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundImage : "aristo/decoration/scrollbar/scrollbar-bg-button-r.png"
			}
		},
		"scroll-bt-left-focused" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundImage : "aristo/decoration/scrollbar/scrollbar-bg-button-focused-l.png"
			}
		},

		"scroll-bt-right-focused" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundImage : "aristo/decoration/scrollbar/scrollbar-bg-button-focused-r.png"
			}
		},

		"scrollbar-slider-vertical" : {
			decorator : qx.ui.decoration.VBox,

			style : {
				baseImage : "aristo/decoration/scrollbar/scrollbar-button-bg-vertical.png",
				insets : [ 8, 0, 8, 0 ]
			}
		},

		"scrollbar-slider-horizontal" : {
			decorator : qx.ui.decoration.HBox,

			style : {
				baseImage : "aristo/decoration/scrollbar/scrollbar-button-bg-horizontal.png",
				insets : [ 0, 8, 0, 8 ]
			}
		},

		/*
		 * --------------------------------------------------------------------------
		 * SLIDER
		 * --------------------------------------------------------------------------
		 */

		"slider-vertical" : {
			decorator : qx.ui.decoration.VBox,

			style : {
				baseImage : "aristo/decoration/form/slider-vertical.png",
				insets : [ 10, 0 ]
			}
		},
		"slider-horizontal" : {
			decorator : qx.ui.decoration.HBox,

			style : {
				baseImage : "aristo/decoration/form/slider-horizontal.png",
				insets : [ 0, 10, 0, 10 ]
			}
		},

		"slider-knob" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundImage : "aristo/decoration/form/radiobutton-checked.png"
			}
		},

		"slider-knob-focused" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundImage : "aristo/decoration/form/radiobutton-checked-focused.png"
			}
		},

		"slider-knob-disabled" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundImage : "aristo/decoration/form/radiobutton-checked-disabled.png"
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * WINDOW
		 * ---------------------------------------------------------------------------
		 */

		"window" : {
			decorator : qx.ui.decoration.Single,

			style : {
				backgroundColor : "white"

			// width : 1,
			// color : "border-main",
			// widthTop : 0
			}
		},

		"window-captionbar" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/window/captionbar.png"
			}
		},

		"window-statusbar" : {
			decorator : qx.ui.decoration.Single,

			style : {
				backgroundColor : "background-light",
				widthTop : 1,
				color : "border-light"
			}
		},

		"table-statusbar" : {
			decorator : qx.ui.decoration.Single,

			style : {
				backgroundColor : "background-light",
				widthTop : 1,
				colorTop : "border-light",
				styleTop : "solid"
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * PROGRESSBAR
		 * ---------------------------------------------------------------------------
		 */

		"progressbar" : {
			decorator : qx.ui.decoration.Single,

			style : {
				backgroundColor : "#FFF",
				width : 1,
				color : "border-separator"
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * TOOLBAR
		 * ---------------------------------------------------------------------------
		 */

		"toolbar" : {
			decorator : qx.ui.decoration.Single,

			style : {
				backgroundColor : "background-light"
			}
		},

		"toolbar-window" : {
			decorator : qx.ui.decoration.Single,

			style : {
				backgroundImage : "aristo/decoration/toolbar/toolbar-gradient.png",
				backgroundRepeat : "scale",
				color : "border-main",
				widthBottom : 1
			}
		},

		"toolbar-button-hovered" : {
			decorator : qx.ui.decoration.Beveled,

			style : {
				outerColor : "border-main",
				innerColor : "#d1d1d1",
				backgroundImage : "aristo/decoration/form/button-disabled-c.png",
				backgroundRepeat : "scale"
			}
		},

		"toolbar-button-checked" : {
			decorator : qx.ui.decoration.Beveled,

			style : {
				outerColor : "border-main",
				innerColor : "#d1d1d1",
				backgroundImage : "aristo/decoration/form/button-checked-c.png",
				backgroundRepeat : "scale"
			}
		},

		"toolbar-separator" : {
			decorator : qx.ui.decoration.Single,

			style : {
				widthLeft : 1,
				widthRight : 1,

				colorLeft : "#b8b8b8",
				colorRight : "#f4f4f4",

				styleLeft : "solid",
				styleRight : "solid"
			}
		},

		"toolbar-part" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundImage : "aristo/decoration/toolbar/toolbar-part.gif",
				backgroundRepeat : "repeat-y"
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * MENU
		 * ---------------------------------------------------------------------------
		 */

		"menu" : {
			decorator : qx.ui.decoration.Single,

			style : {
				/*
				 * backgroundImage :
				 * "aristo/decoration/menu/background.png",
				 * backgroundRepeat : "scale",
				 */
				backgroundColor : "background-menu",
				width : 1
			/*
			 * width:1 is required or the popup will overlap the
			 * mouse and be immediately closed (as of Qx1.5)
			 */

			/*
			 * width : 1, color : "border-main", style : "solid"
			 */
			}
		},

		"menu-separator" : {
			decorator : qx.ui.decoration.Single,

			style : {
				widthTop : 1,
				colorTop : "#C5C5C5",

				widthBottom : 1,
				colorBottom : "#FAFAFA"
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * MENU BAR
		 * ---------------------------------------------------------------------------
		 */

		"menubar" : {
			decorator : qx.ui.decoration.Single,

			style : {
				// backgroundColor: 'background-menu',
				backgroundImage : "aristo/decoration/toolbar/toolbar-gradient.png",
				backgroundRepeat : "scale",

				width : [ 1, 0 ],
				color : "border-main",
				style : "solid"
			}
		},

		"menu-selected" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundColor : "background-dark"
			}
		},

		"blank" : {
			decorator : qx.ui.decoration.Single,

			style : {
				backgroundColor : "white"
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * TOOLTIP
		 * ---------------------------------------------------------------------------
		 */

		"tooltip-error" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/tooltip/tooltip-error.png",
				insets : [ 2, 5, 5, 2 ]
			}
		},

		"tooltip-error-arrow" : {
			decorator : qx.ui.decoration.Background,

			style : {
				backgroundImage : "aristo/decoration/tooltip/tooltip-error-arrow.png",
				backgroundPositionY : "center",
				backgroundRepeat : "no-repeat",
				insets : [ 0, 0, 0, 10 ]
			}
		},

		/*
		 * ------------------------------------------------------------------------
		 * GROUPBOX
		 * ------------------------------------------------------------------------
		 */
		"group" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/groupbox/groupbox.png"
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * TABVIEW
		 * ---------------------------------------------------------------------------
		 */

		"tabview-pane" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/tabview/tabview-pane.png",
				insets : [ 4, 6, 7, 4 ]
			}
		},

		"tabview-page-button-top-active" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/tabview/tab-button-top-active.png"
			}
		},

		"tabview-page-button-top-inactive" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/tabview/tab-button-top-inactive.png"
			}
		},

		"tabview-page-button-bottom-active" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/tabview/tab-button-bottom-active.png"
			}
		},

		"tabview-page-button-bottom-inactive" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/tabview/tab-button-bottom-inactive.png"
			}
		},

		"tabview-page-button-left-active" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/tabview/tab-button-left-active.png"
			}
		},

		"tabview-page-button-left-inactive" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/tabview/tab-button-left-inactive.png"
			}
		},

		"tabview-page-button-right-active" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/tabview/tab-button-right-active.png"
			}
		},

		"tabview-page-button-right-inactive" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/tabview/tab-button-right-inactive.png"
			}
		},
		"keyboard-focus" : {
			decorator : qx.ui.decoration.Single,

			style : {
				width : 1,
				color : "black",
				style : "dotted"
			}
		},

		"pane" : {
			decorator : qx.ui.decoration.Grid,

			style : {
				baseImage : "aristo/decoration/pane/pane.png",
				insets : [ 0, 2, 3, 0 ]
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * SPLITPANE
		 * ---------------------------------------------------------------------------
		 */

		"splitpane" : {
			decorator : qx.ui.decoration.Uniform,

			style : {
				backgroundColor : "background-pane",

				width : 3,
				color : "background-splitpane",
				style : "solid"
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * TABLE
		 * ---------------------------------------------------------------------------
		 */

		"table" : {
			decorator : qx.ui.decoration.Single,

			style : {
				width : 1,
				color : "border-main",
				style : "solid"
			}
		},

		"table-scroller-header" : {
			decorator : qx.ui.decoration.Single,

			style : {
				backgroundImage : "aristo/decoration/table/header-cell.png",
				backgroundRepeat : "scale",

				widthBottom : 1,
				colorBottom : "border-main",
				style : "solid"
			}
		},

		"table-header-cell" : {
			decorator : qx.ui.decoration.Single,

			style : {
				widthRight : 1,
				colorRight : "border-separator",
				styleRight : "solid"
			}
		},

		"table-header-cell-hovered" : {
			decorator : qx.ui.decoration.Single,

			style : {
				widthRight : 1,
				colorRight : "border-separator",
				styleRight : "solid",

				widthBottom : 1,
				colorBottom : "white",
				styleBottom : "solid"
			}
		},

		"table-column-button" : {
			decorator : qx.ui.decoration.Single,

			style : {
				backgroundImage : "aristo/decoration/table/header-cell.png",
				backgroundRepeat : "scale",

				widthBottom : 1,
				colorBottom : "border-main",
				style : "solid"
			}
		},

		"table-scroller-focus-indicator" : {
			decorator : qx.ui.decoration.Single,

			style : {
				width : 2,
				color : "table-focus-indicator",
				style : "solid"
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * PROGRESSIVE
		 * ---------------------------------------------------------------------------
		 */

		"progressive-table-header" : {
			decorator : qx.ui.decoration.Single,

			style : {
				width : 1,
				color : "border-main",
				style : "solid"
			}
		},

		"progressive-table-header-cell" : {
			decorator : qx.ui.decoration.Single,

			style : {
				backgroundImage : "aristo/decoration/table/header-cell.png",
				backgroundRepeat : "scale",

				widthRight : 1,
				colorRight : "#F2F2F2",
				style : "solid"
			}
		}

	}
});
/* ************************************************************************

   Copyright:
     2010 Guilherme R. Aiolfi

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Guilherme R. Aiolfi (guilhermeaiolfi)
     * John Spackman (john.spackman@zenesis.com)

   ======================================================================

   This class contains code and resources based on the following work:

   * Aristo
     http://github.com/280north/aristo

     License:
       http://creativecommons.org/licenses/by-sa/3.0/us/

     Authors:
       * 280 North, Inc., http://280north.com/
       * Sofa, http://madebysofa.com/

************************************************************************ */

/**
 * Aristo color theme
 */
qx.Theme.define("aristo.theme.Color",
{
  colors :
  {
		"text-label": "#333333",
		"text-disabled": "#A7A7A7",
		"text-hovered": "#4f4f4f",
		"text-placeholder" : "#A7A7A7",
		"text-selected": "#FFFFFF",
		"text-input" : "#4f4f4f",
		"text-light" : "#a4a4a4",
		"text-title" : "#2a4d60",
		"text-active" : "#4f4f4f",
		"text-inactive" : "#4f4f4f",
		
		"invalid" : "#c82c2c",


		"border-light": "#d1d1d1",
		"border-main"							: "#949494",
		"border-input"						: "#d1d1d1",//"#949494",
		"border-separator" 				: "#808080",
		
		"background-application": "#FFFFFF",
		"background-light" : "#EEEEEE",
		"background-item-selected": "#5f83b9",
		"background-splitpane" 		: "#AFAFAF",
		"background-toolbar"  		: "#d4d4d4",
		"background-dark" 				: "#949494",
		"background-menu"					: "#fbfbfb",
		"background-medium"				: "#c2c2c2",
		"background-tip" 					: "#b8def5",
		"background-pane" 				: "#F3F3F3",
		"background-splitpane"		: "#AFAFAF",
		"background-odd" 					: "#E4E4E4",
	    "background-selected-dark" : "#333333",
		
		
		"button-gradient-start": "#ededed",
		"button-gradient-end": "#c4c4c4",
		"button-active-gradient-start": "#b7def4",
		"button-active-gradient-end": "#83b0ca",
		"button-focused-shadow": "#a1cae2",
		
		
    /*
    ---------------------------------------------------------------------------
      TABLE COLORS
    ---------------------------------------------------------------------------
    */

    // equal to "background-pane"
    "table-pane" : "#F3F3F3",

    // own table colors
    // "table-row-background-selected" and "table-row-background-focused-selected"
    // are inspired by the colors of the selection decorator
    "table-focus-indicator" : "#0880EF",
    "table-row-background-focused-selected" : "#5f83b9",
    "table-row-background-focused" : "#80B4EF",
    "table-row-background-selected" : "#5f83b9",

    // equal to "background-pane" and "background-odd"
    "table-row-background-even" : "#F3F3F3",
    "table-row-background-odd" : "#E4E4E4",

    // equal to "text-selected" and "text-label"
    "table-row-selected" : "#fffefe",
    "table-row" : "#1a1a1a",

    // equal to "border-collumn"
    "table-row-line" : "#CCCCCC",
    "table-column-line" : "#CCCCCC",
    
    /*
    ---------------------------------------------------------------------------
      PROGRESSIVE TABLE COLORS
    ---------------------------------------------------------------------------
    */

    "progressive-table-header"              		 : "#AAAAAA",

    "progressive-table-row-background-even" 		 : "#F4F4F4",
    "progressive-table-row-background-odd"  		 : "#E4E4E4",

    "progressive-progressbar-background"         : "gray",
    "progressive-progressbar-indicator-done"     : "#CCCCCC",
    "progressive-progressbar-indicator-undone"   : "white",
    "progressive-progressbar-percent-background" : "gray",
    "progressive-progressbar-percent-text"       : "white"
  }
});
/* ************************************************************************

   Copyright:
     2010 Guilherme R. Aiolfi

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
 	* Guilherme R. Aiolfi (guilhermeaiolfi)
    * John Spackman (john.spackman@zenesis.com)

   ======================================================================

   This class contains code and resources based on the following work:

 * Aristo
     http://github.com/280north/aristo

     License:
       http://creativecommons.org/licenses/by-sa/3.0/us/

     Authors:
 * 280 North, Inc., http://280north.com/
 * Sofa, http://madebysofa.com/

 ************************************************************************ */

/* ************************************************************************

 #asset(aristo/decoration/*)

 ************************************************************************* */

/**
 * The Aristo appearance theme.
 */
qx.Theme.define("aristo.theme.Appearance", {
	appearances : {
		"widget" : {},

		"root" : {
			style : function(states) {
				return {
					backgroundColor : "background-application",
					textColor : "text-label",
					font : "default"
				};
			}
		},

		"label" : {
			style : function(states) {
				return {
					textColor : states.disabled ? "text-disabled"
							: "text-label"
				};
			}
		},
		"image" : {
			style : function(states) {
				return {
					opacity : !states.replacement
							&& states.disabled ? 0.3 : 1
				};
			}
		},
		"atom" : {},
		"atom/label" : "label",
		"atom/icon" : "image",

		"move-frame" : {
			style : function(states) {
				return {
					decorator : "main"
				};
			}
		},

		"resize-frame" : "move-frame",
		"window-resize-frame" : "resize-frame",

		"dragdrop-cursor" : {
			style : function(states) {
				var icon = "nodrop";

				if (states.copy) {
					icon = "copy";
				} else if (states.move) {
					icon = "move";
				} else if (states.alias) {
					icon = "alias";
				}

				return {
					source : "aristo/decoration/cursors/"
							+ icon + ".gif",
					position : "right-top",
					offset : [ 2, 16, 2, 6 ]
				};
			}
		},

		"popup" : {
			style : function(states) {
				return {
					decorator : "list",
					backgroundColor : "background-light"
				// shadow : "gray-shadow"
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * BUTTON
		 * ---------------------------------------------------------------------------
		 */

		"button-frame" : {
			alias : "atom",

			style : function(states) {
				var decorator, textColor, shadow;

				if (states.checked) {
					decorator = "button-checked";
					textColor = undefined;
				} else if (states.disabled) {
					decorator = "button-disabled";
					textColor = undefined;
				} else if (states.pressed) {
					decorator = "button-pressed";
					textColor = "text-hovered";
				} else if (states.checked) {
					decorator = "button-checked";
					textColor = undefined;
				} else if (states.hovered || states.preselected) {
					decorator = "button-hovered";
					textColor = "text-hovered";
				} else {
					decorator = "button";
					textColor = undefined;
				}
				var useCSS = qx.core.Environment.get("css.boxshadow");
				if (useCSS)
					decorator += "-css";

				if (states.focused || (states.invalid && !states.disabled)) {
					shadow = /*useCSS ? "shadow-css" :*/ "shadow";
				}

				return {
					decorator : decorator,
					textColor : textColor,
					shadow : shadow
				};
			}
		},

		"button-frame/image" : {
			style : function(states) {
				return {
					opacity : !states.replacement
							&& states.disabled ? 0.5 : 1
				};
			}
		},

		"button" : {
			alias : "button-frame",
			include : "button-frame",

			style : function(states) {
				return {
					padding : [ 2, 8 ],
					center : true
				};
			}
		},

		"hover-button" : {
			alias : "atom",
			include : "atom",

			style : function(states) {
				return {
					decorator : states.hovered ? "selected"
							: undefined,
					textColor : states.hovered ? "text-selected"
							: undefined
				};
			}
		},

		"splitbutton" : {
			style : function(states) {
				return {
					shadow : states.focused ? "shadow"
							: undefined
				};
			}
		},
		"splitbutton/button" : {
			include : "button",
			style : function(states) {
				return {
					shadow : undefined
				};
			}
		},
		"splitbutton/arrow" : {
			// alias : "button",
			include : "button",

			style : function(states) {
				return {
					icon : "aristo/decoration/arrows/arrow-down.png",
					padding : 2,
					marginLeft : -2,
					shadow : undefined
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * LIST
		 * ---------------------------------------------------------------------------
		 */

		"list" : {
			alias : "scrollarea",

			style : function(states) {
				var decorator = "list";
				var shadow = "shadow";

				var focused = !!states.focused;
				var invalid = !!states.invalid;
				var disabled = !!states.disabled;

				if (focused && invalid && !disabled) {
					shadow = "red-shadow";
				} else if (focused && !invalid && !disabled) {
					shadow = "shadow";
				} else if (disabled) {
					decorator = "input";
				} else if (!focused && invalid && !disabled) {
					shadow = "red-shadow";
				}

				if (!focused) {
					shadow = undefined;
				}
				return {
					backgroundColor : "background-light",
					decorator : decorator,
					shadow : shadow,
					margin : 2
				};
			}
		},

		"list/pane" : "widget",

		"listitem" : {
			alias : "atom",

			style : function(states) {
				var decorator;
				if (states.dragover) {
					decorator = states.selected ? "selected-dragover"
							: "dragover";
				} else {
					decorator = states.selected ? "selected"
							: undefined;
				}

				return {
					padding : states.dragover ? [ 4, 4, 2, 4 ]
							: 4,
					textColor : states.selected ? "text-selected"
							: undefined,
					decorator : decorator
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * SCROLLAREA
		 * ---------------------------------------------------------------------------
		 */

		"scrollarea" : {
			style : function(states) {
				return {
					// since the scroll container disregards the
					// min size of the scrollbars
					// we have to set the min size of the scroll
					// area to ensure that the
					// scrollbars always have a usable size.
					minWidth : 50,
					minHeight : 50
				};
			}
		},

		"scrollarea/corner" : {
			style : function(states) {
				return {
					backgroundColor : "background-application"
				};
			}
		},

		"scrollarea/pane" : "widget",
		"scrollarea/scrollbar-x" : "scrollbar",
		"scrollarea/scrollbar-y" : "scrollbar",

		"scrollbar" : {
			style : function(states) {
				if (states["native"]) {
					return {};
				}

				return {
					maxWidth : states.horizontal ? undefined
							: 17,
					maxHeight : states.horizontal ? 17
							: undefined,
					decorator : states.horizontal ? "scrollbar-horizontal"
							: "scrollbar-vertical",
					padding : 0
				};
			}
		},

		"scrollbar/slider" : {
			alias : "slider",

			style : function(states) {
				return {
					padding : states.horizontal ? [ 1, -7, 0,
							-8 ] : [ -8, 0, -9, 0 ]
				};
			}
		},

		"scrollbar/slider/knob" : {
			style : function(states) {
				var decorator = states.horizontal ? "scrollbar-slider-horizontal"
						: "scrollbar-slider-vertical";
				if (states.disabled) {
					decorator += "-disabled";
				}

				return {
					decorator : decorator,
					// width: states.horizontal? undefined : 16,
					marginLeft : qx.bom.client.Browser.NAME == "ie"
							&& !states.horizontal ? 2 : 1,
					marginTop : qx.bom.client.Browser.NAME == "ie"
							&& states.horizontal ? 1
							: undefined,
					minHeight : states.horizontal ? undefined
							: 16,
					minWidth : states.horizontal ? 16
							: undefined
				};
			}
		},

		"scrollbar/button" : {
			alias : "button-frame",
			// include : "button-frame",

			style : function(states) {
				var icon = "aristo/decoration/arrows/arrow-";
				var decorator;
				if (states.left) {
					icon += states.pressed ? "focused-left.png"
							: "left.png";
					decorator = states.hovered
							|| states.docused ? "scroll-bt-left-focused"
							: "scroll-bt-left";
				} else if (states.right) {
					icon += states.pressed ? "focused-right.png"
							: "right.png";
					decorator = states.hovered
							|| states.docused ? "scroll-bt-right-focused"
							: "scroll-bt-right";
				} else if (states.up) {
					icon += states.pressed ? "focused-up.png"
							: "up.png";
					decorator = states.hovered
							|| states.focused ? "scroll-bt-up-focused"
							: "scroll-bt-up";
				} else {
					icon += states.pressed ? "focused-down.png"
							: "down.png";
					decorator = states.hovered
							|| states.focused ? "scroll-bt-down-focused"
							: "scroll-bt-down";
				}

				if (states.left || states.right) {
					return {
						padding : [ 0, 0, 0,
								states.left ? 6 : 16 ],
						icon : icon,
						width : 29,
						height : 17,
						decorator : decorator
					};
				} else {
					return {
						padding : [ states.up ? -10 : 12, 0, 0,
								4 ],
						icon : icon,
						width : 17,
						height : 29,
						decorator : decorator
					};
				}
			}
		},

		"scrollbar/button-begin" : "scrollbar/button",
		"scrollbar/button-end" : "scrollbar/button",

		/*
		 * ---------------------------------------------------------------------------
		 * SPINNER
		 * ---------------------------------------------------------------------------
		 */

		"spinner" : {
			style : function(states) {
				var decorator, shadow;

				var focused = !!states.focused;
				var invalid = !!states.invalid;
				var disabled = !!states.disabled;

				if (focused && invalid && !disabled) {
					decorator = "input";
					shadow = "red-shadow";
				} else if (focused && !invalid && !disabled) {
					// decorator = "input-focused";
					shadow = "shadow";
					decorator = "input";
				} else if (disabled) {
					decorator = "input";
				} else if (!focused && invalid && !disabled) {
					decorator = "red-shadow";
				} else {
					decorator = "input";
				}

				return {
					decorator : decorator,
					shadow : shadow,
					margin : 2
				};
			}
		},

		"spinner/textfield" : {
			style : function(states) {
				return {
					marginRight : 2,
					padding : [ 2, 4, 1 ],
					textColor : states.disabled ? "text-disabled"
							: "text-input",
					decorator : "spinner-input"
				};
			}
		},

		"spinner/upbutton" : {
			alias : "button-frame",
			include : "button-frame",

			style : function(states) {
				return {
					icon : "aristo/decoration/arrows/up-small.png",
					padding : states.pressed ? [ 2, 2, 0, 4 ]
							: [ 1, 3, 1, 3 ],
					shadow : undefined
				};
			}
		},

		"spinner/downbutton" : {
			alias : "button-frame",
			include : "button-frame",

			style : function(states) {
				return {
					icon : "aristo/decoration/arrows/down-small.png",
					padding : states.pressed ? [ 2, 2, 0, 4 ]
							: [ 1, 3, 1, 3 ],
					shadow : undefined
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * FORM FIELDS
		 * ---------------------------------------------------------------------------
		 */

		"checkbox" : {
			alias : "atom",

			style : function(states) {
				// "disabled" state is not handled here with
				// purpose. The image widget
				// does handle this already by replacing the
				// current image with a
				// disabled version (if available). If no
				// disabled image is found the
				// opacity style is used.
				var icon;
				if (states.checked && states.focused) {
					icon = "checkbox-checked-focused";
				} else if (states.checked && states.disabled) {
					icon = "checkbox-checked-disabled";
				} else if (states.checked && states.pressed) {
					icon = "checkbox-checked-pressed";
				} else if (states.checked && states.hovered) {
					icon = "checkbox-checked-hovered";
				} else if (states.checked) {
					icon = "checkbox-checked";
				} else if (states.focused) {
					icon = "checkbox-focused";
				} else if (states.pressed) {
					icon = "checkbox-pressed";
				} else if (states.hovered && !states.disabled) {
					icon = "checkbox-hovered";
				} else {
					icon = "checkbox";
				}

				var invalid = states.invalid
						&& !states.disabled ? "-invalid" : "";

				return {
					icon : "aristo/decoration/form/" + icon
							+ invalid + ".png",
					gap : 6
				};
			}
		},
		"radiobutton" : {
			alias : "atom",

			style : function(states) {
				var icon = "radiobutton";

				if (states.checked)
					icon += "-checked";
				if (states.pressed)
					icon += "-pressed";
				if (states.focused)
					icon += "-focused";
				if (states.hovered && !states.pressed)
					icon += "-hovered";
				if (states.invalid)
					icon += "-invalid";
				if (states.disabled)
					icon += "-disabled";

				return {
					icon : "aristo/decoration/form/" + icon
							+ ".png",
					gap : 6
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * SELECTBOX
		 * ---------------------------------------------------------------------------
		 */

		"selectbox" : {
			alias : "button-frame",
			include : "button-frame",

			style : function(states) {
				return {
					padding : [ 2, 8 ],
					margin : 2
				};
			}
		},

		"selectbox/atom" : "atom",
		"selectbox/popup" : "popup",

		"selectbox/list" : {
			alias : "list"
		},

		"selectbox/arrow" : {
			include : "image",

			style : function(states) {
				return {
					source : "aristo/decoration/arrows/arrow-down.png",
					paddingLeft : 5
				};
			}
		},

		"textfield" : {
			style : function(states) {
				var decorator, shadow;

				var focused = !!states.focused;
				var invalid = !!states.invalid;
				var disabled = !!states.disabled;

				decorator = "input";

				if (focused && invalid && !disabled) {
					shadow = "red-shadow";
				} else if (focused && !invalid && !disabled) {
					shadow = "shadow";
				} else if (disabled) {
					decorator = "input-disabled";
					shadow = undefined;
				} else if (!focused && invalid && !disabled) {
					shadow = "red-shadow";
				} else {
					shadow = undefined;
				}

				var textColor;
				if (states.disabled) {
					textColor = "text-disabled";
				} else if (states.showingPlaceholder) {
					textColor = "text-placeholder";
				} else {
					textColor = "text-input";
				}

				return {
					decorator : "input",
					padding : [ 2, 4, 1 ],
					textColor : textColor,
					shadow : shadow,
					margin : 2
				};
			}
		},

		"textarea" : {
			include : "textfield",

			style : function(states) {
				return {
					padding : 4,
					margin : 2
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * WINDOW
		 * ---------------------------------------------------------------------------
		 */

		"window" : {
			style : function(states) {
				return {
					shadow : "shadow-window-inactive", // states.focused?
														// "shadow-window"
														// :
														// "gray-shadow",
					contentPadding : [ 10, 10, 10, 10 ]
				};
			}
		},

		"window/pane" : {
			style : function(states) {
				return {
					decorator : "window"
				};
			}
		},

		"window/captionbar" : {
			style : function(states) {
				return {
					decorator : "window-captionbar",
					textColor : states.active ? "text-label"
							: "text-disabled",
					minHeight : 28,
					maxHeight : 28,
					paddingRight : 2
				};
			}
		},

		"window/title" : {
			style : function(states) {
				return {
					textAlign : "center",
					alignY : "middle",
					font : "bold",
					marginLeft : 6,
					marginRight : 6
				};
			}
		},

		"window/minimize-button" : {
			alias : "atom",

			style : function(states) {
				return {
					icon : states.active ? states.hovered ? "aristo/decoration/window/minimize-active-hovered.png"
							: "aristo/decoration/window/minimize-active.png"
							: "aristo/decoration/window/minimize-inactive.png",
					margin : [ 2, 3, 2, 0 ]
				};
			}
		},

		"window/restore-button" : {
			alias : "atom",

			style : function(states) {
				return {
					icon : states.active ? states.hovered ? "aristo/decoration/window/restore-active-hovered.png"
							: "aristo/decoration/window/restore-active.png"
							: "aristo/decoration/window/restore-inactive.png",
					margin : [ 2, 3, 2, 0 ]
				};
			}
		},

		"window/maximize-button" : {
			alias : "atom",

			style : function(states) {
				return {
					icon : states.active ? states.hovered ? "aristo/decoration/window/maximize-active-hovered.png"
							: "aristo/decoration/window/maximize-active.png"
							: "aristo/decoration/window/maximize-inactive.png",
					margin : [ 2, 3, 2, 0 ]
				};
			}
		},

		"window/close-button" : {
			alias : "atom",

			style : function(states) {
				return {
					icon : states.active ? states.hovered ? "aristo/decoration/window/close-active-hovered.png"
							: "aristo/decoration/window/close-active.png"
							: "aristo/decoration/window/close-inactive.png",
					margin : [ 2, 3, 2, 0 ]
				};
			}
		},

		"window/close-button/icon" : "window/icon",
		"window/maximize-button/icon" : "window/icon",
		"window/restore-button/icon" : "window/icon",
		"window/minimize-button/icon" : "window/icon",
		"window/icon" : {
			style : function(states) {
				return {
					alignY : "middle",
					marginLeft : 5,
					height : 16,
					width : 16
				};
			}
		},

		"window/statusbar" : {
			style : function(states) {
				return {
					padding : [ 2, 6 ],
					decorator : "window-statusbar",
					minHeight : 18
				};
			}
		},

		"window/statusbar-text" : {
			style : function(states) {
				return {
					font : "small"
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * PROGRESSBAR
		 * ---------------------------------------------------------------------------
		 */
		"progressbar" : {
			style : function(states) {
				return {
					decorator : "progressbar",
					padding : 1,
					backgroundColor : "background-light"
				};
			}
		},

		"progressbar/progress" : {
			style : function(states) {
				return {
					backgroundColor : states.disabled ? "text-disabled"
							: "button-gradient-end"
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * TOOLBAR
		 * ---------------------------------------------------------------------------
		 */

		"toolbar" : {
			style : function(states) {
				return {
					decorator : "toolbar",
					spacing : 2
				};
			}
		},

		"toolbar-window" : {
			include : "toolbar",
			style : function(states) {
				return {
					margin : -10,
					decorator : "toolbar-window"
				};
			}
		},

		"toolbar/part" : {
			style : function(states) {
				return {
					decorator : "toolbar-part",
					spacing : 2
				};
			}
		},

		"toolbar/part/container" : {
			style : function(states) {
				return {
					paddingLeft : 2,
					paddingRight : 2
				};
			}
		},

		"toolbar/part/handle" : {
			style : function(states) {
				return {
					source : "aristo/decoration/toolbar/toolbar-handle-knob.gif",
					marginLeft : 3,
					marginRight : 3
				};
			}
		},

		"toolbar-button" : {
			alias : "atom",

			style : function(states) {
				return {
					marginTop : 2,
					marginBottom : 2,
					padding : (states.pressed || states.checked || states.hovered)
							&& !states.disabled
							|| (states.disabled && states.checked) ? 3
							: 5,
					decorator : states.pressed
							|| (states.checked && !states.hovered)
							|| (states.checked && states.disabled) ? "toolbar-button-checked"
							: states.hovered
									&& !states.disabled ? "toolbar-button-hovered"
									: undefined
				};
			}
		},

		"toolbar-menubutton" : {
			alias : "toolbar-button",
			include : "toolbar-button",

			style : function(states) {
				return {
					showArrow : true
				};
			}
		},

		"toolbar-menubutton/arrow" : {
			alias : "image",
			include : "image",

			style : function(states) {
				return {
					source : "aristo/decoration/arrows/down-small.png"
				};
			}
		},

		"toolbar-splitbutton" : {
			style : function(states) {
				return {
					marginTop : 2,
					marginBottom : 2
				};
			}
		},

		"toolbar-splitbutton/button" : {
			alias : "toolbar-button",
			include : "toolbar-button",

			style : function(states) {
				return {
					icon : "aristo/decoration/arrows/down.png",
					marginTop : undefined,
					marginBottom : undefined
				};
			}
		},

		"toolbar-splitbutton/arrow" : {
			alias : "toolbar-button",
			include : "toolbar-button",

			style : function(states) {
				if (states.pressed || states.checked
						|| (states.hovered && !states.disabled)) {
					var padding = 1;
				} else {
					var padding = 3;
				}

				return {
					padding : padding,
					icon : "aristo/decoration/arrows/down.png",
					marginTop : undefined,
					marginBottom : undefined
				};
			}
		},

		"toolbar-separator" : {
			style : function(states) {
				return {
					decorator : "toolbar-separator",
					margin : 7
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * SLIDER
		 * ---------------------------------------------------------------------------
		 */

		"slider" : {
			style : function(states) {
				var decorator = states.horizontal ? "slider-horizontal"
						: "slider-vertical";

				var focused = !!states.focused;
				var invalid = !!states.invalid;
				var disabled = !!states.disabled;

				/*
				 * if (focused && invalid && !disabled) {
				 * decorator = "input-focused-invalid"; } else
				 * if (focused && !invalid && !disabled) {
				 * decorator = "input-focused"; } else if
				 * (disabled) { decorator = "input-disabled"; }
				 * else if (!focused && invalid && !disabled) {
				 * decorator = "border-invalid"; }
				 */

				return {
					decorator : decorator,
					maxHeight : states.horizontal ? 20
							: undefined,
					maxWidth : states.horizontal ? undefined
							: 20,
					minHeight : states.horizontal ? 20
							: undefined,
					minWidth : states.horizontal ? undefined
							: 20,
					padding : [ states.horizontal ? 0 : -10,
							states.horizontal ? -10 : 0,
							states.horizontal ? 0 : -10,
							states.horizontal ? -10 : 2 ]
				};
			}
		},

		"slider/knob" : {
			alias : "atom",
			include : "atom",

			style : function(states) {
				return {
					decorator : states.disabled ? "slider-knob-disabled"
							: states.focused ? "slider-knob-focused"
									: "slider-knob",
					// shadow: states.focused? "shadow" :
					// undefined,
					maxHeight : 18,
					// minHeight: 17,
					// marginTop: -0,
					maxWidth : 18
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * MENU
		 * ---------------------------------------------------------------------------
		 */

		"menu" : {
			style : function(states) {
				var result = {
					decorator : "menu",
					shadow : "shadow-popup",
					spacingX : 6,
					spacingY : 1,
					iconColumnWidth : 16,
					arrowColumnWidth : 4,
					placementModeY : states.submenu
							|| states.contextmenu ? "best-fit"
							: "keep-align"
				};

				if (states.submenu) {
					result.position = "right-top";
					result.offset = [ -2, -3 ];
				}

				return result;
			}
		},

		"menu/slidebar" : "menu-slidebar",

		"menu-slidebar" : "widget",

		"menu-slidebar-button" : {
			style : function(states) {
				return {
					decorator : states.hovered ? "selected"
							: undefined,
					padding : 7,
					center : true
				};
			}
		},

		"menu-slidebar/button-backward" : {
			include : "menu-slidebar-button",

			style : function(states) {
				return {
					icon : states.hovered ? "aristo/decoration/arrows/up-invert.png"
							: "aristo/decoration/arrows/up.png"
				};
			}
		},

		"menu-slidebar/button-forward" : {
			include : "menu-slidebar-button",

			style : function(states) {
				return {
					icon : states.hovered ? "aristo/decoration/arrows/down-invert.png"
							: "aristo/decoration/arrows/down.png"
				};
			}
		},

		"menu-separator" : {
			style : function(states) {
				return {
					height : 0,
					decorator : "menu-separator",
					margin : [ 4, 2 ]
				};
			}
		},

		"menu-button" : {
			alias : "atom",

			style : function(states) {
				return {
					decorator : states.selected ? "selected"
							: undefined,
					textColor : states.selected ? "text-selected"
							: undefined,
					padding : [ 4, 6 ]
				};
			}
		},

		"menu-button/icon" : {
			include : "image",

			style : function(states) {
				return {
					alignY : "middle"
				};
			}
		},

		"menu-button/label" : {
			include : "label",

			style : function(states) {
				return {
					alignY : "middle",
					padding : 1
				};
			}
		},

		"menu-button/shortcut" : {
			include : "label",

			style : function(states) {
				return {
					alignY : "middle",
					marginLeft : 14,
					padding : 1
				};
			}
		},

		"menu-button/arrow" : {
			include : "image",

			style : function(states) {
				return {
					source : states.selected ? "aristo/decoration/arrows/right-invert.png"
							: "aristo/decoration/arrows/right.png",
					alignY : "middle"
				};
			}
		},

		"menu-checkbox" : {
			alias : "menu-button",
			include : "menu-button",

			style : function(states) {
				return {
					icon : !states.checked ? undefined
							: states.selected ? "aristo/decoration/menu/checkbox-invert.gif"
									: "aristo/decoration/menu/checkbox.gif"
				};
			}
		},

		"menu-radiobutton" : {
			alias : "menu-button",
			include : "menu-button",

			style : function(states) {
				return {
					icon : !states.checked ? undefined
							: states.selected ? "aristo/decoration/menu/radiobutton-invert.gif"
									: "aristo/decoration/menu/radiobutton.gif"
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * MENU BAR
		 * ---------------------------------------------------------------------------
		 */

		"menubar" : {
			style : function(states) {
				return {
					decorator : "menubar"
				};
			}
		},

		"menubar-button" : {
			alias : "atom",

			style : function(states) {
				return {
					decorator : (states.pressed || states.hovered)
							&& !states.disabled ? "selected"
							: undefined,
					textColor : states.pressed
							|| states.hovered ? "text-selected"
							: undefined,
					padding : [ 3, 8 ]
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * DATEFIELD
		 * ---------------------------------------------------------------------------
		 */

		"datefield" : "combobox",

		"datefield/button" : {
			alias : "combobox/button",
			include : "combobox/button",

			style : function(states) {
				return {
					icon : "aristo/decoration/icons/16x16/calendar.png",
					padding : [ 0, 3 ],
					decorator : "blank",
					marginLeft : -3,
					shadow : undefined
				};
			}
		},

		"datefield/textfield" : "combobox/textfield",

		"datefield/list" : {
			alias : "datechooser",
			include : "datechooser",

			style : function(states) {
				return {
					decorator : undefined
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * DATE CHOOSER
		 * ---------------------------------------------------------------------------
		 */

		"datechooser" : {
			style : function(states) {
				var decorator;

				var focused = !!states.focused;
				var invalid = !!states.invalid;
				var disabled = !!states.disabled;

				if (focused && invalid && !disabled) {
					decorator = "input-focused-invalid";
				} else if (focused && !invalid && !disabled) {
					decorator = "input-focused";
				} else if (disabled) {
					decorator = "input-disabled";
				} else if (!focused && invalid && !disabled) {
					decorator = "border-invalid";
				} else {
					decorator = "input";
				}

				return {
					padding : 2,
					decorator : decorator,
					backgroundColor : "background-light"
				};
			}
		},

		"datechooser/navigation-bar" : {},

		"datechooser/nav-button" : {
			include : "button-frame",
			alias : "button-frame",

			style : function(states) {
				var result = {
					padding : [ 2, 4 ],
					shadow : undefined
				};

				if (states.lastYear) {
					result.icon = "aristo/decoration/arrows/rewind.png";
					result.marginRight = 1;
				} else if (states.lastMonth) {
					result.icon = "aristo/decoration/arrows/left.png";
				} else if (states.nextYear) {
					result.icon = "aristo/decoration/arrows/forward.png";
					result.marginLeft = 1;
				} else if (states.nextMonth) {
					result.icon = "aristo/decoration/arrows/right.png";
				}

				return result;
			}
		},

		"datechooser/last-year-button-tooltip" : "tooltip",
		"datechooser/last-month-button-tooltip" : "tooltip",
		"datechooser/next-year-button-tooltip" : "tooltip",
		"datechooser/next-month-button-tooltip" : "tooltip",

		"datechooser/last-year-button" : "datechooser/nav-button",
		"datechooser/last-month-button" : "datechooser/nav-button",
		"datechooser/next-month-button" : "datechooser/nav-button",
		"datechooser/next-year-button" : "datechooser/nav-button",

		"datechooser/month-year-label" : {
			style : function(states) {
				return {
					font : "bold",
					textAlign : "center",
					textColor : states.disabled ? "text-disabled"
							: undefined
				};
			}
		},

		"datechooser/date-pane" : {
			style : function(states) {
				return {
					textColor : states.disabled ? "text-disabled"
							: undefined,
					marginTop : 2
				};
			}
		},

		"datechooser/weekday" : {
			style : function(states) {
				return {
					textColor : states.disabled ? "text-disabled"
							: states.weekend ? "text-light"
									: undefined,
					textAlign : "center",
					paddingTop : 2,
					backgroundColor : "background-medium"
				};
			}
		},

		"datechooser/week" : {
			style : function(states) {
				return {
					textAlign : "center",
					padding : [ 2, 4 ],
					backgroundColor : "background-medium"
				};
			}
		},

		"datechooser/day" : {
			style : function(states) {
				return {
					textAlign : "center",
					decorator : states.disabled ? undefined
							: states.selected ? "selected"
									: undefined,
					textColor : states.disabled ? "text-disabled"
							: states.selected ? "text-selected"
									: states.otherMonth ? "text-light"
											: undefined,
					font : states.today ? "bold" : undefined,
					padding : [ 2, 4 ]
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * COMBOBOX
		 * ---------------------------------------------------------------------------
		 */

		"combobox" : {
			style : function(states) {
				// var decorator = "input";

				var focused = !!states.focused;
				var invalid = !!states.invalid;
				var disabled = !!states.disabled;

				return {
					decorator : "input",
					shadow : focused ? invalid ? "red-shadow"
							: "shadow" : undefined
				};
			}
		},

		"combobox/popup" : "popup",

		"combobox/list" : {
			alias : "list"
		},

		"combobox/button" : {
			include : "button-frame",
			alias : "button-frame",

			style : function(states) {
				var ret = {
					icon : "aristo/decoration/arrows/arrow-down.png",
					padding : 2,
					shadow : undefined
				};

				if (states.selected) {
					ret.decorator = "button-focused";
				}

				return ret;
			}
		},

		"combobox/textfield" : {
			include : "textfield",

			style : function(states) {
				return {
					decorator : "blank",
					padding : 3,
					margin : undefined
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * TOOL TIP
		 * ---------------------------------------------------------------------------
		 */

		"tooltip" : {
			include : "popup",

			style : function(states) {
				return {
					backgroundColor : "background-tip",
					padding : [ 1, 3, 2, 3 ],
					offset : [ 15, 5, 5, 5 ]
				};
			}
		},

		"tooltip/atom" : "atom",

		"tooltip-error" : {
			include : "tooltip",

			style : function(states) {
				return {
					textColor : "text-selected",
					placeMethod : "widget",
					offset : [ 0, 0, 0, 14 ],
					marginTop : -2,
					position : "right-top",
					showTimeout : 100,
					hideTimeout : 10000,
					decorator : "tooltip-error",
					shadow : "tooltip-error-arrow",
					font : "bold"
				};
			}
		},

		"tooltip-error/atom" : "atom",

		/*
		 * ---------------------------------------------------------------------------
		 * GROUP BOX
		 * ---------------------------------------------------------------------------
		 */

		"groupbox" : {
			style : function(states) {
				return {
					legendPosition : "top"
				};
			}
		},

		"groupbox/legend" : {
			alias : "atom",

			style : function(states) {
				return {
					padding : [ 1, 0, 1, 4 ],
					textColor : states.invalid ? "invalid"
							: "text-title",
					font : "bold"
				};
			}
		},

		"groupbox/frame" : {
			style : function(states) {
				return {
					padding : 12,
					decorator : "group"
				};
			}
		},

		"check-groupbox" : "groupbox",

		"check-groupbox/legend" : {
			alias : "checkbox",
			include : "checkbox",

			style : function(states) {
				return {
					padding : [ 1, 0, 1, 4 ],
					textColor : states.invalid ? "invalid"
							: "text-title",
					font : "bold"
				};
			}
		},

		"radio-groupbox" : "groupbox",

		"radio-groupbox/legend" : {
			alias : "radiobutton",
			include : "radiobutton",

			style : function(states) {
				return {
					padding : [ 1, 0, 1, 4 ],
					textColor : states.invalid ? "invalid"
							: "text-title",
					font : "bold"
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * TABVIEW
		 * ---------------------------------------------------------------------------
		 */

		"tabview" : {
			style : function(states) {
				return {
					contentPadding : 16
				};
			}
		},

		"tabview/bar" : {
			alias : "slidebar",

			style : function(states) {
				var result = {
					marginBottom : states.barTop ? -1 : 0,
					marginTop : states.barBottom ? -4 : 0,
					marginLeft : states.barRight ? -3 : 0,
					marginRight : states.barLeft ? -1 : 0,
					paddingTop : 0,
					paddingRight : 0,
					paddingBottom : 0,
					paddingLeft : 0
				};

				if (states.barTop || states.barBottom) {
					result.paddingLeft = 5;
					result.paddingRight = 7;
				} else {
					result.paddingTop = 5;
					result.paddingBottom = 7;
				}

				return result;
			}
		},

		"tabview/bar/button-forward" : {
			include : "slidebar/button-forward",
			alias : "slidebar/button-forward",

			style : function(states) {
				if (states.barTop || states.barBottom) {
					return {
						marginTop : 2,
						marginBottom : 2
					};
				} else {
					return {
						marginLeft : 2,
						marginRight : 2
					};
				}
			}
		},

		"tabview/bar/button-backward" : {
			include : "slidebar/button-backward",
			alias : "slidebar/button-backward",

			style : function(states) {
				if (states.barTop || states.barBottom) {
					return {
						marginTop : 2,
						marginBottom : 2
					};
				} else {
					return {
						marginLeft : 2,
						marginRight : 2
					};
				}
			}
		},

		"tabview/bar/scrollpane" : {},

		"tabview/pane" : {
			style : function(states) {
				return {
					decorator : "tabview-pane",
					minHeight : 100,

					marginBottom : states.barBottom ? -1 : 0,
					marginTop : states.barTop ? -1 : 0,
					marginLeft : states.barLeft ? -1 : 0,
					marginRight : states.barRight ? -1 : 0
				};
			}
		},

		"tabview-page" : "widget",

		"tabview-page/button" : {
			alias : "atom",

			style : function(states) {
				var decorator, padding = 0;
				var marginTop = 0, marginBottom = 0, marginLeft = 0, marginRight = 0;

				if (states.checked) {
					if (states.barTop) {
						decorator = "tabview-page-button-top-active";
						padding = [ 6, 14 ];
						marginLeft = states.firstTab ? 0 : -5;
						marginRight = states.lastTab ? 0 : -5;
					} else if (states.barBottom) {
						decorator = "tabview-page-button-bottom-active";
						padding = [ 6, 14 ];
						marginLeft = states.firstTab ? 0 : -5;
						marginRight = states.lastTab ? 0 : -5;
					} else if (states.barRight) {
						decorator = "tabview-page-button-right-active";
						padding = [ 6, 13 ];
						marginTop = states.firstTab ? 0 : -5;
						marginBottom = states.lastTab ? 0 : -5;
					} else {
						decorator = "tabview-page-button-left-active";
						padding = [ 6, 13 ];
						marginTop = states.firstTab ? 0 : -5;
						marginBottom = states.lastTab ? 0 : -5;
					}
				} else {
					if (states.barTop) {
						decorator = "tabview-page-button-top-inactive";
						padding = [ 4, 10 ];
						marginTop = 4;
						marginLeft = states.firstTab ? 5 : 1;
						marginRight = 1;
					} else if (states.barBottom) {
						decorator = "tabview-page-button-bottom-inactive";
						padding = [ 4, 10 ];
						marginBottom = 4;
						marginLeft = states.firstTab ? 5 : 1;
						marginRight = 1;
					} else if (states.barRight) {
						decorator = "tabview-page-button-right-inactive";
						padding = [ 4, 10 ];
						marginRight = 5;
						marginTop = states.firstTab ? 5 : 1;
						marginBottom = 1;
						marginLeft = 1;
					} else {
						decorator = "tabview-page-button-left-inactive";
						padding = [ 4, 10 ];
						marginLeft = 5;
						marginTop = states.firstTab ? 5 : 1;
						marginBottom = 1;
						marginRight = 1;
					}
				}

				return {
					zIndex : states.checked ? 10 : 5,
					decorator : decorator,
					padding : padding,
					marginTop : marginTop,
					marginBottom : marginBottom,
					marginLeft : marginLeft,
					marginRight : marginRight,
					textColor : states.checked ? "text-active"
							: states.disabled ? "text-disabled"
									: "text-inactive"
				};
			}
		},

		"tabview-page/button/label" : {
			alias : "label",

			style : function(states) {
				return {
					padding : [ 0, 1, 0, 1 ],
					margin : states.focused ? 0 : 1,
					decorator : states.focused ? "keyboard-focus"
							: undefined
				};
			}
		},

		"tabview-page/button/close-button" : {
			alias : "atom",
			style : function(states) {
				return {
					icon : "aristo/decoration/window/close-active.png"
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * SLIDEBAR
		 * ---------------------------------------------------------------------------
		 */

		"slidebar" : {},
		"slidebar/scrollpane" : {},
		"slidebar/content" : {},

		"slidebar/button-forward" : {
			alias : "button-frame",
			include : "button-frame",

			style : function(states) {
				return {
					padding : 5,
					center : true,
					icon : states.vertical ? "aristo/decoration/arrows/down.png"
							: "aristo/decoration/arrows/right.png"
				};
			}
		},

		"slidebar/button-backward" : {
			alias : "button-frame",
			include : "button-frame",

			style : function(states) {
				return {
					padding : 5,
					center : true,
					icon : states.vertical ? "aristo/decoration/arrows/up.png"
							: "aristo/decoration/arrows/left.png"
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * TREE
		 * ---------------------------------------------------------------------------
		 */

		"tree" : "list",

		"tree-item" : {
			style : function(states) {
				return {
					padding : [ 2, 6 ],
					textColor : states.selected ? "text-selected"
							: undefined,
					decorator : states.selected ? "selected"
							: undefined
				};
			}
		},

		"tree-item/icon" : {
			include : "image",

			style : function(states) {
				return {
					paddingRight : 5
				};
			}
		},

		"tree-item/label" : "label",

		"tree-item/open" : {
			include : "image",

			style : function(states) {
				var icon;
				if (states.selected && states.opened) {
					icon = "aristo/decoration/tree/open-selected.png";
				} else if (states.selected && !states.opened) {
					icon = "aristo/decoration/tree/closed-selected.png";
				} else if (states.opened) {
					icon = "aristo/decoration/tree/open.png";
				} else {
					icon = "aristo/decoration/tree/closed.png";
				}

				return {
					padding : [ 0, 5, 0, 2 ],
					source : icon
				};
			}
		},

		"tree-folder" : {
			include : "tree-item",
			alias : "tree-item",

			style : function(states) {
				var icon;
				if (states.small) {
					icon = states.opened ? "icon/16/places/folder-open.png"
							: "icon/16/places/folder.png";
				} else if (states.large) {
					icon = states.opened ? "icon/32/places/folder-open.png"
							: "icon/32/places/folder.png";
				} else {
					icon = states.opened ? "icon/22/places/folder-open.png"
							: "icon/22/places/folder.png";
				}

				return {
					icon : icon
				};
			}
		},

		"tree-file" : {
			include : "tree-item",
			alias : "tree-item",

			style : function(states) {
				return {
					icon : states.small ? "icon/16/mimetypes/office-document.png"
							: states.large ? "icon/32/mimetypes/office-document.png"
									: "icon/22/mimetypes/office-document.png"
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * TREEVIRTUAL
		 * ---------------------------------------------------------------------------
		 */

		"treevirtual" : "table",

		"treevirtual-folder" : {
			style : function(states) {
				return {
					icon : states.opened ? "icon/16/places/folder-open.png"
							: "icon/16/places/folder.png"
				};
			}
		},

		"treevirtual-file" : {
			include : "treevirtual-folder",
			alias : "treevirtual-folder",

			style : function(states) {
				return {
					icon : "icon/16/mimetypes/office-document.png"
				};
			}
		},

		"treevirtual-line" : {
			style : function(states) {
				return {
					icon : "qx/static/blank.gif"
				};
			}
		},

		"treevirtual-contract" : {
			style : function(states) {
				return {
					icon : "aristo/decoration/tree/open.png",
					paddingLeft : 5,
					paddingTop : 2
				};
			}
		},

		"treevirtual-expand" : {
			style : function(states) {
				return {
					icon : "aristo/decoration/tree/closed.png",
					paddingLeft : 5,
					paddingTop : 2
				};
			}
		},

		"treevirtual-only-contract" : "treevirtual-contract",
		"treevirtual-only-expand" : "treevirtual-expand",
		"treevirtual-start-contract" : "treevirtual-contract",
		"treevirtual-start-expand" : "treevirtual-expand",
		"treevirtual-end-contract" : "treevirtual-contract",
		"treevirtual-end-expand" : "treevirtual-expand",
		"treevirtual-cross-contract" : "treevirtual-contract",
		"treevirtual-cross-expand" : "treevirtual-expand",

		"treevirtual-end" : {
			style : function(states) {
				return {
					icon : "qx/static/blank.gif"
				};
			}
		},

		"treevirtual-cross" : {
			style : function(states) {
				return {
					icon : "qx/static/blank.gif"
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * IFRAME
		 * ---------------------------------------------------------------------------
		 */

		"iframe" : {
			style : function(states) {
				return {
					decorator : "main"
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * RESIZER
		 * ---------------------------------------------------------------------------
		 */

		"resizer" : {
			style : function(states) {
				return {
					decorator : "pane"
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * SPLITPANE
		 * ---------------------------------------------------------------------------
		 */

		"splitpane" : {
			style : function(states) {
				return {
					decorator : "splitpane"
				};
			}
		},

		"splitpane/splitter" : {
			style : function(states) {
				return {
					width : states.horizontal ? 3 : undefined,
					height : states.vertical ? 3 : undefined,
					backgroundColor : "background-splitpane"
				};
			}
		},

		"splitpane/splitter/knob" : {
			style : function(states) {
				return {
					source : states.horizontal ? "aristo/decoration/splitpane/knob-horizontal.png"
							: "aristo/decoration/splitpane/knob-vertical.png"
				};
			}
		},

		"splitpane/slider" : {
			style : function(states) {
				return {
					width : states.horizontal ? 3 : undefined,
					height : states.vertical ? 3 : undefined,
					backgroundColor : "background-splitpane"
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * COLOR SELECTOR
		 * ---------------------------------------------------------------------------
		 */

		"colorselector" : "widget",
		"colorselector/control-bar" : "widget",
		"colorselector/control-pane" : "widget",
		"colorselector/visual-pane" : "groupbox",
		"colorselector/preset-grid" : "widget",

		"colorselector/colorbucket" : {
			style : function(states) {
				return {
					decorator : "main",
					width : 16,
					height : 16
				};
			}
		},

		"colorselector/preset-field-set" : "groupbox",
		"colorselector/input-field-set" : "groupbox",
		"colorselector/preview-field-set" : "groupbox",

		"colorselector/hex-field-composite" : "widget",
		"colorselector/hex-field" : "textfield",

		"colorselector/rgb-spinner-composite" : "widget",
		"colorselector/rgb-spinner-red" : "spinner",
		"colorselector/rgb-spinner-green" : "spinner",
		"colorselector/rgb-spinner-blue" : "spinner",

		"colorselector/hsb-spinner-composite" : "widget",
		"colorselector/hsb-spinner-hue" : "spinner",
		"colorselector/hsb-spinner-saturation" : "spinner",
		"colorselector/hsb-spinner-brightness" : "spinner",

		"colorselector/preview-content-old" : {
			style : function(states) {
				return {
					decorator : "main",
					width : 50,
					height : 10
				};
			}
		},

		"colorselector/preview-content-new" : {
			style : function(states) {
				return {
					decorator : "main",
					backgroundColor : "background-light",
					width : 50,
					height : 10
				};
			}
		},

		"colorselector/hue-saturation-field" : {
			style : function(states) {
				return {
					decorator : "main",
					margin : 5
				};
			}
		},

		"colorselector/brightness-field" : {
			style : function(states) {
				return {
					decorator : "main",
					margin : [ 5, 7 ]
				};
			}
		},

		"colorselector/hue-saturation-pane" : "widget",
		"colorselector/hue-saturation-handle" : "widget",
		"colorselector/brightness-pane" : "widget",
		"colorselector/brightness-handle" : "widget",

		/*
		 * ---------------------------------------------------------------------------
		 * COLOR POPUP
		 * ---------------------------------------------------------------------------
		 */

		"colorpopup" : {
			alias : "popup",
			include : "popup",

			style : function(states) {
				return {
					padding : 5,
					backgroundColor : "background-application"
				};
			}
		},

		"colorpopup/field" : {
			style : function(states) {
				return {
					decorator : "main",
					margin : 2,
					width : 14,
					height : 14,
					backgroundColor : "background-light"
				};
			}
		},

		"colorpopup/selector-button" : "button",
		"colorpopup/auto-button" : "button",
		"colorpopup/preview-pane" : "groupbox",

		"colorpopup/current-preview" : {
			style : function(state) {
				return {
					height : 20,
					padding : 4,
					marginLeft : 4,
					decorator : "main",
					allowGrowX : true
				};
			}
		},

		"colorpopup/selected-preview" : {
			style : function(state) {
				return {
					height : 20,
					padding : 4,
					marginRight : 4,
					decorator : "main",
					allowGrowX : true
				};
			}
		},

		"colorpopup/colorselector-okbutton" : {
			alias : "button",
			include : "button",

			style : function(states) {
				return {
					icon : "icon/16/actions/dialog-ok.png"
				};
			}
		},

		"colorpopup/colorselector-cancelbutton" : {
			alias : "button",
			include : "button",

			style : function(states) {
				return {
					icon : "icon/16/actions/dialog-cancel.png"
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * TABLE
		 * ---------------------------------------------------------------------------
		 */

		"table" : {
			alias : "widget",

			style : function(states) {
				return {
					decorator : "table"
				};
			}
		},

		"table-header" : {},

		"table/statusbar" : {
			style : function(states) {
				return {
					decorator : "table-statusbar",
					padding : [ 0, 2 ]
				};
			}
		},

		"table/column-button" : {
			alias : "button-frame",

			style : function(states) {
				return {
					decorator : "table-column-button",
					padding : 3,
					icon : "aristo/decoration/table/select-column-order.png"
				};
			}
		},

		"table-column-reset-button" : {
			include : "menu-button",
			alias : "menu-button",

			style : function() {
				return {
					icon : "icon/16/actions/view-refresh.png"
				};
			}
		},

		"table-scroller" : "widget",

		"table-scroller/scrollbar-x" : "scrollbar",
		"table-scroller/scrollbar-y" : "scrollbar",

		"table-scroller/header" : {
			style : function(states) {
				return {
					decorator : "table-scroller-header"
				};
			}
		},

		"table-scroller/pane" : {
			style : function(states) {
				return {
					backgroundColor : "table-pane"
				};
			}
		},

		"table-scroller/focus-indicator" : {
			style : function(states) {
				return {
					decorator : "table-scroller-focus-indicator"
				};
			}
		},

		"table-scroller/resize-line" : {
			style : function(states) {
				return {
					backgroundColor : "border-separator",
					width : 2
				};
			}
		},

		"table-header-cell" : {
			alias : "atom",
			style : function(states) {
				return {
					minWidth : 13,
					minHeight : 20,
					padding : states.hovered ? [ 3, 4, 2, 4 ]
							: [ 3, 4 ],
					decorator : states.hovered ? "table-header-cell-hovered"
							: "table-header-cell",
					sortIcon : states.sorted ? (states.sortedAscending ? "aristo/decoration/table/ascending.png"
							: "aristo/decoration/table/descending.png")
							: undefined
				};
			}
		},

		"table-header-cell/label" : {
			style : function(states) {
				return {
					minWidth : 0,
					alignY : "middle",
					paddingRight : 5
				};
			}
		},

		"table-header-cell/sort-icon" : {
			style : function(states) {
				return {
					alignY : "middle",
					alignX : "right"
				};
			}
		},

		"table-header-cell/icon" : {
			style : function(states) {
				return {
					minWidth : 0,
					alignY : "middle",
					paddingRight : 5
				};
			}
		},

		"table-editor-textfield" : {
			include : "textfield",

			style : function(states) {
				return {
					decorator : undefined,
					padding : [ 2, 2 ],
					backgroundColor : "background-light"
				};
			}
		},

		"table-editor-selectbox" : {
			include : "selectbox",
			alias : "selectbox",

			style : function(states) {
				return {
					padding : [ 0, 2 ],
					backgroundColor : "background-light"
				};
			}
		},

		"table-editor-combobox" : {
			include : "combobox",
			alias : "combobox",

			style : function(states) {
				return {
					decorator : undefined,
					backgroundColor : "background-light"
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * PROGRESSIVE
		 * ---------------------------------------------------------------------------
		 */

		"progressive-table-header" : {
			alias : "widget",

			style : function(states) {
				return {
					decorator : "progressive-table-header"
				};
			}
		},

		"progressive-table-header-cell" : {
			alias : "atom",
			style : function(states) {
				return {
					minWidth : 40,
					minHeight : 25,
					paddingLeft : 6,
					decorator : "progressive-table-header-cell"
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * APPLICATION
		 * ---------------------------------------------------------------------------
		 */

		"app-header" : {
			style : function(states) {
				return {
					font : "headline",
					textColor : "text-selected",
					backgroundColor : "background-selected-dark",
					padding : [ 8, 12 ]
				};
			}
		},

		"app-header-label" : {
			style : function(states) {
				return {
					paddingTop : 5
				};
			}
		},

		/*
		 * ---------------------------------------------------------------------------
		 * VIRTUAL WIDGETS
		 * ---------------------------------------------------------------------------
		 */

		"virtual-list" : "list",
		"virtual-list/row-layer" : "row-layer",

		"row-layer" : {
			style : function(states) {
				return {
					colorEven : "white",
					colorOdd : "white"
				};
			}
		},

		"column-layer" : "widget",

		"group-item" : {
			include : "label",
			alias : "label",

			style : function(states) {
				return {
					padding : 4,
					backgroundColor : "#BABABA",
					textColor : "white",
					font : "bold"
				};
			}
		},

		"virtual-selectbox" : "selectbox",
		"virtual-selectbox/dropdown" : "popup",
		"virtual-selectbox/dropdown/list" : {
			alias : "virtual-list"
		},

		"virtual-combobox" : "combobox",
		"virtual-combobox/dropdown" : "popup",
		"virtual-combobox/dropdown/list" : {
			alias : "virtual-list"
		},

		"virtual-tree" : {
			include : "tree",
			alias : "tree",

			style : function(states) {
				return {
					itemHeight : 21
				};
			}
		},

		"virtual-tree-folder" : "tree-folder",
		"virtual-tree-file" : "tree-file",

		"cell" : {
			style : function(states) {
				return {
					textColor : states.selected ? "text-selected"
							: "text-label",
					padding : [ 3, 6 ],
					font : "default"
				};
			}
		},

		"cell-string" : "cell",
		"cell-number" : {
			include : "cell",
			style : function(states) {
				return {
					textAlign : "right"
				};
			}
		},
		"cell-image" : "cell",
		"cell-boolean" : {
			include : "cell",
			style : function(states) {
				return {
					iconTrue : "aristo/decoration/table/boolean-true.png",
					iconFalse : "aristo/decoration/table/boolean-false.png"
				};
			}
		},
		"cell-atom" : "cell",
		"cell-date" : "cell",
		"cell-html" : "cell",

		/*
		 * ---------------------------------------------------------------------------
		 * HTMLAREA
		 * ---------------------------------------------------------------------------
		 */

		"htmlarea" : {
			"include" : "widget",

			style : function(states) {
				return {
					backgroundColor : "white"
				};
			}
		}

	}
});

qx.Mixin.define("aristo.ui.window.MWindow", {

	members : {
		// overridden
		_createChildControlImpl : function(id) {
			var control = null;
			if (id == "pane") {
				control = new qx.ui.container.Composite();
				control.getContentElement().removeStyle("overflowX", true);
				control.getContentElement().removeStyle("overflowY", true);
				this._add(control, {
					flex : 1
				});

			}
			return control || this.base(arguments, id);
		}
	}
});
qx.util.AliasManager.getInstance().add("decoration/table/boolean-true.png", "aristo/decoration/table/boolean-true.png");
qx.util.AliasManager.getInstance().add("decoration/table/boolean-false.png", "aristo/decoration/table/boolean-false.png");
/* ************************************************************************

   Copyright:
     2010 Guilherme R. Aiolfi

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Guilherme R. Aiolfi (guilhermeaiolfi)
     * John Spackman (john.spackman@zenesis.com)

   ======================================================================

   This class contains code and resources based on the following work:

   * Aristo
     http://github.com/280north/aristo

     License:
       http://creativecommons.org/licenses/by-sa/3.0/us/

     Authors:
       * 280 North, Inc., http://280north.com/
       * Sofa, http://madebysofa.com/

************************************************************************ */

/**
 * The Aristo font theme.
 */
qx.Theme.define("aristo.theme.Font",
{
  fonts :
  {
    "default" :
    {
      size : 11,
      lineHeight : 1.4,
      family : [ "Arial", "Tahoma", "Verdana", "Bitstream Vera Sans", "Liberation Sans" ]
    },

    "bold" :
    {
      size : 11,
      lineHeight : 1.4,
      family : [ "Arial", "Tahoma", "Verdana", "Bitstream Vera Sans", "Liberation Sans" ],
      bold : true
    },

    "small" :
    {
      size : 10,
      lineHeight : 1.4,
      family : [ "Arial", "Tahoma", "Verdana", "Bitstream Vera Sans", "Liberation Sans" ]
    },

    "monospace" :
    {
      size : 11,
      lineHeight : 1.4,
      family : [ "Courier New", "DejaVu Sans Mono", "monospace" ]
    },
    
    "headline" :
    {
      size : 24,
      family : ["sans-serif", "arial"]
    }

  }
});
/* ************************************************************************

   Copyright:
     2010 Guilherme R. Aiolfi

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Guilherme R. Aiolfi (guilhermeaiolfi)
     * John Spackman (john.spackman@zenesis.com)

   ======================================================================

   This class contains code and resources based on the following work:

   * Aristo
     http://github.com/280north/aristo

     License:
       http://creativecommons.org/licenses/by-sa/3.0/us/

     Authors:
       * 280 North, Inc., http://280north.com/
       * Sofa, http://madebysofa.com/

************************************************************************ */

qx.Theme.define("aristo.Aristo",
{
  title : "Aristo Theme",
  meta :
  {
    color : aristo.theme.Color,
    decoration : aristo.theme.Decoration,
    font : aristo.theme.Font,
    icon : qx.theme.icon.Oxygen,
    appearance : aristo.theme.Appearance
  }
});
