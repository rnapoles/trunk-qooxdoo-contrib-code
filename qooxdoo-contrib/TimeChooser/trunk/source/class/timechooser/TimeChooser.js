/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2008 Derrell Lipman

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Derrell Lipman

************************************************************************ */

/**
 * A Spinner that allows selection of "AM" and "PM" (in the appropriate locale)
 */
qx.Class.define("timechooser.TimeChooser",
{
  extend : qx.ui.container.Composite,

  construct : function(value)
  {
    this.base(arguments, new qx.ui.layout.HBox(4));

    this.__hours = new timechooser.spinner.TimeValue();
    this.add(this.__hours);

    var label = new qx.ui.basic.Label("<b>:</b>");
    label.setRich(true);
    this.add(label);
    
    this.__minutes = new timechooser.spinner.TimeValue();
    this.add(this.__minutes);

    var label = new qx.ui.basic.Label("<b>:</b>");
    label.setRich(true);
    this.add(label);
    
    this.__seconds = new timechooser.spinner.TimeValue();
    this.add(this.__seconds);

    this.__ampm = new timechooser.spinner.AmPm(this.tr("PM"));
    this.add(this.__ampm);
  },

  members :
  {
    __hours   : null,
    __minutes : null,
    __seconds : null,
    __ampm    : null
  }
});
