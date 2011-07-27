/* ***********************************************************************

   com.zenesis.qx.upload contrib - provides an API for uploading one or multiple files
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

     Parts of this code is based on the work by Andrew Valums (andrew@valums.com)
     and is covered by the GNU GPL and GNU LGPL2 licenses; please see
     http://valums.com/ajax-upload/.

   Authors:
     * John Spackman (john.spackman@zenesis.com)

************************************************************************/

/**
 * Implementation of AbstractHandler that uses XMLHttpRequest; this is based on work 
 * at http://valums.com/ajax-upload/.
 * 
 * Call com.zenesis.qx.upload.XhrHandler.isSupported() to check whether this class
 * can be used (otherwise use FormHandler)
 */
qx.Class.define("com.zenesis.qx.upload.XhrHandler", {
	extend: com.zenesis.qx.upload.AbstractHandler,
	
	members: {
		/*
		 * @Override
		 */
		_createFile: function(input) {
			var bomFiles = input.files;
	        if (!bomFiles || !bomFiles.length)
	            this.debug("No files found to upload via XhrHandler");
	        
	        var files = [];
	        for (var i = 0; i < bomFiles.length; i++) {
	        	var bomFile = bomFiles[i];
			    var id = "upload-" + this._getUniqueFileId(),
			    	// fix missing name in Safari 4
			    	filename = bomFile.fileName != null ? bomFile.fileName : bomFile.name,
			    	file = new com.zenesis.qx.upload.File(bomFile, filename, id),
			    	fileSize = bomFile.fileSize != null ? bomFile.fileSize : bomFile.size;
			    file.setSize(fileSize);
			    files.push(file);
	        }
		    
			return files;
		},
		
		/*
		 * @Override
		 */
		_doUpload: function(file) {
	        var xhr = new XMLHttpRequest();
	        var self = this;
	        
	        file.setUserData("com.zenesis.qx.upload.XhrHandler", xhr);
	                                        
	        xhr.upload.onprogress = function(e){
	        	self.debug("onprogress: lengthComputable=" + e.lengthComputable + ", total=" + e.total + ", loaded=" + e.loaded);
	            if (e.lengthComputable) {
	            	file.setSize(e.total);
	            	file.setProgress(e.loaded);
	            }
	        };

	        xhr.onreadystatechange = function(){            
	            if (xhr.readyState == 4) {
	                var response = {};
	                if (xhr.status == 200){
		                self.debug("xhr server responseText = " + xhr.responseText);
		                            
		                try {
		                    response = qx.lang.Json.parse(xhr.responseText);
		                } catch(err){
		                }
	                }
	                file.setUserData("com.zenesis.qx.upload.XhrHandler", null);
	                self._onCompleted(file, response);
	            }                    
	        };

	        // build query string
	        var action = this._getUploader().getUploadUrl(),
	        	params = this.getParams(),
	        	pos = action.indexOf('?'),
	        	addAmpersand = true;
	        if (pos < 0) {
	        	action += "?";
	        	addAmpersand = false;
	        }
	        for (var name in params) {
	        	if (addAmpersand)
	        		action += "&";
	        	else
	        		addAmpersand = true;
	        	action += name + "=" + encodeUriComponent(params[name]);
	        }
	        xhr.open("POST", action, true);
	        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	        xhr.setRequestHeader("X-File-Name", encodeURIComponent(file.getFilename()));
	        xhr.setRequestHeader("Content-Type", "application/octet-stream");
	        xhr.send(file.getBrowserObject());
		},
		
		/*
		 * @Override
		 */
		_doCancel: function(file) {
			var xhr = file.getUserData("com.zenesis.qx.upload.XhrHandler");
			if (xhr) {
				xhr.abort();
				file.setUserData("com.zenesis.qx.upload.XhrHandler", null);
			}
		}
	},
	
	statics: {
		__isSupported: null,

		/**
		 * Detects whether this handler is support on the current browser
		 * @returns {Boolean}
		 */
		isSupported: function() {
			if (this.__isSupported !== null)
				return this.__isSupported;
			
		    var input = document.createElement('input');
		    input.type = 'file';        
		    
		    this.__isSupported =
		        'multiple' in input &&
		        typeof File != "undefined" &&
		        typeof (new XMLHttpRequest()).upload != "undefined";
		    
		    return this.__isSupported;
		}
	}
});