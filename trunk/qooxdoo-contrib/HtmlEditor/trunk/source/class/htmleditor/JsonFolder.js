/* ***
 
#asset(htmleditor/icon/*)
 
*/

qx.Class.define("htmleditor.JsonFolder", {
	extend: htmleditor.JsonRootFolder,
	implement: [htmleditor.IFolder, htmleditor.IFile],
	
	/**
	 * Constructor; should only be called by JsonFolder.listFiles()
	 * @param folder that created this
	 * @param fd data received as JSON from the web server
	 */
	construct: function(folder, fd) {
		this.base(arguments, folder.getUrl() + "/" + fd.name, fd.name);
		this.__folder = folder;
	},
	
	members: {
	
		/** {IFolder} parent folder */
		__folder : undefined,
		
		/**
		 * Returns the parent folder
		 * @return {IFolder}
		 */
		getFolder: function() { 
			return this.__folder; 
		},
		
		/**
		 * Returns the content type for the file, as determined by the server
		 * @return {String}
		 */
		getContentType: function() { 
			return "application/x-folder"; 
		},
		
		/**
		 * Returns the URL for a thumbnail of the file
		 * @return {String} the URL for a thumbnail of the file or undefined
		 */
		getThumbnailUrl: function() {
			return "htmleditor/icon/48/htmleditor/file-picker/folder.png"; 
		}
	}
});
