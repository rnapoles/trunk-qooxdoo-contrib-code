qx.Class.define("retrotheme.demo.MapsWindow",
{
  extend: qx.ui.window.Window,

  construct: function()
  {
    this.base(arguments);

    this.setCaption("Google Maps");
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
      var layout = new qx.ui.layout.VBox();
      layout.setSeparator("separator-vertical");
	  this.set({
        layout: layout,
		minWidth: 450,
        maxWidth: 450,
        minHeight: 400,
		maxHeight: 400,
		allowMaximize: false,
        contentPadding: 0
	  });
    
	  this.addListenerOnce("appear", function(e)
      {
	    this.add(this._createGoogleMap());
		this.center();
	  }, this);
    },
	
	_createGoogleMap : function()
    {
      var isle = new qx.ui.core.Widget().set({
        width: 450,
        height: 400
      });
     
      isle.addListenerOnce("appear", function() {
        new google.maps.Map(isle.getContentElement().getDomElement(), {
            zoom: 13,
            center: new google.maps.LatLng(49.011899,8.403311),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
      });
      return isle;
    }
  }

});

