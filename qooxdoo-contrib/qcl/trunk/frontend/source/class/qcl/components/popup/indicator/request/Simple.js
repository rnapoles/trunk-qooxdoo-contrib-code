
var qx_id96048 = new qx.ui.popup.Popup();
qx_id96048.setHeight("auto");
qx_id96048.setWidth("auto");
qx_id96048.setAutoHide(false);

qx_id96048.addEventListener("appear",function(event)
{
this.centerToBrowser()
},qx_id96048);
qx_id96899.add(qx_id96048);

var qx_id96677 = new qx.ui.basic.Atom("Loading, please wait...","icon/16/actions/ajax-loader.gif");
qx_id96677.setBorder("outset-thin");
qx_id96677.setPadding(10);
qx_id96677.setBackgroundColor("white");
qx_id96048.add(qx_id96677);

qx.event.message.Bus.subscribe("qcl.databinding.messages.rpc.*",function(message){

					
					var status = message.getName();
					var timestamp = message.getData()
					var queue = this.getUserData("queue") || [];
					switch ( status )
					{
					  case "qcl.databinding.messages.rpc.start":
					    queue.push(timestamp);
					    break;
					  
					  case "qcl.databinding.messages.rpc.end":
					    for ( var i=0; i < queue.length; i++)
					    {
					      if (queue[i]==timestamp)
					      {
					        queue.splice(i,1);
					      }
					    }
					    break; 
					}
					this.setUserData("queue",queue);
					if (queue.length) {
						this.getParent().show();
					} else {
						this.getParent().hide();
					}
					
				
},qx_id96677);

qx_id96677.addEventListener("click",function(event){

          this.setUserData("queue",[]);
          this.getParent().hide();
        
},qx_id96677);

