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
qx.OO.defineClass("ext.ui.window.StatusBar", qx.ui.layout.HorizontalBoxLayout,
function()
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


});


/*
---------------------------------------------------------------------------
  PROPERTIES
---------------------------------------------------------------------------
*/


/*
A String which should be displayed in this StatusBar's busy state field.
*/
qx.OO.addProperty({ name : "stateTextValue", type : "string", allowsNull : false });


/*
A String which is the name of the appearnce that should be applied to this
StatusBar's busy state field.  This should be either "xfc-statusbar-text-ready"
or "xfc-statusbar-text-busy".
*/
qx.OO.addProperty({ name : "stateTextAppearance", type : "string", allowsNull : false });


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
qx.Proto._modifyStateTextValue = function(vPropValue, vPropOldValue, vPropData)
{
    this._field.setValue(vPropValue);

    return true;
}


/*
Override the default _modifyStateTextAppearance so that we can update the
appearance of the this._sf text field.

@author sbull
*/
qx.Proto._modifyStateTextAppearance = function(vPropValue, vPropOldValue, vPropData)
{
    this._field.setAppearance(vPropValue);

    return true;
}


/*
---------------------------------------------------------------------------
  DISPOSER
---------------------------------------------------------------------------
*/


qx.Proto.dispose = function()
{
    if (this.getDisposed())
    {
        return true;
    }

    if (this._field)
    {
        this._field.dispose();
    }

    if (this._flex)
    {
        this._flex.dispose();
    }

    if (this._spacer)
    {
        this._spacer.dispose();
    }

    return qx.ui.layout.HorizontalBoxLayout.prototype.dispose.call(this);
}
