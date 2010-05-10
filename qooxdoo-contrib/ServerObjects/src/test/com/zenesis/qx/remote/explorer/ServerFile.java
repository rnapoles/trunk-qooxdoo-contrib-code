/**
 * ************************************************************************
 * 
 *    server-objects - a contrib to the Qooxdoo project that makes server 
 *    and client objects operate seamlessly; like Qooxdoo, server objects 
 *    have properties, events, and methods all of which can be access from
 *    either server or client, regardless of where the original object was
 *    created.
 * 
 *    http://qooxdoo.org
 * 
 *    Copyright:
 *      2010 Zenesis Limited, http://www.zenesis.com
 * 
 *    License:
 *      LGPL: http://www.gnu.org/licenses/lgpl.html
 *      EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *      
 *      This software is provided under the same licensing terms as Qooxdoo,
 *      please see the LICENSE file in the Qooxdoo project's top-level directory 
 *      for details.
 * 
 *    Authors:
 *      * John Spackman (john.spackman@zenesis.com)
 * 
 * ************************************************************************
 */
package com.zenesis.qx.remote.explorer;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;

import com.zenesis.qx.remote.Proxied;
import com.zenesis.qx.remote.ProxyManager;
import com.zenesis.qx.remote.annotations.Properties;
import com.zenesis.qx.remote.annotations.Property;

/**
 * Maintains a mirror image of files on the server but never actually writes to the disk;
 * this is for the File Explorer demo.
 * 
 * @author "John Spackman <john.spackman@zenesis.com>"
 */
@Properties({
	@Property(value="name",event="changeName"),
	@Property("folder"),
	@Property("readOnly"),
	@Property("size"),
	@Property("lastModified"),
	@Property(value="children", onDemand=true, event="changeChildren")
})
public class ServerFile implements Proxied {

	private final File file;
	private ServerFile parent;
	
	private String name;
	private boolean readOnly;
	private Date lastModified;
	private long size;
	private ServerFile[] children;

	/**
	 * @param file
	 * @param parent
	 */
	public ServerFile(File file, ServerFile parent) {
		super();
		this.file = file;
		this.parent = parent;
		
		name = file.getName();
		readOnly = !file.canWrite();
		lastModified = new Date(file.lastModified());
		size = file.length();
	}
	
	/**
	 * Name of the file
	 * @return
	 */
	public String getName() {
		return name;
	}

	/**
	 * Renames the file
	 * @param name
	 */
	public boolean rename(String name) {
		if (name.equals(this.name))
			return true;
		if (parent != null) {
			ServerFile[] files = parent.getChildren();
			if (files != null) {
				for (ServerFile file : files)
					if (file.getName().equalsIgnoreCase(name))
						return false;
			}
		}
		String oldName = name;
		this.name = name;
		ProxyManager.propertyChanged(this, "name", oldName, name);
		return true;
	}

	/**
	 * Gets a list of children, caching the result
	 * @return
	 */
	public ServerFile[] getChildren() {
		if (children != null || !file.isDirectory())
			return children;
		
		File[] files = file.listFiles();
		if (files != null) {
			ArrayList<ServerFile> found = new ArrayList<ServerFile>();
			for (File child : files) {
				if (!child.getName().startsWith("."))
					found.add(new ServerFile(child, this));
			}
			if (!found.isEmpty())
				this.children = found.toArray(new ServerFile[found.size()]);
		}
		return children;
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

}
