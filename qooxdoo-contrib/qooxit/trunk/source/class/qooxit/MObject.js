/* ************************************************************************

   Copyright:
     2009 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman (derrell)

************************************************************************ */

/**
 * Mixin to add a bindTo method to qx.core.Object
 */
qx.Mixin.define("qooxit.MObject",
{
  members :
  {
    /**
     * Bind a function to this object
     *
     * @param func {Function}
     *   The function to be bound
     *
     * @param varargs {Any?}
     *   Optional arguments to be passed to the function.
     *
     * @return {Function}
     *   A wrapped version of the function that binds 'this' to the
     *   user-provided function.
     */
    bindTo : function(func, varargs)
    {
      return qx.lang.Function.create(
        func,
        {
          self  : this,
          args  : (arguments.length > 1
                   ? qx.lang.Array.fromArguments(arguments, 1) :
                   null)
        });
    }
  }
});
