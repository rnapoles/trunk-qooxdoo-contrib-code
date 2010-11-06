/* ************************************************************************

   Copyright:
     2010 Norbert Schröder

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

/* ************************************************************************

#asset(retrotheme/decoration/*)

************************************************************************ */

qx.Theme.define("retrotheme.theme.Appearance",
{
  extend: qx.theme.modern.Appearance,

  appearances:
  {
    "button":
    {
      alias : "atom",

      style : function(states)
      {
        return {
		  padding: states.pressed || states.checked 
		           || (states.checked && states.disabled) ? [4, 4, 2, 6] : [3, 6, 3, 4], 
          decorator: states.pressed || states.checked ?
                        "button-checked" :
                     states.hovered && !states.disabled ?
                        "button-hovered" : "button",
		  textColor: "button-label",
		  center: true
        };
      }
	},
	
	"button-red":
    {
      style: function(states)
      {
        return {
		  padding: states.pressed || states.checked 
		           // || (states.checked && states.disabled) ? [4, 4, 0, 6] : [2, 6, 2, 4], 
		           || (states.checked && states.disabled) ? [4, 4, 2, 6] : [3, 6, 3, 4],  
          decorator: states.pressed || states.checked ?
                        "button-red-checked" :
                     states.hovered && !states.disabled ?
                        "button-red-hovered" : "button",
		  textColor: "button-label",
		  center: true
        };
      }
	},
	
	"button-frame":
    {
      alias : "atom",

      style : function(states)
      {
        return {
		  padding: states.pressed || states.checked 
		           || (states.checked && states.disabled) ? [4, 4, 2, 6] : [3, 6, 3, 4], 
          decorator: states.pressed || states.checked ?
                        "button-checked" :
                     states.hovered && !states.disabled ?
                        "button-hovered" : "button",
		  textColor: "button-label"
        };
      }
	},
	
	"hover-button":
    {
      alias: "button",
      include: "button",

      style: function(states)
      {
        return {
          decorator : states.hovered ? "button-hovered": "button",
          textColor : states.hovered ? "text-selected" : undefined
        }
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      COMBOBOX
    ---------------------------------------------------------------------------
    */
	
	"combobox/button":
    {
      include: "button",
      alias: "button",

      style : function(states)
      {
        var ret = {
          icon: "retrotheme/decoration/arrows/down-invert.png",
          padding: 2
        };

        return ret;
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      DATE CHOOSER
    ---------------------------------------------------------------------------
    */
	"datechooser" :
    {
      style : function(states)
      {
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
          decorator = "group";
        }

        return {
          padding : 2,
          decorator : decorator,
          backgroundColor : "background-datechooser"
        };
      }
    },
	
	"datechooser/date-pane" :
    {
      style : function(states)
      {
        return {
          textColor: states.disabled ? "text-disabled" : undefined,
          marginTop : 2
        };
      }
    },
	
	"datechooser/day" :
    {
      style : function(states)
      {
        return {
          textAlign : "center",
          decorator : states.disabled ? undefined : states.selected ? "selected" : undefined,
          textColor : states.disabled ? "text-disabled" : states.selected ? "text-label" : states.otherMonth ? "text-inactive" : undefined,
          font      : states.today ? "bold" : undefined,
          padding   : [ 2, 4 ]
        };
      }
    },
	
	"datechooser/nav-button"  :
    {
      include : "button-simple",
      alias : "button-simple",

      style : function(states)
      {
        var result = {
          padding : [ 2, 4 ],
          shadow : undefined
        };

        if (states.lastYear) {
          result.icon = "retrotheme/decoration/arrows/rewind-invert.png";
          result.marginRight = 1;
        } else if (states.lastMonth) {
          result.icon = "retrotheme/decoration/arrows/left-invert.png";
        } else if (states.nextYear) {
          result.icon = "retrotheme/decoration/arrows/forward-invert.png";
          result.marginLeft = 1;
        } else if (states.nextMonth) {
          result.icon = "retrotheme/decoration/arrows/right-invert.png";
        }

        return result;
      }
	},
	
	"datechooser/week" :
    {
      style : function(states)
      {
        return {
          textAlign : "center",
          padding   : [ 2, 4 ],
          backgroundColor : "background-datechooser-week"
        };
      }
    },
	
	"datechooser/weekday" :
    {
      style : function(states)
      {
        return {
          textColor : states.disabled ? "text-disabled" : states.weekend ? "text-inactive" : undefined,
          textAlign : "center",
          paddingTop : 2,
          backgroundColor : "background-datechooser-week"
        };
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      FRAMES
    ---------------------------------------------------------------------------
    */
	"move-frame" :
    {
      style : function(states)
      {
        return {
          decorator : "frame"
        };
      }
    },

    "resize-frame" : "move-frame",
	
	/*
    ---------------------------------------------------------------------------
      GROUPBOX
    ---------------------------------------------------------------------------
    */
	"groupbox/frame" :
    {
      style : function(states)
      {
        return {
          padding   : 6,
		  backgroundColor: "background-groupbox",
          decorator : "group"
        };
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      HTMLAREA
    ---------------------------------------------------------------------------
    */

    "htmlarea" :
    {
      "include" : "widget",

      style : function(states)
      {
        return {
          backgroundColor : "background-textfield-focused"
        };
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      LIST
    ---------------------------------------------------------------------------
    */
	
	"list" :
    {
      alias : "scrollarea",

      style : function(states)
      {
        var decorator;

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (focused && invalid && !disabled) {
          decorator = "list";
        } else if (focused && !invalid && !disabled) {
          decorator = "list-focused";
        } else if (disabled) {
          decorator = "list";
        } else if (!focused && invalid && !disabled) {
          decorator = "list";
        } else {
          decorator = "list";
        }

        return {
          decorator: decorator,
		  textColor: "text-active"
        };
      }
    },

	"listitem" :
    {
      style : function(states)
      {
        var decorator;
        if (states.dragover) {
          decorator = states.selected ? "selected-dragover" : "dragover";
        } else {
          decorator = states.selected ? "listitem-selected" : undefined;
        }

        return {
          padding   : states.dragover ? [5, 5, 3, 5] : states.selected ? 2 : 3,
          textColor : states.selected ? "text-selected" : undefined,
          decorator : decorator
        };
      }
    },
	
	
	/*
    ---------------------------------------------------------------------------
      MENU
    ---------------------------------------------------------------------------
    */
	
	"menu-button":
    {
      alias : "atom",

      style : function(states)
      {
        return {
          textColor: "menu-button",
		  // backgroundColor: states.selected ? "background-menu-button-selected" : undefined,
		  decorator: states.selected ? "menu-button" : undefined,
          padding: states.selected ? [ 3, 5 ] : [ 4, 6 ]
        };
      }
    },
	
	"menu-button/arrow" :
    {
      include : "image",

      style : function(states)
      {
        return {
          source : "retrotheme/decoration/arrows/right-invert.png",
          alignY : "middle"
        };
      }
    },
	
	"menu-checkbox":
    {
      alias: "menu-button",
      include: "menu-button",

      style: function(states)
      {
        return {
          icon : states.checked ? "decoration/menu/checkbox-invert.gif" : undefined
        }
      }
    },
	
	"menu-radiobutton" :
    {
      alias : "menu-button",
      include : "menu-button",

      style : function(states)
      {
        return {
          icon : states.checked ? "decoration/menu/radiobutton-invert.gif" : undefined
        }
      }
    },
	
	"menubar-button" :
    {
      alias : "atom",

      style : function(states)
      {
        return {
          decorator : states.pressed || states.hovered ? "menubar-selected" : undefined,
          textColor : states.pressed || states.hovered ? "text-selected" : "menu-button",
          padding   : [ 3, 8 ]
        }
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      POPUP
    ---------------------------------------------------------------------------
    */
	"popup": 
    {
      style: function(states)
      {
        return {
          decorator: "menu",
		  textColor: "text-popup",
          shadow: "shadow-window"
        }
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      ROOT
    ---------------------------------------------------------------------------
    */
	"root" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "background-application",
          textColor       : "text-label",
          font            : "default"
        };
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      SCROLLBAR
    ---------------------------------------------------------------------------
    */
	"scrollbar/button" :
    {
      style : function(states)
      {
        var icon = "retrotheme/decoration/scrollbar/";
		
        if (states.left) {
          icon += "left";
        } else if (states.right) {
          icon += "right";
        } else if (states.up) {
          icon += "up";
        } else {
          icon += "down";
        }
		icon += "-invert.png";
		
        if (states.left || states.right)
        {
          return {
		    decorator: states.hovered ? "button-hovered" : "button",
			backgroundColor: states.hovered ? "background-scrollbar-slider-hovered" : "background-scrollbar-slider",
            padding : [0, 0, 0, states.left ? 3 : 4],
            icon : icon,
            width: 15,
            height: 14
          }
        }
        else
        {
          return {
		    decorator: states.hovered ? "button-hovered" : "button",
			backgroundColor: states.hovered ? "background-scrollbar-slider-hovered" : "background-scrollbar-slider",
            padding : [0, 2, 0, 1],
            icon : icon,
            width: 14,
            height: 15
          }
        }
      }
    },
	
	"scrollbar/slider/knob" :
    {
      style : function(states)
      {
        return {
          decorator : states.hovered ? "button-hovered" : "button",
		  backgroundColor: states.hovered ? "background-scrollbar-slider-hovered" : "background-scrollbar-slider",
          minHeight : states.horizontal ? undefined : 9,
          minWidth  : states.horizontal ? 9 : undefined
        };
      }
    },
	
	/*-------------------------------------------------------------------------
      SELECTBOX
    ---------------------------------------------------------------------------
    */
	"selectbox" :
    {
      alias : "button-frame",
      include : "button-frame",

      style : function(states)
      {
        return {
          padding : [ 2, 8 ]
        };
      }
    },
	
	"selectbox/arrow" :
    {
      include : "image",

      style : function(states)
      {
        return {
          source : "retrotheme/decoration/arrows/down-small-invert.png",
          paddingLeft : 5
        };
      }
    },
	
	"selectbox/atom": "label",
	
	"selectbox/list":  
	{
      alias: "list",
	  
	  style: function(states)
      {
        return {
          textColor: "white"
        };
      }
    },
	
	"selectbox/listitem":  
	{
	  style: function(states)
      {
        return {
          textColor: "white"
        };
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      SLIDEBAR
    ---------------------------------------------------------------------------
    */

    "slidebar" : {},
    "slidebar/scrollpane" : {},
    "slidebar/content" : {},
	
	"slidebar/button-forward" :
    {
      alias : "button-frame",
      include : "button-frame",

      style : function(states)
      {
        return {
          padding : 5,
          center : true,
          icon : states.vertical ?
            "retrotheme/decoration/arrows/down-invert.png" :
            "retrotheme/decoration/arrows/right-invert.png"
        };
      }
    },

    "slidebar/button-backward" :
    {
      alias : "button-frame",
      include : "button-frame",

      style : function(states)
      {
        return {
          padding : 5,
          center : true,
          icon : states.vertical ?
            "retrotheme/decoration/arrows/up-invert.png" :
            "retrotheme/decoration/arrows/left-invert.png"
        };
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      SLIDER
    ---------------------------------------------------------------------------
    */
	"slider/knob":
    {
	  alias: "button-frame",
      include: "button-frame",

      style: function(states)
      {
        return {
          // decorator : states.disabled ? "scrollbar-slider-horizontal-disabled" :
					  // states.pressed ? "button-hovered" : "button",
          shadow: undefined,
          height: 14,
          width: 14
        };
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      SPINNER
    ---------------------------------------------------------------------------
    */
	"spinner/upbutton" :
    {
      alias : "button",
      include : "button",

      style : function(states)
      {
        return {
          icon : "retrotheme/decoration/arrows/up-small-invert.png",
          padding : states.pressed ? [2, 2, 0, 4] : [1, 3, 1, 3],
          shadow: undefined
        }
      }
    },

    "spinner/downbutton" :
    {
      alias : "button-simple",
      include : "button-simple",

      style : function(states)
      {
        return {
          icon : "retrotheme/decoration/arrows/down-small-invert.png",
          padding : states.pressed ? [2, 2, 0, 4] : [1, 3, 1, 3],
          shadow: undefined
        };
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      SPLITBUTTON
    ---------------------------------------------------------------------------
    */
	
	"splitbutton/arrow":
    {
      alias : "button",
      include : "button",

      style : function(states)
      {
        return {
          icon : "retrotheme/decoration/arrows/down-small-invert.png",
		  // decorator: states.pressed || states.checked ?
                        // "splitbutton-right-checked" :
                     // states.hovered && !states.disabled ?
                        // "splitbutton-right-hovered" : "splitbutton-right",
          // paddingLeft : 6,
          marginLeft : 1,
		  marginRight: 1
        };
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      TABLE
    ---------------------------------------------------------------------------
    */
	
	"table":
    {
      alias: "widget",

      style: function(states)
      {
        return {
          decorator: "group"
        };
      }
    },
	
	"table/column-button" :
    {
      alias : "button-frame",

      style : function(states)
      {
        return {
          decorator : "table-header-cell",
          padding   : 3,
          icon      : "retrotheme/decoration/table/select-column-order-invert.png"
        };
      }
    },
	
	"table-header-cell" :
    {
      alias : "atom",
	  
      style : function(states)
      {
        return {
          minWidth  : 13,
          minHeight : 20,
          padding   : [ 2, 4, 0, 4 ],
		  marginTop: -2,
          decorator : states.hovered ? "table-header-cell-selected" : "table-header-cell",
          sortIcon  : states.sorted ?
              (states.sortedAscending ? "retrotheme/decoration/arrows/down-invert.png" : "retrotheme/decoration/arrows/up-invert.png")
              : undefined
        }
      }
    },
	
	"table-scroller/header":
    {
      style : function(states)
      {
        return {
          decorator : "table-header-cell"
        };
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      TABVIEW
    ---------------------------------------------------------------------------
    */
	"tabview/bar/button-forward" :
    {
      include : "slidebar/button-forward",
      alias : "slidebar/button-forward",

      style : function(states)
      {
        if (states.barTop)
        {
          return {
            marginTop : 2,
            marginBottom: 0
          };
        }
		else if (states.barBottom)
        {
          return {
            marginTop : 0,
            marginBottom: 2
          };
        }
		else if (states.barLeft)
        {
          return {
            marginLeft : 2,
            marginRight : 0
          };
        }
        else
        {
          return {
            marginLeft : 0,
            marginRight : 2
          };
        }
      }
    },
	
	"tabview/bar/button-backward" :
    {
      include : "slidebar/button-backward",
      alias : "slidebar/button-backward",

      style : function(states)
      {
        if (states.barTop)
        {
          return {
            marginTop : 2,
            marginBottom: 0
          };
        }
		else if (states.barBottom)
        {
          return {
            marginTop : 0,
            marginBottom: 2
          };
        }
		else if (states.barLeft)
        {
          return {
            marginLeft : 2,
            marginRight : 0
          };
        }
        else
        {
          return {
            marginLeft : 0,
            marginRight : 2
          };
        }
      }
    },
	
	"tabview-page/button" :
    {
      alias : "atom",

      style : function(states)
      {
        var decorator, padding=0;
        var marginTop=0, marginBottom=0, marginLeft=0, marginRight=0;

        if (states.checked)
        {
		  padding = [ 4, 12 ];
		  decorator = "button-hovered";
          if (states.barTop)
          {
            marginLeft = states.firstTab ? 0 : -4;
            marginRight = states.lastTab ? 0 : -4;
          }
          else if (states.barBottom)
          {
            marginLeft = states.firstTab ? 0 : -4;
            marginRight = states.lastTab ? 0 : -4;
          } 
        }
		else
        {
          if (states.barTop)
          {
		    if (states.hovered)
			{
		      decorator = "button-hovered";
			}
            else if (states.disabled)
			{
			  decorator = "button";
			}			
			else 
			{
		      decorator = "button";
			}
		    padding = [ 2, 8 ];
            marginTop = 4;
            marginLeft = states.firstTab ? 4 : 0;
          }
          else if (states.barBottom)
          {
		    if (states.hovered)
			{
		      decorator = "button-hovered";
			}
            else if (states.disabled)
			{
			  decorator = "button";
			}			
			else 
			{
		      decorator = "button";
			}
		    padding = [ 2, 8 ];
            marginBottom = 4;
            marginLeft = states.firstTab ? 4 : 0;
          }
          else if (states.barRight)
          {
		    if (states.hovered)
			{
		      decorator = "button-hovered";
			}
			else if (states.disabled)
			{
			  decorator = "button";
			}
			else 
			{
		      decorator = "button";
			}
		    padding = [ 4, 12 ];
            marginRight = 5;
          }
          else
          {
		    if (states.hovered)
			{
		      decorator = "button-hovered";
			}
            else if (states.disabled)
			{
			  decorator = "button";
			}
			else 
			{
		      decorator = "button";
			}
		    padding = [ 4, 12 ];
            marginLeft = 5;
          }
        }
		
        return {
          zIndex : states.checked ? 10 : 5,
          decorator : decorator,
          padding   : padding,
          marginTop : marginTop,
          marginBottom : marginBottom,
          marginLeft : marginLeft,
          marginRight : marginRight,
		  textColor: states.disabled ? "text-inactive" : "text-label"
        };
      }
    },
	
	"tabview-page/button/close-button":
    {
      alias: "atom",
      style: function(states)
      {
	    var icon;
	    if (states.hovered)
		{
		  icon = "retrotheme/decoration/tabview/close-button-hovered.png";
		} else {
		  icon = "retrotheme/decoration/tabview/close-button.png";
		}
        return {
          icon: icon
        };
      }
    },
	
	"tabview/pane" :
    {
      style : function(states)
      {
        return {
		  decorator : "tabview",
          minHeight : 100,
          marginBottom : states.barBottom ? -1 : 0,
          marginTop : states.barTop ? -1 : 0,
          marginLeft : states.barLeft ? -1 : 0,
          marginRight : states.barRight ? -1 : 0
        };
      }
    },
	
	
	/*
    ---------------------------------------------------------------------------
      TOOLBAR
    ---------------------------------------------------------------------------
    */
	
	"toolbar/part": "widget",
	
	"toolbar/part/handle":
    {
      style: function(states)
      {
        return {
          source: "retrotheme/decoration/toolbar/toolbar-handle-knob.png",
          marginLeft: 3,
          marginRight: 3
        };
      }
    },
	
	"toolbar-button":
    {
      alias: "atom",

      style: function(states)
      {
        return {
		  padding: states.pressed || states.checked ? [7, 4, 3, 7] : [6, 6, 6, 7],
		  margin: states.pressed || states.checked ? [0] : [0],
          decorator: states.pressed || states.checked ?
                        "toolbar-button-checked" :
                      states.hovered && !states.disabled ?
                        "toolbar-button-hovered" : undefined,
		  textColor: "toolbar-button"
        };
      }
    },
	
	"toolbar-menubutton/arrow" :
    {
      alias : "image",
      include : "image",

      style : function(states)
      {
        return {
          source : "retrotheme/decoration/arrows/down-small-invert.png"
        };
      }
    },
	
	"toolbar-splitbutton/button": "toolbar-button",
	
	"toolbar-splitbutton/arrow":
    {
	  alias: "toolbar-button",
	  include: "toolbar-button",
	  
      style: function(states)
      {
        return {
          icon: "retrotheme/decoration/arrows/down-invert.png"
        };
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      TOOL TIP
    ---------------------------------------------------------------------------
    */

    "tooltip" :
    {
      style : function(states)
      {
        return {
          padding : [ 1, 5, 2, 3 ],
          offset : [ 15, 5, 5, 5 ],
		  decorator: "tooltip",
		  textColor: "black"
        };
      }
    },
	
	/*
    ---------------------------------------------------------------------------
      WINDOW
    ---------------------------------------------------------------------------
    */
	"window":
    {
      style: function(states)
      {
        return {
          shadow: "shadow-window",
		  contentPadding : [5]
        };
      }
    },
	
	"window/close-button" :
    {
      alias : "atom",

      style : function(states)
      {
        return {
          icon : states.active ? states.hovered ? "retrotheme/decoration/window/close-active-hovered.png" :
                                                  "retrotheme/decoration/window/close-active.png" :
                                                  "retrotheme/decoration/window/close-inactive.png",
          margin : [ 4, 8, 2, 0 ]
        };
      }
    },
	
	"window/maximize-button" :
    {
      alias : "atom",

      style : function(states)
      {
        return {
          icon : states.active ? states.hovered ? "retrotheme/decoration/window/maximize-active-hovered.png" :
                                                  "retrotheme/decoration/window/maximize-active.png" :
                                                  "retrotheme/decoration/window/maximize-inactive.png",
          margin : [ 4, 8, 2, 0 ]
        };
      }
    },
	
	"window/minimize-button" :
    {
      alias : "atom",

      style : function(states)
      {
        return {
          icon : states.active ? states.hovered ? "retrotheme/decoration/window/minimize-active-hovered.png" :
                                                  "retrotheme/decoration/window/minimize-active.png" :
                                                  "retrotheme/decoration/window/minimize-inactive.png",
          margin : [ 4, 8, 2, 0 ]
        };
      }
    },
	
	"window/restore-button" :
    {
      alias : "atom",

      style : function(states)
      {
        return {
          icon : states.active ? states.hovered ? "retrotheme/decoration/window/restore-active-hovered.png" :
                                                  "retrotheme/decoration/window/restore-active.png" :
                                                  "retrotheme/decoration/window/restore-inactive.png",
          margin : [ 5, 8, 2, 0 ]
        };
      }
    },
	
	"window/statusbar-text": {},
	
	"window/title" :
    {
      style : function(states)
      {
        return {
          alignY: "top",
          textColor: "window-caption",
		  font: "bold",
		  paddingTop: 5,
		  paddingLeft: 8
        };
      }
    }
	
  }
});