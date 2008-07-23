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
   
	 OpenPGP public key extraction 
	 http://www.hanewin.net/encrypt/PGpubkey.js
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
 * OpenPGP Public Key Extraction
 */
qx.Class.define("openpgp.PGpubkey",
{
  extend : qx.core.Object,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(publicKeyBlock)
  {
    this.base(arguments);
    this.processPubKeyBlock(publicKeyBlock);
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
	vers : '',
    fp : '',
    keyid : '',
    user : '',
    pkey : '',
    type: '',

    processPubKeyBlock : function(text)
	{
	  var s2hex = function(s)
	  {
		var result = '';
		for(var i=0; i<s.length; i++)
		{
		  var c = s.charCodeAt(i);
		  result += ((c<16) ? "0" : "") + c.toString(16);
		}
		return result;
	  }
    
	  var found = 0;
	  var i= text.indexOf('-----BEGIN PGP PUBLIC KEY BLOCK-----');
	
	  if(i == -1)
	  {
	    alert('No PGP Public Key Block');
	    this.vers = '';
	    this.fp = '';
	    this.keyid = '';
	    this.user = '';
	    this.pkey = '';
	    return;
	  }
	 
	  var a=text.indexOf('\n',i);
	  if(a>0) a = text.indexOf('\n', a+1);
	
	  var e=text.indexOf('\n=',i); 
	  if(a>0 && e>0) text = text.slice(a+2,e); 
	  else
	  {
	    alert('Invalid PGP Public Key Block');
	    this.vers = '';
	    this.fp = '';
	    this.keyid = '';
	    this.user = '';
	    this.pkey = '';
	    return;
	  }
	  var s=openpgp.base64.r2s(text);

	  for(var i=0; i < s.length;)
	  {
	    var tag = s.charCodeAt(i++);
	
	    if((tag&128) == 0) break;
	
	    if(tag&64)
	    {
	      tag&=63;
	      var len=s.charCodeAt(i++);
	      if(len >191 && len <224) len=((len-192)<<8) + s.charCodeAt(i++);
	      else if(len==255) len = (s.charCodeAt(i++)<<24) + (s.charCodeAt(i++)<<16) + (s.charCodeAt(i++)<<8) + s.charCodeAt(i++);
	      else if(len>223 &&len<255) len = (1<<(len&0x1f)); 
	    }
	    else
	    {
	      var len = tag&3;
	      tag = (tag>>2)&15;
	      if(len==0) len = s.charCodeAt(i++);
	      else if(len==1) len = (s.charCodeAt(i++)<<8) + s.charCodeAt(i++);
	      else if(len==2) len = (s.charCodeAt(i++)<<24) + (s.charCodeAt(i++)<<16) + (s.charCodeAt(i++)<<8) + s.charCodeAt(i++);
	      else len = s.length-1;
	    }
	
	    if(tag==6 || tag==14)  //  public key/subkey packet
	    {
	      var k = i;
	      var vers=s.charCodeAt(i++);
	
	      found = 1;
	      this.vers=vers;

	      var time=(s.charCodeAt(i++)<<24) + (s.charCodeAt(i++)<<16) + (s.charCodeAt(i++)<<8) + s.charCodeAt(i++);
	      
	      if(vers==2 || vers==3) var valid=s.charCodeAt(i++)<<8 + s.charCodeAt(i++);
	
	      var algo=s.charCodeAt(i++);
	
	      if(algo == 1 || algo == 2)
	      {
	        var m = i;
	        var lm = Math.floor((s.charCodeAt(i)*256 + s.charCodeAt(i+1)+7)/8);
	        i+=lm+2;
	
	        var mod = s.substr(m,lm+2);
	        var le = Math.floor((s.charCodeAt(i)*256 + s.charCodeAt(i+1)+7)/8);
	        i+=le+2;
	
	        this.pkey=s2r(s.substr(m,lm+le+4));
	        this.type="RSA";
	
	        if(vers==3)
	        {
	           this.fp='';
	           this.keyid=s2hex(mod.substr(mod.length-8, 8));
	        }
	        else if(vers==4)
	        {
	          var pkt = String.fromCharCode(0x99) + String.fromCharCode(len>>8) 
	                    + String.fromCharCode(len&255)+s.substr(k, len);
	          var fp = openpgp.sha1.str_sha1(pkt);
	          this.fp=s2hex(fp);
	          this.keyid=s2hex(fp.substr(fp.length-8,8));
	        }
	        else
	        {
	          this.fp='';
	          this.keyid='';
	        }
	        found = 2;
	      }
	      else if((algo == 16 || algo == 20) && vers == 4)
	      {
	        var m = i;
	
	        var lp = Math.floor((s.charCodeAt(i)*256 + s.charCodeAt(i+1)+7)/8);
	        i+=lp+2;
	
	        var lg = Math.floor((s.charCodeAt(i)*256 + s.charCodeAt(i+1)+7)/8);
	        i+=lg+2;
	
	        var ly = Math.floor((s.charCodeAt(i)*256 + s.charCodeAt(i+1)+7)/8);
	        i+=ly+2;
	
	        this.pkey=openpgp.base64.s2r(s.substr(m,lp+lg+ly+6));
	
	        var pkt = String.fromCharCode(0x99) + String.fromCharCode(len>>8) 
	                    + String.fromCharCode(len&255)+s.substr(k, len);
	        var fp = openpgp.sha1.str_sha1(pkt);
	        this.fp=s2hex(fp);
	        this.keyid=s2hex(fp.substr(fp.length-8,8));
	        this.type="ELGAMAL";
	        found = 3;
	      } 
	      else
	      {
	        i = k + len;
	      }
	    }
	    else if(tag==13)   // user id
	    {
	      this.user=s.substr(i,len);
	      i+=len;
	    }
	    else
	    {
	      i+=len;
	    }
	  }
	  if(found < 2)
	  {  
	      this.vers = '';
	      this.fp = '';
	      this.keyid = '';
	      if(found == 0)
	          this.user = "No public key packet found."; 
	      else if(found == 1)
	      {
	          this.user = "public key algorithm is " + algo + " not RSA or ELGAMAL.";
	      }
	      this.pkey = "";
	  }
	}
  }
});
