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
     
     Parts of this code is based on the work by Andrew Valums (andrew@valums.com)
     and is covered by the GNU GPL and GNU LGPL2 licenses; please see
     http://valums.com/ajax-upload/.

   Authors:
     * John Spackman (john.spackman@zenesis.com)

************************************************************************/

/**
 * Implementation of AbstractHandler that uses iframe and form DOM elements
 * to send the file.
 */

qx.Class.define("com.zenesis.qx.upload.FormHandler", {
	extend: com.zenesis.qx.upload.AbstractHandler,
	
	members: {
		
		/*
		 * @Override
		 */
		_createFile: function(input) {
		    var id = "upload-" + this._getUniqueFileId(),
		    	filename = input.value.replace(/.*(\/|\\)/, ""),
		    	file = new com.zenesis.qx.upload.File(input, filename, id);
			return file;
		},
		
		/*
		 * @Override
		 */
		_doUpload: function(file) {
		    var iframe = this._createIframe(file.getId()),
		    	form = this._createForm(iframe, file.getId());
		    
		    form.appendChild(file.getBrowserObject());
		    
		    var self = this;
		    
		    qx.bom.Event.addNativeListener(iframe, "load", function(evt) { 
		        // when we remove iframe from dom the request stops, but in IE load event fires
		        if (!iframe.parentNode)
		            return;
		
		        // fixing Opera 10.53
		        if (iframe.contentDocument && iframe.contentDocument.body &&
		            iframe.contentDocument.body.innerHTML == "false") {
		            // In Opera event is fired second time when body.innerHTML changed from false
		            // to server response approx. after 1 sec when we upload file with iframe
		            return;
		        }
		        
		        self.debug('iframe loaded');
		        
		        var response = self._getIframeContentJSON(iframe);
		
		        self._onCompleted(file, response);
		        
		        // timeout added to fix busy state in FF3.6
		        setTimeout(function(){
		        	iframe.parentNode.removeChild(iframe);
		        	form.parentNode.removeChild(form);
		        }, 1);
		    });
			form.submit();
		},
		
		/*
		 * @Override
		 */
		_doCancel: function(file) {
			var data = file.getUserData("com.zenesis.qx.upload.FormHandler");
			if (!data)
				return;
			var iframe = document.getElementById("upload-iframe-" + file.getId()),
				form = document.getElementById("upload-form-" + file.getId());
			
			if (iframe != null) {
	            // to cancel request set src to something else
	            // we use src="javascript:false;" because it doesn't
	            // trigger ie6 prompt on https
	            iframe.setAttribute('src', 'javascript:false;');
	        	iframe.parentNode.removeChild(iframe);
			}
			if (form != null)
				form.parentNode.removeChild(form);
		},
		
		/**
		 * Returns json object received by iframe from server.
		 * @return {Object}
		 */
		_getIframeContentJSON: function(iframe){
		    // iframe.contentWindow.document - for IE<7
		    var doc = iframe.contentDocument ? iframe.contentDocument: iframe.contentWindow.document,
		        response;
		    
		    this.debug("converting iframe's innerHTML to JSON");
		    this.debug("innerHTML = " + doc.body.innerHTML);
		                    
		    try {
		        response = eval("(" + doc.body.innerHTML + ")");
		    } catch(err){
		        response = {};
		    }        
		
		    return response;
		},
		
		/**
		 * Creates iframe with unique name
		 * @return {DOMElement} the iframe
		 */
		_createIframe: function(id){
		    // We can't use following code as the name attribute
		    // won't be properly registered in IE6, and new window
		    // on form submit will open
		    // var iframe = document.createElement('iframe');
		    // iframe.setAttribute('name', id);
		
		    var iframe = qx.bom.Element.create("iframe", { 
		    	src: "javascript:false;", // src="javascript:false;" removes ie6 prompt on https 
		    	name: id, 
		    	id: "upload-iframe-" + id 
	    	});
		
		    qx.bom.element.Style.setStyles(iframe, {
		    	display: 'none'
		    });
		    document.body.appendChild(iframe);
		
		    return iframe;
		},
		
		/**
		 * Creates form, that will be submitted to iframe
		 * @return {DOMElement} the form
		 */
		_createForm: function(iframe, id){
		    // We can't use the following code in IE6
		    // var form = document.createElement('form');
		    // form.setAttribute('method', 'post');
		    // form.setAttribute('enctype', 'multipart/form-data');
		    // Because in this case file won't be attached to request
		    var form = qx.bom.Element.create("form", { 
		    	enctype: "multipart/form-data",
		    	encoding: "multipart/form-data",
		    	action: this._getUploader().getUploadUrl(),
		    	method: "POST",
		    	target: iframe.name,
		    	id: "upload-form-" + id
			});
		
		    qx.bom.element.Style.setStyles(form, {
		    	display: 'none'
		    });
		    var params = this.getParams();
		    for (var name in params) {
		    	var el = qx.bom.Element.create('input', {
		    		type: "hidden",
		    		value: params[name]
		    	});
		    	form.appendChild(el);
		    }
		    document.body.appendChild(form);
		
		    return form;
		}

	}
});
