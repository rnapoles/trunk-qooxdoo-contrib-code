/* ***********************************************************************

   UploadMgr - provides an API for uploading one or multiple files
   with progress feedback (on modern browsers), does not block the user 
   interface during uploads, supports cancelling uploads.

   http://qooxdoo.org

   Copyright:
     2011 Zenesis Limited, http://www.zenesis.com

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     
     This software is provided under the same licensing terms as Qooxdoo,
     please see the LICENSE file in the Qooxdoo project's top-level directory 
     for details.

   Authors:
     * John Spackman (john.spackman@zenesis.com)

************************************************************************/

/**
 * Represents a file that is to be or has been uploaded; this should be instantiated
 * by the _createFile method of AbstractHandler implementations and is not expected 
 * to be used separately
 */
qx.Class.define("com.zenesis.qx.upload.File", {
	extend: qx.core.Object,
	
	/**
	 * Constructor
	 * @param browserObject {DOM} Anythign the AbstractHandler wants to store, typically an input[type=file] or a File
	 * @param filename {String} the name of the file
	 * @param id {String} the unique id of the file
	 */
	construct: function(browserObject, filename, id) {
		this.base(arguments);
		qx.core.Assert.assertNotNull(browserObject);
		qx.core.Assert.assertNotNull(filename);
		qx.core.Assert.assertNotNull(id);
		this.__browserObject = browserObject;
		this.setFilename(filename);
		this.setId(id);
	},
	
	properties: {
		/**
		 * The filename
		 */
		filename: {
			check: "String",
			nullable: false,
			event: "changeFilename"
		},
		
		/**
		 * A unique ID for the upload 
		 */
		id: {
			check: "String",
			nullable: false,
			event: "changeId"
		},
		
		/**
		 * Size of the file, if known (not available on older browsers)
		 */
		size: {
			check: "Integer",
			nullable: false,
			init: -1,
			event: "changeSize"
		},
		
		/**
		 * Progress of the upload, if known (not available on older browsers)
		 */
		progress: {
			check: "Integer",
			nullable: false,
			init: 0,
			event: "changeProgress"
		},
		
		/**
		 * State of the file, re: uploading
		 */
		state: {
			check: [ "not-started", "uploading", "cancelled", "uploaded" ],
			nullable: false,
			init: "not-started",
			event: "changeState",
			apply: "_applyState"
		}
	},
	
	members: {
		__browserObject: null,
	
		/**
		 * Returns the browser object
		 * @returns {DOM}
		 */
		getBrowserObject: function() {
			return this.__browserObject;
		},
		
		/**
		 * Called for changes to the state
		 * @param value
		 * @param oldValue
		 */
		_applyState: function(value, oldValue) {
			qx.core.Assert.assertTrue(
					(!oldValue && value == "not-started") ||
					(oldValue == "not-started" && value == "uploading") ||
					(oldValue == "uploading" && (value == "cancelled" || value == "uploaded"))
					);
		}
	}
});