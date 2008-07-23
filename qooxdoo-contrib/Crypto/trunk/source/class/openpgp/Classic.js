/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:	
     2008 Bill Adams, http://mywebserve.com

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details

   Authors:
     * Bill Adams (badams)    
   ________________________________________________________________________

   This class contains code based on the following work:
   
	 Basic JavaScript BN library - subset useful for RSA encryption.
	 http://www-cs-students.stanford.edu/~tjw/jsbn/jsbn.js
	   
	 Copyright:	
       2005 Tom Wu, http://www-cs-students.stanford.edu/~tjw/jsbn/
	
	 License:
       BSD
       
     Authors:
       * Tom Wu

************************************************************************ */

/**
 * Modular reduction using "classic" algorithm
 */
qx.Class.define("openpgp.Classic",
{
  extend : qx.core.Object,
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(m)
  {
  	this.base(arguments);
	this.m = m;
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

	convert : function (x) {
	  if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
	  else return x;
	},
	
	revert : function(x) { return x; },
	reduce : function(x) { x.divRemTo(this.m,null,x); },
	mulTo : function(x,y,r) { x.multiplyTo(y,r); this.reduce(r); },
	sqrTo : function(x,r) { x.squareTo(r); this.reduce(r); }
  }
});
