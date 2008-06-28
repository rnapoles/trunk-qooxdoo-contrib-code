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
   
	 OpenPGP encryption using RSA/AES
	 http://www.hanewin.net/encrypt/PGencode.js
	 Version 2.0, check www.haneWIN.de for the latest version
	   
	 Copyright:	
       2005-2006 Herbert Hanewinkel, www.haneWIN.de
	
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
 * OpenPGP encryption using RSA/AES
 */
qx.Class.define("openpgp.Encoder",
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
	this.setPublicKey(publicKeyBlock);
	this.mouse = new openpgp.mouse();
	this.mouse.eventsCollect();
  	this.rnArray = new Array(256);
	this.rnTimer();
  },


  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */
  statics :
  {
  	encrypt : function(publicKeyBlock, text)
	{
		var encoder = new openpgp.Encoder(publicKeyBlock);
		var pgpMessage = encoder.encrypt(text);
		encoder.destructor();
		return pgpMessage;
	}
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
	/* We need an unpredictable session key of 128 bits ( = 2^128 possible keys).
	 * If we generate the session key with a PRNG from a small seed we get only
	 * a small number of session keys, e.g. 4 bytes seed => 2^32 keys, a brute
	 * force attack could try all 2^32 session keys. 
	 * (see RFC 1750 - Randomness Recommendations for Security.)
	 *
	 * Sources for randomness in Javascript are limited.
	 * We have load, exec time, seed from random(), mouse movement events
	 * and the timing from key press events.
	 * But even here we have restrictions.
	 * - A mailer will add a timestamp to the encrypted message, therefore
	 *   only the msecs from the clock can be seen as unpredictable.
	 * - Because the Windows timer is still based on the old DOS timer,
	 *   the msecs jump under Windows in 18.2 msecs steps.
	 * - Only a few bits from mouse movement event coordinates are unpredictable,
	 *   if the same buttons are clicked on the screen.
	 */
	
	publicKey : null,
	timeoutID : 0,
	rnArray : null,
	rnNext : 0,
	rnRead : 0,
	bm : (1<<28)-1,		// bit mask for base 28 digits
	

	// --------------------------------------
	// GPG CFB symmetric encryption using AES
	
	symAlg : 7,          	// AES=7, AES192=8, AES256=9
	kSize  : [16,24,32],  	// key length in bytes
	bpbl : 16,         		// bytes per data block

	rnTimer : function()
	{
	 var t = this.mouse.timeByte(); // load time
	
	 for(var i=0; i<256; i++)
	 {
	  t ^= this.mouse.randomByte();
	  this.rnArray[(this.rnNext++)&255] ^= t;
	 } 
	 this.timeoutID = window.setTimeout("this.rnTimer",
	 									this.mouse.randomByte()|128);
	},
	
	
	// ----------------------------------------
	
	randomString : function(len, nozero)
	{
	 var r = '';
	 var t = this.mouse.timeByte(); // exec time
	
	 for(var i=0; i<len;)
	 {
	   t ^= this.rnArray[(this.rnRead++)&255]^this.mouse.mouseByte()^this.mouse.keyByte();
	   if(t==0 && nozero) continue;
	   i++;
	
	   r+=String.fromCharCode(t);
	 }
	 return r;
	},
	
	// ----------------------------------------
	
	hex2s : function(hex)
	{
	 var r='';
	 if(hex.length%2) hex+='0';
	
	 for(var i = 0; i<hex.length; i += 2)
	   r += String.fromCharCode(parseInt(hex.slice(i, i+2), 16));
	 return r;
	},
	
	crc24 : function(data)
	{
	 var crc = 0xb704ce;
	
	 for(var n=0; n<data.length;n++)
	 {
	   crc ^=(data.charCodeAt(n)&255)<<16;
	   for(i=0;i<8;i++)
	   {
	    crc<<=1;
	    if(crc & 0x1000000) crc^=0x1864cfb;
	   }       
	 }
	 return String.fromCharCode((crc>>16)&255)
	        +String.fromCharCode((crc>>8)&255)
	        +String.fromCharCode(crc&255);
	},
	
	// -----------------------------------------------------------------
	// conversion functions: BigInteger <-> multi precision integer (mpi)
	// mpi: 2 octets with length in bits + octets in big endian order
	
	mpi2bigInteger : function(s)
	{
		var sn=s.length;
		if(sn < 2)
		{
			alert('string too short, not a MPI');
			return 0;
		}
		
		var len=(sn-2)*8;
		var bits=s.charCodeAt(0)*256+s.charCodeAt(1);
		if(bits > len || bits < len-8) 
		{
			alert('not a MPI, bits='+bits+",len="+len);
			return 0;
		}
		
		return new openpgp.BigInteger(s.substr(2)); 
	},
	
	bigInteger2mpi : function(b)
	{
		var str = b.toMPI();
		var bits = 8*str.length;
		var rr=String.fromCharCode(bits/256)+String.fromCharCode(bits%256);
		return rr + str;
	},
		
	mpi2int : function(s)
	{
	 var r=0, sn=s.length;
	 if(sn < 2)
	 {
	    alert('string too short, not a MPI');
	    return 0;
	 }
	
	 var len=(sn-2)*8;
	 var bits=s.charCodeAt(0)*256+s.charCodeAt(1);
	 if(bits > len || bits < len-8)
	 {
	    alert('not a MPI, bits='+bits+",len="+len);
	    return 0;
	 }
	
	 for(var i=2; i<sn; i++)
	 {
	 	r<<=8;
	 	r+=s.charCodeAt(i);
	 }
	 
	 return r;
	},
		
	GPGencrypt : function (key, text)
	{
	 var bpbl = this.bpbl;
	 var i, n;
	 var len = text.length;
	 var lsk = key.length;
	 var iblock = new Array(bpbl)
	 var rblock = new Array(bpbl);
	 var ct = new Array(bpbl+2);
	 var expandedKey;
	 
	 var ciphertext = '';
	
	 // append zero padding
	 if(len%bpbl)
	 {
	  for(i=(len%bpbl); i<bpbl; i++) text+='\0';
	 }
	 
	 expandedKey = openpgp.AESenc.keyExpansion(key);
	
	 // set up initialisation vector and random byte vector
	 for(i=0; i<bpbl; i++)
	 {
	  iblock[i] = 0;
	  rblock[i] = this.mouse.randomByte();
	 }
	
	 iblock = openpgp.AESenc.AESencrypt(iblock, expandedKey);
	 for(i=0; i<bpbl; i++)
	 {
	  ct[i] = (iblock[i] ^= rblock[i]);
	 }
	
	 iblock = openpgp.AESenc.AESencrypt(iblock, expandedKey);
	 // append check octets
	 ct[bpbl]   = (iblock[0] ^ rblock[bpbl-2]);
	 ct[bpbl+1] = (iblock[1] ^ rblock[bpbl-1]);
	 
	 for(i = 0; i < bpbl+2; i++) ciphertext += String.fromCharCode(ct[i]);
	
	 // resync
	 iblock = ct.slice(2, bpbl+2);
	
	 for(n = 0; n < text.length; n+=bpbl)
	 {
	  iblock = openpgp.AESenc.AESencrypt(iblock, expandedKey);
	  for(i = 0; i < bpbl; i++)
	  {
	   iblock[i] ^= text.charCodeAt(n+i);
	   ciphertext += String.fromCharCode(iblock[i]);
	  }
	 }
	 return ciphertext.substr(0,len+bpbl+2);
	},

	// ------------------------------
	// GPG packet header (old format)
	
	GPGpkt : function(tag, len)
	{
	 if(len>255) tag +=1;
	 var h = String.fromCharCode(tag);
	 if(len>255) h+=String.fromCharCode(len/256);
	 h += String.fromCharCode(len%256);
	 return h;
	},
	
	// ----------------------------------------------
	// GPG public key encrypted session key packet (1)
	
	GPGpkesk : function(keyId, keytyp, symAlgo, sessionkey, pkey)
	{
	 var el = [3,5,9,17,513,1025,2049,4097];
	 var exp;
	 var enc='';
	 
	 var s = openpgp.base64.r2s(pkey);
	 var l = Math.floor((s.charCodeAt(0)*256 + s.charCodeAt(1)+7)/8);
	 var mod = this.mpi2bigInteger(s.substr(0,l+2));
	 if(keytyp)
	 {
	  var l2 = Math.floor((s.charCodeAt(l+2)*256 + s.charCodeAt(l+3)+7)/8)+2;
	
	  var grp = this.mpi2bigInteger(s.substr(l+2,l2));  
	  var y   = this.mpi2bigInteger(s.substr(l+2+l2));
	  var randomByte = this.mouse.randomByte();  
	  exp = el[randomByte&7];
	  	  
	  var B = grp.modPowInt(exp, mod);
	  var C = y.modPowInt(exp, mod);
	 }
	 else
	 {
	 	exp = this.mpi2int(s.substr(l+2))
	 }
	
	 var lsk = sessionkey.length;
	
	 // calculate checksum of session key
	 var c = 0;
	 for(var i = 0; i < lsk; i++) c += sessionkey.charCodeAt(i);
	 c &= 0xffff;
	
	 // create MPI from session key using PKCS-1 block type 02
	 var lm = (l-2)*8+2;
	 var m = String.fromCharCode(lm/256)+String.fromCharCode(lm%256)
	   +String.fromCharCode(2)         // skip leading 0 for MPI
	   +this.randomString(l-lsk-6,1)+'\0'   // add random padding (non-zero)
	   +String.fromCharCode(symAlgo)+sessionkey
	   +String.fromCharCode(c/256)+String.fromCharCode(c&255);
	
	 if(keytyp)
	 {
	  // add Elgamal encrypted mpi values
	  var mC = C.nbi();
	  C.multiplyTo(this.mpi2bigInteger(m),mC);
	  enc = this.bigInteger2mpi(B)+this.bigInteger2mpi(mC.mod(mod));
	  return this.GPGpkt(0x84,enc.length+10)
	   +String.fromCharCode(3)+keyId+String.fromCharCode(16)+enc;
	 }
	 else
	 {
	  // rsa encrypt the result and convert into mpi
	  enc = this.bigInteger2mpi(mpi2bigInteger(m).modPowInt(exp, mod));
	  return this.GPGpkt(0x84,enc.length+10)
	   +String.fromCharCode(3)+keyId+String.fromCharCode(1)+enc;
	 }
	},
		
	// ------------------------------------------
	// GPG literal data packet (11) for text file
	
	GPGld : function (text)
	{
	 if(text.indexOf('\r\n') == -1)
	   text = text.replace(/\n/g,'\r\n');
	 return this.GPGpkt(0xAC,text.length+10)+'t'
	   +String.fromCharCode(4)+'file\0\0\0\0'+text;
	},
	
	// -------------------------------------------
	// GPG symmetrically encrypted data packet (9)
	
	GPGsed : function(key, text)
	{
	 var enc = this.GPGencrypt(key, this.GPGld(text));
	 return this.GPGpkt(0xA4,enc.length)+enc;
	},
	
	// ------------------------------------------------
	
	doEncrypt : function(keyId,keytyp,pkey,text)
	{
	 var symAlg = this.symAlg;
	 var keylen = this.kSize[symAlg-7];  // session key length in bytes
	
	 var sesskey = this.randomString(keylen,0);
	 keyId = this.hex2s(keyId);
	 
	 var cp = this.GPGpkesk(keyId,keytyp,symAlg,sesskey,pkey)+this.GPGsed(sesskey,text);
	
	 return '-----BEGIN PGP MESSAGE-----\nVersion: qooxdoo.org OpenPGP v0.1\n\n'
	        +openpgp.base64.s2r(cp)+'\n='+openpgp.base64.s2r(this.crc24(cp))+'\n-----END PGP MESSAGE-----\n';
	},
  
  	encrypt : function(text)
  	{
		var pubKey = this.publicKey;
		return this.doEncrypt(pubKey.keyid, pubKey.type, pubKey.pkey, text);
  	},
	
	// key may be PGP public key block or PGpubkey object
	setPublicKey : function(key)
	{
		if ("string" == typeof key) {
			this.publicKey = new openpgp.PGpubkey(key);
		} else {
			this.publicKey = key;
		}
	},
	
	getPublicKey : function()
	{
		return this.publicKey;
	},
	
	destructor : function()
	{
		window.clearTimeout(this.timeoutID);
		this.mouse.destructor();
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