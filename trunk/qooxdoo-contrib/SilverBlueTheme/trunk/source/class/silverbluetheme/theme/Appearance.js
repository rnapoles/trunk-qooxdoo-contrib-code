/* ************************************************************************

   Copyright:
     2011 Norbert Schröder

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

/* ************************************************************************

#asset(silverbluetheme/decoration/*)
#asset(silverbluetheme/icon/*)

************************************************************************ */

qx.Theme.define("silverbluetheme.theme.Appearance",
{
  aliases: {
    decoration: "silverbluetheme/decoration"
  },

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
          textColor: "text-selected",
          padding: [8, 12],
          decorator: "app-header"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      BUTTON
    ---------------------------------------------------------------------------
    */
    "button-frame":
    {
      style: function(states)
      {
        return {
      padding: states.pressed || states.checked
               || (states.checked && states.disabled) ? [1, 3, 0, 3] : [0, 3, 1, 3],
          decorator: states.pressed || states.checked ?
                        "button-checked" :
                     (states.hovered || states.focused) && !states.disabled ?
                        "button-hovered" : "button",
      textColor: "text-button"
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

  "button-red":
    {
    alias: "button",
    include: "button",

      style: function(states)
      {
        return {
          decorator: states.pressed || states.checked ?
                        "button-red-checked" :
                     states.hovered && !states.disabled ?
                        "button-red" : "button"
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
          decorator: states.hovered ? "button-hovered": "button",
      padding: states.hovered ? [1, 0, 0, 0] : [0, 0, 1, 0],
          textColor: states.hovered ? "text-button" : undefined
        }
      }
    },

  "spinner-button":
    {
      alias: "atom",

      style: function(states)
      {
        return {
      padding: states.pressed || states.checked
               || (states.checked && states.disabled) ? [1, 5, 0, 5] : [0, 5, 1, 5],
          decorator: states.pressed || states.checked ?
                        "spinner-button-checked" :
                     states.hovered && !states.disabled ?
                        "spinner-button-hovered" : "spinner-button",
      textColor: "text-button"
        };
      }
  },

  /*
    ---------------------------------------------------------------------------
      CHECKBOX
    ---------------------------------------------------------------------------
    */
    "checkbox":
    {
      alias: "atom",

      style: function(states)
      {
        var icon;

    // Checked
        if (states.checked) {
          if (states.disabled) {
            icon = "checkbox-checked";
          } else if (states.focused) {
            icon = states.hovered ? "checkbox-checked-hovered-focused" : "checkbox-checked-focused";
          } else if (states.hovered) {
            icon = "checkbox-checked-hovered";
          } else {
            icon = "checkbox-checked";
          }

        // Undetermined
        } else if (states.undetermined) {
          if (states.disabled) {
            icon = "checkbox-undetermined";
          } else if (states.focused) {
            icon = "checkbox-undetermined-focused";
          } else if (states.hovered) {
            icon = "checkbox-undetermined-hovered";
          } else {
            icon = "checkbox-undetermined";
          }

        // Focused & Hovered (when enabled)
        } else if (!states.disabled) {
          if (states.focused) {
            icon = states.hovered ? "checkbox-hovered-focused" : "checkbox-focused";
          } else if (states.hovered ) {
            icon = "checkbox-hovered";
          }
        }

        // Unchecked
        icon = icon || "checkbox";

        return {
          icon: "decoration/form/" + icon + ".png",
          gap: 6
        };
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
          backgroundColor: "background-application"
        };
      }
    },

    "colorpopup/field":
    {
      style: function(states)
      {
        return {
          decorator: "main",
          margin: 2,
          width: 14,
          height: 14,
          backgroundColor: "background-light"
        };
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
          decorator: "main",
          allowGrowX: true
        };
      }
    },

    "colorpopup/selected-preview":
    {
      style: function(state)
      {
        return {
          height: 20,
          padding: 4,
          marginRight: 4,
          decorator: "main",
          allowGrowX: true
        };
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
      COLORSELECTOR
    ---------------------------------------------------------------------------
    */
    "colorselector": "widget",
    "colorselector/control-bar": "widget",
    "colorselector/control-pane": "widget",
    "colorselector/visual-pane": "groupbox",
    "colorselector/preset-grid": "widget",

    "colorselector/colorbucket":
    {
      style: function(states)
      {
        return {
          decorator: "main",
          width: 16,
          height: 16
        };
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
          decorator: "main",
          width: 50,
          height: 10
        };
      }
    },

    "colorselector/preview-content-new":
    {
      style: function(states)
      {
        return {
          decorator: "main",
          backgroundColor: "background-light",
          width: 50,
          height: 10
        };
      }
    },


    "colorselector/hue-saturation-field":
    {
      style: function(states)
      {
        return {
          decorator: "main",
          margin: 5
        };
      }
    },

    "colorselector/brightness-field":
    {
      style: function(states)
      {
        return {
          decorator: "main",
          margin: [5, 7]
        };
      }
    },

    "colorselector/hue-saturation-pane": "widget",
    "colorselector/hue-saturation-handle": "widget",
    "colorselector/brightness-pane": "widget",
    "colorselector/brightness-handle": "widget",


  /*
    ---------------------------------------------------------------------------
      COMBOBOX
    ---------------------------------------------------------------------------
    */
    "combobox":
    {
      style: function(states)
      {
        return {
          decorator: undefined
        };
      }
    },

    "combobox/popup":
  {
    alias: "popup",
    include: "popup",

      style: function(states)
      {
        var result =
        {
          shadow: "shadow-window"
        };

        return result;
      }
    },

    "combobox/list": {
      alias: "list"
    },

    "combobox/button":
    {
      style: function(states)
      {
        var ret = {
      icon: "decoration/arrows/combobox.png",
      padding: states.pressed || states.checked ? [1, 8, 0, 8] : [0, 8, 1, 8],
          decorator: states.pressed || states.checked ?
                        "combobox-button-checked" :
                     states.hovered && !states.disabled ?
                        "combobox-button-hovered" : "combobox-button"
        };
    return ret;
      }
    },

    "combobox/textfield":
    {
      include: "textfield",

      style: function(states)
      {
        return {
          decorator: "combobox",
      padding: 4
        };
      }
    },

  /*
    ---------------------------------------------------------------------------
      CORE
    ---------------------------------------------------------------------------
    */

    "widget": {},

    "root":
    {
      style: function(states)
      {
        return {
          backgroundColor: "background-application",
          textColor: "text-label",
          font: "default"
        };
      }
    },

    "label":
    {
      style: function(states)
      {
        return {
          textColor: states.disabled ? "text-disabled" : undefined
        };
      }
    },

    "move-frame":
    {
      style: function(states)
      {
        return {
          decorator: "main"
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
          source: "decoration/cursors/" + icon + ".gif",
          position: "right-top",
          offset: [2, 16, 2, 6]
        };
      }
    },

    "image":
    {
      style: function(states)
      {
        return {
          opacity: !states.replacement && states.disabled ? 0.3 : 1
        };
      }
    },

    "atom": {},
    "atom/label": "label",
    "atom/icon": "image",

  /*
    ---------------------------------------------------------------------------
      DATE CHOOSER
    ---------------------------------------------------------------------------
    */
  "datechooser":
    {
      style: function(states)
      {
        var decorator;

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (focused && invalid && !disabled) {
          decorator = "input-focused-invalid";
        } else if (focused && !invalid && !disabled) {
          decorator = "input-focused";
        } else if (!focused && invalid && !disabled) {
          decorator = "border-invalid";
        } else {
          decorator = "input";
        }

        return {
          padding: 2,
          decorator: decorator,
          backgroundColor: "background-light"
        };
      }
    },

    "datechooser/navigation-bar": {},

  "datechooser/nav-button":
    {
      include: "button-frame",
      alias: "button-frame",

      style: function(states)
      {
        var result = {
          padding: [2, 3],
          shadow: undefined
        };

        if (states.lastYear) {
          result.icon = "decoration/arrows/rewind.png";
          result.marginRight = 1;
        } else if (states.lastMonth) {
          result.icon = "decoration/arrows/left.png";
        } else if (states.nextYear) {
          result.icon = "decoration/arrows/forward.png";
          result.marginLeft = 1;
        } else if (states.nextMonth) {
          result.icon = "decoration/arrows/right.png";
        }

        return result;
      }
    },

    "datechooser/last-year-button-tooltip": "tooltip",
    "datechooser/last-month-button-tooltip": "tooltip",
    "datechooser/next-year-button-tooltip": "tooltip",
    "datechooser/next-month-button-tooltip": "tooltip",

    "datechooser/last-year-button": "datechooser/nav-button",
    "datechooser/last-month-button": "datechooser/nav-button",
    "datechooser/next-month-button": "datechooser/nav-button",
    "datechooser/next-year-button": "datechooser/nav-button",

  "datechooser/month-year-label":
    {
      style: function(states)
      {
        return {
          font: "bold",
          textAlign: "center",
          textColor: states.disabled ? "text-disabled" : undefined,
      padding: [1, 0, 1, 0],
      decorator: "toolbar-blue"
        };
      }
    },

  "datechooser/date-pane":
    {
      style: function(states)
      {
        return {
          textColor: states.disabled ? "text-disabled" : undefined,
          marginTop: 2
        };
      }
    },

    "datechooser/weekday":
    {
      style: function(states)
      {
        return {
          textColor: states.disabled ? "text-disabled" : states.weekend ? "text-light" : undefined,
          textAlign: "center",
          paddingTop: 2,
          backgroundColor: "background-medium"
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
          backgroundColor: "background-medium"
        };
      }
    },

    "datechooser/day":
    {
      style: function(states)
      {
        return {
          textAlign: "center",
          decorator: states.disabled ? undefined : states.selected ? "selected" : undefined,
          textColor: states.disabled ? "text-disabled" : states.selected ? "text-selected" : states.otherMonth ? "text-light" : undefined,
          font: states.today ? "bold" : undefined,
          padding: [2, 4]
        };
      }
    },

  /*
    ---------------------------------------------------------------------------
      DATEFIELD
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
          icon: "silverbluetheme/icon/office-calendar.png",
          padding: [3, 4, 4, 4]
        };
      }
    },

    "datefield/textfield": "combobox/textfield",

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
          padding: [1, 0, 1, 4],
          textColor: states.invalid ? "invalid" : "text-title",
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
          decorator: "box-silver"
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
          padding: [1, 0, 1, 4],
          textColor: states.invalid ? "invalid" : "text-title",
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
          padding: [1, 0, 1, 4],
          textColor: states.invalid ? "invalid" : "text-title",
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
      "include": "widget",

      style: function(states)
      {
        return {
          backgroundColor: "white"
        };
      }
    },

  /*
    ---------------------------------------------------------------------------
      IFRAME
    ---------------------------------------------------------------------------
    */

    "iframe":
    {
      style: function(states)
      {
        return {
          decorator: "input"
        };
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
        var decorator;

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (focused && invalid && !disabled) {
          decorator = "input-focused-invalid";
        } else if (focused && !invalid && !disabled) {
          decorator = "input-focused";
        } else if (!focused && invalid && !disabled) {
          decorator = "border-invalid";
        } else {
          decorator = "input";
        }

        return {
          backgroundColor : "background-light",
          decorator : decorator
        };
      }
    },

  "list/pane": "widget",

    "listitem":
    {
      alias: "atom",

      style: function(states)
      {
      var decorator;
        if (states.dragover) {
          decorator = states.selected ? "selected-dragover" : "dragover";
        } else {
          decorator = states.selected ? "menu-selected" : undefined;
        }

        return {
          padding: states.dragover ? [4, 4, 2, 4] : 3,
          textColor: states.selected ? "text-active" : undefined,
      backgroundColor: states.selected ? "selected" : undefined,
          decorator: decorator
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
          decorator: "list",
          shadow: "shadow-window",
          spacingX: 6,
          spacingY: 1,
          iconColumnWidth: 16,
          arrowColumnWidth: 4,
          placementModeY: states.submenu || states.contextmenu ? "best-fit" : "keep-align"
        };

        if (states.submenu)
        {
          result.position = "right-top";
          result.offset = [-2, -3];
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
          decorator: states.hovered  ? "selected" : undefined,
          padding: 7,
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
          icon: states.hovered ? "decoration/arrows/up-invert.png" : "decoration/arrows/up.png"
        };
      }
    },

    "menu-slidebar/button-forward":
    {
      include: "menu-slidebar-button",

      style: function(states)
      {
        return {
          icon: states.hovered ? "decoration/arrows/down-invert.png" : "decoration/arrows/down.png"
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
          margin: [4, 2]
        };
      }
    },

    "menu-button":
    {
      alias: "atom",

      style: function(states)
      {
        return {
          decorator: states.selected ? "menu-selected" : undefined,
          textColor: states.selected ? "text-active" : undefined,
          padding: [4, 6]
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
          source: states.selected ? "decoration/arrows/right-invert.png" : "decoration/arrows/right.png",
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
            states.selected ? "decoration/menu/checkbox-invert.gif" :
              "decoration/menu/checkbox.gif"
        };
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
            states.selected ? "decoration/menu/radiobutton-invert.gif" :
              "decoration/menu/radiobutton.gif"
        };
      }
    },

  /*
    ---------------------------------------------------------------------------
      MENUBAR
    ---------------------------------------------------------------------------
    */

  "menubar":
    {
      style: function(states)
      {
        return {
          decorator: "toolbar-silver"
        }
      }
    },

  "menubar-button":
   {
     alias: "atom",

     style: function(states)
     {
       return {
         decorator: (states.pressed || states.hovered) && !states.disabled ? "selected" : undefined,
         textColor: states.pressed || states.hovered ? "text-selected" : undefined,
         padding: [3, 8]
       };
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
          decorator: "list",
          shadow: "shadow-window"
        }
      }
    },

  /*
    ---------------------------------------------------------------------------
      PROGRESSBAR
    ---------------------------------------------------------------------------
    */
    "progressbar":
    {
      style: function(states) {
        return {
          decorator: "box-white",
          padding: [2, 1, 1, 1]
        }
      }
    },

    "progressbar/progress":
    {
      style: function(states) {
        return {
          decorator: "toolbar-blue"
        }
      }
    },

  /*
    ---------------------------------------------------------------------------
      PROGRESSIVE
    ---------------------------------------------------------------------------
    */
    "progressive-table-header":
    {
      alias: "widget",

      style: function(states)
      {
        return {
          decorator: "progressive-table-header"
        };
      }
    },

    "progressive-table-header-cell":
    {
      alias: "atom",
      style: function(states)
      {
        return {
          minWidth: 40,
          minHeight: 25,
          paddingLeft: 6,
          decorator: "progressive-table-header-cell"
        };
      }
    },

  /*
    ---------------------------------------------------------------------------
      RADIOBUTTON
    ---------------------------------------------------------------------------
    */
  "radiobutton":
    {
      alias: "atom",

      style: function(states)
      {
        var icon;
        if (states.checked && states.focused) {
          icon = states.hovered ? "radiobutton-checked-hovered-focused" : "radiobutton-checked-focused";
    } else if (states.checked) {
          icon = states.hovered ? "radiobutton-checked-hovered" : "radiobutton-checked";
    } else if (states.hovered && !states.disabled) {
          icon = states.focused ? "radiobutton-hovered-focused" : "radiobutton-hovered";
        } else if (states.focused) {
          icon = "radiobutton-focused";
        } else if (states.pressed) {
          icon = "radiobutton-checked";
        } else {
          icon = "radiobutton";
        }

    var invalid = "";

        return {
          icon: "decoration/form/" + icon + invalid + ".png",
          gap: 6
        };
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
          decorator: "pane"
        };
      }
    },

  /*
    ---------------------------------------------------------------------------
      SCROLLAREA
    ---------------------------------------------------------------------------
    */
    "scrollarea":
    {
      style: function(states)
      {
        return {
          minWidth: 50,
          minHeight: 50
        };
      }
    },

    "scrollarea/corner":
    {
      style: function(states)
      {
        return {
          backgroundColor: "background-application"
        };
      }
    },

    "scrollarea/pane": "widget",
    "scrollarea/scrollbar-x": "scrollbar",
    "scrollarea/scrollbar-y": "scrollbar",

    /*
    ---------------------------------------------------------------------------
      SCROLLBAR
    ---------------------------------------------------------------------------
    */
    "scrollbar":
    {
      style: function(states)
      {
        if (states["native"]) {
          return {};
        }

        return {
          width: states.horizontal ? undefined : 16,
          height: states.horizontal ? 16 : undefined,
          decorator: states.horizontal ? "scrollbar-horizontal" : "scrollbar-vertical",
          padding: 1
        };
      }
    },

    "scrollbar/slider":
    {
      alias: "slider",

      style: function(states)
      {
        return {
          padding: states.horizontal ? [0, 1, 0, 1] : [1, 0, 1, 0]
        };
      }
    },

    "scrollbar/slider/knob":
    {
      include: "button-frame",

      style: function(states)
      {
        var decorator = states.horizontal ? "scrollbar-slider-horizontal" :
                                            "scrollbar-slider-vertical";
    if (states.hovered)
    {
      decorator += "-hovered";
    }

        return {
          decorator: decorator,
          minHeight: states.horizontal ? undefined : 9,
          minWidth: states.horizontal ? 9 : undefined
        };
      }
    },

  "scrollbar/button":
    {
      style: function(states)
      {
      var decorator = "scrollbar-button";

        var icon = "decoration/scrollbar/scrollbar-";
        if (states.left) {
          icon += "left.png";
      decorator += "-horizontal";
        } else if (states.right) {
          icon += "right.png";
      decorator += "-horizontal";
        } else if (states.up) {
          icon += "up.png";
      decorator += "-vertical";
        } else {
          icon += "down.png";
      decorator += "-vertical";
        }

    if (states.hovered)
    {
      decorator += "-hovered";
    }

        if (states.left || states.right)
        {
          return {
            padding: [0, 0, 0, states.left ? 5 : 5],
            icon: icon,
            width: 14,
            height: 14,
      margin: 0,
      decorator: decorator
          };
        }
        else
        {
          return {
            padding: [0, 0, 0, 4],
            icon: icon,
            width: 14,
            height: 14,
      margin: 0,
      decorator: decorator
          };
        }
      }
    },

  "scrollbar/button-begin": "scrollbar/button",
    "scrollbar/button-end": "scrollbar/button",

  /*-------------------------------------------------------------------------
      SELECTBOX
    ---------------------------------------------------------------------------
    */
  "selectbox":
    {
      alias: "button-frame",
      include: "button-frame",

      style: function(states)
      {
        return {
          padding: [1, 6]
        };
      }
    },

    "selectbox/atom": "atom",

    "selectbox/popup":
  {
    alias: "popup",
    include: "popup",

      style: function(states)
      {
        var result =
        {
          shadow: "shadow-window"
        };

        return result;
      }
    },

    "selectbox/list": {
      alias: "list"
    },

  "selectbox/arrow":
    {
      include: "image",

      style: function(states)
      {
        return {
          source: "decoration/arrows/down.png",
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
      alias: "button-frame",
      include: "button-frame",

      style: function(states)
      {
        return {
          padding: 2,
          center: true,
          icon: states.vertical ?
            "decoration/arrows/down.png" :
            "decoration/arrows/right.png"
        };
      }
    },

    "slidebar/button-backward":
    {
      alias: "button-frame",
      include: "button-frame",

      style: function(states)
      {
        return {
          padding: 2,
          center: true,
          icon: states.vertical ?
            "decoration/arrows/up.png" :
            "decoration/arrows/left.png"
        };
      }
    },

  /*-------------------------------------------------------------------------
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
         minWidth: states.horizontal ? undefined : 14,
      padding: states.horizontal ? [0, 1, 0, 1] : [1, 0, 1, 0]
        }
      }
    },

  "slider/knob":
    {
      style: function(states)
      {
      var decorator = "slider-knob";

    if (states.pressed)
    {
      decorator += "-pressed";
    } else if (states.hovered)
    {
      decorator += "-hovered";
    }

        return {
          decorator: decorator,
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
        return {
          decorator: states.focused ? "box-blue" : "box-white",
      padding: 2
        };
      }
    },

    "spinner/textfield":
    {
      style: function(states)
      {
        return {
          marginRight: 2,
          padding: [2, 2, 1, 2],
          textColor: states.disabled ? "text-disabled" : "text-input"
        };
      }
    },

    "spinner/upbutton":
    {
      alias: "spinner-button",
      include: "spinner-button",

      style: function(states)
      {
        return {
          icon: "decoration/arrows/up-medium.png",
          padding: states.pressed ? [1, 4, 0, 4] : [0, 4, 1, 4]
        };
      }
    },

    "spinner/downbutton":
    {
      alias: "spinner-button",
      include: "spinner-button",

      style: function(states)
      {
        return {
          icon: "decoration/arrows/down-medium.png",
          padding: states.pressed ? [1, 4, 0, 4] : [0, 4, 1, 4]
        };
      }
    },

  /*-------------------------------------------------------------------------
      SPLITBUTTON
    ---------------------------------------------------------------------------
    */

  "splitbutton": {},

    "splitbutton/button":
    {
      alias: "atom",

      style: function(states)
      {
        return {
      padding: states.pressed || states.checked
               || (states.checked && states.disabled) ? [5, 4, 4, 4] : [4, 4, 5, 4],
          decorator: states.pressed || states.checked ?
                        "splitbutton-checked" :
                     states.hovered && !states.disabled ?
                        "splitbutton-hovered" : "splitbutton",
      textColor: "text-button",
      center: true
        };
      }
  },

  "splitbutton/arrow":
    {
      style: function(states)
      {
        return {
          icon: "decoration/arrows/down.png",
      padding: states.pressed || states.checked
               || (states.checked && states.disabled) ? [7, 7, 5, 7] : [6, 7, 6, 7],
      decorator: states.pressed || states.checked ?
                        "combobox-button-checked" :
                     states.hovered && !states.disabled ?
                        "combobox-button-hovered" : "combobox-button"
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
          decorator: "splitpane"
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
          source: states.horizontal ? "decoration/button/knob-horizontal.png" :
                                  "decoration/button/knob-vertical.png"
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
    "table":
    {
      alias: "widget",

      style: function(states)
      {
        return {
          decorator: "table"
        };
      }
    },

    "table-header": {},

    "table/statusbar":
    {
      style: function(states)
      {
        return {
          decorator: "table-statusbar",
          padding: [0, 2]
        };
      }
    },

    "table/column-button":
    {
      alias: "button-frame",

      style: function(states)
      {
        return {
          decorator: "table-column-button",
          padding: 3,
          icon: "decoration/table/select-column-order.png"
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
        };
      }
    },

    "table-scroller": "widget",

    "table-scroller/scrollbar-x": "scrollbar",
    "table-scroller/scrollbar-y": "scrollbar",

    "table-scroller/header":
    {
      style: function(states)
      {
        return {
          decorator: "table-scroller-header"
        };
      }
    },

    "table-scroller/pane":
    {
      style: function(states)
      {
        return {
          backgroundColor: "table-pane"
        };
      }
    },

    "table-scroller/focus-indicator":
    {
      style: function(states)
      {
        return {
          decorator: "table-scroller-focus-indicator"
        };
      }
    },

    "table-scroller/resize-line":
    {
      style: function(states)
      {
        return {
          backgroundColor: "border-separator",
          width: 2
        };
      }
    },

    "table-header-cell":
    {
      alias: "atom",
      style: function(states)
      {
        return {
          minWidth: 13,
          minHeight: 21,
          padding: states.hovered ? [3, 4, 2, 4] : [3, 4],
          decorator: states.hovered ? "table-header-cell-hovered" : "table-header-cell",
          sortIcon: states.sorted ?
              (states.sortedAscending ? "decoration/table/ascending.png" : "decoration/table/descending.png")
              : undefined
        };
      }
    },

    "table-header-cell/label":
    {
      style: function(states)
      {
        return {
          minWidth: 0,
          alignY: "middle",
          paddingRight: 5,
      marginBottom: 3,
      marginTop: 0
        };
      }
    },

    "table-header-cell/sort-icon":
    {
      style: function(states)
      {
        return {
          alignY: "middle",
          alignX: "right"
        };
      }
    },

    "table-header-cell/icon":
    {
      style: function(states)
      {
        return {
          minWidth: 0,
          alignY: "middle",
          paddingRight: 5
        };
      }
    },

    "table-editor-textfield":
    {
      include: "textfield",

      style: function(states)
      {
        return {
          decorator: undefined,
          padding: [2, 2],
          backgroundColor: "background-light"
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
          padding: [0, 2],
          backgroundColor: "background-light"
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
          decorator: undefined,
          backgroundColor: "background-light"
        };
      }
    },

  /*
    ---------------------------------------------------------------------------
      TABVIEW
    ---------------------------------------------------------------------------
    */
    "tabview":
    {
      style: function(states)
      {
        return {
          contentPadding: 8
        };
      }
    },

  "tabview/bar":
    {
      alias: "slidebar",

      style: function(states)
      {
        var result =
        {
          marginBottom: states.barTop ? -1 : 0,
          marginTop: states.barBottom ? -4 : 0,
          marginLeft: states.barRight ? -3 : 0,
          marginRight: states.barLeft ? -1 : 0,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0
        };

        if (states.barTop || states.barBottom)
        {
          result.paddingLeft = 5;
          result.paddingRight = 7;
        }
        else
        {
          result.paddingTop = 5;
          result.paddingBottom = 7;
        }

        return result;
      }
    },

  "tabview/bar/button":
    {
      include: "button-frame",
      alias: "button-frame",

      style: function(states)
      {
      var margin;

      switch (true)
    {
          case states.barTop:
            margin = [4, 0, 0, 0];
      break;

      case states.barBottom:
        margin =  [3, 0, 4, 0];
      break;

      case states.barLeft:
      margin = [0, 0, 0, 5];
      break;

      case states.barRight:
      margin = [0, 4, 0, 2];
      break;
        }
    return {
      margin: margin,
      padding: 2,
      center: true
    }
      }
    },

  "tabview/bar/button-forward":
    {
      include: "tabview/bar/button",
      alias: "tabview/bar/button",

      style: function(states)
      {
    return {
          icon: states.vertical ? "decoration/arrows/down.png" : "decoration/arrows/right.png"
    }
      }
    },

  "tabview/bar/button-backward":
    {
      include: "tabview/bar/button",
      alias: "tabview/bar/button",

      style: function(states)
      {
    return {
          icon: states.vertical ? "decoration/arrows/up.png" : "decoration/arrows/left.png"
    }
      }
    },

    "tabview/bar/scrollpane": {},

    "tabview/pane":
    {
      style: function(states)
      {
        return {
          decorator: "box-gradient",
          minHeight: 100,

          marginBottom: states.barBottom ? -1 : 0,
          marginTop: states.barTop ? -1 : 0,
          marginLeft: states.barLeft ? -1 : 0,
          marginRight: states.barRight ? -1 : 0
        };
      }
    },

    "tabview-page": "widget",

  "tabview-page/button":
    {
      alias: "atom",

      style: function(states)
      {
        var decorator, padding=0;
        var marginTop = 0, marginBottom = 0, marginLeft = 0, marginRight = 0;

        if (states.barTop)
        {
          decorator = states.checked ? "tabview-page-button-top-active" :
                      states.hovered ? "tabview-page-button-top-hovered" :
                               "tabview-page-button-top-inactive";
          padding = states.checked ? [4, 10, 6] : [4, 10];
          marginTop = states.checked ? 2 : 4;
          marginRight = -2;
        marginBottom = 1;
        }
        else if (states.barBottom)
        {
          decorator = states.checked ? "tabview-page-button-bottom-active" :
                    states.hovered ? "tabview-page-button-bottom-hovered" :
                               "tabview-page-button-bottom-inactive";
          padding = states.checked ? [6, 10] : [4, 10];
          marginBottom = states.checked ? 2 : 4;
          marginRight = -2;
        marginTop = 4;
        }
        else if (states.barRight)
        {
          decorator = states.checked ? "tabview-page-button-right-active" :
                  states.hovered ? "tabview-page-button-right-hovered" :
                             "tabview-page-button-right-inactive";
          // padding = states.checked ? [6, 8, 6, 10] : [6, 10, 6, 10];
      padding = states.checked ? [6, 10, 6, 12] : [6, 10];
          marginRight = states.checked ? 2 : 4;
          marginBottom = -2;
          marginLeft = 3;
        }
        else
        {
          decorator = states.checked ? "tabview-page-button-left-active" :
                  states.hovered ? "tabview-page-button-left-hovered" :
                             "tabview-page-button-left-inactive";
          padding = states.checked ? [6, 10, 6, 8] : [6, 10];
          marginLeft = states.checked ? 2 : 4;
          marginBottom = -2;
          marginRight = 1;
        }

        return {
          zIndex: states.checked ? 10 : 5,
          decorator: decorator,
          padding: padding,
          marginTop: marginTop,
          marginBottom: marginBottom,
          marginLeft: marginLeft,
          marginRight: marginRight,
          textColor: states.disabled ? "text-disabled" : "text-active"
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

    "tabview-page/button/close-button":
    {
      alias: "atom",
      style: function(states)
      {
      var icon;
      if (states.hovered)
    {
      icon = "decoration/tabview/tab-close-button-hovered.png";
    } else {
      icon = "decoration/tabview/tab-close-button.png";
    }
        return {
          icon: icon
        };
      }
    },

  /*
    ---------------------------------------------------------------------------
      TEXTAREA
    ---------------------------------------------------------------------------
    */
    "textarea":
    {
      include: "textfield",

      style: function(states)
      {
        return {
          padding: 2
        };
      }
    },

  /*
    ---------------------------------------------------------------------------
      TEXTFIELD
    ---------------------------------------------------------------------------
    */
  "textfield":
    {
      style: function(states)
      {
        var decorator;

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (focused && invalid && !disabled) {
          decorator = "input-focused-invalid";
        } else if (focused && !invalid && !disabled) {
          decorator = "input-focused";
        } else if (!focused && invalid && !disabled) {
          decorator = "border-invalid";
        } else {
          decorator = "input";
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
          decorator: decorator,
          padding: 2,
          textColor: textColor
        };
      }
    },

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
          decorator: "toolbar-silver",
          spacing: 2
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
          source: "decoration/toolbar/toolbar-handle-knob.gif",
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
      margin: 1,
      padding: states.pressed || states.checked ? [8, 6, 4, 6] : [6, 6, 6, 6],
          decorator: states.pressed || states.checked ?
                        "toolbar-button-checked" :
                      states.hovered && !states.disabled ?
                        "toolbar-button-hovered" : undefined,
      textColor: states.pressed || states.checked ? "toolbar-button-checked" : "toolbar-button"
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
          source: "decoration/arrows/down-small.png"
        };
      }
    },

    "toolbar-splitbutton":
    {
      style: function(states)
      {
        return {
          margin: 0
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
          icon: "decoration/arrows/down.png"
        };
      }
    },

    "toolbar-separator":
    {
      style: function(states)
      {
        return {
          decorator: "toolbar-separator",
          margin: [4, 5, 4, 5]
        };
      }
    },

  /*
    ---------------------------------------------------------------------------
      TOOLTIP
    ---------------------------------------------------------------------------
    */

    "tooltip":
    {
      include: "popup",

      style: function(states)
      {
        return {
          backgroundColor: "background-tip",
          padding: [1, 3, 2, 3],
          offset: [15, 5, 5, 5]
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
          placeMethod: "widget",
          offset: [0, 0, 0, 14],
          marginTop: -2,
          position: "right-top",
          showTimeout: 100,
          hideTimeout: 10000,
          decorator: "tooltip-error",
          shadow: "tooltip-error-arrow",
          font: "bold"
        };
      }
    },

    "tooltip-error/atom": "atom",

  /*
    ---------------------------------------------------------------------------
      TREE
    ---------------------------------------------------------------------------
    */
    "tree":
  {
    alias: "list",

    style: function(states)
      {
        return {
      decorator: "input"
    };
    }
  },

    "tree-item":
    {
      style: function(states)
      {
        return {
          padding: [2, 6],
          textColor: states.selected ? "text-selected" : undefined,
          decorator: states.selected ? "selected" : undefined
        };
      }
    },

    "tree-item/icon":
    {
      include: "image",

      style: function(states)
      {
        return {
          paddingRight : 5
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
          icon = "decoration/tree/open-selected.png";
        }
        else if (states.selected && !states.opened)
        {
          icon = "decoration/tree/closed-selected.png";
        }
        else if (states.opened)
        {
          icon = "decoration/tree/open.png";
        }
        else
        {
          icon = "decoration/tree/closed.png";
        }

        return {
          padding: [0, 5, 0, 2],
          source: icon
        };
      }
    },

    "tree-folder":
    {
      include: "tree-item",
      alias: "tree-item",

      style: function(states)
      {
        var icon;
        if (states.small) {
          icon = states.opened ? "icon/16/places/folder-open.png" : "icon/16/places/folder.png";
        } else if (states.large) {
          icon = states.opened ? "icon/32/places/folder-open.png" : "icon/32/places/folder.png";
        } else {
          icon = states.opened ? "icon/22/places/folder-open.png" : "icon/22/places/folder.png";
        }

        return {
          icon: icon
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
          icon: states.opened ?
            "icon/16/places/folder-open.png" :
            "icon/16/places/folder.png"
        };
      }
    },

    "treevirtual-file":
    {
      include: "treevirtual-folder",
      alias: "treevirtual-folder",

      style: function(states)
      {
        return {
          icon: "icon/16/mimetypes/office-document.png"
        };
      }
    },

    "treevirtual-line":
    {
      style: function(states)
      {
        return {
          icon: "qx/static/blank.gif"
        };
      }
    },

    "treevirtual-contract":
    {
      style: function(states)
      {
        return {
          icon: "decoration/tree/open.png",
          paddingLeft: 5,
          paddingTop: 2
        };
      }
    },

    "treevirtual-expand":
    {
      style: function(states)
      {
        return {
          icon: "decoration/tree/closed.png",
          paddingLeft: 5,
          paddingTop: 2
        };
      }
    },

    "treevirtual-only-contract": "treevirtual-contract",
    "treevirtual-only-expand": "treevirtual-expand",
    "treevirtual-start-contract": "treevirtual-contract",
    "treevirtual-start-expand": "treevirtual-expand",
    "treevirtual-end-contract": "treevirtual-contract",
    "treevirtual-end-expand": "treevirtual-expand",
    "treevirtual-cross-contract": "treevirtual-contract",
    "treevirtual-cross-expand": "treevirtual-expand",

    "treevirtual-end":
    {
      style: function(states)
      {
        return {
          icon: "qx/static/blank.gif"
        };
      }
    },

    "treevirtual-cross":
    {
      style: function(states)
      {
        return {
          icon: "qx/static/blank.gif"
        };
      }
    },

  /*
    ---------------------------------------------------------------------------
      VIRTUAL WIDGETS
    ---------------------------------------------------------------------------
    */
    
    "virtual-list" : "list",
    "virtual-list/row-layer" : "row-layer",

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
    
    "virtual-tree":
    {
      include: "tree",
      alias: "tree",

      style: function(states)
      {
        return {
          itemHeight: 20
        };
      }
    },

    "virtual-tree-folder" : "tree-folder",
    "virtual-tree-file" : "tree-file",

    "row-layer" :
    {
      style : function(states)
      {
        return {
          colorEven : "white",
          colorOdd : "white"
        };
      }
    },
    
    "column-layer" : "widget",

    "cell" :
    {
      style : function(states)
      {
        return {
          textColor: states.selected ? "text-selected" : "text-label",
          padding: [3, 6],
          font: "default"
        };
      }
    },

    "cell-string" : "cell",
    "cell-number" :
    {
      include : "cell",
      style : function(states)
      {
        return {
          textAlign : "right"
        };
      }
    },
    "cell-image" : "cell",
    "cell-boolean" :
    {
      include : "cell",
      style : function(states)
      {
        return {
          iconTrue : "decoration/table/boolean-true.png",
          iconFalse : "decoration/table/boolean-false.png"
        };
      }
    },
    
    "cell-atom" : "cell",
    "cell-date" : "cell",
    "cell-html" : "cell",
    
    "group-item" :
    {
      include : "label",
      alias : "label",

      style : function(states)
      {
        return {
          padding : 4,
          decorator : "group-item",
          textColor : "groupitem-text",
          font: "bold"
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
          contentPadding: 5,
      padding: [0, 2, 2, 2]
        };
      }
    },

  "window/pane":
    {
      style: function(states)
      {
        return {
          decorator: "window"
        };
      }
    },

  "window/captionbar":
    {
      style: function(states)
      {
        return {
          decorator: states.active ? "window-captionbar-active" : "window-captionbar-inactive",
          textColor: states.active ? "text-active" : "text-disabled",
          minHeight: 26,
          paddingRight: 2
        };
      }
    },

  "window/icon":
    {
      style: function(states)
      {
        return {
          margin: [5, 0, 3, 6]
        };
      }
    },

  "window/title":
    {
      style: function(states)
      {
        return {
          alignY: "middle",
          font: "bold",
          marginLeft: 6,
          marginRight: 12
        };
      }
    },

  "window/close-button":
    {
      alias: "atom",

      style: function(states)
      {
      var icon;
    switch (true)
    {
      case states.hovered:
        icon = "decoration/window/close-hovered.png";
      break;

      case states.active:
        icon = "decoration/window/close-active.png";
      break;

      default:
        icon = "decoration/window/button-inactive.png";
    }
        return {
          icon: icon,
          margin: [3, 3, 3, 0]
        };
      }
    },

  "window/maximize-button":
    {
      alias: "atom",

      style: function(states)
      {
      var icon;
    switch (true)
    {
      case states.hovered:
        icon = "decoration/window/maximize-hovered.png";
      break;

      case states.active:
        icon = "decoration/window/maximize-active.png";
      break;

      default:
        icon = "decoration/window/button-inactive.png";
    }
        return {
          icon: icon,
          margin: [3, 3, 3, 0]
        };
      }
    },

  "window/minimize-button":
    {
      alias: "atom",

      style: function(states)
      {
      var icon;
    switch (true)
    {
      case states.hovered:
        icon = "decoration/window/minimize-hovered.png";
      break;

      case states.active:
        icon = "decoration/window/minimize-active.png";
      break;

      default:
        icon = "decoration/window/button-inactive.png";
    }
        return {
          icon: icon,
          margin: [3, 3, 3, 0]
        };
      }
    },

  "window/restore-button":
    {
      alias: "atom",

      style: function(states)
      {
      var icon;
    switch (true)
    {
      case states.hovered:
        icon = "decoration/window/restore-hovered.png";
      break;

      case states.active:
        icon = "decoration/window/maximize-active.png";
      break;

      default:
        icon = "decoration/window/button-inactive.png";
    }
        return {
          icon: icon,
          margin: [3, 3, 3, 0]
        };
      }
    },

  "window/statusbar":
    {
      style: function(states)
      {
        return {
          padding: [5, 6],
          decorator: "window-statusbar",
          minHeight: 18,
      marginTop: -4
        };
      }
    },

    "window/statusbar-text": {}
  }
});