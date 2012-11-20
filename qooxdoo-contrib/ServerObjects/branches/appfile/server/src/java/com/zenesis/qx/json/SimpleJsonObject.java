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
package com.zenesis.qx.json;

import java.io.IOException;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializable;
import org.codehaus.jackson.map.SerializerProvider;

/**
 * Very simple object used when we want to output a JS object into the stream but
 * either don't want any members (because we'll populate them later) or where
 * we only have one key/value pair 
 * @author <a href="mailto:john.spackman@zenesis.com">John Spackman</a>
 */
public class SimpleJsonObject implements JsonSerializable {
	
	private final String name;
	private final Object value;

	public SimpleJsonObject(String name, Object value) {
		super();
		this.name = name;
		this.value = value;
	}

	public SimpleJsonObject() {
		super();
		this.name = null;
		this.value = null;
	}

	@Override
	public void serialize(JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
		jgen.writeStartObject();
		if (name != null) {
			if (value != null)
				jgen.writeObjectField(name, value);
			else
				jgen.writeNullField(name);
		}
		jgen.writeEndObject();
	}

}
