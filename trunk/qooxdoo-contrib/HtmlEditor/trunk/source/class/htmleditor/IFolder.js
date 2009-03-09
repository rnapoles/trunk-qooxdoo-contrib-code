/**
 * Interface for iterating through a folder on a server
 */
qx.Interface.define("htmleditor.IFolder", {
	
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
		 * Returns the URL of the folder
		 * @return {String} the URL of the folder
		 */
		getUrl: function() { return true; },
		
		/**
		 * Returns a list of files which are children of this folder; always
		 * returns a value, and will return an empty array if there are no children
		 * or this is not a folder.
		 * @return {Array of IFile} list of child files and folders
		 */
		listFiles: function() { return true; }
	}
});

