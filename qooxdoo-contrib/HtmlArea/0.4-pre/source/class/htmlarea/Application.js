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
     * Jonathan Rass (jonathan_rass)

   ======================================================================

   This application contain images based on the following work:

   * Richtext Editor: Fork (RTEF)
       http://www.rtef.info/
       Version 1.8.1

     Copyright:
       (c) 2006 Timothy Bell

     License:
       http://www.rtef.info/#contributors

     Author:
       Timothy Bell

************************************************************************ */

/* ************************************************************************

#resource(htmlarea.image:image)

************************************************************************ */

/**
 * htmlarea Example application
 */
qx.Class.define("htmlarea.Application",
{
  extend : qx.application.Gui,




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Application startup
     *
     * @type member
     * @return {void}
     */
    main : function()
    {
      this.base(arguments);
      
      var demoContent = '<p id="10" style="font-size:10pt;">10pt</p><p id="20" style="font-size:20pt;">20pt</p>';

      qx.Theme.patch(qx.theme.classic.Appearance, htmlarea.theme.classic.Appearance);

      qx.io.Alias.getInstance().add("htmlarea", qx.core.Setting.get("htmlarea.resourceUri"));
      
      var vb = new qx.ui.layout.VerticalBoxLayout;
      vb.set({ top : 20, left : 20, width : "65%", height : "auto", spacing : 20 });
      vb.addToDocument();

      var htmlArea = new htmlarea.HtmlArea(demoContent);
      htmlArea.set({ width : "100%", height : 400, focused : true });
      
      var hb = new qx.ui.layout.HorizontalBoxLayout;
      hb.set({ width : "100%", height : "auto", spacing : 10 });
      
      /* *********************************************
       * 
       *      Special handler for Toolbar entries
       * 
       * *********************************************
       */
      var fontSizeHandler = function(e)
      {
        var result = window.prompt("FontSize: ", "");
        this.setFontSize(parseInt(result));
      };
      
      var fontColorHandler = function(e)
      {
        var result = window.prompt("Color (Hex): ", "#");
        this.setTextColor(result);
      };
      
      var textBackgroundColorHandler = function(e)
      {
        var result = window.prompt("BgColor (Hex): ", "#");
        this.setTextBackgroundColor(result);
      };
      
      var insertImageHandler = function(e)
      {
        var attributes = { src    : qx.io.Alias.getInstance().resolve("htmlarea/image/qooxdoo_logo.png"),
                           border : 0,
                           title  : "qooxdoo logo",
                           alt    : "qooxdoo logo" };
        
        this.insertImage(attributes);
      };
      
      var insertTableHandler = function(e)
      {
        var table = "<table border='1'>" + 
                      "<tbody>" +
                        "<tr>" +
                          "<td>First Row, First cell</td>" +
                          "<td>First Row, Second cell</td>" +
                        "</tr>" +
                        "<tr>" +
                          "<td>Second Row, First cell</td>" +
                          "<td>Second Row, Second cell</td>" +
                        "</tr>" +
                      "</tbody>" +
                    "</table>";
        this.insertHtml(table);
      };
      
      /* ***************************************
       * 
       *            Toolbar info
       *  
       * ***************************************
       */
      var toolbarEntries = {
        bold :                { image : "htmlarea/image/text_bold.gif", action : htmlArea.setBold },
        italic :              { image : "htmlarea/image/text_italic.gif", action : htmlArea.setItalic },
        underline :           { image : "htmlarea/image/text_underline.gif", action : htmlArea.setUnderline },
        strikethrough :       { image : "htmlarea/image/text_strikethrough.gif", action : htmlArea.setStrikeThrough },

        indet :               { image : "htmlarea/image/indent.gif", action : htmlArea.insertIndent },
        outdent :             { image : "htmlarea/image/outdent.gif", action : htmlArea.insertOutdent },
        
        alignLeft :           { image : "htmlarea/image/align_left.gif", action : htmlArea.setJustifyLeft },
        alignCenter :         { image : "htmlarea/image/align_center.gif", action : htmlArea.setJustifyCenter },
        alignRight :          { image : "htmlarea/image/align_right.gif", action : htmlArea.setJustifyRight },
        alignJustify :        { image : "htmlarea/image/align_justify.gif", action : htmlArea.setJustifyFull },
        
        fontsize :            { image :  "htmlarea/image/fontsize.gif", action : fontSizeHandler },
        fontcolor :           { image :  "htmlarea/image/color_text.gif", action : fontColorHandler },
        textBackgroundColor : { image :  "htmlarea/image/color_bg.gif", action : textBackgroundColorHandler },
        
        insertImage :         { image : "htmlarea/image/insert_image.gif", action : insertImageHandler },
        insertTable :         { image : "htmlarea/image/insert_table.gif", action : insertTableHandler },
        
        ol :                  { image : "htmlarea/image/list_ordered.gif", action : htmlArea.insertOrderedList },
        ul :                  { image : "htmlarea/image/list_unordered.gif", action : htmlArea.insertUnorderedList },
        
        undo :                { image : "htmlarea/image/undo.gif", action : htmlArea.undo },
        redo :                { image : "htmlarea/image/redo.gif", action : htmlArea.redo },
        
        removeFormat :        { image : "htmlarea/image/remove_format.gif", action : htmlArea.removeFormat }
      };
      
      /* Put together toolbar entries */
      var button;
      for (var entry in toolbarEntries)
      {
        button = new qx.ui.form.Button("", toolbarEntries[entry].image);
        button.addEventListener("execute", toolbarEntries[entry].action, htmlArea);
        hb.add(button);
      }

      /* Add toolbar and HtmlArea widget */
      vb.add(hb, htmlArea);
    }
  },

  /*
  *****************************************************************************
     SETTINGS
  *****************************************************************************
  */
  
  settings :
  {
    "htmlarea.resourceUri" : "./resource"
  }
  
});
