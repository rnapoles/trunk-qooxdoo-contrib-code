/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Authors:
     * Simon Bull (sbull)

************************************************************************ */

/* ************************************************************************

#module(ui_window)

************************************************************************ */

/*
This class encapsulates a horizontal layout of form fields which are intended
to be displayed as the status bar of a ext.ui.window.Window.

@author sbull
*/

qx.Class.define("ext.ui.window.StatusBar",
{
  extend : qx.ui.layout.HorizontalBoxLayout,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    qx.ui.layout.HorizontalBoxLayout.call(this);

    this.setVerticalChildrenAlign("middle");
    this.setSpacing(5);

    // ************************************************************************
    //   FIELD ALIGNMENT FLEX POINT
    // ************************************************************************
    var flex = this._flex = new qx.ui.basic.HorizontalSpacer;
    flex.setWidth("auto");
    flex.setBackgroundColor("white");
    this.add(flex);

    // ************************************************************************
    //   BUSY STATE FIELD
    // ************************************************************************
    var field = this._field = new qx.ui.form.TextField("Ready");
    field.setAppearance("statusbar-text-field");
    field.setWidth(40);
    field.setReadOnly(true);
    field.setSelectable(false);

    this.add(field);

    // ************************************************************************
    //   RHS SPACER
    // ************************************************************************
    var spacer = this._spacer = new qx.ui.basic.HorizontalSpacer;
    spacer.setWidth(1);
    this.add(spacer);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTIES
    ---------------------------------------------------------------------------
    */

    /*
    A String which should be displayed in this StatusBar's busy state field.
    */

    stateTextValue :
    {
      _legacy    : true,
      type       : "string",
      allowsNull : false
    },

    /*
    A String which is the name of the appearnce that should be applied to this
    StatusBar's busy state field.  This should be either "xfc-statusbar-text-ready"
    or "xfc-statusbar-text-busy".
    */

    stateTextAppearance :
    {
      _legacy    : true,
      type       : "string",
      allowsNull : false
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
      MODIFIERS
    ---------------------------------------------------------------------------
    */

    /*
    Override the default _modifyStateTextValue so that we can update the content of
    the this._sf text field.
    
    @author sbull
    */

    /**
     * TODOC
     *
     * @type member
     * @param vPropValue {var} TODOC
     * @param vPropOldValue {var} TODOC
     * @param vPropData {var} TODOC
     * @return {boolean} TODOC
     */
    _modifyStateTextValue : function(vPropValue, vPropOldValue, vPropData)
    {
      this._field.setValue(vPropValue);

      return true;
    },

    /*
    Override the default _modifyStateTextAppearance so that we can update the
    appearance of the this._sf text field.
    
    @author sbull
    */

    /**
     * TODOC
     *
     * @type member
     * @param vPropValue {var} TODOC
     * @param vPropOldValue {var} TODOC
     * @param vPropData {var} TODOC
     * @return {boolean} TODOC
     */
    _modifyStateTextAppearance : function(vPropValue, vPropOldValue, vPropData)
    {
      this._field.setAppearance(vPropValue);

      return true;
    },




    /*
    ---------------------------------------------------------------------------
      DISPOSER
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @return {boolean | var} TODOC
     */
    dispose : function()
    {
      if (this.getDisposed()) {
        return true;
      }

      if (this._field) {
        this._field.dispose();
      }

      if (this._flex) {
        this._flex.dispose();
      }

      if (this._spacer) {
        this._spacer.dispose();
      }

      return qx.ui.layout.HorizontalBoxLayout.prototype.dispose.call(this);
    }
  }
});
