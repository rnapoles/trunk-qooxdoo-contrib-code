/** 
 * SubSubInterface
 */
qx.Interface.define("bug2169.ISubSubInterface",
{
  extend : bug2169.ISubInterface,
  
  members :
  {
    /**
     * Sub sub interface: Do something really cool.
     */
    subSubMethod : function() {
      return true;
    }
  }
});