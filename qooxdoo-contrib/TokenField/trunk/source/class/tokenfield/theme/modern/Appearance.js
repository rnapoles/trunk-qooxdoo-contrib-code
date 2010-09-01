/* ************************************************************************

   Copyright:
     2010 Guilherme R. Aiolfi
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors: Guilherme R. Aiolfi (gradinf AT gmail DOT com)

************************************************************************ */

qx.Theme.define("tokenfield.demo.theme.Appearance",
{
  extend      : qx.theme.modern.Appearance,
  appearances : 
  {
		'token' : 'combobox',
	
	  'tokenitem' :
	  {
	    include : 'listitem',
	
	    style : function(states)
	    {
	      return {
	        decorator : 'group',
	        textColor : states.hovered ? '#314a6e' : '#000000',
	        height    : 18,
	        padding   : [ 1, 6, 1, 6 ],
	        margin    : 0,
	        icon      : states.close ? "decoration/window/close-active.png" : "decoration/window/close-inactive.png"
	      };
	    }
	  }
	}
});