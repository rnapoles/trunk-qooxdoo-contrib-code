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

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;
import com.zenesis.qx.json.JsonSerialiserFactory;

/**
 * Simple wrapper for Jackson ObjectMapper that uses our custom de/serialisation factories and adds a few helper
 * methods.
 * 
 * @author <a href="mailto:john.spackman@zenesis.com">John Spackman</a>
 */
public class ProxyObjectMapper extends ObjectMapper {
	
	private static final Logger log = Logger.getLogger(ProxyObjectMapper.class);
	
	private final ProxySessionTracker tracker;

	public ProxyObjectMapper(ProxySessionTracker tracker) {
		this(tracker, true);
	}
	
	public ProxyObjectMapper(ProxySessionTracker tracker, boolean indent) {
		super();
		this.tracker = tracker;
		setSerializerFactory(JsonSerialiserFactory.INSTANCE);
		
		//setQuoteFieldNames(false);
		setIndent(indent);
	}

	/**
	 * @return the tracker
	 */
	public ProxySessionTracker getTracker() {
		return tracker;
	}

	/**
	 * Enables or disabled quoted field names
	 * @param set
	 */
	public void setQuoteFieldNames(boolean set) {
		if (set)
			getJsonFactory().enable(JsonGenerator.Feature.QUOTE_FIELD_NAMES);
		else
			getJsonFactory().disable(JsonGenerator.Feature.QUOTE_FIELD_NAMES);
	}
	
	/**
	 * Whether field names will be quoted
	 * @return
	 */
	public boolean isQuoteFieldNames() {
		return getJsonFactory().isEnabled(JsonGenerator.Feature.QUOTE_FIELD_NAMES);
	}
	
	/**
	 * Enables or disables indentation
	 * @param set
	 */
	public void setIndent(boolean set) {
		if (set)
			getSerializationConfig().enable(SerializationConfig.Feature.INDENT_OUTPUT);
		else
			getSerializationConfig().disable(SerializationConfig.Feature.INDENT_OUTPUT);
	}
	
	/**
	 * Whether indentation is used in serialisation
	 * @return
	 */
	public boolean isIndent() {
		return getSerializationConfig().isEnabled(SerializationConfig.Feature.INDENT_OUTPUT);
	}
}
