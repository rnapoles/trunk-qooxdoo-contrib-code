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
   
	 OpenPGP radix-64/base64 string encoding/decoding
	 http://www.hanewin.net/encrypt/base64.js
	 Version 1.0, check www.haneWIN.de for the latest version
	   
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

************************************************************************ */

/**
 * OpenPGP radix-64/base64 string encoding/decoding
 */
qx.Class.define("openpgp.base64",
{
  statics : 
  {
	b64s : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

	s2r : function(t)
	{
	 var a, c, n;
	 var r='', l=0, s=0;
	 var tl=t.length;
	
	 for(n=0; n<tl; n++)
	 {
	  c=t.charCodeAt(n);
	  if(s == 0)
	  {
	   r+=this.b64s.charAt((c>>2)&63);
	   a=(c&3)<<4;
	  }
	  else if(s==1)
	  {
	   r+=this.b64s.charAt((a|(c>>4)&15));
	   a=(c&15)<<2;
	  }
	  else if(s==2)
	  {
	   r+=this.b64s.charAt(a|((c>>6)&3));
	   l+=1;
	   if((l%60)==0) r+="\n";
	   r+=this.b64s.charAt(c&63);
	  }
	  l+=1;
	  if((l%60)==0) r+="\n";
	
	  s+=1;
	  if(s==3) s=0;  
	 }
	 if(s>0)
	 {
	  r+=this.b64s.charAt(a);
	  l+=1;
	  if((l%60)==0) r+="\n";
	  r+='=';
	  l+=1;
	 }
	 if(s==1)
	 {
	  if((l%60)==0) r+="\n";
	  r+='=';
	 }
	
	 return r;
	},
	
	r2s : function(t)
	{
	 var c, n;
	 var r='', s=0, a=0;
	 var tl=t.length;
	
	 for(n=0; n<tl; n++)
	 {
	  c=this.b64s.indexOf(t.charAt(n));
	  if(c >= 0)
	  {
	   if(s) r+=String.fromCharCode(a | (c>>(6-s))&255);
	   s=(s+2)&7;
	   a=(c<<s)&255;
	  }
	 }
	 return r;
	}
  }
});