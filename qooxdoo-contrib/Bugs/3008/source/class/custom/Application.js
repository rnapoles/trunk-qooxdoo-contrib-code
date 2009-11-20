qx.Class.define("custom.Application", {
	extend : qx.application.Gui,

	members : {
		main : function() {
			this.base(arguments);

			this.widget1 = new qx.ui.layout.CanvasLayout();
			this.widget1.setLocation( 10, 10 );
			this.widget1.setDimension( 100, 100 );
			this.widget1.setBackgroundColor( "#DD8888" );			
			this.widget1.addToDocument();			
			
			this.widget2 = new qx.ui.layout.CanvasLayout();			
			this.widget2.setLocation( 10, 200 );
			this.widget2.setDimension( 100, 100 );
			this.widget2.setBackgroundColor( "#88DD88" );
			this.widget2.addToDocument();						
			
			this.widget3 = new qx.ui.layout.CanvasLayout();
			this.widget3.setLocation( 200, 10 );
			this.widget3.setDimension( 100, 100 );
			this.widget3.setBackgroundColor( "#8888DD" );			
			this.widget3.addToDocument();
			
			this.widget4 = new qx.ui.layout.CanvasLayout();
			this.widget4.setLocation( 200, 200 );
			this.widget4.setDimension( 100, 100 );
			this.widget4.setBackgroundColor( "#DDDD88" );			
			this.widget4.addToDocument();
			
			//buggy
			this.widget1.setOverflow( "hidden" ); 
			this.widget1.setSelectable( true );
			
			//works
			this.widget2.setOverflow( null ); 
			this.widget2.setSelectable( true );
			
			//works
			this.widget3.setOverflow( "hidden" );
			this.widget3.setSelectable( false );
			
			//works
			this.widget4.setOverflow( null );
			this.widget4.setSelectable( false );
			
			
			this.infoBox = document.createElement( "div" );
			this.infoBox.style.position = "absolute";
			this.infoBox.style.left = "130px";
			this.infoBox.style.top = "150px";
			this.infoBox.innerHTML = '...';
			document.body.appendChild( this.infoBox );
			
			var doc = qx.ui.core.ClientDocument.getInstance();
			
			this.widget1.addEventListener( "mousemove", function(e){
			  e.stopPropagation();
			  this.infoBox.innerHTML = "widget 1 (red)";			  
			}, this );
			
			this.widget2.addEventListener( "mousemove", function(e){
			  e.stopPropagation();
			  this.infoBox.innerHTML = "widget 2 (green)";
			}, this );
			
			this.widget3.addEventListener( "mousemove", function(e){
			  e.stopPropagation();
			  this.infoBox.innerHTML = "widget 3 (blue)";
			}, this );
			
			this.widget4.addEventListener( "mousemove", function(e){
			  e.stopPropagation();
			  this.infoBox.innerHTML = "widget 4 (yellow)";
			}, this );

			doc.addEventListener( "mousemove", function(e){
			  this.infoBox.innerHTML = "document";
			}, this );
			
    }
       
  }
});