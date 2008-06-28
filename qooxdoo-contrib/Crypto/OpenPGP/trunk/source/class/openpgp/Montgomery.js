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
 * Montgomery reduction
 */

qx.Class.define("openpgp.Montgomery",
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
	this.mp = m.invDigit();
	this.mpl = this.mp&0x7fff;
	this.mph = this.mp>>15;
	this.um = (1<<(m.DB-15))-1;
	this.mt2 = 2*m.t;
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
	// xR mod m
	convert : function(x) {
	  var r = x.nbi();
	  x.abs().dlShiftTo(this.m.t,r);
	  r.divRemTo(this.m,null,r);
	  if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
	  return r;
	},
	
	// x/R mod m
	revert : function (x) {
	  var r = x.nbi();
	  x.copyTo(r);
	  this.reduce(r);
	  return r;
	},
	
	// x = x/R mod m (HAC 14.32)
	reduce : function(x) {
	  while(x.t <= this.mt2)	// pad x so am has enough room later
	    x[x.t++] = 0;
	  for(var i = 0; i < this.m.t; ++i) {
	    // faster way of calculating u0 = x[i]*mp mod DV
	    var j = x[i]&0x7fff;
	    var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
	    // use am to combine the multiply-shift-add into one call
	    j = i+this.m.t;
	    x[j] += this.m.am(0,u0,x,i,0,this.m.t);
	    // propagate carry
	    while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
	  }
	  x.clamp();
	  x.drShiftTo(this.m.t,x);
	  if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
	},
	
	// r = "x^2/R mod m"; x != r
	sqrTo : function(x,r) { x.squareTo(r); this.reduce(r); },
	
	// r = "xy/R mod m"; x,y != r
	mulTo: function(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  }
});


