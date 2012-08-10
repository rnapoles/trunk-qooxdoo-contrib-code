/* ************************************************************************

   Copyright:
     2011 Norbert Schröder

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

qx.Theme.define("graydienttheme.theme.Appearance",
{
  appearances:
  {
    /*
    ---------------------------------------------------------------------------
      APPLICATION
    ---------------------------------------------------------------------------
    */

    "app-header":
    {
      style: function(states)
      {
        return {
          font: "bold",
          textColor: "text-active",
          padding: [8, 12],
          decorator: "app-header"
        };
      }
    },

    "app-header-label": "label",
    
    /*
    ---------------------------------------------------------------------------
      BUTTON
    ---------------------------------------------------------------------------
    */
    "button-frame" :
    {
      alias: "atom",

      style: function(states)
      {
        var decorator = "button-box";
        var margin = 2;

        if (states.invalid && !states.disabled) {
          decorator += "-invalid";
        } else if ((states.hovered || states.focused) && !states.pressed && !states.checked) {
          decorator += "-hovered";
        } else if (states.pressed || states.checked) {
          decorator += "-pressed";
        }

        return {
          decorator: decorator,
          padding: states.pressed || states.checked || states.invalid ? [2, 6, 2, 8] : [3, 8, 3, 8],
          margin: margin,
          cursor: states.disabled ? undefined : "pointer",
          minWidth: 5,
          minHeight: 5
        };
      }
    },
    
    "button-frame/image":
    {
      style: function(states)
      {
        return {
          opacity: !states.replacement && states.disabled ? 0.5 : 1
        };
      }
    },
    
    "button-frame/label": 
    {
      alias: "atom/label",

      style: function(states)
      {
        return {
          textColor: states.disabled ? "text-disabled" : undefined
        };
      }
    },
    
    "button":
    {
      alias: "button-frame",
      include: "button-frame",

      style: function(states)
      {
        return {
          center: true
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
          decorator: states.hovered ? "hover-button-hovered" : "hover-button"
        }
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      CHECK BOX
    ---------------------------------------------------------------------------
    */
    "checkbox":
    {
      alias: "atom",

      style: function(states)
      {
        // The "disabled" icon is set to an icon **without** the -disabled
        // suffix on purpose. This is because the Image widget handles this
        // already by replacing the current image with a disabled version
        // (if available). If no disabled image is found, the opacity style
        // is used.
        var icon;

        // Checked
        if (states.checked) {
          icon = graydienttheme.theme.Image.URLS["checkbox-checked"];
        // Undetermined
        } else if (states.undetermined) {
          icon = graydienttheme.theme.Image.URLS["checkbox-undetermined"];
        // Unchecked
        } else {
          // empty icon
          icon = graydienttheme.theme.Image.URLS["blank"];
        }

        return {
          icon: icon,
          gap: 6
        }
      }
    },

    "checkbox/icon": 
    {
      style: function(states)
      {
        var decorator = "checkbox";

        if (states.disabled) {
          decorator += "-disabled";
        } else if (states.invalid) {
          decorator += "-invalid";
        } else if (states.focused || states.hovered) {
          decorator += "-focused";
        }

        var padding;
        // Checked
        if (states.checked) {
          padding = 2;
        // Undetermined
        } else if (states.undetermined) {
          padding = [4, 2];
        }

        return {
          decorator: decorator,
          width: 12,
          height: 12,
          padding: padding
        }
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      COLOR POPUP
    ---------------------------------------------------------------------------
    */

    "colorpopup":
    {
      alias: "popup",
      include: "popup",

      style: function(states)
      {
        return {
          padding: 5,
          backgroundColor: "background"
        }
      }
    },

    "colorpopup/field":
    {
      style: function(states)
      {
        return {
          margin: 2,
          width: 14,
          height: 14,
          backgroundColor: "background",
          decorator: "main-dark"
        }
      }
    },

    "colorpopup/selector-button": "button",
    "colorpopup/auto-button": "button",

    "colorpopup/preview-pane": "groupbox",

    "colorpopup/current-preview":
    {
      style: function(state)
      {
        return {
          height: 20,
          padding: 4,
          marginLeft: 4,
          decorator: "main-dark",
          allowGrowX: true
        }
      }
    },

    "colorpopup/selected-preview":
    {
      style: function(state)
      {
        return {
          height: 20,
          padding: 4,
          marginRight : 4,
          decorator: "main-dark",
          allowGrowX: true
        }
      }
    },

    "colorpopup/colorselector-okbutton":
    {
      alias: "button",
      include: "button",

      style: function(states)
      {
        return {
          icon: "icon/16/actions/dialog-ok.png"
        };
      }
    },

    "colorpopup/colorselector-cancelbutton":
    {
      alias: "button",
      include: "button",

      style: function(states)
      {
        return {
          icon: "icon/16/actions/dialog-cancel.png"
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
      COLOR SELECTOR
    ---------------------------------------------------------------------------
    */

    "colorselector": "widget",
    "colorselector/control-bar": "widget",
    "colorselector/visual-pane": "groupbox",
    "colorselector/control-pane": "widget",
    "colorselector/preset-grid": "widget",

    "colorselector/colorbucket":
    {
      style: function(states)
      {
        return {
          decorator: "main-dark",
          width: 16,
          height: 16
        }
      }
    },

    "colorselector/preset-field-set": "groupbox",
    "colorselector/input-field-set": "groupbox",
    "colorselector/preview-field-set": "groupbox",

    "colorselector/hex-field-composite": "widget",
    "colorselector/hex-field": "textfield",

    "colorselector/rgb-spinner-composite": "widget",
    "colorselector/rgb-spinner-red": "spinner",
    "colorselector/rgb-spinner-green": "spinner",
    "colorselector/rgb-spinner-blue": "spinner",

    "colorselector/hsb-spinner-composite": "widget",
    "colorselector/hsb-spinner-hue": "spinner",
    "colorselector/hsb-spinner-saturation": "spinner",
    "colorselector/hsb-spinner-brightness": "spinner",

    "colorselector/preview-content-old":
    {
      style: function(states)
      {
        return {
          decorator: "main-dark",
          width: 50,
          height: 10
        }
      }
    },

    "colorselector/preview-content-new":
    {
      style: function(states)
      {
        return {
          decorator: "main-dark",
          backgroundColor: "white",
          width: 50,
          height: 10
        }
      }
    },

    "colorselector/hue-saturation-field":
    {
      style: function(states)
      {
        return {
          decorator: "main-dark",
          margin: 5
        }
      }
    },

    "colorselector/brightness-field":
    {
      style: function(states)
      {
        return {
          decorator: "main-dark",
          margin: [5, 7]
        }
      }
    },

    "colorselector/hue-saturation-pane": "widget",
    "colorselector/hue-saturation-handle": "widget",
    "colorselector/brightness-pane": "widget",
    "colorselector/brightness-handle": "widget",
    
    /*
    ---------------------------------------------------------------------------
      COMBO BOX
    ---------------------------------------------------------------------------
    */

    "combobox": {},

    "combobox/button":
    {
      alias: "button-frame",
      include: "button-frame",

      style: function(states)
      {
        var decorator = "combobox-button";

        if (states.hovered && !states.pressed && !states.checked) {
          decorator += "-hovered";
        } else if (states.pressed || states.checked) {
          decorator += "-pressed";
        }

        return {
          icon: graydienttheme.theme.Image.URLS["arrow-down"],
          cursor: "pointer",
          decorator: decorator,
          margin: 0,
          padding: [0, 5],
          width: 19
        };
      }
    },

    "combobox/popup": "popup",
    "combobox/list":
    {
      alias: "list"
    },

    "combobox/textfield": "textfield",
    
    /*
    ---------------------------------------------------------------------------
      CORE
    ---------------------------------------------------------------------------
    */

    "widget": {},

    "label":
    {
      style: function(states)
      {
        return {
          textColor: states.disabled ? "text-disabled" : undefined
        };
      }
    },

    "image":
    {
      style: function(states)
      {
        return {
          opacity: !states.replacement && states.disabled ? 0.3 : undefined
        }
      }
    },

    "atom": {},
    "atom/label": "label",
    "atom/icon": "image",

    "root":
    {
      style: function(states)
      {
        return {
          backgroundColor: "background",
          textColor: "text",
          font: "default"
        };
      }
    },

    "popup":
    {
      style: function(states)
      {
        return {
          decorator: "popup",
          backgroundColor: "background"
        }
      }
    },

    "iframe":
    {
      style: function(states)
      {
        return {
          backgroundColor: "white",
          decorator: "inset"
        };
      }
    },

    "move-frame":
    {
      style: function(states)
      {
        return {
          decorator: "main-dark"
        };
      }
    },

    "resize-frame": "move-frame",

    "dragdrop-cursor":
    {
      style: function(states)
      {
        var icon = "nodrop";

        if (states.copy) {
          icon = "copy";
        } else if (states.move) {
          icon = "move";
        } else if (states.alias) {
          icon = "alias";
        }

        return {
          source: graydienttheme.theme.Image.URLS["cursor-" + icon],
          position: "right-top",
          offset: [ 2, 16, 2, 6 ]
        };
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      DATE CHOOSER
    ---------------------------------------------------------------------------
    */

    "datechooser":
    {
      style: function(states)
      {
        return {
          decorator: "inset"
        }
      }
    },

    "datechooser/navigation-bar":
    {
      style: function(states)
      {
        return {
          decorator: "window-caption-inactive",
          textColor: states.disabled ? "text-disabled" : states.invalid ? "invalid" : undefined,
          padding: 0
        };
      }
    },

    "datechooser/last-year-button-tooltip": "tooltip",
    "datechooser/last-month-button-tooltip": "tooltip",
    "datechooser/next-year-button-tooltip": "tooltip",
    "datechooser/next-month-button-tooltip": "tooltip",

    "datechooser/last-year-button": "datechooser/button",
    "datechooser/last-month-button": "datechooser/button",
    "datechooser/next-year-button": "datechooser/button",
    "datechooser/next-month-button": "datechooser/button",
    "datechooser/button/icon": {},

    "datechooser/button":
    {
      alias: "combobox/button",
      include: "combobox/button",
      
      style: function(states)
      {
        var result = {
          margin: 0,
          padding: [5, 0, 5, 7],
          show: "icon",
          cursor: "pointer"
        };

        if (states.lastYear) {
          result.icon = graydienttheme.theme.Image.URLS["arrow-rewind"];
          result.paddingLeft = 5;
          result.paddingRight = 1;
        } else if (states.lastMonth) {
          result.icon = graydienttheme.theme.Image.URLS["arrow-left"];
        } else if (states.nextYear) {
          result.icon = graydienttheme.theme.Image.URLS["arrow-forward"];
          result.paddingLeft = 5;
          result.paddingRight = 1;
        } else if (states.nextMonth) {
          result.icon = graydienttheme.theme.Image.URLS["arrow-right"];
        }

        return result;
      }
    },

    "datechooser/month-year-label":
    {
      style: function(states)
      {
        return {
          font: "bold",
          textAlign: "center",
          textColor: "background",
          paddingTop: 1
        };
      }
    },

    "datechooser/date-pane":
    {
      style: function(states)
      {
        return {
          decorator: "datechooser-date-pane",
          backgroundColor: "background"
        };
      }
    },

    "datechooser/weekday":
    {
      style: function(states)
      {
        return {
          textColor: states.disabled || states.weekend ? "text-inactive" : undefined,
          textAlign: "center",
          paddingTop: 2,
          backgroundColor: "background-medium",
          font: "bold"
        };
      }
    },

    "datechooser/day":
    {
      style: function(states)
      {
        return {
          textAlign: "center",
          backgroundColor: states.selected ? "background-selected-dark" : undefined,
          textColor: states.disabled || states.otherMonth ? "text-inactive" : 
                     states.selected ? "text-selected" : undefined,
          font: states.today ? "bold" : undefined,
          padding: [2, 4]
        };
      }
    },

    "datechooser/week":
    {
      style: function(states)
      {
        return {
          textAlign: "center",
          padding: [2, 4],
          backgroundColor: "background-medium",
          textColor: "text-inactive"
        };
      }
    },

    
    /*
    ---------------------------------------------------------------------------
      DATE FIELD
    ---------------------------------------------------------------------------
    */

    "datefield": "combobox",

    "datefield/button":
    {
      alias: "combobox/button",
      include: "combobox/button",

      style: function(states)
      {
        return {
          icon: "icon/16/apps/office-calendar.png",
          padding: 0
        };
      }
    },

    "datefield/list":
    {
      alias: "datechooser",
      include: "datechooser",

      style: function(states)
      {
        return {
          decorator: undefined
        };
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      FORM FIELDS
    ---------------------------------------------------------------------------
    */
    "form-renderer-label" : 
    {
      include : "label",
      
      style : function() 
      {
        return {
          paddingTop: 4
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      GROUP BOX
    ---------------------------------------------------------------------------
    */

    "groupbox": 
    {
      style: function(states)
      {
        return {
          legendPosition: "top"
        };
      }
    },

    "groupbox/legend":
    {
      alias: "atom",

      style: function(states)
      {
        return {
          textColor: states.invalid ? "invalid" : undefined,
          padding: [1, 0, 1, 4],
          font: "bold"
        };
      }
    },

    "groupbox/frame":
    {
      style: function(states)
      {
        return {
          padding: 8,
          decorator: "group-box"
        };
      }
    },

    "check-groupbox": "groupbox",

    "check-groupbox/legend":
    {
      alias: "checkbox",
      include: "checkbox",

      style: function(states)
      {
        return {
          textColor: states.invalid ? "invalid" : undefined,
          padding: [1, 0, 2, 4],
          font: "bold"
        };
      }
    },

    "radio-groupbox": "groupbox",

    "radio-groupbox/legend":
    {
      alias: "radiobutton",
      include: "radiobutton",

      style: function(states)
      {
        return {
          textColor: states.invalid ? "invalid" : undefined,
          padding: [1, 0, 2, 4],
          font: "bold"
        };
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      HTMLAREA
    ---------------------------------------------------------------------------
    */

    "htmlarea":
    {
      include: "widget",

      style: function(states)
      {
        return {
          backgroundColor: "background-htmlarea"
        }
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      LIST
    ---------------------------------------------------------------------------
    */

    "list":
    {
      alias: "scrollarea",
      
      style: function(states)
      {
        return {
          decorator: states.invalid ? "inset-invalid" : 
                     states.focused ? "inset-focused" : "inset"
        };
      }
    },

    "listitem":
    {
      alias: "atom",

      style: function(states)
      {
        return {
          padding: states.dragover ? [4, 4, 2, 4] : [3, 3, 3, 5],
          textColor: states.selected ? "text-selected" : undefined,
          decorator: states.selected ? "list-item" : undefined
        };
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      MENU
    ---------------------------------------------------------------------------
    */

    "menu":
    {
      style: function(states)
      {
        var result =
        {
          decorator: "menu",
          spacingX: 6,
          spacingY: 1,
          iconColumnWidth: 16,
          arrowColumnWidth: 4,
          padding: 1,
          placementModeY: states.submenu || states.contextmenu ? "best-fit" : "keep-align"
        };

        if (states.submenu)
        {
          result.position = "right-top";
          result.offset = [-2, -3];
        }

        if (states.contextmenu) {
          result.offset = 4;
        }

        return result;
      }
    },
    
    "menu/slidebar": "menu-slidebar",
    "menu-slidebar": "widget",

    "menu-slidebar-button":
    {
      style: function(states)
      {
        return {
          backgroundColor: states.hovered  ? "background-selected" : undefined,
          padding: 6,
          center: true
        };
      }
    },

    "menu-slidebar/button-backward":
    {
      include: "menu-slidebar-button",

      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS[
            "arrow-up" + (states.hovered ? "-invert" : "")
          ]
        };
      }
    },

    "menu-slidebar/button-forward":
    {
      include: "menu-slidebar-button",

      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS[
            "arrow-down" + (states.hovered ? "-invert" : "")
          ]
        };
      }
    },
    
    "menu-separator":
    {
      style: function(states)
      {
        return {
          height: 0,
          decorator: "menu-separator",
          marginTop : 4,
          marginBottom: 4,
          marginLeft: 2,
          marginRight : 2
        }
      }
    },
    
    "menu-button":
    {
      alias: "atom",

      style: function(states)
      {
        return {
          decorator: states.selected ? "menu-button" : undefined,
          textColor: states.selected ? "text-selected" : undefined,
          padding: [ 2, 6 ]
        };
      }
    },

    "menu-button/icon":
    {
      include: "image",

      style: function(states)
      {
        return {
          alignY: "middle"
        };
      }
    },

    "menu-button/label":
    {
      include: "label",

      style: function(states)
      {
        return {
          alignY: "middle",
          padding: 1
        };
      }
    },

    "menu-button/shortcut":
    {
      include: "label",

      style: function(states)
      {
        return {
          alignY: "middle",
          marginLeft: 14,
          padding: 1
        };
      }
    },

    "menu-button/arrow":
    {
      include: "image",

      style: function(states)
      {
        return {
          source: graydienttheme.theme.Image.URLS[
            "arrow-right" + (states.selected ? "-invert" : "")
          ],
          alignY: "middle"
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
          icon: !states.checked ? undefined :
            graydienttheme.theme.Image.URLS[
              "menu-checkbox" + (states.selected ?  "-invert" : "")
            ]
        }
      }
    },

    "menu-radiobutton":
    {
      alias: "menu-button",
      include: "menu-button",

      style: function(states)
      {
        return {
          icon: !states.checked ? undefined :
            graydienttheme.theme.Image.URLS[
              "menu-radiobutton" + (states.selected ?  "-invert" : "")
            ]
        }
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      MENU BAR
    ---------------------------------------------------------------------------
    */
    
    "menubar":
    {
      style: function(states)
      {
        return {
          decorator: "menubar",
          padding: 0,
          margin: 0
        };
      }
    },
    
    "menubar-button":
    {
      alias: "atom",

      style: function(states)
      {
        var decorator = undefined;
        var textColor = "text-active";

        if (states.disabled) {
          decorator = undefined;
        } else if (states.hovered || states.pressed || states.checked) {
          decorator = "menubar-button-hovered";
        }

        return {
          cursor: "pointer",
          decorator: decorator,
          padding: [5, 10],
          textColor: textColor
        };
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      PROGRESSBAR
    ---------------------------------------------------------------------------
    */
    "progressbar":
    {
      style: function(states) 
      {
        return {
          decorator: "inset",
          padding: 1
        }
      }
    },

    "progressbar/progress":
    {
      style: function(states) 
      {
        return {
          decorator: "menu-button"
        }
      }
    },

    
    /*
    ---------------------------------------------------------------------------
      RADIO BUTTON
    ---------------------------------------------------------------------------
    */
    "radiobutton":
    {
      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["blank"]
        }
      }
    },
    
    "radiobutton/icon": 
    {
      style: function(states)
      {
        var decorator = "radiobutton";
        
        if (states.checked) {
          decorator += "-checked";
        }

        if (states.disabled) {
          decorator += "-disabled";
        } else if (states.invalid) {
          decorator += "-invalid";
        } else if (states.focused || states.hovered) {
          decorator += "-focused";
        }

        return {
          decorator: decorator,
          width: 12,
          height: 12
        }
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      RESIZER
    ---------------------------------------------------------------------------
    */

    "resizer":
    {
      style: function(states)
      {
        return {
          decorator: "main-dark"
        };
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      SCROLLAREA
    ---------------------------------------------------------------------------
    */

    "scrollarea/corner":
    {
      style: function(states)
      {
        return {
          backgroundColor: "background"
        }
      }
    },

    "scrollarea": "widget",
    "scrollarea/pane": "widget",
    "scrollarea/scrollbar-x": "scrollbar",
    "scrollarea/scrollbar-y": "scrollbar",
    
    /*
    ---------------------------------------------------------------------------
      SCROLLBAR
    ---------------------------------------------------------------------------
    */

    "scrollbar": {},
    
    "scrollbar/slider": 
    {
      style: function(states)
      {
        return {
          decorator: states.horizontal ? "scrollbar-slider-horizontal" : "scrollbar-slider-vertical"
        }
      }
    },

    "scrollbar/slider/knob":
    {
      style: function(states)
      {
        var decorator = states.horizontal ? "scroll-knob-horizontal" : "scroll-knob-vertical";

        if (!states.disabled) 
        {
          if (states.hovered || states.pressed) {
            decorator += "-pressed";
          }
        }

        return {
          height: states.horizontal ? 12 : undefined,
          width: states.vertical ? 12 : undefined,
          minHeight: states.horizontal ? undefined : 8,
          minWidth : states.vertical ? undefined: 8,
          cursor: "pointer",
          decorator: decorator
        };
      }
    },

    "scrollbar/button":
    {
      style: function(states)
      {
        var styles = {};
        
        styles.decorator = states.up || states.down ? "scroll-knob-vertical" : "scroll-knob-horizontal";
        if (states.hovered || states.pressed)
        {
          styles.decorator += "-pressed";
        }
        
        styles.padding = 3;

        var icon = "";
        if (states.left) {
          icon = "left";
          styles.marginRight = 1;
        } else if (states.right) {
          icon += "right";
          styles.marginLeft = 1;
        } else if (states.up) {
          icon += "up";
          styles.marginBottom = 1;
        } else {
          icon += "down";
          styles.marginTop = 1;
        }

        styles.icon = graydienttheme.theme.Image.URLS["arrow-" + icon];

        styles.cursor = "pointer";
        return styles;
      }
    },

    "scrollbar/button-begin": "scrollbar/button",
    "scrollbar/button-end": "scrollbar/button",

    
    /*
    ---------------------------------------------------------------------------
      SELECTBOX
    ---------------------------------------------------------------------------
    */

    "selectbox": "button-frame",
    "selectbox/atom": "atom",
    
    "selectbox/popup": 
    {
      style: function(states)
      {
        return {
          decorator: "menu"
        }
      }
    },
    
    "selectbox/list": 
    {
      alias: "list"
    },

    "selectbox/arrow":
    {
      include: "image",

      style: function(states)
      {
        return {
          source: graydienttheme.theme.Image.URLS["arrow-down"],
          paddingRight: 4,
          paddingLeft: 5
        };
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      SLIDEBAR
    ---------------------------------------------------------------------------
    */

    "slidebar": {},
    "slidebar/scrollpane": {},
    "slidebar/content": {},

    "slidebar/button-forward":
    {
      alias: "button",
      include: "button",

      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["arrow-" + (states.vertical ? "down" : "right")]
        };
      }
    },

    "slidebar/button-backward":
    {
      alias: "button",
      include: "button",

      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["arrow-" + (states.vertical ? "up" : "left")]
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      SLIDER
    ---------------------------------------------------------------------------
    */

    "slider":
    {
      style: function(states)
      {
        return {
          decorator: states.horizontal ? "slider-horizontal" : "slider-vertical",
          maxHeight: states.horizontal ? 14 : undefined,
          maxWidth: states.horizontal ? undefined : 14,
          minHeight: states.horizontal ? 14 : undefined,
          minWidth: states.horizontal ? undefined : 14
        }
      }
    },

    "slider/knob":
    {
      style: function(states)
      {
        var decorator = states.horizontal ? "slider-knob-horizontal" : "slider-knob-vertical";

        if (states.invalid) {
          decorator += "-invalid";
        } else if ((states.pressed || states.hovered) && !states.disabled) {
          decorator += "-pressed";
        }

        return {
          decorator: decorator,
          cursor: "pointer",
          maxHeight: 14,
          maxWidth: 14
        };
      }
    },    
    
    /*
    ---------------------------------------------------------------------------
      SPINNER
    ---------------------------------------------------------------------------
    */

    "spinner":
    {
      style: function(states)
      {
        var decorator;

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (invalid && !disabled) {
          decorator = "inset-invalid";
        } else if (focused && !disabled) {
          decorator = "inset-focused";
        } else {
          decorator = "inset";
        }

        return {
          decorator: decorator
        };
      }
    },

    "spinner/textfield":
    {
      style: function(states)
      {
        return {
          marginRight: 2,
          padding: [2, 4, 1],
          textColor: states.disabled ? "text-disabled" : "text-active"
        };
      }
    },
    
    "spinner-button":
    {
      alias: "atom",

      style: function(states)
      {
        return {
          padding: states.pressed || states.checked || (states.checked && states.disabled) ? [1, 5, 0, 5] : [0, 5, 1, 5],
          decorator: states.pressed || states.checked ? "spinner-button-checked" :
                     states.hovered && !states.disabled ? "spinner-button-hovered" : "spinner-button"
        };
      }
    },

    "spinner/upbutton":
    {
      alias: "spinner-button",
      include: "spinner-button",

      style: function(states, superStyles)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["arrow-up-small"],
          padding: states.pressed ? [1, 4, 0, 4] : [0, 4, 1, 4]
        };
      }
    },

    "spinner/downbutton":
    {
      alias: "spinner-button",
      include: "spinner-button",

      style: function(states, superStyles)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["arrow-down-small"],
          padding: states.pressed ? [1, 4, 0, 4] : [0, 4, 1, 4]
        };
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      SPLIT BUTTON
    ---------------------------------------------------------------------------
    */
    "splitbutton": {},
    "splitbutton/button": "button",
    
    "splitbutton/arrow": 
    {
      alias: "button-frame",
      include: "button-frame",

      style: function(states, superStyles)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["arrow-down"],
          padding: states.pressed || 
                   states.checked || 
                   (states.checked && states.disabled) ? [2, 4, 2, 6] : [3, 6, 3, 6]
        };
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      SPLITPANE
    ---------------------------------------------------------------------------
    */

    "splitpane":
    {
      style: function(states)
      {
        return {
          decorator: "inset"
        };
      }
    },

    "splitpane/splitter":
    {
      style: function(states)
      {
        return {
          decorator: states.horizontal ? "splitter-horizontal" : "splitter-vertical"
        };
      }
    },

    "splitpane/splitter/knob":
    {
      style: function(states)
      {
        return {
          source: states.horizontal ? graydienttheme.theme.Image.URLS["knob-horizontal"] : 
                                       graydienttheme.theme.Image.URLS["knob-vertical"]
        };
      }
    },

    "splitpane/slider":
    {
      style: function(states)
      {
        return {
          decorator: states.horizontal ? "splitter-horizontal" : "splitter-vertical"
        };
      }
    },

    
    /*
    ---------------------------------------------------------------------------
      TABLE
    ---------------------------------------------------------------------------
    */

    "table": "widget",
    
    "table/statusbar":
    {
      style: function(states)
      {
        return {
          decorator: "statusbar",
          padding: [2, 5]
        };
      }
    },

    "table/column-button":
    {
      alias: "button",

      style: function(states)
      {
        return {
          decorator: states.hovered ? "table-header-column-button-hovered" : "table-header-column-button",
          padding: 3,
          icon: graydienttheme.theme.Image.URLS["select-column-order"]
        };
      }
    },

    "table-column-reset-button":
    {
      include: "menu-button",
      alias: "menu-button",

      style: function()
      {
        return {
          icon: "icon/16/actions/view-refresh.png"
        }
      }
    },

    "table-scroller/scrollbar-x": "scrollbar",
    "table-scroller/scrollbar-y": "scrollbar",

    "table-scroller": "widget",

    "table-scroller/header": 
    {
      style: function(states) 
      {
        return {
          decorator: "table-header",
          padding: [1, 0, 3, 0]
        }
      }
    },

    "table-scroller/pane":
    {
      style: function(states)
      {
        return {
          backgroundColor: "background"
        };
      }
    },

    "table-scroller/focus-indicator":
    {
      style: function(states)
      {
        return {
          decorator: "main"
        };
      }
    },

    "table-scroller/resize-line":
    {
      style: function(states)
      {
        return {
          backgroundColor: "button-border",
          width: 3
        };
      }
    },

    "table-header-cell":
    {
      alias: "atom",

      style: function(states)
      {
        return {
          decorator: states.hovered ? "table-header-cell-hovered" : "table-header-cell",
          minWidth: 13,
          font: "bold",
          paddingTop: 3,
          paddingLeft: 5,
          cursor: "pointer",
          sortIcon: states.sorted ?
              (graydienttheme.theme.Image.URLS["table-" +
                 (states.sortedAscending ? "ascending" : "descending")
              ]) : undefined
        }
      }
    },

    "table-header-cell/icon":
    {
      include: "atom/icon",

      style: function(states) {
        return {
          paddingRight : 5
        }
      }
    },

    "table-header-cell/sort-icon":
    {
      style: function(states)
      {
        return {
          alignY: "middle",
          alignX: "right",
          paddingRight : 5
        }
      }
    },

    "table-editor-textfield":
    {
      include: "textfield",

      style: function(states)
      {
        return {
          decorator: undefined,
          padding: [ 2, 2 ]
        };
      }
    },

    "table-editor-selectbox":
    {
      include: "selectbox",
      alias: "selectbox",

      style: function(states)
      {
        return {
          padding: [ 0, 2 ]
        };
      }
    },

    "table-editor-combobox":
    {
      include: "combobox",
      alias: "combobox",

      style: function(states)
      {
        return {
          decorator: undefined
        };
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      TABVIEW
    ---------------------------------------------------------------------------
    */

    "tabview": {},

    "tabview/bar" :
    {
      alias: "slidebar",

      style: function(states)
      {
        var marginTop=0, marginRight=0, marginBottom=0, marginLeft=0;

        if (states.barTop) {
          marginBottom -= 2;
        } else if (states.barBottom) {
          marginTop -= 2;
        } else if (states.barRight) {
          marginLeft -= 2;
        } else {
          marginRight -= 2;
        }

        return {
          marginBottom: marginBottom,
          marginTop: marginTop,
          marginLeft: marginLeft,
          marginRight: marginRight
        };
      }
    },


    "tabview/bar/button-forward":
    {
      include: "slidebar/button-forward",
      alias: "slidebar/button-forward",

      style: function(states)
      {
        var decorator = "tabview-bar-button";

        if (states.hovered && !states.pressed && !states.checked) {
          decorator += "-hovered";
        } else if (states.pressed || states.checked) {
          decorator += "-pressed";
        }

        if (states.barTop) {
          return {
            marginTop: 4,
            marginBottom: 2,
            decorator: decorator
          }
        } else if (states.barBottom) {
          return {
            marginTop: 2,
            marginBottom: 4,
            decorator: decorator
          }
        } else if (states.barLeft) {
          return {
            marginLeft: 4,
            marginRight: 2,
            decorator: decorator
          }
        } else {
          return {
            marginLeft: 2,
            marginRight: 4,
            decorator: decorator
          }
        }
      }
    },

    "tabview/bar/button-backward":
    {
      include: "slidebar/button-backward",
      alias: "slidebar/button-backward",

      style: function(states)
      {
        var decorator = "tabview-bar-button";

        if (states.hovered && !states.pressed && !states.checked) {
          decorator += "-hovered";
        } else if (states.pressed || states.checked) {
          decorator += "-pressed";
        }

        if (states.barTop) {
          return {
            marginTop: 4,
            marginBottom: 2,
            decorator: decorator
          }
        } else if (states.barBottom) {
          return {
            marginTop: 2,
            marginBottom: 4,
            decorator: decorator
          }
        } else if (states.barLeft) {
          return {
            marginLeft: 4,
            marginRight: 2,
            decorator: decorator
          }
        } else {
          return {
            marginLeft: 2,
            marginRight: 4,
            decorator: decorator
          }
        }
      }
    },

    "tabview/pane":
    {
      style: function(states)
      {
        return {
          decorator: "tabview-pane",
          padding: 10
        };
      }
    },

    "tabview-page": "widget",

    "tabview-page/button":
    {
      style: function(states)
      {
        var marginTop = 0, marginRight = 0, marginBottom = 0, marginLeft = 0;

        // default padding
        if (states.barTop || states.barBottom) {
          var paddingTop = 4, paddingBottom = 4, paddingLeft = 8, paddingRight = 8;
        } else {
          var paddingTop = 7, paddingBottom = 7, paddingLeft = 4, paddingRight = 4;
        }

        var decorator = states.checked ? "tabview-button-checked" :
                        states.hovered ? "tabview-button-hovered" :
                                         "tabview-button";
        if (states.barTop) {
          decorator += "-top";
        } else if (states.barBottom) {
          decorator += "-bottom";
        } else if (states.barLeft) {
          decorator += "-left";
        } else if (states.barRight) {
          decorator += "-right";
        }

        // checked padding / margin
        if (states.checked) {
          if (states.barTop) {
            marginBottom += 2;
          } else if (states.barBottom) {
            paddingTop += 2;
            marginTop += 2;
          } else if (states.barLeft) {
            marginRight += 2;
          } else if (states.barRight) {
            paddingLeft += 2;
            marginLeft += 2;
          }
        } else {
          if (states.barTop) {
            marginBottom += 2;
            marginTop += 3;
          } else if (states.barBottom) {
            marginBottom += 3;
            marginTop += 2;
          } else if (states.barLeft) {
            marginRight += 2;
            marginLeft += 4;
          } else if (states.barRight) {
            marginRight += 4;
            marginLeft += 2;
          }
        }

        return {
          zIndex: states.checked ? 10 : 5,
          decorator: decorator,
          backgroundColor: states.checked ? "background-selected" : "tabview-unselected",
          textColor: states.checked ?  "text-selected" : states.disabled ? "text-disabled" : "text-active",
          padding: [ paddingTop, paddingRight, paddingBottom, paddingLeft ],
          margin: [ marginTop, marginRight, marginBottom, marginLeft ],
          font: "bold"
        };
      }
    },

    "tabview-page/button/label":
    {
      alias: "label",

      style: function(states)
      {
        return {
          padding: [0, 1, 0, 1],
          margin: states.focused ? 0 : 1,
          decorator: states.focused ? "keyboard-focus" : undefined
        };
      }
    },

    "tabview-page/button/icon": "image",
    "tabview-page/button/close-button":
    {
      alias: "atom",
      style: function(states)
      {
        return {
          cursor: states.disabled ? undefined : "pointer",
          icon: states.hovered ? graydienttheme.theme.Image.URLS["tabview-close-hovered"] :
                                  graydienttheme.theme.Image.URLS["tabview-close"]
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
      TEXT FIELD
    ---------------------------------------------------------------------------
    */

    "textfield":
    {
      style: function(states)
      {
        var textColor;
        if (states.disabled) {
          textColor = "text-disabled";
        } else if (states.showingPlaceholder) {
          textColor = "text-placeholder";
        } else {
          textColor = undefined;
        }

        var decorator;
        var padding;
        if (states.invalid) {
          decorator = "inset-invalid";
        } else if (states.focused) {
          decorator = "inset-focused";
        } else {
          decorator = "inset";
        }

        return {
          decorator: decorator,
          padding: [1, 2],
          textColor: textColor
        };
      }
    },

    "textarea": "textfield",
    
    /*
    ---------------------------------------------------------------------------
      TOOLBAR
    ---------------------------------------------------------------------------
    */

    "toolbar":
    {
      style: function(states)
      {
        return {
          decorator: "toolbar",
          padding: 2
        };
      }
    },

    "toolbar/part":
    {
      style: function(states)
      {
        return {
          decorator: "toolbar-part",
          spacing: 2
        };
      }
    },

    "toolbar/part/container":
    {
      style: function(states)
      {
        return {
          paddingLeft: 2,
          paddingRight: 2
        };
      }
    },
    
    "toolbar/part/handle":
    {
      style: function(states)
      {
        return {
          source: graydienttheme.theme.Image.URLS["toolbar-handle-knob"],
          marginLeft: 3,
          marginRight : 3
        };
      }
    },
    
    "toolbar-separator":
    {
      style: function(states)
      {
        return {
          decorator: "toolbar-separator",
          margin: [3, 5, 3, 5]
        };
      }
    },

    "toolbar-button":
    {
      alias: "atom",

      style: function(states)
      {
        var decorator = "toolbar-button";

        if (states.disabled) {
          decorator = "toolbar-button";
        } else if (states.hovered && !states.pressed && !states.checked) {
          decorator += "-hovered";
        } else if (states.pressed || states.checked) {
          decorator += "-pressed";
        }

        return {
          cursor: "pointer",
          decorator: decorator,
          padding: states.pressed || states.checked ? [4, 4, 2, 6] : [4, 6]
        };
      }
    },

    "toolbar-menubutton":
    {
      alias: "toolbar-button",
      include: "toolbar-button",

      style: function(states)
      {
        return {
          showArrow: true
        };
      }
    },

    "toolbar-menubutton/arrow":
    {
      alias: "image",
      include: "image",

      style: function(states)
      {
        return {
          source: graydienttheme.theme.Image.URLS["arrow-down"],
          cursor: "pointer",
          padding: [0, 5],
          marginLeft: 2
        };
      }
    },

    "toolbar-splitbutton": {},
    
    "toolbar-splitbutton/button":
    {
      alias: "atom",

      style: function(states)
      {
        var decorator = "toolbar-splitbutton-left";

        if (states.disabled) {
          decorator = "toolbar-splitbutton-left";
        } else if (states.hovered && !states.pressed && !states.checked) {
          decorator += "-hovered";
        } else if (states.pressed || states.checked) {
          decorator += "-pressed";
        }

        return {
          cursor  : "pointer",
          decorator: decorator,
          padding: states.pressed || states.checked ? [4, 4, 2, 6] : [4, 6]
        };
      }
    },


    "toolbar-splitbutton/arrow":
    {
      alias: "atom",

      style: function(states)
      {
        var decorator = "toolbar-splitbutton-right";

        if (states.disabled) {
          decorator = "toolbar-splitbutton-right";
        } else if (states.hovered && !states.pressed && !states.checked) {
          decorator += "-hovered";
        } else if (states.pressed || states.checked) {
          decorator += "-pressed";
        }

        return {
          icon: graydienttheme.theme.Image.URLS["arrow-down"],
          cursor: "pointer",
          decorator: decorator,
          padding: states.pressed || states.checked ? [4, 4, 2, 6] : [4, 6]
        };
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      TOOL TIP
    ---------------------------------------------------------------------------
    */
    "tooltip":
    {
      include: "popup",

      style: function(states)
      {
        return {
          backgroundColor: "tooltip",
          textColor: "tooltip-text",
          padding: [ 1, 3, 2, 3 ],
          offset: [ 15, 5, 5, 5 ]
        };
      }
    },

    "tooltip/atom": "atom",

    "tooltip-error":
    {
      include: "tooltip",

      style: function(states)
      {
        return {
          textColor: "text-selected",
          showTimeout: 100,
          hideTimeout: 10000,
          decorator: "tooltip-error",
          font: "bold",
          backgroundColor: undefined
        };
      }
    },

    "tooltip-error/atom": "atom",
    
    /*
    ---------------------------------------------------------------------------
      TREE
    ---------------------------------------------------------------------------
    */

    "tree": "list",

    "tree-item":
    {
      style: function(states)
      {
        var decorator = states.selected ? "menu-button" : undefined;

        return {
          padding: [ 1, 5 ],
          textColor: states.selected ? "text-selected" : undefined,
          decorator: decorator
        };
      }
    },

    "tree-item/icon":
    {
      include: "image",

      style: function(states)
      {
        return {
          paddingRight: 5
        };
      }
    },

    "tree-item/label": "label",

    "tree-item/open":
    {
      include: "image",

      style: function(states)
      {
        var icon;
        if (states.selected && states.opened)
        {
          icon = "tree-open-selected";
        }
        else if (states.selected && !states.opened)
        {
          icon = "tree-closed-selected";
        }
        else if (states.opened)
        {
          icon = "tree-open";
        }
        else
        {
          icon = "tree-closed";
        }

        return {
          padding: [0, 5, 0, 2],
          source: graydienttheme.theme.Image.URLS[icon]
        };
      }
    },

    "tree-folder":
    {
      include: "tree-item",
      alias: "tree-item",

      style: function(states)
      {
        var icon, iconOpened;
        if (states.small) {
          icon = states.opened ? "icon/16/places/folder-open.png" : "icon/16/places/folder.png";
          iconOpened = "icon/16/places/folder-open.png";
        } else if (states.large) {
          icon = states.opened ? "icon/32/places/folder-open.png" : "icon/32/places/folder.png";
          iconOpened = "icon/32/places/folder-open.png";
        } else {
          icon = states.opened ? "icon/22/places/folder-open.png" : "icon/22/places/folder.png";
          iconOpened = "icon/22/places/folder-open.png";
        }

        return {
          icon: icon,
          iconOpened: iconOpened
        };
      }
    },

    "tree-file":
    {
      include: "tree-item",
      alias: "tree-item",

      style: function(states)
      {
        return {
          icon:
            states.small ? "icon/16/mimetypes/office-document.png" :
            states.large ? "icon/32/mimetypes/office-document.png" :
            "icon/22/mimetypes/office-document.png"
        };
      }
    },
    
    /*
    ---------------------------------------------------------------------------
      TREEVIRTUAL
    ---------------------------------------------------------------------------
    */

    "treevirtual": "table",

    "treevirtual-folder":
    {
      style: function(states)
      {
        return {
          icon: (states.opened
                  ? "icon/16/places/folder-open.png"
                  : "icon/16/places/folder.png")
        }
      }
    },

    "treevirtual-file":
    {
      include: "treevirtual-folder",
      alias: "treevirtual-folder",

      style: function(states)
      {
        return {
          icon: "icon/16/mimetypes/text-plain.png"
        }
      }
    },

    "treevirtual-line":
    {
      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["treevirtual-line"]
        }
      }
    },

    "treevirtual-contract":
    {
      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["tree-minus"]
        }
      }
    },

    "treevirtual-expand":
    {
      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["tree-plus"]
        }
      }
    },

    "treevirtual-only-contract":
    {
      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["treevirtual-minus-only"]
        }
      }
    },

    "treevirtual-only-expand":
    {
      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["treevirtual-plus-only"]
        }
      }
    },

    "treevirtual-start-contract":
    {
      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["treevirtual-minus-start"]
        }
      }
    },

    "treevirtual-start-expand":
    {
      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["treevirtual-plus-start"]
        }
      }
    },

    "treevirtual-end-contract":
    {
      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["treevirtual-minus-end"]
        }
      }
    },

    "treevirtual-end-expand":
    {
      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["treevirtual-plus-end"]
        }
      }
    },

    "treevirtual-cross-contract":
    {
      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["treevirtual-minus-cross"]
        }
      }
    },

    "treevirtual-cross-expand":
    {
      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["treevirtual-plus-cross"]
        }
      }
    },


    "treevirtual-end":
    {
      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["treevirtual-end"]
        }
      }
    },

    "treevirtual-cross":
    {
      style: function(states)
      {
        return {
          icon: graydienttheme.theme.Image.URLS["treevirtual-cross"]
        }
      }
    },

    
    /*
    ---------------------------------------------------------------------------
      VIRTUAL WIDGETS
    ---------------------------------------------------------------------------
    */
    "virtual-list": "list",
    "virtual-list/row-layer": "row-layer",

    "row-layer": "widget",
    "column-layer": "widget",

    "group-item":
    {
      include: "label",
      alias: "label",

      style: function(states)
      {
        return {
          padding: 4,
          backgroundColor: "#BABABA",
          textColor: "white",
          font: "bold"
        };
      }
    },

    "virtual-selectbox": "selectbox",
    "virtual-selectbox/dropdown": "popup",
    
    "virtual-selectbox/dropdown/list": 
    {
      alias: "virtual-list"
    },

    "virtual-combobox": "combobox",
    "virtual-combobox/dropdown": "popup",
    
    "virtual-combobox/dropdown/list": 
    {
      alias: "virtual-list"
    },

    "virtual-tree":
    {
      include: "list",
      alias: "list",

      style: function(states)
      {
        return {
          padding: states.focused ? 0 : 1
        };
      }
    },
    
    "virtual-tree-folder": "tree-folder",
    "virtual-tree-file": "tree-file",

    "cell":
    {
      style: function(states)
      {
        return {
          backgroundColor: states.selected ?
            "table-row-background-selected" :
            "table-row-background-even",
          textColor: states.selected ? "text-selected" : "text",
          padding: [3, 6]
        }
      }
    },

    "cell-string": "cell",
    
    "cell-number":
    {
      include: "cell",
      style: function(states)
      {
        return {
          textAlign: "right"
        }
      }
    },
    
    "cell-image": "cell",
    
    "cell-boolean":
    {
      include: "cell",

      style: function(states)
      {
        return {
          iconTrue: "decoration/table/boolean-true.png",
          iconFalse: "decoration/table/boolean-false.png"
        };
      }
    },
    
    "cell-atom": "cell",
    "cell-date": "cell",
    "cell-html": "cell",
  
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
          contentPadding: 5,
          decorator: states.maximized ? undefined : states.active ? "window-active" : "window"
        };
      }
    },

    "window/pane": 
    {
      style: function(states)
      {
        return {
          backgroundColor: states.active ? "background-window-active" : "background-window-inactive"
        };
      }
    },

    "window/captionbar":
    {
      style: function(states)
      {
        return {
          textColor: states.active ? "white" : "silver",
          padding: 6,
          font: "bold",
          decorator: states.active ? "window-caption-active" : "window-caption-inactive"
        };
      }
    },

    "window/icon":
    {
      style: function(states)
      {
        return {
          marginRight: 4
        };
      }
    },

    "window/title":
    {
      style: function(states)
      {
        return {
          cursor: "default",
          font: "bold",
          marginRight : 20,
          alignY: "middle"
        };
      }
    },

    "window/minimize-button":
    {
      alias: "button",

      style: function(states)
      {
        return {
          icon: states.hovered ? graydienttheme.theme.Image.URLS["window-minimize-hovered"] : 
                 states.active ? graydienttheme.theme.Image.URLS["window-minimize"] :
                                 graydienttheme.theme.Image.URLS["window-inactive"],
          padding: [ 1, 2 ],
          cursor: states.disabled ? undefined : "pointer"
        };
      }
    },

    "window/maximize-button":
    {
      alias: "button",

      style: function(states)
      {
        return {
          icon: states.hovered ? graydienttheme.theme.Image.URLS["window-maximize-hovered"] : 
                 states.active ? graydienttheme.theme.Image.URLS["window-maximize"] :
                                 graydienttheme.theme.Image.URLS["window-inactive"],
          padding: [ 1, 2 ],
          cursor: states.disabled ? undefined : "pointer"
        };
      }
    },

    "window/close-button":
    {
      alias: "button",

      style: function(states)
      {
        return {
          marginLeft: 2,
          icon: states.hovered ? graydienttheme.theme.Image.URLS["window-close-hovered"] : 
                 states.active ? graydienttheme.theme.Image.URLS["window-close"] :
                                 graydienttheme.theme.Image.URLS["window-inactive"],
          padding: [ 1, 2 ],
          cursor: states.disabled ? undefined : "pointer"
        };
      }
    },
    
    "window/restore-button":
    {
      alias: "button",

      style: function(states)
      {
        return {
          icon: states.hovered ? graydienttheme.theme.Image.URLS["window-restore-hovered"] : 
                 states.active ? graydienttheme.theme.Image.URLS["window-restore"] :
                                 graydienttheme.theme.Image.URLS["window-inactive"],
          padding: [ 1, 2 ],
          cursor: states.disabled ? undefined : "pointer"
        };
      }
    },

    "window/statusbar":
    {
      style: function(states)
      {
        return {
          decorator: "statusbar",
          padding: [ 2, 6 ]
        };
      }
    },

    "window/statusbar-text": "label",
    
    "window-resize-frame" : "move-frame"
    
  }
});