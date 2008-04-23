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
     * Andreas Ecker (ecker)

************************************************************************ */

/* ************************************************************************

#ignore(auto-use)

************************************************************************* */

/**
 * Button appearacne theme.
 */
qx.Theme.define("listview.theme.ext.Appearance",
{
  title: "Classic mixin for listview",

  appearances :
  {

    "list-view" :
    {
      style : function(states)
      {
        return {
          border          : "list-view",
          backgroundColor : "list-view"
        }
      }
    },
  
    "list-view-pane" :
    {
      style : function(states)
      {
        return {
          horizontalSpacing : 1
        };
      }
    },
  
    "list-view-header" :
    {
      style : function(states)
      {
        return {
          border          : qx.ui.core.Border.fromConfig({ bottom : [ 1, "solid", "list-view-header-border" ] }),
          backgroundColor : "list-view-header"
        };
      }
    },
  
    "list-view-header-cell" :
    {
      style : function(states)
      {
        return {
          padding         : [ 2, 6 ],
          spacing         : 4,
          backgroundColor : states.over ? "list-view-header-cell-hover" : "undefined",
          backgroundImage : "widget/gradient/button_gradient.png",
          paddingBottom   : states.over ? 0 : 2,
          border          : states.over ? qx.ui.core.Border.fromConfig({ bottom : [ 2, "solid", "list-view-header-border-hover" ] }) : "undefined"
        };
      }
    },
  
    "list-view-header-cell-arrow-up" :
    {
      style : function(states)
      {
        return {
          source : "widget/arrows/up.gif"
        };
      }
    },
  
    "list-view-header-cell-arrow-down" :
    {
      style : function(states)
      {
        return {
          source : "widget/arrows/down.gif"
        };
      }
    },
  
    "list-view-header-separator" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "list-view-header-separator-border",
          width           : 1,
          marginTop       : 1,
          marginBottom    : 1
        };
      }
    },
  
    "list-view-content-cell" :
    {
      style : function(states)
      {
        return {
          cursor          : "default",
          backgroundColor : states.selected ? "list-view-content-cell" : "undefined",
          textColor       : states.selected ? "white" : "undefined",
          border          : states.lead && !states.selected ?
            new qx.ui.core.Border.fromConfig({top : [ 1, "solid", "effect" ], bottom : [ 1, "solid", "effect" ]  }) :
            "undefined",
          marginTop      : states.lead && !states.selected ? 0 : 1,
          marginBottom   : states.lead && !states.selected ? 0 : 1
        };
      }
    },
  
    "list-view-content-cell-image" :
    {
      include : "list-view-content-cell",
  
      style : function(states)
      {
        return {
          paddingLeft  : 6,
          paddingRight : 6
        };
      }
    },
  
    "list-view-content-cell-text" :
    {
      include : "list-view-content-cell",
  
      style : function(states)
      {
        return {
          overflow     : "hidden",
          paddingLeft  : 6,
          paddingRight : 6
        };
      }
    },
  
    "list-view-content-cell-html" : {
      include : "list-view-content-cell-text"
    },
  
    "list-view-content-cell-icon-html" : {
      include : "list-view-content-cell-text"
    },
  
    "list-view-content-cell-link" : {
      include : "list-view-content-cell-text"
    }

  }
});
