package com.zenesis.qx.remote;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.StringTokenizer;

import org.apache.log4j.Logger;

import com.zenesis.qx.remote.annotations.AlwaysProxy;
import com.zenesis.qx.remote.annotations.DoNotProxy;
import com.zenesis.qx.remote.annotations.Properties;
import com.zenesis.qx.remote.annotations.Property;
import com.zenesis.qx.remote.annotations.Remote;

/**
 * Basic implementation of a Bootstrap object, which provides methods for handling uploading.
 * The appFilesRoot is the root folder for browsing files, and is used by the FileExplorer; if
 * this is null then files cannot be browsed.
 * 
 * The uploadFolder is where files which are uploaded are placed.
 * 
 * @author "John Spackman <john.spackman@zenesis.com>"
 */
@Properties({
	@Property(value="appFilesRoot", readOnly=Remote.Toggle.TRUE),
	@Property("uploadFolder")
})
public class BasicBootstrap implements UploadReceiver {
	
	private static final Logger log = Logger.getLogger(BasicBootstrap.class);

	private AppFile appFilesRoot;
	private AppFile uploadFolder;
	private HashMap<String, UploadingFile> uploading = new HashMap<String, UploadingFile>();
	private boolean restrictUploadFolder = true;

	/**
	 * Constructor
	 */
	public BasicBootstrap() {
		super();
	}

	/**
	 * @param appFilesRoot
	 */
	public BasicBootstrap(AppFile appFilesRoot) {
		super();
		this.appFilesRoot = appFilesRoot;
	}
	
	/**
	 * Loads proxy classes on the client; this is necessary if the client wants to instantiate
	 * a class before the class definition has been loaded on demand.  The last part can be
	 * an asterisk if all classes in a given package should be loaded
	 * @param name name of the class to transfer, or array of names, or collection, etc
	 */
	@AlwaysProxy
	public void loadProxyType(Object data) throws ClassNotFoundException {
		ProxyManager.loadProxyType(data);
	}
	
	/**
	 * Converts <code>file</code>into an <code>AppFile</code>; the file must be within the root folder
	 * @param file
	 * @return  
	 */
	@DoNotProxy
	public AppFile getAppFile(File file) throws IllegalArgumentException {
		AppFile appFile = getAppFilesRoot();
		if (appFile == null)
			throw new IllegalArgumentException("Cannot convert file because there is no app files root");
		
		// Check it's within the root folder
		String strRF = appFile.getFile().getAbsolutePath().toLowerCase();
		String strF = file.getAbsolutePath().toLowerCase();
		int lenRF = strRF.length();
		if (!strF.startsWith(strRF) || (strF.length() > lenRF && "\\/".indexOf(strF.charAt(lenRF)) < 0))
			throw new IllegalArgumentException("Cannot convert " + strF + " because it is outside the root folder");
		
		// Exact match for the app root
		if (lenRF == strF.length())
			return appFile;
		
		// Walk the tree to find the child
		strF = strF.substring(lenRF + 1).replace('\\', '/');
		StringTokenizer st = new StringTokenizer(strF, "/");
		while (st.hasMoreTokens()) {
			String name = st.nextToken();
			appFile = appFile.getChild(name);
			if (appFile == null)
				return null;
		}
		
		return appFile;
	}
	
	/**
	 * Returns the AppFile for a given download URL (i.e. AppFile.getUrl() matches the result of this method)
	 * @param partialUrl
	 * @return null if the file cannot be found
	 */
	public AppFile getAppFileFromURL(String partialUrl) {
		AppFile appFile = getAppFilesRoot();
		if (appFile == null)
			throw new IllegalArgumentException("Cannot convert file because there is no app files root");
		
		int pos = partialUrl.indexOf('?');
		if (pos > 0)
			partialUrl = partialUrl.substring(0, pos);
		partialUrl = partialUrl.replace('\\', '/');
		
		if (partialUrl.startsWith("/") && !partialUrl.startsWith(appFile.getUrl()))
			throw new IllegalArgumentException("Cannot get AppFile because the url " + partialUrl + " is not inside the app files root");
		partialUrl = partialUrl.substring(appFile.getUrl().length());
		
		StringTokenizer st = new StringTokenizer(partialUrl, "/");
		while (st.hasMoreTokens()) {
			String name = st.nextToken();
			appFile = appFile.getChild(name);
			if (appFile == null)
				return null;
		}
		
		return appFile;
	}
	
