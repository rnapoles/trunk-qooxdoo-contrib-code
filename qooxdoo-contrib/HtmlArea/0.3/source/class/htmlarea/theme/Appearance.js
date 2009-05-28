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
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

qx.Theme.define("htmlarea.theme.Appearance",
{
  title : "HtmlArea appearance theme",
 
  appearances :
  {
    "htmlarea" : 
    {
      style : function(states)
      {
        return {
          width           : 600,
          height          : 400,
          backgroundColor : "white"
        };
      }
    }
  }
});