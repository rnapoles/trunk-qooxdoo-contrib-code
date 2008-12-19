/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 1&1 Internet AG, Germany, http://www.1and1.org

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
/**
 * This appender enables the ability for the console view to interact with the 
 * logging system of qooxdoo.
 */
qx.Class.define("inspector.console.Appender", {

  extend : qx.log.appender.Abstract,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  /**
   * Creates a new instance of a appender.
   * @param console {inspector.console.ConsoleView} Reverence to the used console view.
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
    /*
    *********************************
       ATTRIBUTES
    *********************************
    */
    _console: null,
    
    /*
    *********************************
       PUBLIC OVERRIDDEN
    *********************************
    */
    /**
     * Appends the log messages to the inspector console.
     * @param evt {Object} The log event.
     */
    appendLogEvent : function(evt) {
      // get the logger
      var log = qx.log.Logger;
      // get the log message
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
  },
  
  
  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */
  destruct : function() {
    this._disposeFields("_console");
  }
});
