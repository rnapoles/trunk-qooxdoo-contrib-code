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
   
	 Collect entropy from mouse motion and key press events
	 http://www.hanewin.net/encrypt/mouse.js
	   
	 Copyright:	
       2005 Herbert Hanewinkel, www.haneWIN.de
	
	 License:
       This software is provided as-is, without express or implied warranty.  
       Permission to use, copy, modify, distribute or sell this software, with or
       without fee, for any purpose and by any individual or organization, is hereby
       granted, provided that the above copyright notice and this paragraph appear 
       in all copies. Distribution as a part of an application or binary must
       include the above copyright notice in the documentation and/or other materials
       provided with the application or distribution.
       
     Authors:
       * Herbert Hanewinkel
       * John Walker
       * Nigel Johnstone

************************************************************************ */

/**
 * Collect entropy from mouse motion and key press events
 * Note that this is coded to work with either DOM2 or Internet Explorer
 * style events.
 * We don't use every successive mouse movement event.
 * Instead, we use some bits from random() to determine how many
 * subsequent mouse movements we ignore before capturing the next one.
 * rc4 is used as a mixing function for the captured mouse events.  
 *
 * mouse motion event code originally from John Walker
 * key press timing code thanks to Nigel Johnstone
 */
qx.Class.define("openpgp.mouse",
{
  extend : qx.core.Object,
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
  	this.base(arguments);
	this.keyArray = new Array(256);
	this.mouseArray = new Array(256);
	this.s = new Array(256);
	this.document = qx.ui.core.ClientDocument.getInstance();
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
	keyRead : 0,
	keyNext : 0,
		
	mouseMoveSkip : 0, 		// Delay counter for mouse entropy collection
	mouseRead : 0,
	mouseNext : 0,
		
	x : 0, 
	y : 0,
	
	randomByte : function() { return Math.round(Math.random()*255)&255; },
	timeByte : function() { return ((new Date().getTime())>>>2)&255; },
	
	rc4Init: function()
	{
	 var i, t;
	 var key = new Array(256);
	
	 for(i=0; i<256; i++)
	 {
	  this.s[i]=i;
	  key[i] = this.randomByte()^this.timeByte();
	 }
	
	 this.y=0;
	 for(i=0; i<2; i++)
	 {
	  for(this.x=0; this.x<256; this.x++)
	  {
	   this.y=(key[i] + this.s[this.x] + this.y) % 256;
	   t=this.s[this.x]; this.s[this.x]=this.s[this.y]; this.s[this.y]=t;
	  }
	 }
	 this.x=0;
	 this.y=0;
	},
	
	rc4Next : function(b)
	{
	 var t, x2;
	
	 this.x=(this.x+1) & 255; 
	 this.y=(this.s[this.x] + this.y) & 255;
	 t=this.s[this.x]; this.s[this.x]=this.s[this.y]; this.s[this.y]=t;
	 return (b ^ this.s[(this.s[this.x] + this.s[this.y]) % 256]) & 255; 
	},
	
	// ----------------------------------------
	    
	keyByte : function() { return this.keyArray[(this.keyRead++)%this.keyNext]; },
	
	keyPressEntropy : function(e) {
		this.keyArray[(this.keyNext++)%256] ^= this.timeByte(); 
	},
	
	mouseByte : function() { 
		return this.mouseArray[(this.mouseRead++)%this.mouseNext]; 
	},
	
	mouseMoveEntropy : function(e)
	{
	 var c;
	 if (!e) { e = window.event; }	    // Internet Explorer event model
	
	 if(this.mouseMoveSkip-- <= 0)
	 {
	  c = ((e.screenX << 4) | (e.screenY & 15));
	
	  this.mouseArray[(this.mouseNext++)%256] ^= this.rc4Next(c&255);
	  this.mouseArray[(this.mouseNext++)%256] ^= this.rc4Next(this.timeByte());
	  this.mouseMoveSkip = this.randomByte() & 7;
	 }
	},
	
	// ----------------------------------------
	
	eventsEnd : function()
	{
		this.document.removeEventListener("mousemove", this.mouseMoveEntropy, this);
		this.document.removeEventListener("keypress", this.keyPressEntropy, this);
	},
	
	// Start collection of entropy.
		
	eventsCollect : function()
	{
		this.document.addEventListener("mousemove", this.mouseMoveEntropy, this);
		this.document.addEventListener("keypress", this.keyPressEntropy, this);
		this.rc4Init();
	},
	
	destructor : function()
	{
   		this.eventsEnd();
	}
  },
  
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
 
  destruct : function()
  {
  	this.destructor();
  }

});