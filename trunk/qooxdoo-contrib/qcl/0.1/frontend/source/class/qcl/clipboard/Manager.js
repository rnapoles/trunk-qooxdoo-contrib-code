/* ************************************************************************

   qooxdoo component library 

   http://qooxdoo.org

   Copyright:
     2007 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger, using the code from qx.event.handler.DragAndDropHandler

************************************************************************ */

/* ************************************************************************


************************************************************************ */

/**
 * This clipboard manager (singleton) manages all clipboard operations of the application
 */
qx.Class.define("qcl.clipboard.Manager",
{
  type : "singleton",
  extend : qx.core.Target,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);
    this.__data = {};
    this.__actions = {};
    var vActions = [ "move", "copy", "alias", "nodrop" ];
  },

  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */  
  events :
  {
    "changeData" : "qx.event.type.Event"
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    sourceWidget :
    {
      check : "qx.ui.core.Widget",
      nullable : true
    },

    currentAction :
    {
      check : "String",
      nullable : true,
      event : "changeCurrentAction"
    }

  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
 

    /*
    ---------------------------------------------------------------------------
      DATA HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * Add data of mimetype.
     *
     * #param vMimeType[String]: A valid mimetype
     * #param vData[Any]: Any value for the mimetype
     *
     * @type member
     * @param vMimeType {var} mime type
     * @param vData {var} data to be added
     * @param doNotClear {Boolean} if set, add data to clipboard without replacing existing data
     * @return {void}
     */
    addData : function(vMimeType, vData, doNotClear ) 
    {
      if ( ! doNotClear )
      {
        this.clearData();
      }
      
      this.__data[vMimeType] = vData;
      
      // inform the event listeners
      if (this.hasEventListeners("changeData"))
      {
         this.createDispatchEvent("changeData");
      }
      // and dispatch a message
      qx.event.message.Bus.dispatch("qcl.clipboard.messages.data.changed");
    },

    /**
     * TODOC
     *
     * @type member
     * @param vMimeType {var} TODOC
     * @return {var} TODOC
     */
    getData : function(vMimeType) {
      return this.__data[vMimeType];
    },


    /**
     * TODOC
     *
     * @type member
     * @return {void}
     */
    clearData : function() {
      this.__data = {};
      // inform the event listeners
      if (this.hasEventListeners("changeData"))
      {
         this.createDispatchEvent("changeData");
      }
      // and dispatch a message
      qx.event.message.Bus.dispatch("qcl.clipboard.messages.data.changed");
    },


    /*
    ---------------------------------------------------------------------------
      ACTION HANDLING
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @type member
     * @param vAction {var} TODOC
     * @param vForce {var} TODOC
     * @return {void}
     */
    addAction : function(vAction, vForce)
    {
      this.__actions[vAction] = true;

      // Defaults to first added action
      if (vForce || this.getCurrentAction() == null) {
        this.setCurrentAction(vAction);
      }
    },


    /**
     * TODOC
     *
     * @type member
     * @return {void}
     */
    clearActions : function()
    {
      this.__actions = {};
      this.setCurrentAction(null);
    },


    /**
     * TODOC
     *
     * @type member
     * @param vAction {var} TODOC
     * @return {void}
     */
    setAction : function(vAction)
    {
      if (vAction != null && !(vAction in this.__actions)) {
        this.addAction(vAction, true);
      } else {
        this.setCurrentAction(vAction);
      }
    },
    
		/**
		 * tries to copy text to the clipboard of the underlying operating system
		 * and alerts if not successful
		 * @param {Object} text
		 * @param {Object} flavor
		 */
		copyToSystemClipboard : function ( text, flavor )
		{
			try
			{
				this._copyToSystemClipboard( text, flavor );
			} 
			catch (e)
			{
				alert(e);
			}
		},

		/**
		 * tries to copy text to the clipboard of the underlying operating system
		 * and returns false if not successful
		 * @param {Object} text
		 * @param {Object} flavor
		 */
		tryCopyToSystemClipboard : function ( text, flavor )
		{
			try
			{
				this._copyToSystemClipboard( text, flavor );
        return true;
			} 
			catch (e)
			{
				return false;
			}
		},
		
    /**
     * copy text to the clipboard of the underlying operating system
     * and throws an error if not successful
     * sources: http://www.krikkit.net/howto_javascript_copy_clipboard.html
     *          http://www.xulplanet.com/tutorials/xultu/clipboard.html
     *          http://www.codebase.nl/index.php/command/viewcode/id/174
     *          
     * works only in Mozilla and Internet Explorer
     * In Mozilla, add this line to your prefs.js file in your Mozilla user profile directory
     *    user_pref("signed.applets.codebase_principal_support", true);
     * or change the setting from within the browser with calling the "about:config" page
     **/
    _copyToSystemClipboard : function ( text, flavor )
    {
      if ( ! flavor )
      {
        // default
        flavor = "text/unicode";
      }
      
      if (window.clipboardData) 
      {
    	   // IE
    	   window.clipboardData.setData("Text", text );
      } 
      else if (window.netscape) 
      { 
    	 	// Mozilla, Firefox etc.
        try 
        {
    		  netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
    		} 
        catch(e) 
        {
    			throw new Error(
    		   	"Because of tight security settings in Mozilla / Firefox you cannot copy "+
    				"to the system clipboard at the moment. Please open the 'about:config' page "+
    				"in your browser and change the preference 'signed.applets.codebase_principal_support' to 'true'."
    				);
    		}
         // we could successfully enable the privilege
    	   var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
    	   if (!clip) return;
    	   var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
    	   if (!trans) return;
    	   trans.addDataFlavor(flavor);
    	   var str = new Object();
    	   var len = new Object();
    	   var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
    	   var copytext=text;
    	   str.data=copytext;
    	   trans.setTransferData(flavor,str,copytext.length*2);
    	   var clipid=Components.interfaces.nsIClipboard;
    	   if (!clip) return false;
    	   clip.setData(trans,null,clipid.kGlobalClipboard);
    	   return true;
       } 
       else 
       {
    		throw new Error("Your browser does not support copying to the clipboard!");
       }
    }

  },

  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._disposeObjectDeep("__cursors", 1);
    this._disposeObjects("__feedbackWidget");
    this._disposeFields("__dragCache", "__data", "__actions", "__lastDestinationEvent");
  }
});
