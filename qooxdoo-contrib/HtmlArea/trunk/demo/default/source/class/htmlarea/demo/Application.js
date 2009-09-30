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

/* ************************************************************************

#asset(htmlarea/*)
#asset(htmlarea.demo/*)
#asset(qx/icon/Oxygen/16/actions/format-*.png)
#asset(qx/icon/Oxygen/16/actions/edit-*.png)
#asset(qx/icon/Oxygen/16/actions/insert-image.png)
#asset(qx/icon/Oxygen/16/actions/insert-table.png)
#asset(qx/icon/Oxygen/16/actions/insert-link.png)
#asset(qx/icon/Oxygen/16/actions/insert-text.png)
#asset(qx/icon/Oxygen/16/actions/insert-horizontal-rule.png)

************************************************************************ */
/**
 * htmlarea Example application
 */
qx.Class.define("htmlarea.demo.Application",
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
     * Main method - application start point
     *
     * @return {void}
     */
    main : function()
    {
      this.base(arguments);
      
      // include the "htmlArea" appearance manually
      // because the appearance theme of the HtmlArea *has* to be only the
      // additional set of appearances which can be used to include it into
      // other appearances.
      // If the HtmlArea component would define an appearance theme which
      // extends e.g. the Modern appearance theme it would clash with applications
      // which include the HtmlArea and use the Modern appearance theme themselves
      qx.Theme.include(qx.theme.modern.Appearance, htmlarea.theme.Appearance);
      
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

      var demoContent = '<h1>About</h1><p>qooxdoo (pronounced [ku:ksdu:]) is a comprehensive and innovative Ajax application framework. Leveraging object-oriented JavaScript allows developers to build impressive cross-browser applications. No <acronym title="HyperText Markup Language">HTML</acronym>, <acronym title="Cascading Style Sheets">CSS</acronym> nor <acronym title="Document Object Model">DOM</acronym> knowledge is needed. qooxdoo includes a platform-independent development tool chain, a state-of-the-art <acronym title="Graphical User Interface">GUI</acronym> toolkit and an advanced client-server communication layer. It is Open Source under an <acronym title="GNU Lesser General Public License">LGPL</acronym>/<acronym title="Eclipse Public License">EPL</acronym> dual <a href="http://qooxdoo.org/license" class="wikilink1" title="license">license</a>.</p>';
      var doc = this.getRoot();
      
      this.__htmlArea = new htmlarea.HtmlArea(demoContent, null, "blank.html");
      this.__htmlArea.set( { height: 400, decorator: "main-bottom-left-right" } );
      
      var vb = new qx.ui.layout.VBox(0);
      var vbContainer = new qx.ui.container.Composite(vb);

      var toolbar = this.__setupToolbar();
      
      // Add toolbar and HtmlArea widget
      vbContainer.add(toolbar);
      vbContainer.add(this.__htmlArea);      

      doc.add(vbContainer, { left: 20, top: 20 });      
    },
    
    /* *********************************************
     * 
     *      Special handler for Toolbar entries
     * 
     * *********************************************
     */
    __fontColorHandler : function(e)
    {
      var result = window.prompt("Color (Hex): ", "#");
      this.setTextColor(result);
    },
      
    __textBackgroundColorHandler : function(e)
    {
      var result = window.prompt("BgColor (Hex): ", "#");
      this.setTextBackgroundColor(result);
    },
      
    __insertImageHandler : function(e)
    {
      var attributes = { src    : qx.util.ResourceManager.toUri("htmlarea/image/qooxdoo_logo.png"),
                         border : 0,
                         title  : "qooxdoo logo",
                         alt    : "qooxdoo logo" };
      
      this.insertImage(attributes);
    },
      
    __insertTableHandler : function(e)
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
    },
    
    
    __insertLinkHandler : function(e)
    {
      var createLinkWindow = new qx.ui.window.Window("Insert Hyperlink");
      createLinkWindow.setLayout(new qx.ui.layout.VBox(20));
      createLinkWindow.set({ width: 400, showMaximize: false, showMinimize: false });
      
      var textField = new qx.ui.form.TextField("http://");
      createLinkWindow.add(textField);
      
      var hBoxLayout = new qx.ui.layout.HBox(10);
      hBoxLayout.setAlignX("right");
      var buttonContainer = new qx.ui.container.Composite(hBoxLayout);
      
      var okButton = new qx.ui.form.Button("OK");
      okButton.setWidth(60);
      okButton.addListener("execute", function(e) {
        this.insertHyperLink(textField.getValue());
        createLinkWindow.close();
      }, this);
      buttonContainer.add(okButton);
      
      var cancelButton = new qx.ui.form.Button("Cancel");
      cancelButton.setWidth(60);
      cancelButton.addListener("execute", function(e) { 
        createLinkWindow.close();
      }, this);
      buttonContainer.add(cancelButton);
      
      createLinkWindow.add(buttonContainer);
      
      createLinkWindow.center();
      createLinkWindow.open();
      
      this.__editorComponent.saveRange();
    },
    
    
    __insertHTMLHandler : function(e)
    {
      var result = window.prompt("HTML Code:", "");
      this.insertHtml(result);
    },
    
      
    /* ***************************************
     * 
     *            Toolbar info
     *  
     * ***************************************
     */
      
    __fontFamilyToolbarEntry : function()
    {
      var button = new qx.ui.form.SelectBox;
      button.set({ toolTipText: "Change Font Family",
                   focusable: false,
                   keepFocus: true,
                   width: 120,
                   height: 16,
                   margin: [ 4, 0 ] });
      button.add(new qx.ui.form.ListItem(""));
      
      var entries = ["Tahoma", "Verdana", "Times New Roman", "Arial", 
                     "Arial Black", "Courier New", "Courier", "Georgia",
                     "Impact", "Comic Sans MS", "Lucida Console" ];

      for (var i=0, j=entries.length;i<j;i++)
      {
        entry = new qx.ui.form.ListItem(entries[i]);
        entry.set({ focusable : false, 
                    keepFocus : true,
                    font: qx.bom.Font.fromString("12px " + entries[i]) });
        button.add(entry);
      }
      
      button.addListener("changeSelection", function(e)
      {
        var value = e.getData()[0].getLabel();
        if (value != "") {
          this.setFontFamily(value);
          button.setSelection([ button.getChildren()[0] ]);
        }
      }, this.__htmlArea);
      
      return button;
    }, 
      
    __fontSizeToolbarEntry : function()
    {
      var button = new qx.ui.form.SelectBox;
      button.set({ toolTipText: "Change Font Size",
                   focusable: false,
                   keepFocus: true,
                   width: 50,
                   height: 16,
                   margin: [ 4, 0 ] });
      button.add(new qx.ui.form.ListItem(""));
      
      var entry;
      for (var i=1;i<=7;i++)
      {
        entry = new qx.ui.form.ListItem(i+"");
        entry.set({ focusable : false, 
                    keepFocus : true });
        button.add(entry);
      }
      
      button.addListener("changeSelection", function(e)
      {
        var value = e.getData()[0].getLabel();
        if (value != "") {
          this.setFontSize(value);
          button.setSelection([ button.getChildren()[0] ]);
        }
      }, this.__htmlArea);
      
      return button;
    },
      
    __getToolbarEntries : function()
    {
      return [
        {
          bold:                { text: "Format Bold", image: "qx/icon/Oxygen/16/actions/format-text-bold.png", action: this.__htmlArea.setBold },
          italic:              { text: "Format Italic", image: "qx/icon/Oxygen/16/actions/format-text-italic.png", action: this.__htmlArea.setItalic },
          underline:           { text: "Format Underline", image: "qx/icon/Oxygen/16/actions/format-text-underline.png", action: this.__htmlArea.setUnderline },
          strikethrough:       { text: "Format Strikethrough", image: "qx/icon/Oxygen/16/actions/format-text-strikethrough.png", action: this.__htmlArea.setStrikeThrough },
          removeFormat:        { text: "Remove Format", image: "qx/icon/Oxygen/16/actions/edit-clear.png", action: this.__htmlArea.removeFormat }
        },
        
        {
          alignLeft:           { text: "Align Left", image: "qx/icon/Oxygen/16/actions/format-justify-left.png", action: this.__htmlArea.setJustifyLeft },
          alignCenter:         { text: "Align Center", image: "qx/icon/Oxygen/16/actions/format-justify-center.png", action: this.__htmlArea.setJustifyCenter },
          alignRight:          { text: "Align Right", image: "qx/icon/Oxygen/16/actions/format-justify-right.png", action: this.__htmlArea.setJustifyRight },
          alignJustify:        { text: "Align Justify", image: "qx/icon/Oxygen/16/actions/format-justify-fill.png", action: this.__htmlArea.setJustifyFull }
        },
        
        {
          fontFamily:          { custom: this.__fontFamilyToolbarEntry },
          fontSize:            { custom: this.__fontSizeToolbarEntry },
          fontColor:           { text: "Set Text Color", image:  "qx/icon/Oxygen/16/actions/format-text-color.png", action: this.__fontColorHandler },
          textBackgroundColor: { text: "Set Text Background Color", image:  "qx/icon/Oxygen/16/actions/format-fill-color.png", action: this.__textBackgroundColorHandler }
        },
  
        {
          indent:              { text: "Indent More", image: "qx/icon/Oxygen/16/actions/format-indent-more.png", action: this.__htmlArea.insertIndent },
          outdent:             { text: "Indent Less", image: "qx/icon/Oxygen/16/actions/format-indent-less.png", action: this.__htmlArea.insertOutdent }
        },
  
  
        {
          insertImage:         { text: "Insert Image", image: "qx/icon/Oxygen/16/actions/insert-image.png", action: this.__insertImageHandler },
          insertTable:         { text: "Insert Table", image: "qx/icon/Oxygen/16/actions/insert-table.png", action: this.__insertTableHandler },
          insertLink:          { text: "Insert Link", image: "qx/icon/Oxygen/16/actions/insert-link.png", action: this.__insertLinkHandler },
          insertHTML:          { text: "Insert HTML Code", image: "qx/icon/Oxygen/16/actions/insert-text.png", action: this.__insertHTMLHandler },
          insertHR:            { text: "Insert Horizontal Ruler", image: "qx/icon/Oxygen/16/actions/insert-horizontal-rule.png", action: this.__htmlArea.insertHorizontalRuler }
        },
        
        {
          ol:                  { text: "Insert Ordered List", image: "qx/icon/Oxygen/16/actions/format-list-ordered.png", action: this.__htmlArea.insertOrderedList },
          ul:                  { text: "Inserted Unordered List", image: "qx/icon/Oxygen/16/actions/format-list-unordered.png", action: this.__htmlArea.insertUnorderedList }
        },
        
        {
          undo:                { text: "Undo Last Change", image: "qx/icon/Oxygen/16/actions/edit-undo.png", action: this.__htmlArea.undo },
          redo:                { text: "Redo Last Undo Step", image: "qx/icon/Oxygen/16/actions/edit-redo.png", action: this.__htmlArea.redo }
        }
      ];
    },
      
      
    __setupToolbar : function()
    {  
      var toolbar = new qx.ui.toolbar.ToolBar;
      toolbar.setDecorator("main");
      
      // Put together toolbar entries
      var button;
      var toolbarEntries = this.__getToolbarEntries();
      for (var i=0, j=toolbarEntries.length; i<j; i++)
      {
        var part = new qx.ui.toolbar.Part;
        toolbar.add(part);
        
        for (var entry in toolbarEntries[i])
        {
          var infos = toolbarEntries[i][entry];
          
          if(infos.custom) {
            button = infos.custom.call(this);
          }
          else 
          {
            button = new qx.ui.toolbar.Button(null, infos.image);
            button.set({ focusable : false, 
                         keepFocus : true,
                         center : true,
                         toolTipText : infos.text ? infos.text : "" });
            button.addListener("execute", infos.action, this.__htmlArea);
          }
          part.add(button);
        }        
      }
      
      return toolbar;
    }      
  }
  
});