/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

qx.Class.define("inspector.console.DomView", {
  
  extend : qx.ui.layout.VerticalBoxLayout,  
  implement : inspector.console.IView,
   
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */  
  statics: {
    getHtmlToObject: function(qxObject, shift) {
      var returnString = "";
      for (var key in qxObject) {
        returnString += "<div><table width='100%' style='padding-left: " + shift + "px;'>";
        if (!(qxObject[key] instanceof Object)) {
          returnString += "<tr><td width='18'></td><td width='30%'><b>" + key + "</b></td>";
          returnString += "<td><span style='color: white; background-color: #999999; border: 1px #666666 solid';>" + null + "</span></td></tr>";          
        } else {
          returnString += "<tr>" + 
                            "<td width='18'>" + 
                              "<img src='" + qx.io.Alias.getInstance().resolve("inspector/image/open.gif") + "' style='cursor: pointer;' onclick='" + 
                                "" + 
                              "'>" + 
                            "</td>" + 
                            "<td width='30%'>" + 
                              "<b>" + key + "</b>" + 
                            "</td>";
          returnString += "<td><span style='color: green;'>" + qxObject[key] + "</span></td></tr>";          
        }
        returnString += "</table></div>";
      }
      
    return returnString;
    }
  },   
    
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(console) {    
    this.base(arguments);
    // sorte the reference to the console window
    this._console = console;
    // set the Layout to 100% width
    this.setWidth("100%");
    
    // create the HTML embed
    this._htmlEmbed = new qx.ui.embed.HtmlEmbed();
    this._htmlEmbed.setBackgroundColor("white");
    this._htmlEmbed.setBorder("inset");
    this._htmlEmbed.setOverflow("scrollY");
    this._htmlEmbed.setWidth("100%");
    this._htmlEmbed.setHeight(174);
    this.add(this._htmlEmbed);
    
    this._htmlEmbed.setHtml(inspector.console.DomView.getHtmlToObject(qx));
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
    /*
    *********************************
       ATTRIBUTES
    *********************************
    */
    _console: null,
   
    _htmlEmbed: null,
    
    /*
    *********************************
       PUBLIC
    *********************************
    */  
    /**
     * @internal
     * @return The components of the console.
     */
    getComponents: function() {
      // TODO
    },
    
    setMainElementDeltaHeight: function(delta) {
      this._htmlEmbed.setHeight(this._htmlEmbed.getHeight() + delta);
    },
    
    focus: function() {
      // TODO
    }        
    
    /*
    *********************************
       PROTECTED
    *********************************
    */    

  }     
});