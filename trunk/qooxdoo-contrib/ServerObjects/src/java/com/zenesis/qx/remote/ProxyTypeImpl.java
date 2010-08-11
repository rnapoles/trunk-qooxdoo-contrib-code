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

import java.lang.reflect.Method;
import java.io.IOException;
import java.util.ArrayList;

import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.SerializerProvider;

import com.zenesis.qx.remote.annotations.AlwaysProxy;
import com.zenesis.qx.remote.annotations.DoNotProxy;
import com.zenesis.qx.remote.annotations.Event;
import com.zenesis.qx.remote.annotations.Events;
import com.zenesis.qx.remote.annotations.ExplicitProxyOnly;
import com.zenesis.qx.remote.annotations.Properties;
import com.zenesis.qx.remote.annotations.Property;
import com.zenesis.qx.remote.annotations.Remote;
import com.zenesis.qx.remote.annotations.Remote.Array;

public class ProxyTypeImpl implements ProxyType {

	// The class being represented
	private final Class clazz;
	
	// Base ProxyType that represents the class that clazz is derived from
	private final ProxyType superType;
	
	// Interfaces implements by clazz 
	private final Set<ProxyType> interfaces;
	
	// Methods (not including property accessors)
	private final ProxyMethod[] methods;
	
	// Properties
	private final HashMap<String, ProxyProperty> properties;
	
	// Property Event Names
	private Set<String> propertyEventNames;
	
	// Events
	private final HashMap<String, ProxyEvent> events;
	
	/**
	 * Constructor, used for defining interfaces which are to be proxied
	 * @param className
	 * @param methods
	 */
	public ProxyTypeImpl(ProxyType superType, Class clazz, Set<ProxyType> interfaces) {
		super();
		if (interfaces == null)
			interfaces = Collections.EMPTY_SET;
		this.superType = superType;
		this.interfaces = interfaces;
		this.clazz = clazz;
		
		// Get a complete list of methods from the interfaces that the new class has to 
		//	implement; we include methods marked as DoNotProxy so that we can check for 
		//	conflicting instructions
		HashMap<String, Method> methods = new HashMap<String, Method>();
		if (!clazz.isInterface()) {
			// Get a full list of the interfaces which our class has to implement
			HashSet<ProxyType> allInterfaces = new HashSet<ProxyType>();
			getAllInterfaces(allInterfaces, interfaces);

			for (ProxyType ifcType : allInterfaces)
				addMethods(clazz, methods, ifcType.getClazz(), true);
		}
		
		// If the class does not have any proxied interfaces or the class is marked with
		//	the AlwaysProxy annotation, then we take methods from the class definition
		addMethods(clazz, methods, clazz, !clazz.isAnnotationPresent(ExplicitProxyOnly.class) &&
				(clazz.isInterface() || interfaces.isEmpty() || clazz.isAnnotationPresent(AlwaysProxy.class)));
			
		// Remove any methods which are already defined in the super types
		for (ProxyType tmpType = superType; tmpType != null; tmpType = tmpType.getSuperType()) {
			for (ProxyMethod method : tmpType.getMethods())
				methods.remove(method.getName());
		}
		
		// Load properties
		HashMap<String, ProxyEvent> events = new HashMap<String, ProxyEvent>();
		HashMap<String, ProxyProperty> properties = new HashMap<String, ProxyProperty>();
		if (clazz.isAnnotationPresent(Properties.class)) {
			Properties annoProperties = (Properties)clazz.getAnnotation(Properties.class);
			for (Property anno : annoProperties.value()) {
				ProxyProperty property = new ProxyProperty(clazz, anno, annoProperties);
				properties.put(anno.value(), property);
				ProxyEvent event = property.getEvent();
				if (event != null)
					events.put(event.getName(), event);
			}
		}
		
		// Classes need to have all inherited properties added
		if (!clazz.isInterface()) {
			for (ProxyType type : interfaces)
				type.addProperties(properties);
		}
		
		// Remove property accessors
		for (ProxyProperty prop : properties.values()) {
			String upname = Character.toUpperCase(prop.getName().charAt(0)) + prop.getName().substring(1);
			methods.remove("get" + upname);
			methods.remove("set" + upname);
			methods.remove("is" + upname);
			if (prop.getSerializeMethod() != null)
				methods.remove(prop.getSerializeMethod().getName());
			if (prop.getDeserializeMethod() != null)
				methods.remove(prop.getDeserializeMethod().getName());
		}
		
		// Load events
		if (clazz.isAnnotationPresent(Events.class)) {
			Events annoEvents = (Events)clazz.getAnnotation(Events.class);
			for (Event annoEvent : annoEvents.value()) {
				if (!events.containsKey(annoEvent.value()))
					events.put(annoEvent.value(), new ProxyEvent(annoEvent));
			}
		}
		
		// Classes need to have all inherited events added
		if (!clazz.isInterface()) {
			for (ProxyType type : interfaces)
				type.addEvents(events);
		}
		
		// Save
		this.properties = properties.isEmpty() ? null : properties;
		this.events = events.isEmpty() ? null : events;
		
		// Now remove the DoNotProxy methods
		ArrayList<ProxyMethod> proxyMethods = new ArrayList<ProxyMethod>();
		for (Method method : methods.values())
			if (!method.isAnnotationPresent(DoNotProxy.class))
				proxyMethods.add(new ProxyMethod(method));
		Collections.sort(proxyMethods, ProxyMethod.ALPHA_COMPARATOR);
		
		this.methods = proxyMethods.toArray(new ProxyMethod[proxyMethods.size()]);
	}
	
