package com.zenesis.qx.remote;

import java.io.IOException;

import com.zenesis.qx.remote.annotations.DoNotProxy;

/**
 * This interface must be implemented by Bootstrap objects which can be uploaded to
 * by the UploadHandler
 * 
 * @author "John Spackman <john.spackman@zenesis.com>"
 */
public interface UploadReceiver extends Proxied {

	/**
	 * Called when a file starts uploading; the file must be kept
	 * until endUploadingFile is called.
	 * @param upfile
	 */
	@DoNotProxy
	public void beginUploadingFile(UploadingFile upfile) throws IOException;
	
	/**
	 * Called when a file upload has completed; if the file failed to upload, the
	 * UploadingFile will no longer be accessible from getUploadingFile
	 * @param upfile
	 * @param success
	 * @return if non-null, the AppFile object to return to the client
	 */
	@DoNotProxy
	public AppFile endUploadingFile(UploadingFile upfile, boolean success) throws IOException;
	
	/**
	 * Called to get the details of a file which is being uploaded; if the file has
	 * failed to upload then this method will return null.
	 * @param uploadId
	 * @return the file with a given id, or null if it has finsihed uploading
	 */
	public UploadingFile getUploadingFile(String uploadId);
	
	/**
	 * Called to remove an instance of UploadingFile from the list, i.e. when the client
	 * no longer needs to report progress and the file has been moved somewhere.
	 * @param uploadId
	 */
	public void clearUploadedFile(String uploadId);
}
