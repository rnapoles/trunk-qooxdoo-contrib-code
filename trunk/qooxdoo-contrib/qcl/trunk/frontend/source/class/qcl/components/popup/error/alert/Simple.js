
var errorWindow = new qx.ui.window.Window("Error");
errorWindow.setWidth(400);
errorWindow.setHeight("auto");
errorWindow.setShowMinimize(false);
errorWindow.setShowMaximize(false);
errorWindow.setShowClose(false);

errorWindow.addEventListener("appear",function(event)
{
this.centerToBrowser()
},errorWindow);
qx_id96899.add(errorWindow);

qx.event.message.Bus.subscribe("qcl.databinding.messages.rpc.error",function(message){

			message.getData() == false ? this.hide() : this.show();
		
},errorWindow);

var qx_id97736 = new qx.ui.layout.VerticalBoxLayout();
qx_id97736.setSpacing(5);
qx_id97736.setPadding(10);
qx_id97736.setWidth("100%");
qx_id97736.setHeight("100%");
errorWindow.add(qx_id97736);

var qx_id97745 = new qx.ui.layout.HorizontalBoxLayout();
qx_id97745.setWidth("100%");
qx_id97745.setHeight("1*");
qx_id97745.setSpacing(10);
qx_id97745.setVerticalChildrenAlign("middle");
qx_id97736.add(qx_id97745);

var qx_id97755 = new qx.ui.basic.Image("icon/32/status/dialog-error.png");
qx_id97755.setDimension(32 ,32);
qx_id97745.add(qx_id97755);

var qx_id97761 = new qx.ui.basic.Label(" ");
qx_id97761.setWrap(true);
qx_id97761.setHeight("100%");
qx_id97761.setWidth("1*");
qx_id97761.setMode("html");

qx.event.message.Bus.subscribe("qcl.databinding.messages.rpc.error",function(message){

  					var msg = message.getData() || "";
  					var msg = "" + msg.replace(/\\n/,"") + "";
  					this.setText(msg);
  				
},qx_id97761);
qx_id97745.add(qx_id97761);

var qx_id97789 = new qx.ui.layout.HorizontalBoxLayout();
qx_id97789.setWidth("100%");
qx_id97789.setHeight("auto");
qx_id97789.setHorizontalChildrenAlign("center");
qx_id97789.setSpacing(10);
qx_id97736.add(qx_id97789);

var qx_id97798 = new qx.ui.form.Button("OK",null);
qx_id97798.setHeight(25);
qx_id97798.setWidth(70);
qx_id97789.add(qx_id97798);

qx_id97798.addEventListener("execute",function(event){

						errorWindow.hide();
					
},qx_id97798);

