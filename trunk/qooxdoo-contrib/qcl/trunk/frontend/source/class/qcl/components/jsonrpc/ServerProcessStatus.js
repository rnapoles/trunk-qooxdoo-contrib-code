/**
 * Mixin for qcl.components.jsonrpc.ServerProcessStatus* classes
 * 
 */
qx.Mixin.define('qcl.components.jsonrpc.ServerProcessStatus',
{
  
  properties :
  {
    processId : 
    {
      check : "String",
      nullable : true
    },
    
    processService:
    {
      check : "String",
      nullable : true
    },
    
    processData :
    {
      nullable : true
    }
  },
  
  members :
  {
    /**
     * Starts the server process 
     */
    start : function()
    {
      this.setDataBinding(true);
      var service = this.getProcessService();
      this.setServiceName(service.substr(0,service.lastIndexOf(".")));
      this.setServiceMethodUpdateClient(service.substr(service.lastIndexOf(".")+1));
      this.updateClient(this.getProcessId(),true, this.getProcessData() );
    },
    
    /**
     * Aborts the server process
     */
    stop : function()
    {
      this.updateClient( this.getProcessId(), false );
      this.setDataBinding(false);
    },
    
    /**
     * Handles 'changeDisplay' event and return to server.
     * @param event {qx.event.type.DataEvent} Event Object
     * @param target {qx.core.Target} Event receiving object 
     * @return void
     */
    handleDisplayServerMessage : function(event,target)
    {
      /*
       * display server text
       */
      var html = event.getData();
      if (typeof html == "string") 
      {
        this.displayLabel.setText(html);
      }

      /*
       * return to server
       */
      this.updateClient( this.getProcessId(), true, this.getProcessData() );
    },

     /**
     * Handles user click on "Cancel" button or end of process
     * @param event {qx.event.type.DataEvent} Event Object
     * @param target {qx.core.Target} Event receiving object 
     * @return void
     */
    handleEnd : function(event,target)
    {
      this.stop();
      this.setDisplay(false);
      this.dispose();
    }
        
  }
  
});