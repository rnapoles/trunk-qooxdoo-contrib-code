package com.zenesis.qx.remote;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import org.apache.log4j.Logger;

import com.zenesis.qx.remote.Proxied;
import com.zenesis.qx.remote.ProxyManager;
import com.zenesis.qx.remote.annotations.DoNotProxy;
import com.zenesis.qx.remote.annotations.Properties;
import com.zenesis.qx.remote.annotations.Property;

/**
 * Represents a file on the disk that can be accessed by the application 
 * 
 * @author "John Spackman <john.spackman@zenesis.com>"
 */
@Properties({
	@Property(value="children", onDemand=true, event="changeChildren", arrayType=AppFile.class, expire="expireChildren"),
	@Property("contentType"),
	@Property("folder"),
	@Property("lastModified"),
	@Property(value="name", event="changeName"),
	@Property("parent"),
	@Property("readOnly"),
	@Property("size"),
	@Property("url"),
	@Property("thumbnailUrl")
})
public class AppFile implements Proxied {
	
	private static final Logger log = Logger.getLogger(AppFile.class); 

	private File file;
	private AppFile parent;
	private String url;
	
	private String name;
	private boolean readOnly;
	private Date lastModified;
	private long size;
	private ArrayList<AppFile> children;

	/**
	 * Constructor
	 * @param file
	 * @param parent
	 */
	public AppFile(File file, String url) {
		this(null, file, url);
	}
	
	/**
	 * Constructor
	 * @param file
	 * @param parent
	 */
	public AppFile(AppFile parent, File file, String url) {
		super();
		this.file = file;
		this.url = url;
		this.parent = parent;
		
		name = file.getName();
		readOnly = !file.canWrite();
		lastModified = new Date(file.lastModified());
		size = file.length();
	}
	
	/**
	 * @param file
	 * @param parent
	 */
	protected AppFile(File file, AppFile parent) {
		super();
		this.file = file;
		this.parent = parent;
		this.url = addPath(parent.url, file.getName());
		
		name = file.getName();
		readOnly = !file.canWrite();
		lastModified = new Date(file.lastModified());
		size = file.length();
	}
	
	/**
	 * Creates a child folder
	 * @param path
	 * @return
	 */
	public AppFile createFolder(String path) {
		if (!file.isDirectory())
			return null;
		if (path.contains(".."))
			throw new IllegalArgumentException("Invalid filename " + path + " (double dots are not allowed)");
		if (path.length() > 1 && path.charAt(1) == ':')
			throw new IllegalArgumentException("Invalid filename " + path + " (drive specifications are not allowed)");
		if (path.indexOf('/') > -1)
			throw new IllegalArgumentException("Invalid filename " + path + " (paths are not allowed)");
		File dir = new File(file, path);
		if (!dir.mkdir())
			throw new IllegalArgumentException("Invalid filename " + path + " (could not create directory)");
		AppFile child = new AppFile(dir, this);
		if (children != null)
			children.add(child);
		ProxyManager.propertyChanged(this, "children", children, children);
		return child;
	}
	
	/**
	 * Adds a file to the folder; if copy is true the file is copied, otherwise it is moved
	 * into this folder.
	 * @param file
	 * @param copy if true, the file is copied, not moved
	 * @param makeUniqueName if true and a file with that name already exists, it is renamed to
	 * 	avoid a collision, otherwise the target file is replaced
	 * @return
	 */
	public AppFile addFile(File newFile, String desiredName, boolean copy, boolean makeUniqueName) throws IOException {
		String absPath = newFile.getAbsolutePath();
		if (!newFile.exists())
			throw new FileNotFoundException(absPath);
		file.mkdirs();
		if (!file.isDirectory())
			throw new IOException("Cannot add a file to " + file.getAbsolutePath() + " because it is not a directory");
		
		File dest;
		boolean fileWasReplaced = false;
		if (desiredName == null)
			desiredName = file.getName();

		// Check if it is already in our directory
		if (newFile.getParentFile().getAbsolutePath().equals(this.file.getAbsolutePath()))
			dest = newFile;
		
		// Otherwise copy or move it
		else {
			dest = new File(file, desiredName);
			
			// Check for name collisions
			if (dest.exists()) {
				if (makeUniqueName) {
					// Break out the name body and the extension
					String name = dest.getName();
					String ext;
					int pos = name.lastIndexOf('.');
					if (pos < 0)
						ext = "";
					else {
						ext = name.substring(pos);
						name = name.substring(0, pos);
					}
					
					// Loop until we find a unique name
					for (int index = 1; dest.exists(); index++)
						dest = new File(file, name + '-' + index + ext);
				} else
					fileWasReplaced = true;
			}
			
			// Try and move it first, but fallback to copying the file
			if (!copy) {
				if (fileWasReplaced)
					dest.delete();
				if (!newFile.renameTo(dest))
					copy = true;
			}
			
			// Copy the file
			if (copy) {
				FileOutputStream os = new FileOutputStream(dest);
				FileInputStream is = new FileInputStream(newFile);
				try {
					byte[] buffer = new byte[8 * 1024];  // 8K is Tomcat6 default and best optimized
					int len;
					while ((len = is.read(buffer)) > -1)
						os.write(buffer, 0, len);
				}finally {
					try { os.close(); } catch(IOException e) {}
					try { is.close(); } catch(IOException e) {}
				}
			}
		}

		// Try and find the child
		boolean alreadyLoadedChildren = this.children != null;
		getChildren();
		for (int i = 0; i < children.size(); i++) {
			AppFile child = children.get(i);
			if (child.getName().equalsIgnoreCase(dest.getName()))
				return child;
		}
		
		// If the call to getChildren() loaded the list, then we're done - the file has disappeared
		//	while we looked for it
		if (!alreadyLoadedChildren)
			return null;
		
		// Add the new file to the list
		AppFile newChild = new AppFile(dest, this);
		children.add(newChild);
		ProxyManager.propertyChanged(this, "children", children, children);
		
		return newChild;
	}
	
