package com.zenesis.qx.remote;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Comparator;
import java.util.Date;

import com.zenesis.qx.remote.annotations.Properties;
import com.zenesis.qx.remote.annotations.Property;
import com.zenesis.qx.remote.annotations.Remote;

public class ProxyPropertyImpl extends AbstractProxyProperty {

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
	
	// Accessors or field
	private Method getMethod;
	private Method setMethod;
	private Field field;
	
	// Translators
	private Method serializeMethod;
	private Method deserializeMethod;
	private Method expireMethod;
	
	// Annotation
	private final Property anno;
	
	/**
	 * Creates a ProxyProperty from a Property annotation
	 * @param anno
	 */
	public ProxyPropertyImpl(Class clazz, Property anno, Properties annoProperties) {
		super(anno.value());
		this.anno = anno;
		this.clazz = clazz;
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
		if (anno.readOnly() != Remote.Toggle.DEFAULT)
			readOnly = anno.readOnly().booleanValue;
		if (anno.serialize().length() > 0)
			serializeMethod = findMethod(anno.serialize(), new Class[] { ProxyProperty.class, Object.class });
		if (anno.deserialize().length() > 0)
			deserializeMethod = findMethod(anno.deserialize(), new Class[] { ProxyProperty.class, Object.class });
		if (anno.expire().length() > 0)
			expireMethod = findMethod(anno.expire(), new Class[] { ProxyProperty.class });
	}

	/**
	 * Helper method to get a (de-)serializer method
	 * @param name
	 * @return
	 */
	private Method findMethod(String name, Class[] paramTypes) {
		try {
			Method method = clazz.getMethod(name, paramTypes);
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
		
		if (anno.get().length() > 0)
			getMethod = findMethod(anno.get(), new Class[0]);
		
		// Look for a public field first
		if (getMethod == null)
			try {
				field = clazz.getField(name);
				field.setAccessible(true); // Disable access tests, MAJOR performance improvement
				if (sendExceptions == null)
					sendExceptions = false;
				propertyClass = new MetaClass(field.getType());
			}catch(NoSuchFieldException e) {
				field = null;
			}

		// Try for a getXxxx() method
		String upname = upname(name);
		
		// Find the get accessor
		if (getMethod == null && field == null) {
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
		}
		if (field != null)
			propertyClass = new MetaClass(field.getType());
		else
			propertyClass = new MetaClass(getMethod.getReturnType());
			
		// Check exception handling
		if (sendExceptions == null && getMethod.getExceptionTypes().length > 0)
			sendExceptions = true;
		
		if (anno.set().length() > 0)
			setMethod = findMethod(anno.set(), new Class[] { clazz });
		
		// Try for a setXxxx() method
		if (setMethod == null && (readOnly == null || !readOnly))
			try {
				setMethod = clazz.getMethod("set" + upname, new Class[] { getMethod.getReturnType() });
				setMethod.setAccessible(true); // Disable access tests, MAJOR performance improvement
				if (sendExceptions == null && setMethod.getExceptionTypes().length > 0)
					sendExceptions = true;
			} catch(NoSuchMethodException e) {
				setMethod = null;
			}
		if (setMethod == null && field == null)
			readOnly = true;
		
		// If there is a custom serialiser, then use it's return type as the definitive Java class 
		if (serializeMethod != null && serializeMethod.getReturnType() != Object.class)
			propertyClass = new MetaClass(serializeMethod.getReturnType());
		
		// ArrayList
		if (propertyClass.isCollection()) {
			if (anno.arrayType() != Object.class)
				propertyClass.setJavaType(anno.arrayType());
			propertyClass.setWrapArray(anno.array() != Remote.Array.NATIVE);
			
		// Array
		} else if (propertyClass.isArray()) {
			if (anno.arrayType() != Object.class) {
				if (anno.arrayType() != propertyClass.getJavaType())
					throw new IllegalStateException("Conflicting array types between annotation and declaration in " + this);
				propertyClass.setJavaType(anno.arrayType());
			}
			propertyClass.setWrapArray(anno.array() == Remote.Array.WRAP);
		}
		
		// Finish up
		if (sendExceptions == null)
			sendExceptions = false;
		if (readOnly == null) {
			if (field != null || setMethod != null)
				readOnly = false;
			else if (setMethod == null && propertyClass.isCollection())
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
	@Override
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
	@Override
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
	@Override
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
			if (value != null && propertyClass.isSubclassOf(Date.class)) {
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
	@Override
	public boolean isReadOnly() {
		getAccessors();
		return super.isReadOnly();
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
