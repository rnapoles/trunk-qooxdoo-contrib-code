/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (swerner)
     * Fabian Jakobs (fjakobs)
     
   ======================================================================

   This class uses ideas and code snipplets presented at
   http://webreflection.blogspot.com/2008/05/habemus-array-unlocked-length-in-ie8.html
   http://webreflection.blogspot.com/2008/05/stack-and-arrayobject-how-to-create.html
   
   Author:
     Andrea Giammarchi
       
   License:
     MIT: http://www.opensource.org/licenses/mit-license.php     
       
************************************************************************ */


(function(Function, slice, push){
// from WebReflection: Subclassed String
function String(String){
    if(arguments.length) // clever constructor, accepts more than a string as argument
        push.apply(this, slice.call(arguments).join("").split(""));
};
String.prototype = new Function;
try{
    (new String) + "";  // exception in FireFox
    var join = Array.prototype.join;
    String.prototype.toString = String.prototype.valueOf = function(){
        return join.call(this, "");
    };
}catch(e){              // no way to retrieve the length with FireFox
    String.prototype.toString = String.prototype.valueOf = function(){
        for(var Array = [], i = 0; Array[i] = this[i]; i++);
        return Array.join("");
    };
};
window.Uberstring = String; // let's put this in a namespace
})(String, Array.prototype.slice, Array.prototype.push);