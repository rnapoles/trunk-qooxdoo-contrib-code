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
package com.zenesis.qx.remote;

import java.io.File;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.oreilly.servlet.multipart.FilePart;
import com.oreilly.servlet.multipart.MultipartParser;
import com.oreilly.servlet.multipart.ParamPart;
import com.oreilly.servlet.multipart.Part;
import com.zenesis.qx.remote.CommandId.CommandType;
import com.zenesis.qx.remote.RequestHandler.ExceptionDetails;

/**
 * Handles file uploads and attaches them to a ProxySessionTracker
 * 
 * @author "John Spackman <john.spackman@zenesis.com>"
 */
public class UploadHandler {
	
	private static final Logger log = Logger.getLogger(UploadHandler.class);

	public static final int MAX_UPLOAD_SIZE = 1024 * 1024 * 50; 	// Default max size of uploads, 50Mb
	public static final String DEFAULT_ENCODING = "ISO-8859-1";		// Default encoding for parameters

	// Number of uploads received to date - used for a unique upload ID if none is given with the file
	private static int s_numberOfUploads;
	
	// The session tracker
	private final ProxySessionTracker tracker;
	
	// Maximum overall upload size, in bytes
	private long maxUploadSize = MAX_UPLOAD_SIZE;
	
	// String encoding for parameters
	private String encoding = DEFAULT_ENCODING;
	
	/**
	 * @param tracker
	 */
	public UploadHandler(ProxySessionTracker tracker) {
		super();
		this.tracker = tracker;
	}
	
	/**
	 * Handles the upload
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void processUpload(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String contentType = request.getContentType();
        if (contentType == null || !contentType.startsWith("multipart/form-data")) {
        	log.error("Unsuitable content type: " + contentType);
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST, "Unsuitable content type " + contentType);
        	return;
        }
        if (!request.getMethod().equals("POST")) {
        	log.error("Unsuitable method: " + request.getMethod());
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST, "Unsuitable method: " + request.getMethod());
        	return;
        }
		if (maxUploadSize > -1 && request.getContentLength() > maxUploadSize) {
        	log.error("Upload is too big: " + request.getContentLength() + " exceeds " + maxUploadSize);
			response.setStatus(HttpServletResponse.SC_NOT_ACCEPTABLE, "Upload is too big: " + request.getContentLength() + " exceeds " + maxUploadSize);
        	return;
		}
		response.setContentType("text/html");
        
		// Accumulate POST parameters
		HashMap<String, String> params = new HashMap<String, String>();
		
	    // Get query parameters
		if (request.getQueryString() != null)
			parseQuery(params, request.getQueryString());

        ArrayList<AppFile> files = new ArrayList<AppFile>();
        
        UploadReceiver receiver = (UploadReceiver)tracker.getBootstrap();
        
        try {
			MultipartParser parser = new MultipartParser(request, Integer.MAX_VALUE, true, true, null);
			Part part;
			while ((part = parser.readNextPart()) != null) {
				String name = part.getName();
				
				if (part.isParam()) {
					ParamPart paramPart = (ParamPart) part;
					String value = paramPart.getStringValue();
					params.put(name, value);
					
				} else {
					FilePart filePart = (FilePart) part;
					String fileName = filePart.getFileName();
					if (fileName == null || fileName.trim().length() == 0)
						fileName = "unnamed-upload";
					filePart.setRenamePolicy(null);
					File file = ProxyManager.getInstance().createTemporaryFile(fileName);
					String uploadId = params.get("uploadId");
					s_numberOfUploads++;
					if (uploadId == null)
						uploadId = "__UPLOAD_ID_" + s_numberOfUploads;
					
					log.info("Starting receive of " + file.getAbsolutePath());
					UploadingFile uploading = new UploadingFile(uploadId, file, fileName, params);
					receiver.beginUploadingFile(uploading);
	
					FileOutputStream os = null;
					InputStream is = null;
					try {
						os = new FileOutputStream(file);
						is = filePart.getInputStream();
						byte[] buffer = new byte[32 * 1024];
						int length;
						while ((length = is.read(buffer)) > -1) {
							uploading.addBytesUploaded(length);
							os.write(buffer, 0, length);
						}
						is.close();
						is = null;
						os.close();
						os = null;
						log.info("Receive complete");
						AppFile appFile = receiver.endUploadingFile(uploading, true);
						files.add(appFile);
					}catch(IOException e) {
						log.error("Failed to upload " + file.getName() + ": " + e.getMessage(), e);
						
						receiver.endUploadingFile(uploading, false);
						file.delete();
						if (is != null)
							try {
								is.close();
							} catch(IOException e2) {
								
							}
						if (os != null)
							try {
								os.close();
							} catch(IOException e2) {
								
							}
						throw e;
					}
				}
			}
			tracker.getQueue().queueCommand(CommandId.CommandType.FUNCTION_RETURN, null, null, files);
        }catch(IOException e) {
    		tracker.getQueue().queueCommand(CommandType.EXCEPTION, null, null, new ExceptionDetails(e.getClass().getName(), e.getMessage()));
        }
		response.setStatus(HttpServletResponse.SC_OK);
		if (tracker.hasDataToFlush())	
    		tracker.getObjectMapper().writeValue(response.getWriter(), tracker.getQueue());
	}
    
    /**
     * Helper function which converts a query string into a map of
     * parameters
     * @param query
     * @return
     */
    private static void parseQuery(HashMap<String, String> params, String query) {
    	if (query == null || query.length() == 0)
    		return;
		StringTokenizer st = new StringTokenizer(query, "&");
		while (st.hasMoreTokens()) {
			String name = st.nextToken();
			String value = "";
			int pos = name.indexOf('=');
			if (pos > -1) {
				value = name.substring(pos + 1);
				name = name.substring(0, pos);
			}
			
			params.put(name, value);
		}
    }
}
