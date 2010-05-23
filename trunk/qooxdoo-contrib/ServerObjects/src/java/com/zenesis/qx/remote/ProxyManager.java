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
import java.io.IOException;

import javax.activation.MimetypesFileTypeMap;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.zenesis.qx.event.Event;
import com.zenesis.qx.event.EventListener;
import com.zenesis.qx.event.EventManager;
import com.zenesis.qx.remote.CommandId.CommandType;

/**
 * This class needs to be implemented by whatever software hosts the proxies
 * @author John Spackman
 *
 */
public class ProxyManager implements EventListener {
	
	private static final Logger log = Logger.getLogger(ProxyManager.class);

	// Singleton instance
	private static ProxyManager s_instance;
	
	// Current Tracker for this thread
	private static final ThreadLocal<ProxySessionTracker> s_currentTracker = new ThreadLocal<ProxySessionTracker>();
	
	// MIME type mapper, null until first use
	private static MimetypesFileTypeMap s_fileTypeMap;
	
	/**
	 * Constructor; will set the singleton instance if it has not already been set 
	 */
	protected ProxyManager() {
		super();
		if (s_instance != null)
			throw new IllegalStateException("Cannot have multiple ProxyManager instances");
		else
			s_instance = this;
	}

	@Override
	public void handleEvent(Event event) {
		getTracker().getQueue().queueCommand(CommandType.FIRE_EVENT, event.getCurrentTarget(), event.getEventName(), event.getData());
	}
	
	/**
	 * Creates a temporary file
	 * @param fileName
	 * @return
	 * @throws IOException
	 */
	public File createTemporaryFile(String fileName) throws IOException {
		String body;
		String ext;
		int pos = fileName.indexOf('.');
		if (pos < 0) {
			body = fileName;
			ext = "";
		} else {
			body = fileName.substring(0, pos);
			ext = fileName.substring(pos);
		}
		File file = File.createTempFile("upload-" + body, ext);
		return file;
	}
	
	/**
	 * Returns the MIME content type for a file 
	 * @param file
	 * @return
	 */
	public String getContentType(File file) {
		if (s_fileTypeMap == null)
			s_fileTypeMap = new MimetypesFileTypeMap();
		String contentType = s_fileTypeMap.getContentType(file);
		return contentType;
	}
	
	/**
	 * Helper method that handles the request
	 * @param request
	 * @param response
	 * @param bootstrapClass
	 * @param appName
	 * @throws ServletException
	 * @throws IOException
	 */
	public static void handleRequest(HttpServletRequest request, HttpServletResponse response, 
			Class<? extends Proxied> bootstrapClass, String appName) 
			throws ServletException, IOException {
		
		HttpSession session = request.getSession();
		
		ProxySessionTracker tracker = (ProxySessionTracker)session.getAttribute(appName);
		if (tracker == null) {
			tracker = new ProxySessionTracker(bootstrapClass);
			session.setAttribute(appName, tracker);
		}
		
		// Select the tracker
		selectTracker(tracker);
		try {
			// Process the request
	        String contentType = request.getContentType();
			if (request.getMethod().toUpperCase().equals("POST") && contentType != null && contentType.startsWith("multipart/form-data"))
				new UploadHandler(tracker).processUpload(request, response);
			else
				new RequestHandler(tracker).processRequest(request.getReader(), response.getWriter());
		}finally {
			// Done
			deselectTracker(tracker);
		}
	}
	
	/**
	 * Selects the tracker; must be called before and (de)serialisation 
	 * @param tracker
	 * @throws IllegalArgumentException if there is already a tracker selected
	 */
	public static void selectTracker(ProxySessionTracker tracker) throws IllegalArgumentException{
		if (s_currentTracker.get() != null)
			throw new IllegalArgumentException("Cannot set multiple trackers");
		s_currentTracker.set(tracker);
	}
	
	/**
	 * Deselects the tracker; must be called after and (de)serialisation is complete 
	 * @param tracker
	 * @throws IllegalArgumentException if the tracker is not the same as before
	 */
	public static void deselectTracker(ProxySessionTracker tracker) throws IllegalArgumentException {
		if (s_currentTracker.get() != tracker)
			throw new IllegalArgumentException("Cannot unselect the wrong tracker");
		s_currentTracker.set(null);
	}
	
	/**
	 * Called during de/serialisation to get the ProxyTracker
	 * @return
	 */
	public static ProxySessionTracker getTracker() {
		return s_currentTracker.get();
	}
	
	public static <T> T changeProperty(Proxied keyObject, String propertyName, T newValue, T oldValue) {
		if (newValue == oldValue || (newValue != null && oldValue != null && newValue.equals(oldValue)))
			return oldValue;
		propertyChanged(keyObject, propertyName, newValue, oldValue);
		return newValue;
	}

	/**
	 * Helper static method to register that a property has changed; this also fires a server event for
	 * the property if an event is defined
	 * @param proxied
	 * @param propertyName
	 * @param oldValue
	 * @param newValue
	 */
	public static void propertyChanged(Proxied keyObject, String propertyName, Object newValue, Object oldValue) {
		ProxySessionTracker tracker = getTracker();
		CommandQueue queue = tracker.getQueue();
		RequestHandler handler = tracker.getRequestHandler();
		if (handler != null && handler.isSettingProperty(keyObject, propertyName))
			return;
		ProxyType type = ProxyTypeManager.INSTANCE.getProxyType(keyObject.getClass());
		ProxyProperty property = type.getProperty(propertyName);
		if (property.isOnDemand())
			queue.queueCommand(CommandId.CommandType.EXPIRE, keyObject, propertyName, null);
		else
			queue.queueCommand(CommandId.CommandType.SET_VALUE, keyObject, propertyName, newValue);
		if (property.getEvent() != null)
			EventManager.getInstance().fireDataEvent(keyObject, property.getEvent().getName(), newValue);
	}
	
	/**
	 * Helper method to fire an event remotely
	 * @param event
	 */
	public static void fireEvent(Event event) {
		getTracker().getQueue().queueCommand(CommandId.CommandType.FIRE_EVENT, event.getCurrentTarget(), event.getEventName(), null);
	}

	/**
	 * Helper method to fire an event remotely
	 * @param keyObject
	 * @param eventName
	 */
	public static void fireEvent(Object keyObject, String eventName) {
		getTracker().getQueue().queueCommand(CommandId.CommandType.FIRE_EVENT, keyObject, eventName, null);
	}

	/**
	 * Helper method to fire an event remotely
	 * @param keyObject
	 * @param eventName
	 * @param data
	 */
	public static void fireDataEvent(Object keyObject, String eventName, Object data) {
		getTracker().getQueue().queueCommand(CommandId.CommandType.FIRE_EVENT, keyObject, eventName, data);
	}
	
	/**
	 * Helper method to detect whether there are properties/values to be delivered
	 * which are "urgent"
	 * @return
	 */
	public static boolean needsFlush() {
		return getTracker().needsFlush();
	}

	/**
	 * Gets the singleton instance
	 * @return
	 */
	public static ProxyManager getInstance() {
		if (s_instance == null)
			new ProxyManager();
		return s_instance;
	}
	
	/**
	 * Sets the singleton instance
	 * @param instance
	 */
	public static void setInstance(ProxyManager instance) {
		if (s_instance != null && instance != null)
			log.warn("Replacing ProxyManager " + s_instance + " with " + instance);
		s_instance = instance;
	}
}
