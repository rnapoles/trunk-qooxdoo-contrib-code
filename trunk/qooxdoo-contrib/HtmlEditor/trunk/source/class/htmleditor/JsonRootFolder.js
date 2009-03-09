/* ***
 
#asset(htmleditor/icon/*)
 
*/

qx.Class.define("htmleditor.JsonRootFolder", {
	extend : qx.core.Object,
	implement: htmleditor.IFolder,
	
	/**
	 * Constructor.
	 * @param url the URL of the folder; if it ends with "/index.json" then it will be removed
	 */
	construct: function(url, name) {
		var tmp = url.toLowerCase().substring(-10);
		if (tmp == "index.json")
			url = url.substring(0, url.length - 11);
		else if (tmp.substring(2) == "index.js")
			url = url.substring(0, url.length - 9);
		if (url.substring(-1) == '/')
			url = url.substring(0, url.length - 1);
		this._url = url;
		if (name)
			this._name = name;
		else
			this._name = "root";
	},
	
	members: {
	
		/** URL of the folder, excluding the "index.json" filename */
		_url : undefined,
		
		/** Name of the folder */
		_name : undefined,
		
		/** {Array of IFile} List of children */
		__children : undefined,
	
		/**
		 * Returns the name of the file, excluding any path information
		 * @return {String}
		 */
		getName: function() { 
			return this._name;
		},
		
		/**
		 * Returns the parent folder
		 * @return {IFolder}
		 */
		getFolder: function() { 
			this.debug("root folder has no parent");
			return null; 
		},
		
		/**
		 * Returns the URL of the file
		 * @return {String} the URL of the file
		 */
		getUrl: function() { 
			return this._url; 
		},
		
		/**
		 * Returns a list of files which are children of this folder; always
		 * returns a value, and will return an empty array if there are no children
		 * or this is not a folder.
		 * @return {Array of IFile} list of child files and folders
		 */
		listFiles: function() {
			if (this.__children)
				return this.__children;
			this.debug("requesting: " + this._url + "/index.json");
			var req = new qx.io.remote.Request(this._url + "/index.json", "GET", "text/plain");
			req.setAsynchronous(false);
			var data = undefined;
			req.addListener("completed", function(e) {
				var content = e.getContent();
				this.debug("received data: " + content);
				data = eval(content);
			}, this);
			req.send();
			this.__children = [];
			if (data == null)
				this.debug("No files to download");
			else
				for (var i = 0; i < data.length; i++) {
					var fileData = data[i];
					var file;
					if (fileData.isFolder)
						file = new htmleditor.JsonFolder(this, fileData);
					else
						file = new htmleditor.JsonFile(this, fileData);
					this.__children[this.__children.length] = file;
				}
			return this.__children;
		}
	}
});