	/**
	 * Returns the difference between this file and the given directory, i.e. a path
	 * which when added to the directory <code>dir</code> will produce this file.
	 * @param dir the directory to be reached from
	 * @return the relative path
	 */
	public String getRelativePath(AppFile dir) {
		String dirPath = dir.getFile().getAbsolutePath();
		String myPath = file.getAbsolutePath();
		boolean isCaseSensitive = !new File(file.getName().toUpperCase()).equals(new File(file.getName().toLowerCase()));
		if (!isCaseSensitive) {
			dirPath = dirPath.toLowerCase();
			myPath = myPath.toLowerCase();
		}
		
		// Check for easy ancestor relatives
		if (myPath.startsWith(dirPath)) {
			String str = myPath.substring(dirPath.length());
			if (str.length() > 0 && str.charAt(0) == File.separatorChar)
				str = str.substring(1);
			return str;
		}
		
		String strRoot = "";
		
		// Check for file on different root (i.e. different drive on windows)
		File[] roots = File.listRoots();
		for (int i = 0; i < roots.length; i++) {
			strRoot = roots[i].getAbsolutePath();
			if (myPath.startsWith(strRoot)) {
				// Different root?  Then an explicit path is the only way
				if (!dirPath.startsWith(strRoot))
					return myPath;
				
				// Remove the common root
				myPath = myPath.substring(strRoot.length());
				dirPath = dirPath.substring(strRoot.length());
				break;
			}
		}
		
		/*
		 * (1) Easy parent dir - done above
		 * 	Dir:	/a/b/c
		 * 	My:		/a/b/c/d/e
		 * 	Res:	d/e
		 * 
		 * (2) Partial path
		 *	Dir:	/a/b/c
		 *	My:		/a/d/e
		 *	Res:	../../d/e
		 *
		 *	Dir:	/a/b/c/d/e
		 *	My:		/a/x/y
		 *	Res:	../../../../x/y
		 *
		 * (3) Nothing in common 
		 *	Dir:	/a/b/c
		 *	My:		/x/y/z
		 *	Res:	/x/y/z
		 *
		 * (4) Trick question, same dir
		 * 	Dir:	/a/b
		 * 	My:		/a/b/c
		 * 	Res:	c
		 */
		String[] dirSegs = dirPath.split(File.separator);
		String[] mySegs = myPath.split(File.separator);
		
		// Nothing in common?  Retyurn the absolute path
		if (dirSegs.length == 0 || mySegs.length == 0 || !dirSegs[0].equals(mySegs[0]))
			return strRoot + myPath;
		
		// Look for the first disparity
		int firstMismatch = 1; 
		while (firstMismatch < dirSegs.length && firstMismatch < mySegs.length) {
			if (!dirSegs[firstMismatch].equals(mySegs[firstMismatch]))
				break;
			firstMismatch++;
		}
		
		StringBuilder sb = new StringBuilder();
		
		// Add dots to make it back to the common relative
		int dots = dirSegs.length - firstMismatch;
		for (int i = 0; i < dots; i++)
			sb.append("..").append(File.separatorChar);
		
		// Add the remainder
		for (int i = firstMismatch; i < mySegs.length; i++) {
			if (i != firstMismatch)
				sb.append(File.separatorChar);
			sb.append(mySegs[i]);
		}
		
		// Done
		return sb.toString();
	}
	
	/**
	 * Returns the actual, underlying file
	 * @return
	 */
	@DoNotProxy
	public File getFile() {
		return file;
	}
	
	/**
	 * Returns the MIME content type for the file, based on extension
	 * @return
	 */
	public String getContentType() {
		return ProxyManager.getInstance().getContentType(file);
	}
	
	/**
	 * Name of the file
	 * @return
	 */
	public String getName() {
		return name;
	}
	
