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

************************************************************************ */

/* ************************************************************************

#resource(image:image)

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
      
      qx.Theme.patch(qx.theme.classic.Appearance, htmlarea.theme.classic.Appearance);
      
      var vb = new qx.ui.layout.VerticalBoxLayout;
      vb.set({ top : 50, left : 20, width : "65%", height : "auto", spacing : 20 });
      vb.addToDocument();

      var htmlArea = new htmlarea.HtmlArea(null);
      htmlArea.set({ width : "100%", height : 400, focused : true });
      //vb.add(htmlArea);

      var hb = new qx.ui.layout.HorizontalBoxLayout;
      hb.set({ width : "100%", height : "auto", spacing : 10 });

      var boldButton = new qx.ui.form.Button("Bold");
      boldButton.addEventListener("execute", function(e){
        this.setBold();
      }, htmlArea);

      var italicButton = new qx.ui.form.Button("Italic");
      italicButton.addEventListener("execute", function(e){
        this.setItalic();
      }, htmlArea);

      var fontSizeButton = new qx.ui.form.Button("FontSize");
      fontSizeButton.addEventListener("execute", function(e){
        var result = window.prompt("FontSize: ", "");
        this.setFontSize(parseInt(result));
      }, htmlArea);

      var colorButton = new qx.ui.form.Button("Color");
      colorButton.addEventListener("execute", function(e){
        var result = window.prompt("Color (Hex): ", "#");
        this.setColor(result);
      }, htmlArea);

      var removeFormatButton = new qx.ui.form.Button("Remove format");
      removeFormatButton.addEventListener("execute", function(e){
        this.removeFormat();
      }, htmlArea);

      var setContentButton = new qx.ui.form.Button("getValue");
      setContentButton.addEventListener("execute", function(e){
        alert(this.getValue());
      }, htmlArea);

      var getContentButton = new qx.ui.form.Button("getComputedValue");
      getContentButton.addEventListener("execute", function(e){
        alert(this.getComputedValue());
      }, htmlArea);

      hb.add(boldButton, italicButton, fontSizeButton, colorButton, removeFormatButton, setContentButton, getContentButton);

      var hb2 = new qx.ui.layout.HorizontalBoxLayout;
      hb2.set({ width : "100%", height : "auto", spacing : 10 });

      var getHtmlButton = new qx.ui.form.Button("getHtml");
      getHtmlButton.addEventListener("execute", function(e){
        var html = htmlArea.getHtml();
        textArea.setValue(textArea.getValue() + "\n" + html);
      }, this);

      var innerHtmlButton = new qx.ui.form.Button("innerHtml");
      innerHtmlButton.addEventListener("execute", function(e){
        var html = htmlArea.__doc.body.innerHTML;
        textArea.setValue(textArea.getValue() + "\n" + html);
      }, this);

      var clearButton = new qx.ui.form.Button("clearTextarea");
      clearButton.addEventListener("execute", function(e){
        textArea.setValue("");
      }, this);

      hb2.add(getHtmlButton, innerHtmlButton, clearButton);
      vb.add(hb, htmlArea, hb2);

      var textArea = new qx.ui.form.TextArea;
      textArea.set({ width: "100%", height : 200 });
      vb.add(textArea);
      
    }
  }
  
});
