/* ************************************************************************

   Copyright:
     2010  Marc Puts

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Marc Puts (marcputs)

************************************************************************ */

/**
 * Provides easy access to the 'title' and 'desc' elements that can be set
 * on every svg element.
 */
qx.Mixin.define("svg.attributes.MTitleDescription",
{
  members :
  {
    __titleElement : null,
    __descElement : null,


    /**
     * Sets the SVG element's title.
     *
     * @param value {String} value to set
     * @return {void}
     */
    setTitle : function(value)
    {
      if (null == this.__titleElement) {
        this.add(this.__titleElement = new svg.core.Title(value));
      } else {
        this.__titleElement.setValue(value);
      }
    },


    /**
     * Gets the SVG element's title.
     *
     * @return {String} TODOC
     */
    getTitle : function()
    {
      if (null == this.__titleElement) {
        return null;
      } else {
        return this.__titleElement.getValue();
      }
    },


    /**
     * Sets the SVG element's description.
     *
     * @param value {String} value to set
     * @return {void}
     */
    setDescription : function(value)
    {
      if (null == this.__descElement) {
        this.add(this.__descElement = new svg.core.Desc(value));
      } else {
        this.__descElement.setValue(value);
      }
    },


    /**
     * Gets the SVG element's description.
     *
     * @return {String} TODOC
     */
    getDescription : function()
    {
      if (null == this.__descElement) {
        return null;
      } else {
        return this.__descElement.getValue();
      }
    }
  },

  destruct : function() {
    this._disposeObjects("__titleElement", "__descElement");
  }
});