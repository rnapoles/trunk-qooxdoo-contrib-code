/* ************************************************************************

   Copyright:
     2010 Guilherme R. Aiolfi
     
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Guilherme R. Aiolfi (gradinf@gmail.com) - Original code
     * Christian Boulanger (cboulanger) - Small additions

************************************************************************ */

/* ************************************************************************

#asset(tokenfield.demo/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "tokenfield"
 */
qx.Class.define("tokenfield.demo.Application",
{
  extend : qx.application.Standalone,

  /*
	*****************************************************************************
	   MEMBERS
	*****************************************************************************
	*/

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     *
     * @return {void} 
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;

        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      var t = new tokenfield.Token();

      t.setWidth(500);
      t.setMaxWidth(500);

      t.setSelectionMode('multi');
      
      /*
       * listens for event to load data from the server. here, we 
       * do a simple mockup with a small timeout to simulate a server request
       */
      t.addListener("loadData", function(e){        
        var str = e.getData();
        var data = [];
        for( var i=0; i<(Math.floor(Math.random()*10)+3);i++ )
        {
          data.push( { label: str + " " + i } );
        }
        qx.util.TimerManager.getInstance().start(function(){
          t.populateList( str, data );
        },null,this,null,500);
      },this);

      this.getRoot().add(t,
      {
        top  : 50,
        left : 80
      });

      var bt = new qx.ui.form.Button('selection');

      bt.addListener("execute", function(e) {
        console.log(t.getSelection());
      });

      this.getRoot().add(bt,
      {
        top  : 50,
        left : 600
      });
    }
  }
});