	/**
	 * @return the url
	 */
	public String getUrl() {
		return url;
	}
	
	/**
	 * @return the url
	 */
	public String getThumbnailUrl() {
		return url + "?gh:size=200x200&enlarge=false";
	}

	/**
	 * Renames the file
	 * @param name
	 */
	public boolean rename(String name) {
		if (parent == null)
			return false;
		if (name.equals(this.name))
			return true;
		File to = new File(file.getParentFile(), name);
		if (to.exists() || !file.renameTo(to))
			return false;
		this.file = to;
		this.url = ProxyManager.changeProperty(this, "url", addPath(parent.url, file.getName()), this.url);
		return true;
	}
	
	/**
	 * Gets a list of children, caching the result
	 * @return
	 */
	public ArrayList<AppFile> getChildren() {
		if (children != null || !file.isDirectory())
			return children;
		loadChildren();
		return children;
	}
	
	/**
	 * Flushes the cached value for the children property
	 * @param property
	 */
	public void expireChildren(ProxyProperty property) {
		children = null;
	}
	
	/**
	 * Loads the children, discarding any existing children
	 */
	private void loadChildren() {
		if (children == null)
			children = new ArrayList<AppFile>();
		else
			children.clear();
		
		File[] files = file.listFiles();
		if (files != null) {
			for (File child : files) {
				if (!child.getName().startsWith("."))
					children.add(new AppFile(child, this));
			}
		}
	}

	/**
	 * Returns a child with the given name, or null if the file could not be found
	 * @param name
	 * @return
	 */
	public AppFile getChild(String name) {
		File file = new File(this.file, name);
		if (!isAncestorOf(file))
			throw new IllegalArgumentException("Cannot find file " + file.getAbsolutePath() + " because it is not in a sub fodler");
		if (!file.exists())
			return null;
		String[] segs = name.split("/");
		AppFile curAppFile = this;
		for (String seg : segs)
			curAppFile = curAppFile.getChildImpl(seg);
		return curAppFile;
	}
	
	/**
	 * Finds a child, and integrates it with this
	 * @param name
	 * @return
	 */
	protected AppFile getChildImpl(String name) {
		if (name.indexOf('/') > -1 || name.indexOf('\\') > -1)
			throw new IllegalArgumentException("Cannot get child called '" + name + "', paths are not supported");
		if (children == null) {
			File file = new File(this.file, name);
			if (!file.exists())
				return null;
			return new AppFile(this, file, addPath(url, name));
		} else {
			for (AppFile child : children) {
				if (child.getName().equalsIgnoreCase(name))
					return child;
			}
			File file = new File(this.file, name);
			if (!file.exists())
				return null;
			AppFile child = new AppFile(this, file, addPath(url, name));
			children.add(child);
			return child;
		}
	}
	
	/**
	 * Tests whether this is a ancestor (parent, grand parent, etc) of the given file
	 * @param file
	 * @return
	 */
	protected boolean isAncestorOf(File file) {
		String tpath;
		String fpath;
		try {
			tpath = this.file.getCanonicalFile().getAbsolutePath();
		}catch(IOException e) {
			log.error("Error getting canoninical path for this=" + this.file.getAbsolutePath() + ": " + e.getMessage());
			return false;
		}
		try {
			fpath = file.getCanonicalFile().getAbsolutePath();
		}catch(IOException e) {
			log.error("Error getting canoninical path for file=" + file.getAbsolutePath() + ": " + e.getMessage());
			return false;
		}
		if (!fpath.startsWith(fpath))
			return false;
		return fpath.length() == tpath.length() || fpath.charAt(tpath.length()) == File.separatorChar;
	}
	
	/**
	 * @return the parent
	 */
	public AppFile getParent() {
		return parent;
	}

	/**
	 * Sets the read-only attribute
	 * @return
	 */
	public boolean isReadOnly() {
		return readOnly;
	}

	/**
	 * Returns the read-only attribute
	 * @param readOnly
	 */
	public void setReadOnly(boolean readOnly) {
		this.readOnly = readOnly;
	}

	/**
	 * Returns the date it was last modified
	 * @return
	 */
	public Date getLastModified() {
		return lastModified;
	}

	/**
	 * Returns the file size
	 * @return
	 */
	public long getSize() {
		return size;
	}

	/**
	 * @return true if the file is a directory
	 */
	public boolean isFolder() {
		return file.isDirectory();
	}

	/**
	 * Deletes the file
	 */
	public void deleteFile() {
		file.delete();
	}

	/**
	 * Appends the name to the base, taking care not to duplicate slashes
	 * @param base
	 * @param name
	 * @return
	 */
	private String addPath(String base, String name) {
		String str = base;
		if (!str.endsWith("/"))
			str += "/";
		str += name;
		return str;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	@DoNotProxy
	public String toString() {
		return file.toString();
	}
}
