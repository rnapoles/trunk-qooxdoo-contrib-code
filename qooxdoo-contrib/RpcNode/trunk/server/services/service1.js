/* ************************************************************************

   JSON-RPC 1.0 and 2.0 implementation running on node.js
   
   Copyright:
     2010 The autors
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (original implementation)
     * Christian Boulanger (port to qooxdoo-contrib & to qooxdoo-rpc )

************************************************************************ */

var 
  sys = require('sys'),
  fs  = require('../lib/fs-promise');  // Async filesystem operations;
 
/**
 * RPC-Methods
 */ 
 
this.echo = function(a) {
  return a;
}

this.add = function(a, b) {
  return a + b;
}

this.note = function(a, b) {
  sys.debug("notification " + a + " - " + b);
}

// async call
this.ls = function() {
  return sys.exec("ls .");
}

// async call
this.pwd = function() {
  return sys.exec("pwd");
}