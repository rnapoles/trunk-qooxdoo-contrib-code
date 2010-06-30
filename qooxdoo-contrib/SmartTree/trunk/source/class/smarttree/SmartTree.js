/* ************************************************************************

   Copyright:
     (c) 2010 Derrell Lipman <derrell.lipman@unwireduniverse.com>,
     (c) 2010 David Baggett
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman

#asset(smarttree/*)
************************************************************************ */

/**
 * An extension to TreeVirtual that provides many "smart" features such as
 * sorting and filtering based on more than one column.
 */
qx.Class.define("smarttree.SmartTree",
{
  extend : qx.ui.treevirtual.TreeVirtual,


  /**
   * Constructor for the SmartTree.
   * 
   * @param headings {Array | String}
   *   An array containing a list of strings, one for each column, representing
   *   the headings for each column.  As a special case, if only one column is
   *   to exist, the string representing its heading need not be enclosed in an
   *   array.
   *
   * @param custom {Map ? null}
   *   A map provided (typically) by subclasses, to override the various
   *   supplemental classes allocated within this constructor.  For normal
   *   usage, this parameter may be omitted.  Each property must be an object
   *   instance or a function which returns an object instance, as indicated by
   *   the defaults listed here:
   *
   *   <dl>
   *     <dt>dataModel</dt>
   *       <dd>new smarttree.DataModel()</dd>
   *     <dt>treeDataCellRenderer</dt>
   *       <dd>new qx.ui.treevirtual.SimpleTreeDataCellRenderer()</dd>
   *     <dt>defaultDataCellRenderer</dt>
   *       <dd>new qx.ui.treevirtual.DefaultDataCellRenderer()</dd>
   *     <dt>dataRowRenderer</dt>
   *       <dd>new qx.ui.treevirtual.SimpleTreeDataRowRenderer()</dd>
   *     <dt>selectionManager</dt>
   *       <dd><pre class='javascript'>
   *         function(obj)
   *         {
   *           return new qx.ui.treevirtual.SelectionManager(obj);
   *         }
   *       </pre></dd>
   *     <dt>tableColumnModel</dt>
   *       <dd><pre class='javascript'>
   *         function(obj)
   *         {
   *           return new qx.ui.table.columnmodel.Resize(obj);
   *         }
   *       </pre></dd>
   *   </dl>
   */
  construct : function(headings, custom) 
  {
    this.base(arguments, headings, custom);
  }
});