	/* (non-Javadoc)
	 * @see com.zenesis.qx.remote.UploadReceiver#beginUploadingFile(com.zenesis.qx.remote.UploadingFile)
	 */
	@Override
	public void beginUploadingFile(UploadingFile upfile) throws IOException {
		uploading.put(upfile.getUploadId(), upfile);
	}

	/* (non-Javadoc)
	 * @see com.zenesis.qx.remote.UploadReceiver#endUploadingFile(com.zenesis.qx.remote.UploadingFile, boolean)
	 */
	@Override
	public AppFile endUploadingFile(UploadingFile upfile, boolean success) throws IOException {
		if (!success) {
			uploading.remove(upfile.getUploadId());
			return null;
		}
		
		Object obj = upfile.getParams().get("uploadFolder");
		AppFile uploadFolder = (AppFile)obj;
		if (uploadFolder != null) {
			if (isRestrictUploadFolder() && getAppFilesRoot() != null) {
				String strUF = uploadFolder.getFile().getAbsolutePath();
				String strRF = getAppFilesRoot().getFile().getAbsolutePath();
				int lenRF = strRF.length();
				if (!strUF.startsWith(strRF) || (strUF.length() > lenRF && "\\/".indexOf(strUF.charAt(lenRF)) < 0))
					throw new IOException("Cannot upload " + upfile + " because the upload folder is outside the root folder");
			}
		} else
			uploadFolder = getUploadFolder();
		if (uploadFolder == null)
			throw new IOException("Cannot upload " + upfile + " because there is no root to upload to");
		AppFile appFile = uploadFolder.addFile(upfile.getFile(), upfile.getOriginalName(), false, true);
		return appFile;
	}

	/* (non-Javadoc)
	 * @see com.zenesis.qx.remote.UploadReceiver#getUploadingFile(java.lang.String)
	 */
	@Override
	public UploadingFile getUploadingFile(String uploadId) {
		UploadingFile upfile = uploading.get(uploadId);
		return upfile;
	}
	
	/* (non-Javadoc)
	 * @see com.zenesis.qx.remote.UploadReceiver#clearUploadedFile(java.lang.String)
	 */
	@Override
	public void clearUploadedFile(String uploadId) {
		uploading.remove(uploadId);
	}

	/**
	 * @return the restrictUploadFolder
	 */
	public boolean isRestrictUploadFolder() {
		return restrictUploadFolder;
	}

	/**
	 * @param restrictUploadFolder the restrictUploadFolder to set
	 */
	@DoNotProxy
	public void setRestrictUploadFolder(boolean restrictUploadFolder) {
		this.restrictUploadFolder = restrictUploadFolder;
	}

	/**
	 * @return the appFilesRoot
	 */
	public AppFile getAppFilesRoot() {
		return appFilesRoot;
	}

	/**
	 * @param appFilesRoot the appFilesRoot to set
	 */
	public void setAppFilesRoot(AppFile appFilesRoot) {
		this.appFilesRoot = appFilesRoot;
	}

	/**
	 * @return the uploadFolder
	 */
	public AppFile getUploadFolder() {
		return uploadFolder;
	}

	/**
	 * @param uploadFolder the uploadFolder to set
	 */
	public void setUploadFolder(AppFile uploadFolder) {
		this.uploadFolder = uploadFolder;
	}
	
	
}
