/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * The TextField is a multi-line text input field.
 */
qx.Class.define("bug2361.TextArea",
{
  extend : qx.ui.form.TextArea,



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param value {String?""} The text area's initial value
   */
  construct : function(value)
  {
    this.base(arguments, value);
    this.addListener("keyup", this._onkeyup, this);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** Maximal amount of character which can be entered in the TextArea. */
    maxlength :
    {
      check : "Number",
      init : Infinity
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */

    // overridden
    _onkeyup : function(e)
    {
      var value = this.getValue();
      var maxLength = this.getMaxlength();
      if (value.length > maxLength)
      {
        value = value.substr(0, value.length - (value.length-maxLength));
        this.setValue(value);
      }
    }

  }
});
