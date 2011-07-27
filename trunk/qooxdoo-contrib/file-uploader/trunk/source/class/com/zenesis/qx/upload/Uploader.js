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

   Authors:
     * John Spackman (john.spackman@zenesis.com)

************************************************************************/

/**
 * Manages uploading of files to the server; this class can use any suitable
 * widget to attach the input[type=file] to, provided the widget includes
 * com.zenesis.qx.upload.MUploadButton. 
 * 
 * Uploader will use XhrHandler to upload via XMLHttpRequest if supported or 
 * will fall back to FormHandler.
 */
qx.Class.define("com.zenesis.qx.upload.Uploader", {
	extend: qx.core.Object,
	
	construct: function(widget, uploadUrl) {
		this.base(arguments);
		if (widget)
			this.setWidget(widget);
		if (uploadUrl)
			this.setUploadUrl(uploadUrl);
		if (com.zenesis.qx.upload.XhrHandler.isSupported())
			this.__uploadHandler = new com.zenesis.qx.upload.XhrHandler(this);
		else
			this.__uploadHandler = new com.zenesis.qx.upload.FormHandler(this);
	},
	
	events: {
		/**
		 * Fired when a file is added to the queue; data is the com.zenesis.qx.upload.File
		 */
		"addFile": "qx.event.type.Data",
		
		/**
		 * Fired when a file starts to be uploaded; data is the com.zenesis.qx.upload.File
		 */
		"beginUpload": "qx.event.type.Data",
		
		/**
		 * Fired when a file has been uploaded; data is the com.zenesis.qx.upload.File
		 */
		"completeUpload": "qx.event.type.Data",
		
		/**
		 * Fired when a file upload has been cancelled; data is the com.zenesis.qx.upload.File
		 */
		"cancelUpload": "qx.event.type.Data"
	},
	
	properties: {
		/**
		 * The widget to add the input[type=file] to; this would typically be an instance
		 * of com.zenesis.qx.upload.UploadButton (see com.zenesis.qx.upload.MUploadButton
		 * for implementing for other widgets)
		 */
		widget: {
			check: "qx.ui.core.Widget",
			init: null,
			nullable: true,
			apply: "_applyWidget",
			event: "changeWidget"
		},
		
		/**
		 * The URL to upload to
		 */
		uploadUrl: {
			check: "String",
			nullable: false,
			init: "",
			event: "changeUploadUrl"
		},
		
		/**
		 * Whether to automatically start uploading when a file is added (default=true)
		 */
		autoUpload: {
			check: "Boolean",
			init: true,
			nullable: false,
			event: "changeAutoUpload",
			apply: "_applyAutoUpload"
		},
		
		/**
		 * Whether to support multiple files (default=true); this is not supported on
		 * older browsers
		 */
		multiple: {
			check: "Boolean",
			init: true,
			nullable: false,
			event: "changeMultiple",
			apply: "_applyMultiple"
		}
	},
	
	members: {
		__appearListenerId: null,
		__inputElement: null,
		__uploadHandler: null,
		
		/**
		 * Callback for changes to the widget property
		 * @param value
		 * @param oldValue
		 * @param name
		 */
		_applyWidget: function(value, oldValue, name) {
			if (oldValue && this.__appearListenerId) {
				oldValue.removeListener(this.__appearListenerId);
			}
			this.__appearListenerId = null;
			if (value) {
				this.__appearListenerId = value.addListenerOnce("appear", function(evt) {
					value.getContainerElement().addAt(this._createInputElement(), 0);
				}, this);
			}
		},
		
		/**
		 * Callback for changes to the autoUpload property
		 * @param value
		 * @param oldValue
		 */
		_applyAutoUpload: function(value, oldValue) {
			this.__uploadHandler.beginUploads();
		},
		
		/**
		 * Callback for changes to the multiple property
		 * @param value
		 * @param oldValue
		 */
		_applyMultiple: function(value, oldValue) {
			if (this.__inputElement) {
				if (value)
					this.__inputElement.setAttribute("multiple", "multiple");
				else
					this.__inputElement.removeAttribute("multiple");
			}
		},
		
		/**
		 * Cancels a file being uploaded
		 * @param file
		 */
		cancel: function(file) {
			this.__uploadHandler.cancel(file);
		},
		
		/**
		 * Cancels all files being uploaded
		 * @param file
		 */
		cancelAll: function() {
			this.__uploadHandler.cancelAll();
		},
		
		/**
		 * Creates the input[type=file] element
		 * @returns
		 */
		_createInputElement: function() {
	        var control;
	        // styling the input[type=file]
	        // element is a bit tricky. Some browsers just ignore the normal
	        // css style input. Firefox is especially tricky in this regard.
	        // since we are providing our one look via the underlying qooxdoo
	        // button anyway, all we have todo is position the ff upload
	        // button over the button element. This is tricky in itself
	        // as the ff upload button consists of a text and a button element
	        // which are not css accessible themselfes. So the best we can do,
	        // is align to the top right corner of the upload widget and set its
	        // font so large that it will cover even realy large underlying buttons.
	        var css = {
	              position  : "absolute", 
	              cursor    : "pointer",
	              hideFocus : "true",
	              zIndex: this.getWidget().getZIndex() + 11,
	              opacity: 0,
	              // align to the top right hand corner
	              top: '0px',
	              right: '0px',
	              // ff ignores the width setting pick a realy large font size to get
	              // a huge button that covers the area of the upload button
	              fontFamily: 'Arial',
	              // from valums.com/ajax-upload: 4 persons reported this, the max values that worked for them were 243, 236, 236, 118
	              fontSize: '118px'
	        };
	        if ((qx.core.Environment && qx.core.Environment.get('browser.name') == 'ie' && qx.core.Environment.get('browser.version') < 9 )
	              || ( ! qx.core.Environment && qx.bom.client.Engine.MSHTML && qx.bom.client.Engine.VERSION < 9.0)) {
	        	css.filter = 'alpha(opacity=0)';
	            css.width = '200%';
	            css.height = '100%';
	        }
	
	        control =  new qx.html.Element('input',css,{        
	        	type : 'file',
	        	name : 'myinput'
	        }); 
			if (this.getMultiple())
				control.setAttribute("multiple", "multiple");
	        control.addListener("change", this._onInputChange, this);
	        this.__inputElement = control;
	
	        return control;
		},
		
		/**
		 * Resets the input element - ie discards the current one (which presumably has already
		 * been queued for uploading) and creates a new one 
		 */
		_resetInputElement: function() {
			var el = this.__inputElement,
				widget = this.getWidget();
			if (!el)
				return;
			el.removeListener("change", this._onInputChange, this);
			widget.getContainerElement().remove(el);
			widget.getContainerElement().addAt(this._createInputElement(), 0);
		},
		
		/**
		 * Callback for changes to the input[ty=file]'s value, ie this is called when the user
		 * has selected a file to upload
		 * @param evt
		 */
		_onInputChange: function(evt) {
			var el = this.__inputElement;
			this._resetInputElement();
			
			this.__uploadHandler.addFile(el.getDomElement());
			if (this.getAutoUpload())
				this.__uploadHandler.beginUploads();
			this._resetInputElement();
		}
	}
});