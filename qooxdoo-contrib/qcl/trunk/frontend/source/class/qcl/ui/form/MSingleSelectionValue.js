/* ************************************************************************

   qcl - the qooxdoo component library
  
   http://qooxdoo.org/contrib/project/qcl/
  
   Copyright:
     2007-2009 Christian Boulanger
  
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   *  Christian Boulanger (cboulanger)
  
************************************************************************ */


/**
 * A mixin for list-type widgets (List, SelectBox) when using single selection.
 * Having a "value" property greatly simplifies 
 * binding. This assumes that the including widget has been connected to a model
 * through qx.data.controller.List. Ideally, the ListItems contained in the 
 * including widgets should have a "value" property, which would have been set
 * up by the controller together with the 'label' and 'icon' properties, this
 * would greatly simplify things and would not require the model binding. However,
 * (unfortunately), the value property has been deprecated in the framework. 
 */
qx.Mixin.define("qcl.ui.form.MSingleSelectionValue", 
{
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */  
  
  /**
   * Constructor, binds selection to value property
   */
  construct : function()
  {
    this.bind("selection",this,"selectionValue",{
      converter : this._convertSelectionToValue
    });
    
  },
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */  
  
  properties : 
  {    

    /**
     * The value of the (single-selection) List / SelectBox 
     */
    selectionValue : 
    {
      apply: "_applySelectionValue",
      event: "changeSelectionValue",
      init: null,
      nullable: true
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
     * Sets the selection of the widget by examining the "value" property
     * of the bound model item. This relies on undocumented behavior: the 
     * ListItems contain a reference to the bound model item in the 'model'
     * userData property. 
     * 
     * @param value
     * @param old
     * @return
     */
    _applySelectionValue : function( value, old )
    {
      this.getSelectables().forEach( function(item){
        if ( item.getUserData('model') && item.getUserData('model').getValue() == value )
        {
          this.setSelection( [item] );
        }
      },this);
    },
    
    /**
     * Converts a seletion into a value
     * @param selection {Array}
     * @return {String}
     */
    _convertSelectionToValue : function( items )
    {
       if ( items.length )
      {
        if ( items[0].getUserData("model") )
        {
          return items[0].getUserData("model").getValue();
        }
        else
        {
          return null;
        }
      }
    }
  }
});
