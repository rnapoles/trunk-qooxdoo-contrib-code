/* ************************************************************************

   qooxdoo - the new era of web development
   http://qooxdoo.org

   Copyright:
     2008 CELCAT, http://www.celcat.com

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Matthew Gregory (noggin182)

************************************************************************ */

/**
 * TileViewItem
 * Item for ctweb.ui.comps.TileView, based on (but not derived from) qx.ui.form.ListItem
 */

qx.Class.define("tileview.TileViewItem",
{
  extend : qx.ui.form.ListItem,
  construct : function(label, icon, description, status)
  {
    this.base(arguments, label, icon);

    if (description != null)
    {
      this.setDescription(description);
    }
    if (status != null)
    {
      this.setStatus(status);
    }
  },

  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */
  events :
  {
    "changeDescription" : "qx.event.type.Data",
    "changeStatus" : "qx.event.type.Data"
  },

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "tileviewitem"
    },

    /** The second line of text of the tileview.TileViewItem instance */
    description :
    {
      apply : "_applyDescription",
      nullable : true,
      check : "String",
      event : "changeDescription"
    },

    /** The third line of text of the tileview.TileViewItem instance */
    status :
    {
      apply : "_applyStatus",
      nullable : true,
      check : "String",
      event : "changeStatus"
    }

  },
  members :
  {
    // overridden
    _forwardStates :
    {
      focused : true,
      hovered : true,
      selected : true
    },

    // overridden
    _createChildControlImpl : function(id)
    {
      var control;

      switch(id)
      {
        case "label":
          control = new qx.ui.basic.Label(this.getLabel());
          control.setAnonymous(true);
          control.setRich(this.getRich());
          this.getChildControl("labelcont").addAt(control, 0);
          break;

        case "description":
          control = new qx.ui.basic.Label(this.getDescription());
          control.setAnonymous(true);
          control.setRich(this.getRich());
          this.getChildControl("labelcont").addAt(control, 1);
          break;

        case "status":
          control = new qx.ui.basic.Label(this.getStatus());
          control.setAnonymous(true);
          control.setRich(this.getRich());
          this.getChildControl("labelcont").addAt(control, 2);
          break;

        case "labelcont":
          control = new qx.ui.container.Composite(new qx.ui.layout.VBox(1));
          control.setAnonymous(true);
          this._add(control);
          break;
      }

      return control || this.base(arguments, id);
    },

    /**
     * Updates the visibility of the label
     */
    // overridden
    _handleLabel : function()
    {
      if (this.getShow() === "icon")
      {
        this._excludeChildControl("labelcont");
      }
      else
      {
        this._showChildControl("labelcont");
      }
    },

    // property apply
    _applyRich : function(value)
    {
      this.getChildControl("label").setRich(value);
      this.getChildControl("description").setRich(value);
      this.getChildControl("status").setRich(value);
    },

    // property apply
    _applyGap : function(value)
    {
      this.base(arguments, value);
      this.getChildControl("labelcont").setSpacing(value);
    },

    // property apply
    _applyLabel : function(value)
    {
      this.getChildControl("label").setContent(value);
    },

    // property apply
    _applyDescription : function(value)
    {
      this.getChildControl("description").setContent(value);
    },

    // property apply
    _applyStatus : function(value)
    {
      this.getChildControl("status").setContent(value);
    }

  }  
});
