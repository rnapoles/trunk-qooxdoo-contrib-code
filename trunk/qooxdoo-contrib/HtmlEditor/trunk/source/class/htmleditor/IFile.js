/**
 * Interface for accessing a file on a server; an object which implements IFile
 * may also implement IFolder.
 */
qx.Interface.define("htmleditor.IFile", {
	
	members: {
		/**
		 * Returns the name of the file, excluding any path information
		 * @return {String}
		 */
		getName: function() { return true; },
		
		/**
		 * Returns the parent folder
		 * @return {IFolder}
		 */
		getFolder: function() { return true; },
		
		/**
		 * Returns the content type for the file, as determined by the server
		 * @return {String}
		 */
		getContentType: function() { return true; },
		
		/**
		 * Returns the URL for a thumbnail of the file
		 * @return {String} the URL for a thumbnail of the file or undefined
		 */
		getThumbnailUrl: function() { return true; },
		
		/**
		 * Returns the URL of the file
		 * @return {String} the URL of the file
		 */
		getUrl: function() { return true; }
	}
});

