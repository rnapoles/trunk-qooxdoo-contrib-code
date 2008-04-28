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
     * TODOC
     *
     * @type member
     * @param e {Event} TODOC
     * @return {void}
     */
    main : function(e)
    {
      this.base(arguments);

      var demoContent = '<h1>About</h1><p>qooxdoo (pronounced [ku:ksdu:]) is a comprehensive and innovative Ajax application framework. Leveraging object-oriented JavaScript allows developers to build impressive cross-browser applications. No <acronym title="HyperText Markup Language">HTML</acronym>, <acronym title="Cascading Style Sheets">CSS</acronym> nor <acronym title="Document Object Model">DOM</acronym> knowledge is needed. qooxdoo includes a platform-independent development tool chain, a state-of-the-art <acronym title="Graphical User Interface">GUI</acronym> toolkit and an advanced client-server communication layer. It is Open Source under an <acronym title="GNU Lesser General Public License">LGPL</acronym>/<acronym title="Eclipse Public License">EPL</acronym> dual <a href="http://qooxdoo.org/license" class="wikilink1" title="license">license</a>.';
      var debugStyles = "p { margin:0px;padding:0px; border:dotted 1px lime; background-color:#dfdfdf; } ";

      qx.Theme.patch(qx.theme.classic.Appearance, htmlarea.theme.classic.Appearance);

      qx.io.Alias.getInstance().add("htmlarea", qx.core.Setting.get("htmlarea.resourceUri"));
      
      var vb = new qx.ui.layout.VerticalBoxLayout;
      vb.set({ top : 20, left : 20, width : "65%", height : "auto", spacing : 20 });
      vb.addToDocument();

      var htmlArea = new htmlarea.HtmlArea(demoContent, debugStyles);
      ha = htmlArea;
      htmlArea.set({ width : "100%", height : 400, focused : true });
      //vb.add(htmlArea);

      var hb = new qx.ui.layout.HorizontalBoxLayout;
      hb.set({ width : "100%", height : "auto", spacing : 10 });

      var boldButton = new qx.ui.form.Button("", "htmlarea/image/text_bold.gif");
      boldButton.addEventListener("execute", function(e){
        this.setBold();
      }, htmlArea);

      var italicButton = new qx.ui.form.Button("", "htmlarea/image/text_italic.gif");
      italicButton.addEventListener("execute", function(e){
        this.setItalic();
      }, htmlArea);

      var underButton = new qx.ui.form.Button("", "htmlarea/image/text_underline.gif");
      underButton.addEventListener("execute", function(e){
        this.setUnderline();
      }, htmlArea);

      var strikeButton = new qx.ui.form.Button("", "htmlarea/image/text_strikethrough.gif");
      strikeButton.addEventListener("execute", function(e){
        this.setStrikeThrough();
      }, htmlArea);

      
      var fontSizeButton = new qx.ui.form.Button("", "htmlarea/image/fontsize.gif");
      fontSizeButton.addEventListener("execute", function(e){
        var result = window.prompt("FontSize: ", "");
        this.setFontSize(parseInt(result));
      }, htmlArea);

      var colorButton = new qx.ui.form.Button("", "htmlarea/image/color_text.gif");
      colorButton.addEventListener("execute", function(e){
        var result = window.prompt("Color (Hex): ", "#");
        this.setTextColor(result);
      }, htmlArea);
      
      var bgcolorButton = new qx.ui.form.Button("", "htmlarea/image/color_bg.gif");
      bgcolorButton.addEventListener("execute", function(e){
        var result = window.prompt("BgColor (Hex): ", "#");
        this.setTextBackgroundColor(result);
      }, htmlArea);
      
      var olButton = new qx.ui.form.Button("", "htmlarea/image/list_ordered.gif");
      olButton.addEventListener("execute", function(e){
        this.insertUnorderedList();
      }, htmlArea);
      
      var ulButton = new qx.ui.form.Button("", "htmlarea/image/list_numbered.gif");
      ulButton.addEventListener("execute", function(e){
        this.insertOrderedList();
      }, htmlArea);
      
      var undoButton = new qx.ui.form.Button("", "htmlarea/image/undo.gif");
      undoButton.addEventListener("execute", function(e){
        this.undo();
      }, htmlArea);
      
      var redoButton = new qx.ui.form.Button("", "htmlarea/image/redo.gif");
      redoButton.addEventListener("execute", function(e){
        this.redo();
      }, htmlArea);
      
      var removeFormatButton = new qx.ui.form.Button("", "htmlarea/image/remove_format.gif");
      removeFormatButton.addEventListener("execute", function(e){
        this.removeFormat();
      }, htmlArea);

      hb.add(boldButton, italicButton, underButton, strikeButton, fontSizeButton, colorButton, bgcolorButton, olButton, ulButton, removeFormatButton, undoButton, redoButton);

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
