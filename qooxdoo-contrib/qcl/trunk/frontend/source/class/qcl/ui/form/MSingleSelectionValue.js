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
 *  A mixin for list-type widgets (List, SelectBox) that reimplements the removed
 *  "value" property for single-selection form widgets (named "selectedValue").
 *  This assumes that the including widget has been connected to a model through 
 *  qx.data.controller.List and that the loaded model items contain a "value" 
 *  property ( [ { label: "My list item label", value : "myValue" }, ... ] ). 
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
    this.bind("selection",this,"selectedValue",{
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
    selectedValue : 
    {
      apply: "_applySelectedValue",
      event: "changeSelectedValue",
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
     * of the bound model item.
     * 
     * @param value
     * @param old
     * @return
     */
    _applySelectedValue : function( value, old )
    {
      this.getSelectables().forEach( function(item){
        if ( item.getModel() && item.getModel().getValue() == value )
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
        if ( items[0].getModel() )
        {
          return items[0].getModel().getValue();
        }
        else
        {
          return null;
        }
      }
      return null;
    }
  }
});