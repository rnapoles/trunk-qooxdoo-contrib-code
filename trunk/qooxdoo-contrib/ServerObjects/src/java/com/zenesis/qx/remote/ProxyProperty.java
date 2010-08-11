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
import java.util.Date;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializable;
import org.codehaus.jackson.map.SerializerProvider;

import com.zenesis.qx.remote.annotations.Properties;
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

	// The class the property belongs to
	private final Class clazz;
	
	// Name of the property
	private final String name;
	
	// Whether to sync
	private final Remote.Sync sync;
	
	// Whether on demand
	private final boolean onDemand;
	
	// Any event that gets fired
	private final ProxyEvent event;
	
	// Whether null is a valid value
	private final boolean nullable;
	
	// Whether to send exceptions which occur while setting a value received from teh client
	private Boolean sendExceptions;
	
	// If it's an array, how to represent on the client
	private Remote.Array array;
	
	// Whether readonly
	private Boolean readOnly;
	
	// The data type of the property and  (if an array) the component type of the array
	private Class propertyClass;
	private Class propertyArrayClass;
	
	// Accessors or field
	private Method getMethod;
	private Method setMethod;
	private Field field;
	
	// Translators
	private Method serializeMethod;
	private Method deserializeMethod;
	private Method expireMethod;
	
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
	public ProxyProperty(Class clazz, Property anno, Properties annoProperties) {
		super();
		this.clazz = clazz;
		name = anno.value();
		sync = anno.sync();
		if (anno.event().length() == 0) {
			if (annoProperties.autoEvents())
				event = new ProxyEvent("change" + upname(name));
			else
				event = null;
		} else 
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
		if (anno.serialize().length() > 0)
			serializeMethod = findSerializeMethod(anno.serialize());
		if (anno.deserialize().length() > 0)
			deserializeMethod = findSerializeMethod(anno.deserialize());
		if (anno.expire().length() > 0)
			expireMethod = findExpireMethod(anno.expire());
	}

	/**
	 * Helper method to get a (de-)serializer method
	 * @param name
	 * @return
	 */
	private Method findSerializeMethod(String name) {
		try {
			Method method = clazz.getMethod(name, new Class[] { ProxyProperty.class, Object.class });
			if (method.getReturnType() == Void.TYPE)
				throw new IllegalArgumentException("Cannot find suitable de/serialisation method (void return types not allowed): " + method);
			method.setAccessible(true);
			return method;
		}catch(NoSuchMethodException e) {
			throw new IllegalArgumentException("Cannot find a de/serialisation method called " + name + ": " + e.getMessage());
		}
	}
	
	/**
	 * Helper method to get a (de-)serializer method
	 * @param name
	 * @return
	 */
	private Method findExpireMethod(String name) {
		try {
			Method method = clazz.getMethod(name, new Class[] { ProxyProperty.class });
			method.setAccessible(true);
			return method;
		}catch(NoSuchMethodException e) {
			throw new IllegalArgumentException("Cannot find an expire method called " + name + ": " + e.getMessage());
		}
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
			String upname = upname(name);
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
		
		if (serializeMethod != null && serializeMethod.getReturnType() != Object.class)
			propertyClass = serializeMethod.getReturnType();
		
		boolean isCollection = Iterable.class.isAssignableFrom(propertyClass);
		
		// ArrayList
		if (isCollection && propertyArrayClass == null) {
			propertyArrayClass = Object.class;
			if (array == null) {
				if (ArrayList.class.isAssignableFrom(getMethod.getReturnType()))
					array = Remote.Array.WRAP;
				else
					array = Remote.Array.NATIVE;
			}
			
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
			else if (setMethod == null && isCollection)
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
			
			result = serialize(proxied, result);
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
		value = deserialize(proxied, value);
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
			throw new IllegalArgumentException("Failed to set value for property " + name + " in class " + clazz + " to value " + value, e);
		}
	}

	/**
	 * Expires the cached value, in response to the same event on the client
	 * @param proxied
	 */
	public void expire(Proxied proxied) {
		getAccessors();
		if (expireMethod != null)
			try {
				expireMethod.invoke(proxied, this);
			} catch(InvocationTargetException e) {
				Throwable t = e.getTargetException();
				throw new IllegalArgumentException("Cannot write property " + name + " in class " + clazz + " in object " + proxied + ": " + t.getMessage(), t);
			} catch(IllegalAccessException e) {
				throw new IllegalArgumentException("Cannot write property " + name + " in class " + clazz + " in object " + proxied + ": " + e.getMessage(), e);
			} catch(IllegalArgumentException e) {
				throw new IllegalArgumentException("Failed to expire value for property " + name + " in class " + clazz, e);
			}
	}
	
	/**
	 * Called internally to serialize a value to the client
	 * @param proxied
	 * @param value
	 * @return
	 */
	protected Object serialize(Proxied proxied, Object value) {
		try {
			if (serializeMethod != null)
				value = serializeMethod.invoke(proxied, this, value);
		} catch(InvocationTargetException e) {
			Throwable t = e.getTargetException();
			throw new IllegalArgumentException("Cannot write property " + name + " in class " + clazz + " in object " + proxied + ": " + t.getMessage(), t);
		} catch(IllegalAccessException e) {
			throw new IllegalArgumentException("Cannot write property " + name + " in class " + clazz + " in object " + proxied + ": " + e.getMessage(), e);
		} catch(IllegalArgumentException e) {
			throw new IllegalArgumentException("Failed to set value for property " + name + " in class " + clazz + " to value " + value, e);
		}
		return value;
	}
	
	/**
	 * Called internally to deserialize a value from the client
	 * @param proxied
	 * @param value
	 * @return
	 */
	protected Object deserialize(Proxied proxied, Object value) {
		try {
			if (value != null && Date.class.isAssignableFrom(propertyClass)) {
				long millis = ((Number)value).longValue();
				value = new Date(millis);
			}
			if (deserializeMethod != null)
				value = deserializeMethod.invoke(proxied, this, value);
		} catch(InvocationTargetException e) {
			Throwable t = e.getTargetException();
			throw new IllegalArgumentException("Cannot write property " + name + " in class " + clazz + " in object " + proxied + ": " + t.getMessage(), t);
		} catch(IllegalAccessException e) {
			throw new IllegalArgumentException("Cannot write property " + name + " in class " + clazz + " in object " + proxied + ": " + e.getMessage(), e);
		} catch(IllegalArgumentException e) {
			throw new IllegalArgumentException("Failed to set value for property " + name + " in class " + clazz + " to value " + value, e);
		}
		return value;
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
		} else { 
			clazz = propertyClass;
			if (clazz == boolean.class || clazz == Boolean.class)
				gen.writeStringField("check", "Boolean");
			else if (clazz == int.class || clazz == Integer.class)
				gen.writeStringField("check", "Integer");
			else if (clazz == double.class || clazz == Double.class)
				gen.writeStringField("check", "Number");
			else if (clazz == float.class || clazz == Float.class)
				gen.writeStringField("check", "Number");
			else if (clazz == char.class || clazz == String.class)
				gen.writeStringField("check", "String");
			else if (Date.class.isAssignableFrom(clazz))
				gen.writeStringField("check", "Date");
		}
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

	/**
	 * @return the serializeMethod
	 */
	public Method getSerializeMethod() {
		return serializeMethod;
	}

	/**
	 * @return the deserializeMethod
	 */
	public Method getDeserializeMethod() {
		return deserializeMethod;
	}

	/**
	 * @return the getMethod
	 */
	public Method getGetMethod() {
		return getMethod;
	}

	/**
	 * @return the setMethod
	 */
	public Method getSetMethod() {
		return setMethod;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return clazz.toString() + "." + name;
	}
	
	/**
	 * Converts the first character of name to uppercase
	 * @param name
	 * @return
	 */
	private String upname(String name) {
		String upname = Character.toUpperCase(name.charAt(0)) + name.substring(1);
		return upname;
	}
}
