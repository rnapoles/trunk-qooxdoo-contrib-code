/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

#module(qcl.databinding)

************************************************************************ */

/**
 * An object which serves as a central data provider for several widgets and
 * updates them or the server with changed values.
 * 
 * In case of client update, the server sends a hash map. If the keys correspond
 * to the bindName property of a recipient widget bound to the data provider, the recipient's 
 * setWidgetData() method is called with the value of the key. The result data
 * is also sent as a data event of name "dataReceived" so that event handlers
 * can use the data for whatever end. 
 * 
 * In case of server update, the client sends a hashmap, the keys being the bindName
 * property of the bound widget, and the values being the result of the getWidgetData()
 * method called on each bound widget.
 * 
 * requires the qcl.databinding.simple.MDataManager mixin be included in qx.core.Target
 * 
 */
qx.Class.define("qcl.databinding.simple.DataProvider",
{
  extend : qx.core.Target,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Create a new instance
   *
   * @type constructor
   */
  construct : function()
  {
    this.__boundWidgets = {};
    this.base(arguments);
    this.setDataBinding(true);
    
    // todo: check for qcl.databinding.simple.MDataManager mixin
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTIES
    ---------------------------------------------------------------------------
    */
    
    /** 
     * emulation of onSubmit property of html form element
     */
    onSubmit :
    {
      check : "String",
      init : ""
    },

    /** 
     * emulation of onReset property of html form element
     */
    onReset :
    {
      check : "String",
      init : ""
    },
    
    /**
     * enable or disable bound widgets
     */
     enableBoundWidgets :
     {
       check : "Boolean",
       apply : "_applyEnableBoundWidgets",
       init : true
     }
  },

	
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    
    /**
     * enables or disables bound widgets
     */
    _applyEnableBoundWidgets : function (value, oldValue)
    {
      var widgets = this.getBoundWidgets();
      
      for ( var name in widgets )
      {
        if ( widgets[name].setEnabled )
        {
          widgets[name].setEnabled(value);
        }
      }
    },
    
    /**
     * binds a widget to this data provider
     *
     * @type member
     * @param vWidget {Object} the widget object
     * @param vName {String} optional: the name under which the widget should be bound
     * @return {void}
     */
    bindWidget : function(vWidget,vName)
    {
      var bindName = vName || vWidget.getBindName();
      this.__boundWidgets[bindName] = vWidget;
    },

    /**
     * unbinds a widget from this data provider
     *
     * @type member
     * @param widget {Object} the widget object
     * @return {void}
     */
    unbindWidget : function(widget)
    {
      this.__boundWidgets[widget.getBindName()] = null;
    },


    /**
     * gets a bound widget by its name
     *
     * @type member
     * @param name {String} the name of the widget
     * @return {Object}
     */
    getBoundWidget : function(name)
    {
      return this.__boundWidgets[name];
    },
    
    /**
     * gets the list of bound widgets as hash map
     *
     * @type member
     * @return {Object}
     */
    getBoundWidgets : function()
    {
      return this.__boundWidgets;
    },

    /**
     * gets the data that should be sent to the server
     * overrides the MDataManager method
     *
     * @type member
     * @return {Object}
     */    
    getBoundWidgetsData : function()
    {
      var boundWidgets = this.getBoundWidgets();
      var data={};
      for ( var key in boundWidgets )
      {
        var widget = boundWidgets[key];
        if ( typeof widget == "object" )
        {
          if ( widget.getUpdateTarget() == "client" ) continue;
          data[key] =  widget.getWidgetData();         
        }
      }
      return data;
    },    

    /**
     * handles the data sent from the server to update the local state
     * 
     * @param result {Object}
     * @type member
     * @return {void}
     */    
    populateBoundWidgets : function(result)
    {
      // dispatch event
      if ( typeof result != "object" )
      {
        this.error ("Server result is no hash map: " + result);
      }
      else
      {
        for ( key in result )
        {
          try 
          { 
            var widget = this.getBoundWidget(key);
            if (typeof widget == "object" )
            {
              if ( widget.getUpdateTarget() != "server" ) 
              {
                var value  = result[key];
                widget.setWidgetData(value);  
              }
            }
            else
            {
              this.warn ( "`" + key + "` is not a bound widget");
            }
          } 
          catch(e)
          {
            this.warn (e);
          }
        }
      }
    },

    /**
     * submit forms, emulation of submit method of html form element
     *
     * @type member
     * @return {void}
     */    
    submit : function()
    {
      if (this.getOnSubmit())
      {
        if (!eval(this.getOnSubmit())) return false;
      }
      this.updateServer();
    },   

    /**
     * clears forms
     *
     * @type member
     * @return {void}
     */    
    clear : function()
    {
      var boundWidgets = this.getBoundWidgets();
      for ( var key in boundWidgets )
      {
        boundWidgets[key].clearWidget();
      }
    },
    
    /**
     * resets forms - emulation of reset method of html form element
     *
     * @type member
     * @return {void}
     */    
    reset : function()
    {
      if (this.getOnReset())
      {
        if (!eval(this.getOnReset())) return false;
      }
      this.clear();
    },
    

    /**
     * enables a form 
     * @type member
     * @return {void}
     */    
    enableBoundWidgets : function()
    {
      var boundWidgets = this.getBoundWidgets();
      for ( var key in boundWidgets )
      {
        boundWidgets[key].enable();
      }      
    },
    
    /**
     * disables a form 
     * @type member
     * @return {void}
     */    
    disableBoundWidgets : function()
    {
      var boundWidgets = this.getBoundWidgets();
      for ( var key in boundWidgets )
      {
        boundWidgets[key].disable();
      }      
    }    
  },

  /*
  ****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeFields("__boundWidgets");
  }
});
