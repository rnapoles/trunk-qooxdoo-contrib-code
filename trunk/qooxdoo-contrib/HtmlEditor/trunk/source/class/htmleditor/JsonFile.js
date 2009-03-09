/* ***
 
#asset(htmleditor/icon/*)
 
*/

/**
 * Accesses index.json files on a server in order to discover files
 */
qx.Class.define("htmleditor.JsonFile", {
	extend : qx.core.Object,
	implement: htmleditor.IFile,
	
	/**
	 * Constructor; should only be called by Json[Root]Folder.listFiles()
	 * @param folder that created this
	 * @param fd data received as JSON from the web server
	 */
	construct: function(folder, fd) {
		this.__name = fd.name;
		this.__folder = folder;
		this.__contentType = fd.contentType;
		this.__downloadUrl = folder.getUrl() + "/" + fd.name;
		if (fd.thumbnailUrl) {
			var url = fd.thumbnailUrl;
/*			if (url.substring(0, 5) != "http:") {
				if (url.substring(0, 1) != '/')
					url = folder.getUrl() + "/" + url;
				else
					url = "http://" + url;
			}*/
			this.__thumbnailUrl = url;
		} else
			this.__thumbnailUrl = "htmleditor/icon/48/htmleditor/file-picker/document.png";
	},
	
	members: {
		/** {String} name of the file (or folder) */
		__name : undefined,
		
		/** {IFolder} the parent folder */
		__folder : undefined,
		
		/** {String} MIME content type for the file, if specified by the server */
		__contentType: undefined,
		
		/** {String} where to download a thumbnail or other representation from */
		__thumbnailUrl: undefined,
		
		/** {String} where to download the real mccoy from */
		__downloadUrl: undefined,
		
		/**
		 * Returns the name of the file, excluding any path information
		 * @return {String}
		 */
		getName: function() { 
			return this.__name; 
		},
		
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
			return this.__contentType; 
		},
		
		/**
		 * Returns the URL for a thumbnail of the file
		 * @return {String} the URL for a thumbnail of the file or undefined
		 */
		getThumbnailUrl: function() {
			return this.__thumbnailUrl; 
		},
		
		/**
		 * Returns the URL of the file
		 * @return {String} the URL of the file
		 */
		getUrl: function() {
			return this.__downloadUrl; 
		}
	}
});
