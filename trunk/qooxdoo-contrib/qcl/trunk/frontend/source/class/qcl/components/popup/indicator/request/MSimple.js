/**
 * Mixin providing methods and event/message handlers for 
 * qcl.components.popup.indicator.request.Simple
 * 
 */
qx.Class.define('qcl.components.popup.indicator.request.MSimple',
{

  members :
  {
     /**
     * Handles 'qcl.databinding.messages.rpc.*' message
     * @param message {qx.event.message.Message} Message object
     * @param target {qx.core.Target} Message receiver object 
     * @return void
     */
    handleRpcMesssage : function(message,target)
    {
    
      var status = message.getName();
      var timestamp = message.getData();
      
      /*
       * create queue if not exists
       */
      if ( ! this.getUserData("queue") )
      {
        this.setUserData("queue",[]);
      }
      
      var queue = this.getUserData("queue");
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
      
      /*
       * if there are requests in the queue, show widget
       * otherwise hide it
       */
      if (queue.length) 
      {
        this.getParent().show();
      } 
      else 
      {
        this.getParent().hide();
      }
    
    },
    
    handleClick : function()
    {
      this.setUserData("queue",[]);
      this.getParent().hide();      
    }
    
  }
});