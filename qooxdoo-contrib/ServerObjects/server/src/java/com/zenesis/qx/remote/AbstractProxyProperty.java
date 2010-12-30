package com.zenesis.qx.remote;

import java.io.IOException;
import java.util.Date;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.SerializerProvider;

import com.zenesis.qx.remote.annotations.Remote;

public abstract class AbstractProxyProperty implements ProxyProperty {

	// Name of the property
	protected final String name;
	
	// Whether to sync
	protected Remote.Sync sync;
	
	// Whether on demand
	protected boolean onDemand;
	
	// Any event that gets fired
	protected ProxyEvent event;
	
	// Whether null is a valid value
	protected boolean nullable;
	
	// Whether to send exceptions which occur while setting a value received from teh client
	protected Boolean sendExceptions;
	
	// Whether readonly
	protected Boolean readOnly;
	
	// The data type of the property and  (if an array) the component type of the array
	protected MetaClass propertyClass;
	
	public AbstractProxyProperty(String name) {
		super();
		this.name = name;
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
		
		Class clazz = propertyClass.getJavaType();
		if (propertyClass.isArray() || propertyClass.isCollection()) {
			if (!propertyClass.isWrapArray())
				gen.writeStringField("array", "native");
			else
				gen.writeStringField("array", "wrap");
		} else { 
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
			ProxyType type = propertyClass.getProxyType();
			gen.writeObjectField("clazz", type);
		}
		gen.writeEndObject();
	}

	/**
	 * Returns true if this property is readonly
	 * @return
	 */
	@Override
	public boolean isReadOnly() {
		return readOnly != null && readOnly;
	}


	/**
	 * @return the name
	 */
	@Override
	public String getName() {
		return name;
	}

	/**
	 * @return the sync
	 */
	@Override
	public Remote.Sync getSync() {
		return sync;
	}

	/**
	 * @return the event
	 */
	@Override
	public ProxyEvent getEvent() {
		return event;
	}

	/**
	 * @return the nullable
	 */
	@Override
	public boolean isNullable() {
		return nullable;
	}

	/**
	 * @return the onDemand
	 */
	@Override
	public boolean isOnDemand() {
		return onDemand;
	}

	/**
	 * @return the sendExceptions
	 */
	@Override
	public boolean isSendExceptions() {
		return sendExceptions != null && sendExceptions;
	}

	/**
	 * @return the propertyClass
	 */
	@Override
	public MetaClass getPropertyClass() {
		return propertyClass;
	}

}
