package com.zenesis.qx.remote;

import java.io.IOException;
import java.util.HashMap;

import sun.reflect.ReflectionFactory.GetReflectionFactoryAction;

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

	private AppFile appFilesRoot;
	private AppFile uploadFolder;
	private HashMap<String, UploadingFile> uploading = new HashMap<String, UploadingFile>();

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
			if (getAppFilesRoot() != null) {
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
