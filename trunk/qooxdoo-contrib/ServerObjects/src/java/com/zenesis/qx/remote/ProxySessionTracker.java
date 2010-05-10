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

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializable;
import org.codehaus.jackson.map.SerializerProvider;


/**
 * This class tracks the uses of Proxies and ProxyTypes for a particular session; types
 * are only transmitted if not previously sent (in that session), and a mapping between
 * server and client instances/proxies is maintained.
 * 
 * This corresponds to a ProxyTracker on the client which can do the reverse of everything
 * done here.
 * 
 * NOTE about sessions: ProxyTracker tracks objects and types delivered for the current
 * instance of an application's session on the client; note that if the user refreshes 
 * the page the application reloads and starts a new session but the HTTP session maintained
 * by the servlet container does not reset.  You'll probably keep an instance of ProxyTracker
 * in the HttpSession for the application, which means that when the application restarts
 * it has to tell the server to clear down and start again; when this happens, the method
 * resetSession() is called, the state is lost, and the ProxyTracker instance is reused.
 * 
 * If you want more control over session resets you can override resetSession(); if you
 * want control over how the bootstrap object is created you can override createBootstrap().
 * 
 * @author John Spackman
 *
 */
public class ProxySessionTracker {
	
	private static final Logger log = Logger.getLogger(ProxySessionTracker.class);
	
	/*
	 * This class encapsulates data that needs to be sent to the server
	 */
	public static final class Proxy implements JsonSerializable {
		public final int serverId;
		public final Proxied proxied;
		public final ProxyType proxyType;
		public final HashSet<ProxyType> extraTypes;

		/**
		 * Constructor, used for existing objects
		 * @param serverId
		 */
		public Proxy(Proxied proxied, int serverId) {
			super();
			this.proxied = proxied;
			this.serverId = serverId;
			this.proxyType = null;
			this.extraTypes = null;
		}

		/**
		 * @param serverId
		 * @param proxyType
		 * @param createNew
		 */
		public Proxy(Proxied proxied, int serverId, ProxyType proxyType) {
			super();
			this.proxied = proxied;
			this.serverId = serverId;
			this.proxyType = proxyType;
			this.extraTypes = null;
		}

		/* (non-Javadoc)
		 * @see org.codehaus.jackson.map.JsonSerializable#serialize(org.codehaus.jackson.JsonGenerator, org.codehaus.jackson.map.SerializerProvider)
		 */
		@Override
		public void serialize(JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
			jgen.writeStartObject();
			jgen.writeNumberField("serverId", serverId);
			if (extraTypes != null)
				jgen.writeObjectField("classes", extraTypes);
			
			// If we have a proxyType, it also means that this is the first time the object is sent to the server
			if (proxyType != null) {
				jgen.writeObjectField("clazz", proxyType);
				if (!proxyType.isInterface()) {
					Collection<ProxyProperty> props = proxyType.getProperties().values();
					if (!props.isEmpty()) {
						jgen.writeObjectFieldStart("values");
						for (ProxyProperty prop : props) {
							if (prop.isOnDemand())
								continue;
							Object value = prop.getValue(proxied);
							jgen.writeObjectField(prop.getName(), value);
						}
						jgen.writeEndObject();
					}
				}
			}
			jgen.writeEndObject();
		}
	}

	/*
	 * This encapsulates a POJO to distinguish it from a Proxied definition
	 */
	public static final class POJO {
		public final Object pojo;

		public POJO(Object pojo) {
			super();
			this.pojo = pojo;
		}
	}
	
	/*
	 * Encapsulates a return value
	 */
	public static final class ReturnValue implements JsonSerializable {
		public final Object value;

		/**
		 * @param value
		 */
		public ReturnValue(Object value) {
			super();
			this.value = value;
		}