	protected void addMethods(Class targetClass, HashMap<String, Method> methods, Class fromClass, boolean defaultProxy) {
		boolean explicitOnly = fromClass.isAnnotationPresent(ExplicitProxyOnly.class);
		Method[] ifcMethods = fromClass.getDeclaredMethods();
		for (Method method : ifcMethods) {
			method.setAccessible(true);// Short cut access controls validation
			if (explicitOnly && !method.isAnnotationPresent(AlwaysProxy.class) && !method.isAnnotationPresent(com.zenesis.qx.remote.annotations.Method.class))
				continue;
			Method existing = methods.get(method.getName());
			
			// The same method can appear more than once, but only if they are
			//	identical - we just ignore it
			if (existing != null) {
				// If the class is declaring a DoNotProxy method that a parent interface is allowing,
				//	that's an error
				boolean dnpMethod = method.isAnnotationPresent(DoNotProxy.class);
				boolean dnpExisting = existing.isAnnotationPresent(DoNotProxy.class);
				if (existing != null && dnpMethod && !dnpExisting)
					throw new IllegalArgumentException("Cannot create a proxy for " + clazz + 
							" because it has conflicting DoNotProxy between " + method + " and " + existing);
				
				// Method overloading is not possible
				if (isConflicting(method, existing))
					throw new IllegalArgumentException("Cannot create a proxy for " + targetClass + 
							" because it has overloaded method " + method + " first seen in " + existing);
				continue;
			}
			
			Boolean canProxy = canProxy(fromClass, method);
			if (canProxy == null)
				canProxy = defaultProxy;
			if (canProxy)
				methods.put(method.getName(), method);
		}
	}
	
	protected boolean isConflicting(Method method, Method existing) {
		// The same method can appear more than once, but only if they are
		//	identical - we just ignore it
		if (existing != null) {
			Class[] epts = existing.getParameterTypes();
			Class[] mpts = method.getParameterTypes();
			if (epts.length == mpts.length) {
				boolean ok = true;
				for (int i = 0; ok && i < epts.length; i++)
					if (epts[i] != mpts[i])
						return true;
			}
		}
		
		return false;
	}
	
	protected Boolean canProxy(Class clazz, Method method) {
		if (method.isAnnotationPresent(AlwaysProxy.class) || method.isAnnotationPresent(com.zenesis.qx.remote.annotations.Method.class))
			return true;
		return null;
	}
	
	/**
	 * Recursively adds to addInterfaces to get a list of all interfaces which can be proxied.
	 * @param allInterfaces
	 * @param interfaces
	 * @return
	 */
	protected HashSet<ProxyType> getAllInterfaces(HashSet<ProxyType> allInterfaces, Set<ProxyType> interfaces) {
		for (ProxyType type : interfaces) {
			allInterfaces.add(type);
			getAllInterfaces(allInterfaces, type.getInterfaces());
		}
		return allInterfaces;
	}
	
	@Override
	public Set<String> getPropertyEventNames() {
		if (propertyEventNames != null)
			return propertyEventNames;
		if (properties.isEmpty())
			return propertyEventNames = Collections.EMPTY_SET;
		propertyEventNames = new HashSet<String>();
		for (ProxyProperty property : properties.values()) {
			ProxyEvent event = property.getEvent();
			if (event != null)
				propertyEventNames.add(event.getName());
		}
		if (propertyEventNames.isEmpty())
			propertyEventNames = Collections.EMPTY_SET;
		return propertyEventNames;
	}
	
	/**
	 * Detects whether the method is a property accessor
	 * @param method
	 * @return
	 */
	protected boolean isPropertyAccessor(Method method) {
		String name = method.getName();
		if (!name.startsWith("set") && !name.startsWith("get"))
			return false;
		name = Character.toLowerCase(name.charAt(3)) + name.substring(4);
		return isProperty(name);
	}
	
