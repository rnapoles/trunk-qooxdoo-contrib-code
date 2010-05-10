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
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Comparator;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializable;
import org.codehaus.jackson.map.SerializerProvider;

import com.zenesis.qx.remote.annotations.Property;
import com.zenesis.qx.remote.annotations.Remote;
import com.zenesis.qx.remote.annotations.Remote.Sync;

/**
 * Represents a property that a ProxyType instance has
 * 
 * @author John Spackman [john.spackman@zenesis.com]
 */
public class ProxyProperty implements JsonSerializable {
	
	public static final Comparator<ProxyProperty> ALPHA_COMPARATOR = new Comparator<ProxyProperty>() {

		/* (non-Javadoc)
		 * @see java.util.Comparator#compare(java.lang.Object, java.lang.Object)
		 */
		@Override
		public int compare(ProxyProperty o1, ProxyProperty o2) {
			return o1.getName().compareTo(o2.getName());
		}
	};
	
	private static final Class[] NO_CLASSES = {};

	private final Class clazz;
	private final String name;
	private final Remote.Sync sync;
	private final boolean onDemand;
	private final ProxyEvent event;
	private final boolean nullable;
	private Boolean sendExceptions;
	private Remote.Array array;
	private Boolean readOnly;
	
	private Method getMethod;
	private Method setMethod;
	private Field field;
	private Class propertyClass;
	private Class propertyArrayClass;
	
	/**
	 * @param name
	 * @param sync
	 * @param caching
	 * @param event
	 */
	public ProxyProperty(Class clazz, String name, Sync sync, ProxyEvent event) {
		super();
		this.clazz = clazz;
		this.name = name;
		this.sync = sync;
		this.event = event;
		this.nullable = true;
		this.onDemand = false;
	}
	
	/**
	 * @param name
	 * @param sync
	 * @param caching
	 */
	public ProxyProperty(Class clazz, String name, Sync sync) {
		this(clazz, name, sync, null);
	}
	
	/**
	 * Creates a ProxyProperty from a Property annotation
	 * @param anno
	 */
	public ProxyProperty(Class clazz, Property anno) {
		super();
		this.clazz = clazz;
		name = anno.value();
		sync = anno.sync();
		if (anno.event().length() == 0)
			event = null;
		else 
			event = new ProxyEvent(anno.event());
		nullable = anno.nullable();
		onDemand = anno.onDemand();
		sendExceptions = anno.exceptions().booleanValue;
		if (anno.array() != Remote.Array.DEFAULT)
			array = anno.array();
		if (anno.arrayType() != Object.class)
			propertyArrayClass = anno.arrayType();
		if (anno.readOnly() != Remote.Toggle.DEFAULT)
			readOnly = anno.readOnly().booleanValue;
	}
	
	/**
	 * Gets the accessor(s) for the property, caching the result
	 */
	private void getAccessors() {
		if (field != null || getMethod != null)
			return;
		
		// Look for a public field first 
		try {
			field = clazz.getField(name);
			field.setAccessible(true); // Disable access tests, MAJOR performance improvement
			if (sendExceptions == null)
				sendExceptions = false;
			propertyClass = field.getType();
		}catch(NoSuchFieldException e) {
			field = null;
		}

		if (field == null) {
			// Try for a getXxxx() method
			String upname = Character.toUpperCase(name.charAt(0)) + name.substring(1);
			try {
				getMethod = clazz.getMethod("get" + upname, NO_CLASSES);
				getMethod.setAccessible(true); // Disable access tests, MAJOR performance improvement
			} catch(NoSuchMethodException e) {
			}
			
			// Fallback to a isXxxx() method
			if (getMethod == null)
				try {
					getMethod = clazz.getMethod("is" + upname, NO_CLASSES);
					getMethod.setAccessible(true); // Disable access tests, MAJOR performance improvement
				} catch(NoSuchMethodException e) {
					throw new IllegalArgumentException("Cannot find any accessor for property " + name + " in class " + clazz);
				}
			
			// Check exception handling
			if (sendExceptions == null && getMethod.getExceptionTypes().length > 0)
				sendExceptions = true;
			
			// Try for a setXxxx() method
			if (readOnly == null || !readOnly)
				try {
					setMethod = clazz.getMethod("set" + upname, new Class[] { getMethod.getReturnType() });
					setMethod.setAccessible(true); // Disable access tests, MAJOR performance improvement
					if (sendExceptions == null && setMethod.getExceptionTypes().length > 0)
						sendExceptions = true;
				} catch(NoSuchMethodException e) {
					setMethod = null;
				}
			propertyClass = getMethod.getReturnType();
		}
		
		boolean isArrayList = ArrayList.class.isAssignableFrom(getMethod.getReturnType());
		
		// ArrayList
		if (isArrayList && propertyArrayClass == null) {
			propertyArrayClass = Object.class;
			if (array == null)
				array = Remote.Array.WRAP;
			
		// Array
		} else if (propertyClass.isArray()) {
			if (propertyArrayClass != null && propertyArrayClass != propertyClass.getComponentType())
				throw new IllegalStateException("Conflicting array types between annotation and declaration in " + this);
			propertyArrayClass = propertyClass.getComponentType();
			if (array == null)
				array = Remote.Array.NATIVE;
		}
		
		// Finish up
		if (sendExceptions == null)
			sendExceptions = false;
		if (readOnly == null) {
			if (field != null || setMethod != null)
				readOnly = false;
			else if (setMethod == null && isArrayList)
				readOnly = false;
			else
				readOnly = true;
		}
	}
	
