/* ************************************************************************

   Copyright:
     2010 Guilherme R. Aiolfi
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Guilherme R. Aiolfi (gradinf@gmail.com)

************************************************************************ */

/**
 * A class to cache ...
 */
qx.Class.define("tokenfield.SelectionManager",
{
  extend : qx.ui.core.selection.Widget,

  members :
  {
	  handleKeyPress : function(e)
	  {
	  	var key = e.getKeyIdentifier();
	  	if (key != "Left" && key != "Rigth")
	  	{
	  		this.base(arguments);
	  	}
	  }
  }
});