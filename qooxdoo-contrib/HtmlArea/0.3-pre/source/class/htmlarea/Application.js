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

#asset(htmlarea/*)

************************************************************************ */
/**
 * htmlarea Example application
 */
qx.Class.define("htmlarea.Application",
{
  extend : qx.application.Standalone,




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void}
     */
    main : function(e)
    {
      this.base(arguments);
      
      // Add log appenders
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
        if (qx.bom.client.Engine.MSHTML)
        {
          qx.log.appender.Console.init();
        }
      }

      var demoContent = '<h1>About</h1><p>qooxdoo (pronounced [ku:ksdu:]) is a comprehensive and innovative Ajax application framework. Leveraging object-oriented JavaScript allows developers to build impressive cross-browser applications. No <acronym title="HyperText Markup Language">HTML</acronym>, <acronym title="Cascading Style Sheets">CSS</acronym> nor <acronym title="Document Object Model">DOM</acronym> knowledge is needed. qooxdoo includes a platform-independent development tool chain, a state-of-the-art <acronym title="Graphical User Interface">GUI</acronym> toolkit and an advanced client-server communication layer. It is Open Source under an <acronym title="GNU Lesser General Public License">LGPL</acronym>/<acronym title="Eclipse Public License">EPL</acronym> dual <a href="http://qooxdoo.org/license" class="wikilink1" title="license">license</a>.';
      var debugStyles = "";
      var doc = this.getRoot();
      
      var htmlArea = new htmlarea.HtmlArea(demoContent);
      htmlArea.set( { height: 400 } );
      ha = htmlArea;

      var vb = new qx.ui.layout.VBox(8);
      var vbContainer = (new qx.ui.container.Composite(vb));

      var hb = new qx.ui.layout.HBox;
      var hbContainer = new qx.ui.container.Composite(hb);

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
        var attributes = { src    : qx.util.AliasManager.getInstance().resolve("htmlarea/image/qooxdoo_logo.png"),
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
        button = new qx.ui.form.Button(null, toolbarEntries[entry].image);
        button.set({ focusable : false, keepFocus : true, center : true });
        button.addListener("execute", toolbarEntries[entry].action, htmlArea);
        hbContainer.add(button);
      }

      /* Add toolbar and HtmlArea widget */
      vbContainer.add(hbContainer);
      vbContainer.add(htmlArea);      

      doc.add(vbContainer, {left:10, top:10});
    }
  }
  
});

