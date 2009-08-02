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
     * Christian Boulanger (cboulanger)
     * Martin Wittemann (martinwittemann) 

************************************************************************ */

/**
 * Form renderer renderer for {@link qx.ui.form.Form}. This is a 
 * single row renderer adapted for the qcl.ui.dialog.Form widget. Main
 * difference is that the form allows text-only labels without a corresponding
 * form element which can serve, for example, for explanatory text.
 */
qx.Class.define("qcl.ui.dialog.FormRenderer", 
{
  extend : qx.ui.form.renderer.Single,
  implement : qx.ui.form.renderer.IFormRenderer,

  members :
  {
    _row : 0,
    _buttonRow : null,
    
    /**
     * Add a group of form items with the corresponding names. The names are
     * displayed as label.
     * The title is optional and is used as grouping for the given form 
     * items.
     * 
     * @param items {qx.ui.core.Widget[]} An array of form items to render.
     * @param names {String[]} An array of names for the form items.
     * @param title {String?} A title of the group you are adding.
     */
    addItems : function(items, names, title) {
      // add the header
      if (title != null) {
        this._add(
          this._createHeader(title), {row: this._row, column: 0, colSpan: 2}
        );
        this._row++;
      }
      
      // add the items, which can be form elements or 
      for (var i = 0; i < items.length; i++) {
        if ( names[i] )
        {
          var label = this._createLabel(names[i], items[i]);
          this._add(label, {row: this._row, column: 0});
          this._add(items[i], {row: this._row, column: 1});
        }
        else
        {
          this._add( items[i], {row: this._row, column: 0, colSpan : 2 } ) 
        }
        this._row++;
      }
    }
  }
});