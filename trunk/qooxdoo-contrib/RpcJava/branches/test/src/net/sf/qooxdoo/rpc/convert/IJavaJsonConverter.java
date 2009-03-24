package net.sf.qooxdoo.rpc.convert;

import java.lang.annotation.Annotation;
import java.lang.reflect.Type;

/**
 * Converts from json to java and back. The convert methods get as much
 * information as possible to allow the best conversion possible.
 * 
 * @author mwyraz
 */
public interface IJavaJsonConverter {
    /**
     * Converts the json object to java.
     * @param jsonObject the incoming json object
     * @param javaClass the target java class (from method parameter) 
     * @param genericJavaType the generic target java type (from method parameter)
     * @param typeAnnotations any annotations of the method parameter
     * @return the resulting java object
     * @throws Exception any error that occurs
     */
    public Object toJava(Object jsonObject, Class<?> javaClass,
	    Type genericJavaType, Annotation[] typeAnnotations)
	    throws Exception;

    /**
     * @param javaObject the java object to convert
     * @param javaClass the source java class (from method return type) 
     * @param genericReturnType the generic source java type (from method return type)
     * @param returnTypeAnnotations any annotations of the originating method
     * @return the resulting json object
     * @throws Exception any error that occurs
     */
    public Object fromJava(Object javaObject, Class<?> javaClass,
	    Type genericReturnType, Annotation[] returnTypeAnnotations)
	    throws Exception;
}
