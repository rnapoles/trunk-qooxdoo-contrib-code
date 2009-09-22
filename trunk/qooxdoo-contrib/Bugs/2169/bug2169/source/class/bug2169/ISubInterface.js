/** 
 * SubInterface
 */
qx.Interface.define("bug2169.ISubInterface",
{
  extend : bug2169.ISuperInterface,
  
  members :
  {
    /**
     * Sub interface: Do something even more cool.
     */
    subMethod : function() {
      return true;
    }
  }
});