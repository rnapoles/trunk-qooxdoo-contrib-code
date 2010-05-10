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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import org.apache.log4j.Logger;

import com.zenesis.qx.event.EventManager;
import com.zenesis.qx.remote.annotations.AlwaysProxy;
import com.zenesis.qx.remote.annotations.DoNotProxy;

/**
 * This class is responsible for creating JSON proxy definitions for the client based
 * on reflection.
 * 
 * ProxyManager only generates proxy implementations for interfaces which extend
 * from Proxied - they don't have to derive directly, but they must derive at some
 * point.
 * 
 * Because Javascript does not support overloaded methods the interfaces cannot
 * have conflicting method names; if this is the case an exception will be thrown.
 * 
 * @author John Spackman
 *
 */
public class ProxyTypeManager implements ProxyTypeFactory {
	
	@SuppressWarnings("unused")
	private static final Logger log = Logger.getLogger(ProxyTypeManager.class);
	
	// Singleton instance
	public static final ProxyTypeManager INSTANCE = new ProxyTypeManager();
	
	// Cache of known ProxyTypes
	private final HashMap<Class, ProxyType> proxyTypes = new HashMap<Class, ProxyType>();
	
	/**
	 * Constructor; also creates a default EventManager if one has not been set yet
	 */
	public ProxyTypeManager() {
		super();
		if (EventManager.getInstance() == null)
			new ProxyEventManager(this);
	}

	/* (non-Javadoc)
	 * @see com.zenesis.qx.remote.ProxyTypeFactory#newProxyType(com.zenesis.qx.remote.ProxyType, java.lang.Class, java.util.Set)
	 */
	@Override
	public ProxyType newProxyType(ProxyType superType, Class clazz, Set<ProxyType> interfaces) {
		if (!Proxied.class.isAssignableFrom(clazz))
			return null;
		return new ProxyTypeImpl(superType, clazz, interfaces);
	}

	/**
	 * Returns a ProxyType for a given class, caching the result for future use
	 * @param clazz
	 * @return
	 */
	public ProxyType getProxyType(Class<? extends Proxied> clazz) {
		return getProxyType(clazz, this);
	}
	
	/**
	 * Registers a class for proxying; normal rules for registration apply if factory is null
	 * but otherwise factory is allowed to include methods and classes that would normally be
	 * excluded
	 * @param clazz
	 * @param factory
	 * @return
	 */
	public ProxyType getProxyType(Class clazz, ProxyTypeFactory factory) {
		ProxyType type = proxyTypes.get(clazz);
		if (type != null)
			return type;
		
		if (clazz == Proxied.class)
			throw new IllegalArgumentException("Cannot create ProxyType for Proxied interface");
		
		// Get a list of ProxyTypes for interfaces that this class/interface implement directly;
		//	this will recursively discover other interfaces
		HashSet<ProxyType> interfaces = new HashSet<ProxyType>();
		for (Class ifc : clazz.getInterfaces())
			if (ifc != Proxied.class) {
				ProxyType newType = getProxyType(ifc, factory);
				if (newType != null)
					interfaces.add(newType);
			}
		
		// If it's an interface then there is nothing more to do except create and store the ProxyType
		if (clazz.isInterface()) {
			// Poor inheritance structure may mean we've already created the ProxyType for this
			//	interface
			type = proxyTypes.get(clazz);
			if (type == null) {
				type = new ProxyTypeImpl(null, clazz, interfaces);
				proxyTypes.put(clazz, type);
			}
			return type;
		}
		
		// For a class, we need to get the supertype
		ProxyType superType = null;
		if (clazz.getSuperclass() != Object.class)
			superType = getProxyType(clazz.getSuperclass(), factory);
		
		// Create the type
		type = factory.newProxyType(superType, clazz, interfaces);
		if (type != null)
			proxyTypes.put(clazz, type);
		return type;
	}
	
}
