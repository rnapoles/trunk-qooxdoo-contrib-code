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

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializable;
import org.codehaus.jackson.map.SerializerProvider;

import com.zenesis.qx.remote.annotations.Remote;

/**
 * ProxyMethod is compiled by ProxyManager and attached to ProxyType to define
 * a method that is proxied.
 * 
 * @author John Spackman
 *
 */
public class ProxyMethod implements JsonSerializable {
	
	public static final Comparator<ProxyMethod> ALPHA_COMPARATOR = new Comparator<ProxyMethod>() {

		/* (non-Javadoc)
		 * @see java.util.Comparator#compare(java.lang.Object, java.lang.Object)
		 */
		@Override
		public int compare(ProxyMethod o1, ProxyMethod o2) {
			return o1.getName().compareTo(o2.getName());
		}
	};

	private final Method method;
	private final Remote.Array array;
	private final Class arrayType;
	private final boolean prefetchResult;
	private final boolean cacheResult;
	
	/**
	 * @param name
	 * @param returnType
	 * @param parameters
	 */
	public ProxyMethod(Method method) {
		super();
		this.method = method;
		
		Class returnType = method.getReturnType();
		boolean prefetchResult = false;
		boolean cacheResult = false;
		com.zenesis.qx.remote.annotations.Method anno = method.getAnnotation(com.zenesis.qx.remote.annotations.Method.class);
		
		if (returnType.isArray() || Iterable.class.isAssignableFrom(returnType)) {
			// How to present on the client - only ArrayList by default is wrapped on the client
			Remote.Array array;
			if (returnType.isArray()) {
				returnType = returnType.getComponentType();
				array = Remote.Array.NATIVE;
			} else {
				returnType = Object.class;
				array = Remote.Array.WRAP;
			}
			
			// Component type
			if (anno != null) {
				if (anno.array() != Remote.Array.DEFAULT)
					array = anno.array();
				if (anno.arrayType() != Object.class)
					returnType = anno.arrayType();
			}
			this.array = array;
			this.arrayType = returnType;
		} else {
			array = null;
			this.arrayType = null;
		}
		
		if (anno != null) {
			if (method.getParameterTypes().length == 0) {
				prefetchResult = anno.prefetchResult();
				cacheResult = anno.cacheResult()||prefetchResult;
			}
		}
		
		this.prefetchResult = prefetchResult;
		this.cacheResult = cacheResult;
	}

	/* (non-Javadoc)
	 * @see org.codehaus.jackson.map.JsonSerializable#serialize(org.codehaus.jackson.JsonGenerator, org.codehaus.jackson.map.SerializerProvider)
	 */
	@Override
	public void serialize(JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
		jgen.writeStartObject();

		// Write the return type
		Class clazz = arrayType != null ? arrayType : method.getReturnType();
		if (Proxied.class.isAssignableFrom(clazz)) {
			ProxyType type = ProxyTypeManager.INSTANCE.getProxyType(clazz);
			jgen.writeObjectField("returnType", type);
		}
		if (cacheResult)
			jgen.writeBooleanField("cacheResult", cacheResult);
		
		// Whether to wrap the return
		if (array != null)
			jgen.writeObjectField("returnArray", array.toString().toLowerCase());
		
		// The parameters - if any are Proxied objects, we need to write their class
		Class[] parameters = method.getParameterTypes();
		if (parameters.length > 0) {
			jgen.writeArrayFieldStart("parameters");
			for (int i = 0; i < parameters.length; i++) {
				if (Proxied.class.isAssignableFrom(parameters[i]))
					jgen.writeObject(ProxyTypeManager.INSTANCE.getProxyType(parameters[i]));
				else
					jgen.writeNull();
			}
			jgen.writeEndArray();
		}
		
		jgen.writeEndObject();
	}
	
	/**
	 * Gets the prefetch value
	 * @param self
	 * @return
	 */
	public Object getPrefetchValue(Object self) {
		try {
			return method.invoke(self);
		}catch(InvocationTargetException e) {
			throw new IllegalStateException("Error while invoking " + method + " on " + self + ": " + e.getCause().getMessage(), e.getCause());
		}catch(IllegalAccessException e) {
			throw new IllegalStateException("Error while invoking " + method + " on " + self + ": " + e.getMessage(), e);
		}
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return method.getName();
	}

	/**
	 * @return the method
	 */
	public Method getMethod() {
		return method;
	}

	/**
	 * @return the prefetchResult
	 */
	public boolean isPrefetchResult() {
		return prefetchResult;
	}

	/**
	 * @return the cacheResult
	 */
	public boolean isCacheResult() {
		return cacheResult;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return method.toString();
	}
	
}