		/* (non-Javadoc)
		 * @see org.codehaus.jackson.map.JsonSerializable#serialize(org.codehaus.jackson.JsonGenerator, org.codehaus.jackson.map.SerializerProvider)
		 */
		@Override
		public void serialize(JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
			jgen.writeStartObject();
			jgen.writeStringField("type", "return-value");
			jgen.writeObjectField("value", value);
			if (value instanceof Proxied)
				jgen.writeBooleanField("isProxy", true);
			jgen.writeEndObject();
		}
	}

	// All ProxyTypes which have already been sent to the client
	private final HashSet<ProxyType> deliveredTypes = new HashSet<ProxyType>();
	
	// Mapping all objects that the client knows about against the ID we assigned to them
	private final HashMap<Integer, Proxied> objectsById = new HashMap<Integer, Proxied>();
	private final HashMap<Proxied, Integer> objectIds = new HashMap<Proxied, Integer>();

	// The Object mapper
	private ProxyObjectMapper objectMapper = new ProxyObjectMapper(this);

	// Server IDs are assigned incrementally from 0
	private int nextServerId;
	
	// Queue for properties and events
	private CommandQueue queue;
	
	// The request handler (only while the RequestHandler is active)
	private RequestHandler requestHandler;

	// Bootstrap object
	private final Class<? extends Proxied> bootstrapClass;
	private Proxied bootstrap;

	/**
	 * Creates a tracker for a session; if bootstrapClass is null you must override
	 * createBootstrap() 
	 * @param bootstrapClass
	 */
	public ProxySessionTracker(Class<? extends Proxied> bootstrapClass) {
		super();
		this.bootstrapClass = bootstrapClass;
	}
	
	/**
	 * Resets the session, called when the application restarts
	 */
	/*package*/ void resetSession() {
		queue = null;
		bootstrap = null;
		deliveredTypes.clear();
		objectsById.clear();
		objectIds.clear();
		nextServerId = 0;
	}
	
	/**
	 * Called to create a new instance of the bootstrap class 
	 * @return
	 */
	protected Proxied createBootstrap() {
		try {
			return bootstrapClass.newInstance();
		}catch(IllegalAccessException e) {
			throw new IllegalStateException("Cannot create bootstrap instance from " + bootstrapClass + ": " + e.getMessage());
		}catch(InstantiationException e) {
			Throwable t = (Throwable)e;
			throw new IllegalStateException("Cannot create bootstrap instance from " + bootstrapClass + ": " + t.getMessage(), t);
		}
	}
	
	/**
	 * Returns the bootstrap, creating one if necessary
	 * @return
	 */
	public Proxied getBootstrap() {
		if (bootstrap == null) {
			bootstrap = createBootstrap();
			if (bootstrap == null)
				throw new IllegalStateException("createBootstrap returned null");
		}
		return bootstrap;
	}
	
	/**
	 * Creates an object which can be serialised by Jackson JSON and passed to the
	 * client ProxyTracker to convert into a suitable client object 
	 * @param obj
	 * @return
	 */
	public synchronized Object getProxy(Proxied obj) {
		if (obj == null)
			return null;
		
		// See if it's an object the client already knows about
		Integer serverId = objectIds.get(obj);
		if (serverId != null)
			return new Proxy(obj, serverId);
		
		// See if the client already knows about the type
		ProxyType type = ProxyTypeManager.INSTANCE.getProxyType((Class<Proxied>)obj.getClass());
		
		// Get an ID
		serverId = nextServerId++;
		
		// Store mappings for ID and Proxied object
		objectsById.put(serverId, obj);
		objectIds.put(obj, serverId);
		
		// Return the information for the client
		return new Proxy(obj, serverId, type);
	}
	
	/**
	 * When the client creates an instance of a Proxied class addClientObject is used
	 * to obtain an ID for it and add it to the lists of objects 
	 * @param proxied
	 * @return the new ID for the object
	 */
	public synchronized int addClientObject(Proxied proxied) {
		if (objectIds.containsKey(proxied))
			throw new IllegalArgumentException("Cannot add an existing server object as a client object");
		
		// Get an ID
		int serverId = nextServerId++;
		
		// Store mappings for ID and Proxied object
		objectsById.put(serverId, proxied);
		objectIds.put(proxied, serverId);
		
		return serverId;
	}
	
