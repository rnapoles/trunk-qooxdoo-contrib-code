qx.Class.define("retrotheme.demo.DateField",
{
  extend: qx.ui.groupbox.GroupBox,

  construct: function()
  {
    this.base(arguments);

    this._createControls();
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members:
  {
    _createControls: function()
    {
      var layout = new qx.ui.layout.Canvas();
      this.set({layout: layout, contentPadding: 10});
    
	  this.addListenerOnce("appear", function(e)
      {
        // Default date field //////////////////////////////////////
        this.add(new qx.ui.basic.Label("Default"), {top: 20, left: 20});
        var dateField = new qx.ui.form.DateField();
        this.add(dateField, {top: 35, left: 20});
        dateField.setValue(new Date());
        dateField.addListener("changeValue", function(e) {
          this.debug("Change Value: " + e.getData());
        });
        ////////////////////////////////////////////////////////////

        // Date field with date formater ///////////////////////////
        this.add(new qx.ui.basic.Label("With date formater"), {top: 20, left: 150});
        var dateFieldFormat = new qx.ui.form.DateField();
        this.add(dateFieldFormat, {top: 35, left: 150});
        dateFieldFormat.setValue(new Date());
        
        
        var format1 = new qx.util.format.DateFormat("MM-yyyy");
        var format2 = new qx.util.format.DateFormat("MM/dd/yyyy");
        var format3 = new qx.util.format.DateFormat("dd.MM.yyyy");
        dateFieldFormat.setDateFormat(format2);
        
        
        var setFormat1Button = new qx.ui.form.Button("MM-yyyy");
        setFormat1Button.setWidth(120);
        this.add(setFormat1Button, {top: 60, left: 150});
        setFormat1Button.addListener("execute", function(e) {
          dateFieldFormat.setDateFormat(format1);
        });
        
        var setFormat2Button = new qx.ui.form.Button("MM/dd/yyyy");
        setFormat2Button.setWidth(120);
        this.add(setFormat2Button, {top: 88, left: 150});
        setFormat2Button.addListener("execute", function(e) {
          dateFieldFormat.setDateFormat(format2);
        });
        
        var setFormat3Button = new qx.ui.form.Button("dd.MM.yyyy");
        setFormat3Button.setWidth(120);
        this.add(setFormat3Button, {top: 116, left: 150});
        setFormat3Button.addListener("execute", function(e) {
          dateFieldFormat.setDateFormat(format3);
        });
        ////////////////////////////////////////////////////////////
        
        // external manipulation of the date field /////////////////
        this.add(new qx.ui.basic.Label("Set data"), {top: 20, left: 280});
        var dateFieldManipulation = new qx.ui.form.DateField();
        this.add(dateFieldManipulation, {top: 35, left: 280});
        
        var setCurrentButton = new qx.ui.form.Button("Set current date");
        setCurrentButton.setWidth(120);
        this.add(setCurrentButton, {top: 60, left: 280});
        setCurrentButton.addListener("execute", function(e) {
          dateFieldManipulation.setValue(new Date());
        });
        
        var resetDateButton = new qx.ui.form.Button("Reset");
        resetDateButton.setWidth(120);
        this.add(resetDateButton, {top: 88, left: 280});
        resetDateButton.addListener("execute", function(e) {
          dateFieldManipulation.resetValue();
        });
        
        ////////////////////////////////////////////////////////////
        
        // Get stuff of the date field /////////////////////////////
        this.add(new qx.ui.basic.Label("Get data"), {top: 20, left: 410});
        var dateFieldGet = new qx.ui.form.DateField();
        this.add(dateFieldGet, {top: 35, left: 410});
        
        var dateLabel = new qx.ui.basic.Label();
        this.add(dateLabel, {left: 410, top: 88});
        
        var getDateButton = new qx.ui.form.Button("Get date");
        getDateButton.setWidth(120);
        this.add(getDateButton, {left: 410, top: 60});
        getDateButton.addListener("execute", function(e) {
          dateLabel.setValue(dateFieldGet.getValue() + "");
        });
	  }, this);
    }
  }

});

