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
 * Base class for upload implementations; operates a queue of pending and
 * current uploads, and restricts the number of simultaneous uploads.
 */
qx.Class.define("com.zenesis.qx.upload.AbstractHandler", {
	extend: qx.core.Object,
	
	/**
	 * Constructor
	 * @param uploader {com.zenesis.qx.upload.UploadMgr} controller for uploading
	 */
	construct: function(uploader) {
		this.base(arguments);
		qx.core.Assert.assertNotNull(uploader);
		this.__queue = [];
		this.__current = [];
		this.__params = {};
		this.__uploader = uploader;
	},
	
	properties: {
		/**
		 * Maximum number of simultaneous uploads
		 */
		maxConnections: {
			check: "Integer",
			init: 5,
			nullable: false,
			event: "changeMaxConnections"
		}
	},
	
	members: {
		// Last unique ID used
		__lastId: 0,
		
		// Uploader instance
		__uploader: null,
		
		// Queue of com.zenesis.qx.upload.File's to send
		__queue: null,
		
		// List of com.zenesis.qx.upload.File's currently being sent
		__current: null,
		
		// Parameters to post with the file
		__params: null,
		
		/**
		 * Adds a file to the upload queue; this does not start uploading until
		 * beginUploads is called.
		 * @param input {DOM} either one input[type=file] or an array of input[type=file]
		 */
		addFile: function(input) {
			var files = this._createFile(input);
			if (!qx.lang.Type.isArray(files))
				this._addFile(files);
			else
				for (var i = 0; i < files.length; i++)
					this._addFile(files[i]);
		},
		
		/**
		 * Adds a file to the outbound queue
		 * @param file {com.zenesis.qx.upload.File} the file to add
		 */
		_addFile: function(file) {
			this.__queue.push(file);
			this.__uploader.fireDataEvent("addFile", file);
		},
		
		/**
		 * Begins spooling uploads to the server, up to the maxConnections 
		 */
		beginUploads: function() {
			while (this.__queue.length > 0 && this.__current.length < this.getMaxConnections()) {
				var file = this.__queue.shift();
				this.__current.push(file);
				this.__uploader.fireDataEvent("beginUpload", file);
				file.setState("uploading");
				this._doUpload(file);
			}
		},
		
		/**
		 * Cancels a file
		 * @param file {com.zenesis.qx.upload.File} the file to cancel
		 */
		cancel: function(file) {
			var wasUploading = this.__current.length > 0;
			//this.debug("cancelled: id=" + file.getId() + ", fileName=" + file.getFilename());
			this._cancel(file);
			if (wasUploading && this.__uploader.getAutoUpload())
				this.beginUploads();
		},
		
		/**
		 * Cancels all uploads
		 */
		cancelAll: function() {
			for (var current = this.__current, i = 0; i < current.length; i++)
				this._cancel(current[i]);
			this.__current.splice(0, this.__current.length);
			this.__queue.splice(0, this.__queue.length);
		},
		
		/**
		 * Cancels a file
		 * @param file {com.zenesis.qx.upload.File} the file to cancel
		 */
		_cancel: function(file) {
			var inCurrent = false;
			for (var current = this.__current, i = 0; i < current.length; i++)
				if (current[i] == file) {
					current.splice(i, 1);
					inCurrent = true;
					break;
				}
			for (var queue = this.__queue, i = 0; i < queue.length; i++)
				if (queue[i] == file) {
					queue.splice(i, 1);
					break;
				}
			file.setState("cancelled");
			if (inCurrent)
				this._doCancel(file);
			this.__uploader.fireDataEvent("cancelUpload", file);
		},
		
		/**
		 * Called by derived classes when a file has completed
		 * @param file {com.zenesis.qx.upload.File} the file which has finsihed uploading
		 * @param response {String} text received
		 */
		_onCompleted: function(file, response) {
			//this.debug("completed: id=" + file.getId() + ", fileName=" + file.getFilename() + ", response=" + response);
			var current = this.__current;
			for (var i = 0; i < current.length; i++)
				if (current[i] == file) {
					current.splice(i, 1);
					break;
				}
			
			file.setResponse(response);
			
			// File state should be uploading or cancelled
			if (file.getState() == "uploading") {
				file.setState("uploaded");
				this.__uploader.fireDataEvent("completeUpload", file);
			}
			
			// Start the next one
			this.beginUploads();
		},
		
		/**
		 * Returns the uploader
		 * @returns {com.zenesis.qx.upload.UploadMgr}
		 */
		_getUploader: function() {
			return this.__uploader;
		},
		
		/**
		 * Allocates a unique ID
		 * @returns {Number}
		 */
		_getUniqueFileId: function() {
			return ++this.__lastId;
		},
		
		/**
		 * Adds a parameter to send to the client
		 * @param key {String} the name of the parameter
		 * @param value {String} the value of the parameter
		 * @deprecated see com.zenesis.qx.upload.UploadMgr.setParam or com.zenesis.qx.upload.File.setParam
		 */
		addParam: function(key, value) {
			qx.log.Logger.deprecatedMethodWarning(arguments.callee, "see com.zenesis.qx.upload.UploadMgr.setParam or com.zenesis.qx.upload.File.setParam");
			this.__params[key] = value;
		},
		
		/**
		 * Returns the paramaters map
		 * @returns {Map}
		 * @deprecated see com.zenesis.qx.upload.File.getParam
		 */
		getParams: function() {
			qx.log.Logger.deprecatedMethodWarning(arguments.callee, "see com.zenesis.qx.upload.UploadMgr.getParam or com.zenesis.qx.upload.File.getParam");
			return this.__params;
		},
		
		/**
		 * Helper method that produces a final list of parameter values, by merging those
		 * set in this with those in the file.
		 * @param file {File} the file object
		 * @returns {Map} map of parameters to sent to the server
		 */
		_getMergedParams: function(file) {
			var result = {};
			for (var name in this.__params) {
				var value = this.__params[name];
				if (value !== null)
					result[name] = value;
			}
			var names = this.__uploader.getParamNames();
			for (var i = 0; i < names.length; i++) {
				var name = names[i],
					value = this.__uploader.getParam(name);
				if (value !== null)
					result[name] = value;
				else
					delete result[name];
			}
			var names = file.getParamNames();
			for (var i = 0; i < names.length; i++) {
				var name = names[i],
					value = file.getParam(name);
				if (value !== null)
					result[name] = value;
				else
					delete result[name];
			}
			return result;
		},
		
		/**
		 * Implementation must create a com.zenesis.qx.upload.File or array of com.zenesis.qx.upload.File 
		 * @param input {DOM} the DOM input[type=file]
		 * @return {com.zenesis.qx.upload.File|com.zenesis.qx.upload.File[]}
		 */
		_createFile: function(input) {
			/* abstract */
		},
		
		/**
		 * Called to do the real work of uploading the file
		 * @param file {com.zenesis.qx.upload.File}
		 */
		_doUpload: function(file) {
			/* abstract */
		},
		
		/**
		 * Called to cancel the upload
		 * @param file {com.zenesis.qx.upload.File} file to cancel uploading
		 */
		_doCancel: function(file) {
			/* abstract */
		}
		
	}
});