	/**
	 * Returns the value currently in the property of an object 
	 * @param proxied
	 * @return
	 */
	public Object getValue(Proxied proxied) {
		getAccessors();
		Object result = null;
		try {
			if (field != null)
				result = field.get(proxied);
			else
				result = getMethod.invoke(proxied);
		} catch(InvocationTargetException e) {
			Throwable t = e.getTargetException();
			throw new IllegalArgumentException("Cannot read property " + name + " in class " + clazz + " in object " + proxied + ": " + t.getMessage(), t);
		} catch(IllegalAccessException e) {
			throw new IllegalArgumentException("Cannot read property " + name + " in class " + clazz + " in object " + proxied + ": " + e.getMessage(), e);
		}
		return result;
	}
	
	/**
	 * Sets the value of a property in an object
	 * @param proxied
	 * @param value
	 */
	public void setValue(Proxied proxied, Object value) {
		getAccessors();
		try {
			if (field != null) {
				if (!readOnly)
					field.set(proxied, value);
			} else if (setMethod != null)
				setMethod.invoke(proxied, value);
		} catch(InvocationTargetException e) {
			Throwable t = e.getTargetException();
			throw new IllegalArgumentException("Cannot write property " + name + " in class " + clazz + " in object " + proxied + ": " + t.getMessage(), t);
		} catch(IllegalAccessException e) {
			throw new IllegalArgumentException("Cannot write property " + name + " in class " + clazz + " in object " + proxied + ": " + e.getMessage(), e);
		} catch(IllegalArgumentException e) {
			throw e;
		}
	}
	
	/**
	 * Returns true if this property is readonly
	 * @return
	 */
	public boolean isReadOnly() {
		getAccessors();
		return readOnly;
	}

	@Override
	public void serialize(JsonGenerator gen, SerializerProvider sp) throws IOException, JsonProcessingException {
		gen.writeStartObject();
		gen.writeStringField("sync", sync.remoteId);
		if (event != null)
			gen.writeStringField("event", event.getName());
		gen.writeBooleanField("nullable", nullable);
		if (onDemand)
			gen.writeBooleanField("onDemand", true);
		if (isReadOnly())
			gen.writeBooleanField("readOnly", true);
		
		Class clazz;
		boolean isArrayList = ArrayList.class.isAssignableFrom(propertyClass);
		if (propertyClass.isArray() || isArrayList) {
			clazz = propertyArrayClass;
			if (array == Remote.Array.NATIVE)
				gen.writeStringField("array", "native");
			else
				gen.writeStringField("array", "wrap");
		} else 
			clazz = propertyClass;
		if (Proxied.class.isAssignableFrom(clazz)) {
			ProxyType type = ProxyTypeManager.INSTANCE.getProxyType(clazz);
			gen.writeObjectField("clazz", type);
		}
		gen.writeEndObject();
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @return the sync
	 */
	public Remote.Sync getSync() {
		return sync;
	}

	/**
	 * @return the event
	 */
	public ProxyEvent getEvent() {
		return event;
	}

	/**
	 * @return the nullable
	 */
	public boolean isNullable() {
		return nullable;
	}

	/**
	 * @return the onDemand
	 */
	public boolean isOnDemand() {
		return onDemand;
	}

	/**
	 * @return the sendExceptions
	 */
	public boolean isSendExceptions() {
		return sendExceptions;
	}

	/**
	 * @return the propertyClass
	 */
	public Class getPropertyClass() {
		return propertyClass;
	}

	/**
	 * @return the propertyArrayClass
	 */
	public Class getPropertyArrayClass() {
		return propertyArrayClass;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return clazz.toString() + "." + name;
	}
	
}
