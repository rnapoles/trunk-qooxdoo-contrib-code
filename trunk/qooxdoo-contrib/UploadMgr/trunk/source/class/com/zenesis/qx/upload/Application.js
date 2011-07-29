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

/* ************************************************************************

 #asset(com/zenesis/qx/upload/*)
#asset(qx/icon/Oxygen/22/actions/*)

 ************************************************************************ */

/**
 * This is the main application class of your custom application "com.zenesis.qx.upload"
 */
qx.Class.define("com.zenesis.qx.upload.Application", {
	extend : qx.application.Standalone,

	/*
	 * ****************************************************************************
	 * MEMBERS
	 * ****************************************************************************
	 */

	members : {
		/**
		 * This method contains the initial application code and gets called
		 * during startup of the application
		 * 
		 * @lint ignoreDeprecated(alert)
		 */
		main : function() {
			// Call super class
			this.base(arguments);

			// Enable logging in debug variant
			if (qx.core.Environment.get("qx.debug")) {
				// support native logging capabilities, e.g. Firebug for Firefox
				qx.log.appender.Native;
				// support additional cross-browser console. Press F7 to toggle
				// visibility
				qx.log.appender.Console;
			}

			/*
			 * -------------------------------------------------------------------------
			 * Below is your actual application code...
			 * -------------------------------------------------------------------------
			 */
			// Document is the application root
			var doc = this.getRoot();

      		var btn = new com.zenesis.qx.upload.UploadButton("Add File(s)", "com/zenesis/qx/upload/test.png");
      		var lst = new qx.ui.form.List();
      		
      		// Uploader controls the upload process; btn is the widget that will have the input[type=file]
      		// attached, and "/demoupload" is the path files will be uploaded to (i.e. it's the value used
      		// for the form's action attribute)
      		//
      		var uploader = new com.zenesis.qx.upload.UploadMgr(btn, "/demoupload");
      		uploader.addListener("addFile", function(evt) {
      			var file = evt.getData(),
      				item = new qx.ui.form.ListItem(file.getFilename(), null, file);
      			lst.add(item);
      			
      			// On modern browsers (ie not IE) we will get progress updates
      			var progressListenerId = file.addListener("changeProgress", function(evt) {
      				this.debug("Upload " + file.getFilename() + ": " + evt.getData() + " / " + file.getSize() + " - " +
      						Math.round(evt.getData() / file.getSize() * 100) + "%");
      				item.setLabel(file.getFilename() + ": " + evt.getData() + " / " + file.getSize() + " - " +
      						Math.round(evt.getData() / file.getSize() * 100) + "%");
      			}, this);
      			
      			// All browsers can at least get changes in state (ie "uploading", "cancelled", and "uploaded")
      			var stateListenerId = file.addListener("changeState", function(evt) {
      				var state = evt.getData();
      				
      				this.debug(file.getFilename() + ": state=" + state + ", file size=" + file.getSize() + ", progress=" + file.getProgress());
      				
      				if (state == "uploading")
      					item.setLabel(file.getFilename() + " (Uploading...)");
      				else if (state == "uploaded")
      					item.setLabel(file.getFilename() + " (Complete)");
      				else if (state == "cancelled")
      					item.setLabel(file.getFilename() + " (Cancelled)");
      				
      				if (state == "uploaded" || state == "cancelled") {
          				file.removeListenerById(stateListenerId);
          				file.removeListenerById(progressListenerId);
      				}
      				
      			}, this);
      			
      			this.debug("Added file " + file.getFilename());
      		}, this);
      		
      		doc.add(btn, { left: 50, top: 50 });

      		// Create a button to cancel the upload selected in the list
      		var btnCancel = new qx.ui.form.Button("Cancel download", "qx/icon/Oxygen/22/actions/process-stop.png");
      		btnCancel.set({ enabled: false });
      		lst.addListener("changeSelection", function(evt) {
      			var sel = evt.getData(),
      				item = sel.length ? sel[0] : null,
      				file = item ? item.getModel() : null;
      			btnCancel.setEnabled(file != null && file.getState() == "uploading");
      		}, this);
      		btnCancel.addListener("execute", function(evt) {
      			var sel = lst.getSelection(),
      				item = sel[0],
      				file = item.getModel();
      			if (file.getState() == "uploading")
      				uploader.cancel(file);
      		}, this);
      		
      		// Auto upload? (default=true)
      		var cbx = new qx.ui.form.CheckBox("Automatically Upload");
      		cbx.setValue(true);
      		cbx.addListener("changeValue", function(evt) {
      			uploader.setAutoUpload(evt.getData());
      		}, this);
      		
      		// add them to the UI
      		lst.set({ width: 350 });
      		doc.add(cbx, { left: 170, top: 50 });
      		doc.add(lst, { left: 170, top: 65 });
      		doc.add(btnCancel, { left: 540, top: 50 });
      		
		}
	}
});
