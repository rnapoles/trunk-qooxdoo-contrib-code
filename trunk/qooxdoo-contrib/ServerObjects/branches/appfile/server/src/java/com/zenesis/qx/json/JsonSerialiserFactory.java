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
import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.BeanProperty;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializationConfig;
import org.codehaus.jackson.map.SerializerFactory;
import org.codehaus.jackson.map.SerializerFactory.Config;
import org.codehaus.jackson.map.SerializerProvider;
import org.codehaus.jackson.map.ser.BeanSerializerFactory;
import org.codehaus.jackson.type.JavaType;

public class JsonSerialiserFactory extends BeanSerializerFactory {
	
	private static final SimpleDateFormat DF = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	
	public static final JsonSerialiserFactory INSTANCE = new JsonSerialiserFactory(null);
	
	private static final JsonSerializer SER_DATE = new JsonSerializer<Date>() {

		/* (non-Javadoc)
		 * @see org.codehaus.jackson.map.JsonSerializer#serialize(java.lang.Object, org.codehaus.jackson.JsonGenerator, org.codehaus.jackson.map.SerializerProvider)
		 */
		@Override
		public void serialize(Date value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
			if (value == null)
				jgen.writeNull();
			else
				jgen.writeRawValue("new Date(\"" + DF.format(value) + "\")");
		}
	};
	
	private static final JsonSerializer SER_ENUM = new JsonSerializer<Enum>() {

		/* (non-Javadoc)
		 * @see org.codehaus.jackson.map.JsonSerializer#serialize(java.lang.Object, org.codehaus.jackson.JsonGenerator, org.codehaus.jackson.map.SerializerProvider)
		 */
		@Override
		public void serialize(Enum value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
			if (value == null)
				jgen.writeNull();
			else
				jgen.writeString(enumToCamelCase(value));
		}
	};

	/* (non-Javadoc)
	 * @see org.codehaus.jackson.map.ser.BeanSerializerFactory#createSerializer(org.codehaus.jackson.map.SerializationConfig, org.codehaus.jackson.type.JavaType, org.codehaus.jackson.map.BeanProperty)
	 */
	@Override
	public JsonSerializer<Object> createSerializer(SerializationConfig config, JavaType origType, BeanProperty property)
			throws JsonMappingException {
		
		if (Date.class.isAssignableFrom(origType.getRawClass()))
			return SER_DATE;
		if (origType.isEnumType())
			return SER_ENUM;

		return super.createSerializer(config, origType, property);
	}

	public JsonSerialiserFactory(Config config) {
		super(config);
	}

	/* (non-Javadoc)
	 * @see org.codehaus.jackson.map.ser.BeanSerializerFactory#withConfig(org.codehaus.jackson.map.SerializerFactory.Config)
	 */
	@Override
	public SerializerFactory withConfig(Config config) {
        if (getClass() != JsonSerialiserFactory.class) {
            throw new IllegalStateException("Subtype of CustomSerializerFactory ("+getClass().getName()
                    +") has not properly overridden method 'withAdditionalSerializers': can not instantiate subtype with "
                    +"additional serializer definitions");
        }
        return new JsonSerialiserFactory(config);
	}

	private static String enumToCamelCase(Enum e) {
		if (e == null)
			return null;
		StringBuilder sb = new StringBuilder(e.toString());
		char lastC = 0;
		for (int i = 0; i < sb.length(); i++) {
			char c = sb.charAt(i);
			if (c == '_') {
				sb.deleteCharAt(i);
				i--;
			} else if (Character.isUpperCase(c) && lastC != '_')
				sb.setCharAt(i, Character.toLowerCase(c));
			else if (Character.isLowerCase(c) && lastC == '_')
				sb.setCharAt(i, Character.toUpperCase(c));
			lastC = c;
		}
		return sb.toString();
	}
	
}
