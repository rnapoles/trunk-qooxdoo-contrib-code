
/* ************************************************************************
#asset(access/*)
************************************************************************ */

/**
 * Class definition
 */
qx.Class.define("access.Main",
{
  extend : qx.application.Standalone,
  include : [ qcl.application.MApplication ],
  
  properties : 
  {
 
  },

  members :
  {
    /**
     * Initialize the application
     *
     * 
     * @return {void} 
     */
    main : function()
    {
      /*
       * call parent class' main method
       */
      this.base(arguments); 
       
      /*
       * logging
       */
      if(qx.core.Variant.isSet("qx.debug", "on")) 
      {
         qx.log.appender.Native;
      }       
       
      /*
       * the URL of the jsonrpc server
       */ 
      this.setServerUrl("../services/index.php");
      
       this.info("Starting Application..."); 
       
      /*
       * Starting the authentication
       */
      this.startAuthentication("qcl.test.Auth");
      
      /*
       * configuration
       */
      this.loadConfiguration("qcl.test.Config");
      
    },
    
    finalize : function()
    {
      this.info("Finalizing..");

      /*
       * turn on browser history support
       */
      //this.setHistorySupport(true);
      
    }

  }
});