	/**
	 * Returns the Proxied object that corresponds to a given value from the
	 * client
	 * @param serverId the ID that was originally passed to the client
	 * @return
	 */
	public synchronized Proxied getProxied(int serverId) {
		Proxied proxied = objectsById.get(serverId);
		if (proxied == null)
			throw new IllegalArgumentException("Cannot find Proxied instance for invalid serverId " + serverId);
		return proxied;
	}
	
	/**
	 * Tests whether a ProxyType has already been sent to the client
	 * @param type
	 * @return
	 */
	public boolean isTypeDelivered(ProxyType type) {
		return deliveredTypes.contains(type);
	}
	
	/**
	 * Registers a ProxyType as delivered to the client
	 * @param type
	 * @return
	 */
	public void setTypeDelivered(ProxyType type) {
		if (deliveredTypes.contains(type))
			throw new IllegalArgumentException("ProxyType " + type + " has already been sent to the client");
		deliveredTypes.add(type);
	}
	
	/**
	 * Called to create a new instance of Queue; @see <code>getQueue</code>
	 * @return
	 */
	protected CommandQueue createQueue() {
		return new SimpleQueue();
	}
	
	/**
	 * Returns the Queue, creating one if necessary
	 * @return
	 */
	public CommandQueue getQueue() {
		if (queue == null)
			queue = createQueue();
		return queue;
	}
	
	/**
	 * Returns the RequestHandler (if there is one)
	 * @return null if no RequestHandler is in use
	 */
	/*package*/ RequestHandler getRequestHandler() {
		return requestHandler;
	}
	
	/**
	 * Sets the RequestHandler
	 * @param requestHandler
	 * @throws IllegalArgumentException if there already is a RequestHandler
	 */
	/*package*/ void setRequestHandler(RequestHandler requestHandler) {
		if (this.requestHandler != null && requestHandler != null)
			throw new IllegalArgumentException("Cannot set RequestHandler more than once");
		this.requestHandler = requestHandler;
	}
	
	/**
	 * Detects whether there is any data to flush
	 * @return
	 */
	public boolean hasDataToFlush() {
		return queue != null && queue.hasDataToFlush();
	}
	
	/**
	 * Detects whether the queue needs to be "urgently" flushed
	 * @return
	 */
	public boolean needsFlush() {
		return queue != null && queue.needsFlush();
	}
	
	/**
	 * Writes an object and any required class definitions etc out to a JSON String
	 * @param obj
	 * @return
	 */
	public String toJSON(Object obj) {
		StringWriter strWriter = new StringWriter();
		try {
			toJSON(obj, strWriter);
		}catch(IOException e) {
			throw new IllegalArgumentException(e);
		}
		return strWriter.toString();
	}

	/**
	 * Writes an object and any required class definitions etc
	 * @param obj
	 * @return
	 */
	public void toJSON(Object obj, Writer writer) throws IOException {
		if (!(obj instanceof Proxied))
			obj = new POJO(obj);
		
		objectMapper.writeValue(writer, obj);
	}
	
	/**
	 * Parses JSON and returns a suitable object
	 * @param str
	 * @return
	 */
	public Object fromJSON(String str) {
		try {
			return fromJSON(new StringReader(str));
		} catch (IOException e) {
			log.error("Error while parsing: " + e.getClass() + ": " + e.getMessage() + "; code was: " + str + "\n");
			throw new IllegalArgumentException(e);
		}
	}
	
	/**
	 * Parses JSON and returns a suitable object
	 * @param reader
	 * @return
	 * @throws IOException
	 */
	public Object fromJSON(Reader reader) throws IOException {
		try {
			Object obj = objectMapper.readValue(reader, Object.class);
			return obj;
		}catch(JsonParseException e) {
			throw new IOException(e.getMessage(), e);
		}
	}

	/**
	 * Returns the Jackson JSON ObjectMapper
	 * @return
	 */
	public ProxyObjectMapper getObjectMapper() {
		return objectMapper;
	}

}
