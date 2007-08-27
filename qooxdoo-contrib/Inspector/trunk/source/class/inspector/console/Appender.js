/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 David Perez

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/* ************************************************************************

#module(core)
#module(log)

************************************************************************ */

qx.Class.define("inspector.console.Appender",
{
  extend : qx.log.appender.Abstract,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function(console) {    
		this.base(arguments);
		this._console = console;
  },
	

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
		
		_console: null,

    // overridden
    appendLogEvent : function(evt) {			 
			
        var log = qx.log.Logger;
        var msg = this.formatLogEvent(evt);

        switch(evt.level) {
					
          case log.LEVEL_DEBUG:
            this._console.debug(msg);
            break;

          case log.LEVEL_INFO:
            this._console.info(msg);
            break;

          case log.LEVEL_WARN:
            this._console.warn(msg);
            break;

          default:
            this._console.error(msg);
            break;
        }      
    }
  }
});