	@Override
	public boolean isProperty(String name) {
		if (properties != null && properties.containsKey(name))
			return true;
		if (interfaces != null)
			for (ProxyType type : interfaces)
				if (type.isProperty(name))
					return true;
		return false;
	}
	
	@Override
	public void addProperties(HashMap<String, ProxyProperty> properties) {
		if (this.properties != null)
			for (ProxyProperty prop : this.properties.values())
				properties.put(prop.getName(), prop);
		if (interfaces != null)
			for (ProxyType type : interfaces)
				type.addProperties(properties);
	}
	
	@Override
	public void addEvents(HashMap<String, ProxyEvent> events) {
		if (this.events != null)
			for (ProxyEvent event : this.events.values())
				events.put(event.getName(), event);
		if (interfaces != null)
			for (ProxyType type : interfaces)
				type.addEvents(events);
	}
	
	/**
	 * @return the superType
	 */
	@Override
	public ProxyType getSuperType() {
		return superType;
	}

	@Override
	public boolean isInterface() {
		return clazz.isInterface();
	}
	
	@Override
	public Class getClazz() {
		return clazz;
	}

	@Override
	public ProxyMethod[] getMethods() {
		return methods;
	}

	@Override
	public Set<ProxyType> getInterfaces() {
		return interfaces;
	}
	
	@Override
	public Map<String, ProxyProperty> getProperties() {
		if (properties == null)
			return Collections.EMPTY_MAP;
		return properties;
	}
	
	@Override
	public ProxyProperty getProperty(String propertyName) {
		if (properties == null)
			return null;
		return properties.get(propertyName);
	}

	@Override
	public Map<String, ProxyEvent> getEvents() {
		if (events == null)
			return Collections.EMPTY_MAP;
		return events;
	}
	
	@Override
	public boolean supportsEvent(String eventName) {
		if (events == null)
			return false;
		return events.containsKey(eventName);
	}
	
	@Override
	public ProxyEvent getEvent(String eventName) {
		if (events == null)
			return null;
		return events.get(eventName);
	}
	
	/*package*/ void serialize(JsonGenerator gen, SerializerProvider sp, Remote.Array array) throws IOException, JsonProcessingException {
		ProxySessionTracker tracker = ((ProxyObjectMapper)gen.getCodec()).getTracker();
		
		String className = clazz.getName();
		if (array == Array.NATIVE)
			className += "[]";
		else if (array == Array.WRAP)
			className += "[wrap]";
		
		if (tracker.isTypeDelivered(this)) {
			gen.writeString(className);
			return;
		}

		tracker.setTypeDelivered(this);
		gen.writeStartObject();
		gen.writeStringField("className", className);
		if (clazz.isInterface())
			gen.writeBooleanField("isInterface", true);
		if (getSuperType() != null)
			gen.writeObjectField("extend", getSuperType());
		if (!interfaces.isEmpty()) {
			gen.writeArrayFieldStart("interfaces");
			for (ProxyType type : interfaces)
				gen.writeObject(type);
			gen.writeEndArray();
		}
		if (methods.length > 0) {
			gen.writeObjectFieldStart("methods");
			for (ProxyMethod method : methods)
				gen.writeObjectField(method.getName(), method);
			gen.writeEndObject();
		}
		if (!clazz.isInterface()) {
			if (properties != null && !properties.isEmpty()) {
				gen.writeObjectFieldStart("properties");
				for (ProxyProperty property : properties.values())
					gen.writeObjectField(property.getName(), property);
				gen.writeEndObject();
			}
			if (events != null && !events.isEmpty()) {
				gen.writeObjectFieldStart("events");
				getPropertyEventNames();
				for (ProxyEvent event : events.values()) {
					gen.writeObjectFieldStart(event.getName());
					if (propertyEventNames.contains(event.getName()))
						gen.writeBooleanField("isProperty", true);
					gen.writeEndObject();
				}
				gen.writeEndObject();
			}
		}
		gen.writeEndObject();
	}
	
	/* (non-Javadoc)
	 * @see org.codehaus.jackson.map.JsonSerializable#serialize(org.codehaus.jackson.JsonGenerator, org.codehaus.jackson.map.SerializerProvider)
	 */
	@Override
	public void serialize(JsonGenerator gen, SerializerProvider sp) throws IOException, JsonProcessingException {
		serialize(gen, sp, null);
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		return obj instanceof ProxyType && ((ProxyType)obj).getClazz() == clazz;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		return clazz.hashCode();
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return clazz.toString();
	}
}
