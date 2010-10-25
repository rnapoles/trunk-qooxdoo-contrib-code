package com.zenesis.qx.remote.relaxng;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.dom4j.Element;

import com.zenesis.qx.remote.AbstractProxyType;
import com.zenesis.qx.remote.ProxyEvent;
import com.zenesis.qx.remote.ProxyMethod;
import com.zenesis.qx.remote.ProxyProperty;
import com.zenesis.qx.remote.ProxyType;

public class RngProxyType extends AbstractProxyType {
	
	private static final ProxyMethod[] NO_METHODS = new ProxyMethod[0];
	
	// Class name
	private final String className;
	
	// Properties in the psuedo-type
	private final HashMap<String, ProxyProperty> properties = new HashMap<String, ProxyProperty>();
	
	/**
	 * Constructor
	 * @param packageName
	 * @param className
	 */
	/*package*/ RngProxyType(String packageName, String className) {
		if (packageName != null && packageName.length() > 0)
			this.className = packageName + '.' + className;
		else
			this.className = className;
	}
	
	/**
	 * Adds a property
	 * @param prop
	 */
	/*package*/ void addProperty(RngProxyProperty prop) {
		properties.put(prop.getName(), prop);
	}
	
	/**
	 * Saves the Instance as XML; called from Instance
	 * @param instance
	 * @param values
	 * @return
	 */
	public Element saveAsXml(Instance instance, Map<String, Object> values) {
		return null;
	}

	/* (non-Javadoc)
	 * @see com.zenesis.qx.remote.AbstractProxyType#getClassName()
	 */
	@Override
	public String getClassName() {
		return className;
	}

	@Override
	public Map<String, ProxyProperty> getProperties() {
		return properties;
	}

	@Override
	public boolean isProperty(String name) {
		return properties.containsKey(name);
	}

	@Override
	public Map<String, ProxyEvent> getEvents() {
		return Collections.EMPTY_MAP;
	}

	@Override
	public ProxyEvent getEvent(String eventName) {
		return null;
	}

	@Override
	public boolean supportsEvent(String eventName) {
		return false;
	}

	
	@Override
	public Class getClazz() {
		return null;
	}

	@Override
	public boolean isInterface() {
		return false;
	}

	@Override
	public ProxyType getSuperType() {
		return null;
	}

	@Override
	public ProxyMethod[] getMethods() {
		return NO_METHODS;
	}

	@Override
	public Set<ProxyType> getInterfaces() {
		return Collections.EMPTY_SET;
	}

}
