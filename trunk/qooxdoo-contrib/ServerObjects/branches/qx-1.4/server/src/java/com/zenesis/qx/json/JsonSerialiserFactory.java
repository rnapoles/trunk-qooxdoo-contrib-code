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
import java.util.Iterator;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializationConfig;
import org.codehaus.jackson.map.SerializerProvider;
import org.codehaus.jackson.map.ser.BeanSerializerFactory;

public class JsonSerialiserFactory extends BeanSerializerFactory {
	
	private static final SimpleDateFormat DF = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	
	public static final JsonSerialiserFactory INSTANCE = new JsonSerialiserFactory();
	
	private static final JsonSerializer<Date> SER_DATE = new JsonSerializer<Date>() {

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
	
	private static final JsonSerializer<Enum> SER_ENUM = new JsonSerializer<Enum>() {

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

	private static final ThreadLocal<Integer> s_recursion = new ThreadLocal<Integer>();
	private static final JsonSerializer<Iterable> SER_ITERABLE = new JsonSerializer<Iterable>() {

		/* (non-Javadoc)
		 * @see org.codehaus.jackson.map.JsonSerializer#serialize(java.lang.Object, org.codehaus.jackson.JsonGenerator, org.codehaus.jackson.map.SerializerProvider)
		 */
		@Override
		public void serialize(Iterable iterable, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
			if (iterable == null)
				jgen.writeNull();
			else {
				jgen.writeStartArray();
				for (Object obj : iterable)
					if (obj == null)
						jgen.writeNull();
					else {
						Integer rec = s_recursion.get();
						if (rec == null)
							s_recursion.set(1);
						else {
							s_recursion.set(rec + 1);
							if (rec > 200)
								rec = rec;
						}
						jgen.writeObject(obj);
					}
				jgen.writeEndArray();
			}
		}
	};

	private static final JsonSerializer<Iterator> SER_ITERATOR = new JsonSerializer<Iterator>() {

		/* (non-Javadoc)
		 * @see org.codehaus.jackson.map.JsonSerializer#serialize(java.lang.Object, org.codehaus.jackson.JsonGenerator, org.codehaus.jackson.map.SerializerProvider)
		 */
		@Override
		public void serialize(Iterator iter, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
			if (iter == null)
				jgen.writeNull();
			else {
				jgen.writeStartArray();
				while (iter.hasNext()) {
					Object obj = iter.next();
					if (obj == null)
						jgen.writeNull();
					else
						jgen.writeObject(obj);
				}
				jgen.writeEndArray();
			}
		}
	};

	/* (non-Javadoc)
	 * @see org.codehaus.jackson.map.ser.BasicSerializerFactory#createSerializer(java.lang.Class, org.codehaus.jackson.map.SerializationConfig)
	 */
	@Override
	public <T> JsonSerializer<T> createSerializer(Class<T> type, SerializationConfig config) {
		if (Date.class.isAssignableFrom(type))
			return (JsonSerializer<T>)SER_DATE;
		if (Enum.class.isAssignableFrom(type))
			return (JsonSerializer<T>)SER_ENUM;
		if (Iterator.class.isAssignableFrom(type))
			return (JsonSerializer<T>)SER_ITERATOR;
		if (Iterable.class.isAssignableFrom(type))
			return (JsonSerializer<T>)SER_ITERABLE;
		
		return super.createSerializer(type, config);
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
