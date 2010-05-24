package com.zenesis.qx.remote;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

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
	@Property(value="children", onDemand=true, event="changeChildren", arrayType=AppFile.class),
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

	private File file;
	private AppFile parent;
	private String url;
	
	private String name;
	private boolean readOnly;
	private Date lastModified;
	private long size;
	private ArrayList<AppFile> children;

	/**
	 * Constructor, used for the root of the tree
	 * @param file
	 * @param parent
	 */
	public AppFile(File file, String url) {
		super();
		if (!file.isDirectory())
			throw new IllegalArgumentException("Cannot have a root folder which is not a directory!");
		this.file = file;
		this.url = url;
		this.parent = null;
		
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
		this.url = parent.url + '/' + file.getName();
		
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
					byte[] buffer = new byte[32 * 1024];
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
		return url + "?gh:size=200x200";
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
		this.name = ProxyManager.changeProperty(this, "name", name, this.name);
		this.url = ProxyManager.changeProperty(this, "url", parent.url + '/' + file.getName(), this.url);
		return true;
	}

	/**
	 * Gets a list of children, caching the result
	 * @return
	 */
	public ArrayList<AppFile> getChildren() {
		if (children != null || !file.isDirectory())
			return children;
		
		File[] files = file.listFiles();
		if (files != null) {
			ArrayList<AppFile> found = new ArrayList<AppFile>();
			for (File child : files) {
				if (!child.getName().startsWith("."))
					found.add(new AppFile(child, this));
			}
			this.children = found;
		}
		return children;
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
		// Not implemented!
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
