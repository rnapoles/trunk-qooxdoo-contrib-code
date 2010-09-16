/* ************************************************************************

   Copyright:
     2010 Guilherme R. Aiolfi

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors: Guilherme R. Aiolfi (guilhermeaiolfi)

************************************************************************ */

qx.Theme.define("tokenfield.theme.classic.Appearance", 
{ 
	extend      : qx.theme.classic.Appearance,
	appearances : 
	{
    'token' : 'combobox',

    'tokenitem' :
    {
      include : 'listitem',

      style : function(states)
      {
        return {
          decorator : 'main',
          textColor : states.hovered ? '#314a6e' : states.head? "text-selected" : '#000000',
          height    : 18,
          padding   : [0, 5, 0, 5],
          margin    : [1, 0, 1, 1],
          backgroundColor : states.head? "background-selected" : undefined,
          icon      : "decoration/window/close.gif"
        };
      }
    }
  }
});