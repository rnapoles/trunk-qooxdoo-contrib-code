/* ************************************************************************

   qooxdoo - the new era of web development
   http://qooxdoo.org

   Copyright:
     2008 CELCAT, http://www.celcat.com

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Wayne Si


************************************************************************ */

/**
 * TileView Controller
 * Similar to the windows list view when displaying tiles
 *
 * Note: Currently only compatible with qooxdoo qx.data.controller.List rev 17723 and qx.data.controller.MSelection rev 17730
 *
 */

qx.Class.define("tileview.controller.TileView",
{
  extend : qx.data.controller.List,
  
  construct : function(model, target, labelPath)
  {
    this.base(arguments, model, target, labelPath);
    
    // The delegate property is not good enough as it checks qx.core.Object rather than native Object. 
    // Then it limits the simplification of coding. I hope I can use ...
    // this.setDelegate({configureItem : function(item){item.setRich(true)}});
  },
  
  properties :
  {
    descriptionPath : 
    {
      check: "String",
      apply: "_applyLabelPath",
      nullable: true
    },

    descriptionOptions :
    {
      apply: "_applyLabelOptions",
      nullable: true
    },

    statusPath :
    {
      check: "String",
      apply: "_applyLabelPath",
      nullable: true
    },

    statusOptions :
    {
      apply: "_applyLabelOptions",
      nullable: true
    }
  },

  members :
  {  
    _createItem : function()
    {
      var item = new tileview.TileViewItem();
      // This should be set using delegate property. However the property is not good enough as it 
      // checks qx.core.Object rather than native Object. Then it limits the simplification of coding.
      item.setRich(true);
      
      var delegate = this.getDelegate();
      // check if a delegate is set and if the configure function is available
      if (delegate != null && delegate.configureItem != null) 
      {
        delegate.configureItem(item);
      }
      
      return item;      
    },
    
    _bindListItem: function(listItem, index) 
    {
      this.base(arguments, listItem, index);

      var options = null;
      
      // if the descriptionPath is set
      if (this.getDescriptionPath() != null) 
      {
        // create the options for the description path
        options = qx.lang.Object.copy(this.getDescriptionOptions());
        if (options != null) 
        {
          this.__onSetOkDescription = options.onSetOk;
          delete options.onSetOk;
        } 
        else 
        {
          options = {};
          this.__onSetOkDescription = null;
        }
        options.onSetOk =  qx.lang.Function.bind(this._onBindingSet, this, index);
        
        // build up the path for the binding
        bindPath = "model[" + index + "]";
        if (this.getDescriptionPath() != null) 
        {
          bindPath += "." + this.getDescriptionPath();
        }
        // create the binding
        id = this.bind(bindPath, listItem, "description", options);
        // save the binding id
        listItem.setUserData("descriptionBindingId", id);
      }
      
      // if the statusPath is set
      if (this.getStatusPath() != null) 
      {
        // create the options for the description path
        options = qx.lang.Object.copy(this.getStatusOptions());
        if (options != null) 
        {
          this.__onSetOkStatus = options.onSetOk;
          delete options.onSetOk;
        } 
        else 
        {
          options = {};
          this.__onSetOkStatus = null;
        }
        options.onSetOk =  qx.lang.Function.bind(this._onBindingSet, this, index);
        
        // build up the path for the binding
        bindPath = "model[" + index + "]";
        if (this.getStatusPath() != null) 
        {
          bindPath += "." + this.getStatusPath();
        }
        // create the binding
        id = this.bind(bindPath, listItem, "status", options);
        // save the binding id
        listItem.setUserData("statusBindingId", id);
      }
    },  
    
    _onBindingSet: function(index, sourceObject, targetObject) 
    {
      // check for the users onSetOk for the description binding
      if (this.__onSetOkDescription != null) 
      {
        this.__onSetOkDescription();
      }
      
      // check for the users onSetOk for the status binding
      if (this.__onSetOkStatus != null) 
      {
        this.__onSetOkStatus();
      }        
      
      this.base(arguments, index, sourceObject, targetObject);
    },
    
    _removeBindingsFrom: function(item) 
    {
      var id = item.getUserData("descriptionBindingId");
      
      // of a description binding exists
      if (id)
      {
        // remove the binding
        this.removeBinding(id);
      }
      
      id = item.getUserData("statusBindingId");
      // of a status binding exists
      if (id) 
      {
        // remove the icon binding
        this.removeBinding(id);
      }
      
      this.base(arguments, item);
    }
  }
});
