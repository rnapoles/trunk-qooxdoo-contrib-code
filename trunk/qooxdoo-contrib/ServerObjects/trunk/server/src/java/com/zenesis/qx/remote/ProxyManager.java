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
import java.io.FileFilter;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.zip.GZIPOutputStream;

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
		ProxySessionTracker tracker = getTracker();
		if (tracker == null)
			return;
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
			else {
				String enc = request.getHeader("Accept-Encoding");
				response.setContentType("text/json; charset=UTF-8");
				OutputStream os = response.getOutputStream();
				
				if (enc != null) {
					/* Don't use deflate - this does not work for ajax calls on IE
					if (enc.indexOf("deflate") > -1) {
						enc = enc.indexOf("x-deflate") != -1 ? "x-deflate" : "deflate";
						os = new DeflaterOutputStream(os, new Deflater(Deflater.BEST_SPEED));
						
					} else */ if (enc.indexOf("gzip") != -1) {
						enc = enc.indexOf("x-gzip") != -1 ? "x-gzip" : "gzip";
						os = new GZIPOutputStream(os);
						
					} else 
						enc = null;
				}
				
				if (enc != null)
					response.addHeader("Content-Encoding", enc);
				new RequestHandler(tracker).processRequest(request.getReader(), os);
			}
		}finally {
			// Done
			deselectTracker(tracker);
		}
	}
	
	/**
	 * Selects the tracker; must be called before (de)serialisation 
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
	
	/**
	 * Changes a value, but only fires the event if the value is changed 
	 * @param <T>
	 * @param keyObject
	 * @param propertyName
	 * @param newValue
	 * @param oldValue
	 * @return
	 */
	public static <T> T changeProperty(Proxied keyObject, String propertyName, T newValue, T oldValue) {
		if (newValue instanceof String) {
			if (((String) newValue).trim().length() == 0)
				newValue = null;
		}
		if (oldValue instanceof String) {
			if (((String) oldValue).trim().length() == 0)
				oldValue = null;
		}
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
		if (tracker == null)
			return;
		CommandQueue queue = tracker.getQueue();
		/* can't do this because we don't want to stop server events firing
		RequestHandler handler = tracker.getRequestHandler();
		if (handler != null && handler.isSettingProperty(keyObject, propertyName))
			return;*/
		ProxyType type = ProxyTypeManager.INSTANCE.getProxyType(keyObject.getClass());
		ProxyProperty property = getProperty(type, propertyName);
		if (property == null) {
			log.warn("Cannot find a property called " + propertyName + " in " + keyObject);
			return;
		}
		if (!tracker.doesClientHaveObject(keyObject))
			return;
		if (property.isOnDemand() && !tracker.doesClientHaveValue(keyObject, property))
			return; //queue.queueCommand(CommandId.CommandType.EXPIRE, keyObject, propertyName, null);
		else
			queue.queueCommand(CommandId.CommandType.SET_VALUE, keyObject, propertyName, property.serialize(keyObject, newValue));
		if (property.getEvent() != null) {
			EventManager.fireDataEvent(keyObject, property.getEvent().getName(), newValue);
		}
	}
	
	public static void preloadProperty(Proxied keyObject, String propertyName, Object value) {
		ProxySessionTracker tracker = getTracker();
		if (tracker == null)
			return;
		CommandQueue queue = tracker.getQueue();
		/* can't do this because we don't want to stop server events firing
		RequestHandler handler = tracker.getRequestHandler();
		if (handler != null && handler.isSettingProperty(keyObject, propertyName))
			return;*/
		ProxyType type = ProxyTypeManager.INSTANCE.getProxyType(keyObject.getClass());
		ProxyProperty property = getProperty(type, propertyName);
		if (property == null) {
			log.warn("Cannot find a property called " + propertyName + " in " + keyObject);
			return;
		}
		if (!property.isOnDemand())
			return;
		queue.queueCommand(CommandId.CommandType.SET_VALUE, keyObject, propertyName, property.serialize(keyObject, value));
	}
	
	/**
	 * Helper static method to register that an on-demand property has changed and it's value should be
	 * expired on the client, so that the next attempt to access it causes a refresh
	 * @param proxied
	 * @param propertyName
	 * @param oldValue
	 * @param newValue
	 */
	public static void expireProperty(Proxied keyObject, String propertyName) {
		ProxySessionTracker tracker = getTracker();
		if (tracker == null)
			return;
		if (!tracker.doesClientHaveObject(keyObject))
			return;
		CommandQueue queue = tracker.getQueue();
		/* can't do this because we don't want to stop server events firing
		RequestHandler handler = tracker.getRequestHandler();
		if (handler != null && handler.isSettingProperty(keyObject, propertyName))
			return;
			*/
		ProxyType type = ProxyTypeManager.INSTANCE.getProxyType(keyObject.getClass());
		ProxyProperty property = getProperty(type, propertyName);
		if (property == null) {
			log.warn("Cannot find a property called " + propertyName + " in " + keyObject);
			return;
		}
		if (property.isOnDemand() && tracker.doesClientHaveValue(keyObject, property))
			queue.queueCommand(CommandId.CommandType.EXPIRE, keyObject, propertyName, null);
	}
	
	/**
	 * Detects whether the object has a given property
	 * @param keyObject
	 * @param propertyName
	 * @return
	 */
	public static boolean hasProperty(Proxied keyObject, String propertyName) {
		ProxySessionTracker tracker = getTracker();
		if (tracker == null)
			return false;
		ProxyType type = ProxyTypeManager.INSTANCE.getProxyType(keyObject.getClass());
		ProxyProperty property = getProperty(type, propertyName);
		return property != null;
	}
	
	/**
	 * Loads a proxy type onto the client
	 * @param clazz
	 */
	public static void loadProxyType(Class<? extends Proxied> clazz) {
		ProxySessionTracker tracker = getTracker();
		if (tracker == null)
			return;
		ProxyType type = ProxyTypeManager.INSTANCE.getProxyType(clazz);
		if (type == null || tracker.isTypeDelivered(type))
			return;
		CommandQueue queue = tracker.getQueue();
		queue.queueCommand(CommandId.CommandType.LOAD_TYPE, type, null, null);
	}
	
	/**
	 * Loads proxy classes on the client; this is necessary if the client wants to instantiate
	 * a class before the class definition has been loaded on demand.  The last part can be
	 * an asterisk if all classes in a given package should be loaded
	 * @param name name of the class to transfer, or array of names, or collection, etc
	 */
	public static void loadProxyType(Object data) throws ClassNotFoundException {
		if (data == null)
			return;
		
		if (data.getClass().isArray()) {
			Object[] arr = (Object[])data;
			for (Object obj : arr)
				loadProxyType(obj);
			
		} else if (data instanceof Collection) {
			Collection coll = (Collection)data;
			for (Object obj : coll)
				loadProxyType(obj);
			
		} else {
			String name = data.toString();
			if (!name.endsWith(".*")) {
				Class clazz = Class.forName(name);
				if (!Proxied.class.isAssignableFrom(clazz))
					throw new IllegalArgumentException(name);
				loadProxyType(clazz);
			} else {
				ArrayList<Class> list = new ArrayList<Class>();
				name = name.substring(0, name.length() - 2);
				if (name.length() == 0)
					throw new IllegalArgumentException("Cannot return all classes to the client");
				Package pkg = Package.getPackage(name);
				if (pkg != null) {
					try {
						name = name.replace('.', '/') + "";
						Enumeration<URL> resources = ProxyManager.class.getClassLoader().getResources(name);
						while (resources.hasMoreElements()) {
							URL url = resources.nextElement();
							File dir = new File(URLDecoder.decode(url.getFile()));
							searchForClasses(list, dir, pkg.getName(), false);
						}
					}catch(IOException e) {
						log.error("Failed to access resources for " + name);
					}
				}
				for (Class clazz : list)
					loadProxyType(clazz);
			}
		}
	}
	
	/***
	 * Searches for classes - there is no way to get the list of classes in a package so the only
	 * way to do it is to search for .class files on the classpath
	 * @param list
	 * @param dir
	 * @param packageName
	 * @param recurse
	 */
	private static void searchForClasses(final ArrayList<Class> list, File dir, final String packageName, final boolean recurse) {
		dir.listFiles(new FileFilter() {
			@Override
			public boolean accept(File file) {
				String name = file.getName();
				
				if (file.isDirectory()) {
					if (recurse && name.charAt(0) != '.') {
						searchForClasses(list, file, packageName + "." + name, recurse);
					}
					
				} else if (name.endsWith(".class")) {
					name = packageName + "." + name.substring(0, name.length() - 6);
					try {
						Class clazz = Class.forName(name);
						if (Proxied.class.isAssignableFrom(clazz))
							list.add(clazz);
					}catch(ClassNotFoundException e) {
						log.error("Could not load class " + name + ": " + e.getMessage());
					}
				}
				
				return false;
			}
		});
	}
	
	/**
	 * Finds a property in a type, recursing up the class hierarchy
	 * @param type
	 * @param name
	 * @return
	 */
	protected static ProxyProperty getProperty(ProxyType type, String name) {
		while (type != null) {
			ProxyProperty prop = type.getProperties().get(name);
			if (prop != null)
				return prop;
			type = type.getSuperType();
		}
		return null;
	}
	
	/**
	 * Invalidates the client cache for the object
	 * @param keyObject
	 */
	public static void invalidateCache(Proxied keyObject) {
		ProxySessionTracker tracker = getTracker();
		if (tracker == null)
			return;
		tracker.invalidateCache(keyObject);
	}

	/**
	 * Invalidates the client cache for the objects
	 * @param keyObjects
	 */
	public static void invalidateCache(Proxied[] keyObjects) {
		ProxySessionTracker tracker = getTracker();
		if (tracker == null)
			return;
		for (Proxied obj : keyObjects)
			tracker.invalidateCache(obj);
	}

	/**
	 * Invalidates the client cache for the objects
	 * @param keyObjects
	 */
	public static void invalidateCache(Iterable list) {
		ProxySessionTracker tracker = getTracker();
		if (tracker == null)
			return;
		for (Iterator iter = list.iterator(); iter.hasNext(); ) {
			Object obj = iter.next();
			if (obj instanceof Proxied)
				tracker.invalidateCache((Proxied)obj);
		}
	}

	/**
	 * Sends a class definition to the server
	 * @param clazz
	 */
	public static void sendClass(Class<? extends Proxied> clazz) {
		ProxySessionTracker tracker = getTracker();
		if (tracker == null)
			return;
		CommandQueue queue = tracker.getQueue();
		ProxyType type = ProxyTypeManager.INSTANCE.getProxyType(clazz);
		queue.queueCommand(CommandId.CommandType.DEFINE, type, null, null);
	}
	
	/**
	 * Helper method to fire an event remotely
	 * @param event
	 */
	public static void fireEvent(Event event) {
		ProxySessionTracker tracker = getTracker();
		if (tracker == null)
			return;
		tracker.getQueue().queueCommand(CommandId.CommandType.FIRE_EVENT, event.getCurrentTarget(), event.getEventName(), null);
	}

	/**
	 * Helper method to fire an event remotely
	 * @param keyObject
	 * @param eventName
	 */
	public static void fireEvent(Object keyObject, String eventName) {
		ProxySessionTracker tracker = getTracker();
		if (tracker == null)
			return;
		tracker.getQueue().queueCommand(CommandId.CommandType.FIRE_EVENT, keyObject, eventName, null);
	}

	/**
	 * Helper method to fire an event remotely
	 * @param keyObject
	 * @param eventName
	 * @param data
	 */
	public static void fireDataEvent(Object keyObject, String eventName, Object data) {
		ProxySessionTracker tracker = getTracker();
		if (tracker == null)
			return;
		tracker.getQueue().queueCommand(CommandId.CommandType.FIRE_EVENT, keyObject, eventName, data);
	}
	
	/**
	 * Helper method to detect whether there are properties/values to be delivered
	 * which are "urgent"
	 * @return
	 */
	public static boolean needsFlush() {
		ProxySessionTracker tracker = getTracker();
		if (tracker == null)
			return false;
		return tracker.needsFlush();
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
