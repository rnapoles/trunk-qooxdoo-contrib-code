package net.sf.qooxdoo.rpc.convert;

import java.beans.PropertyDescriptor;
import java.lang.annotation.Annotation;
import java.lang.reflect.Array;
import java.lang.reflect.GenericArrayType;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.lang.reflect.WildcardType;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.TreeMap;
import java.util.Map.Entry;

import javax.lang.model.type.ArrayType;

import net.sf.qooxdoo.rpc.json.JSONArray;
import net.sf.qooxdoo.rpc.json.JSONObject;

import org.apache.commons.beanutils.PropertyUtils;

/**
 * Default implementation that supports:
 * - any java primitive and it's associated object
 * - String
 * - Enum
 * - special handling for long/Long (converted to String)
 * - Arrays (converted from/to json array)
 * - Collections, generic collections (converted from/to json array)
 * - Maps, generic maps (converted from/to json objects)
 * - Objects (converted from/to json objects)
 * 
 * For the conversion of objects to json exists 2 modes:
 * - normal (any attribute will be converted) and
 * - strict (only attributes defined of the interface or class of the method's return type,
 *   an array's component type or a collection's/map's generic type will be converted)
 *   
 * The default mode it strict to ensure maximum privacy of data.  
 * 
 * WARNING! This class is not complete yet.
 * 
 * FIXME: handle recursive references!
 * 
 * @author mwyraz
 */
public class DefaultJavaJsonConverter implements IJavaJsonConverter {
    protected boolean useStrinctInterfaceReturnTypes = true;

    /**
     * If set to true, all bean properties are determined by the return method's
     * type instead of the bean instance. This is very useful to reduce the
     * visibility of information by using interfaces. Example:
     * MyService.getUser() returns an interface IUser with methods getId() and
     * getName(). The returned implementations is an object User with an
     * additional getPassword() method. With
     * useStrinctInterfaceReturnTypes=true, only id and name are returned by the
     * service. With useStrinctInterfaceReturnTypes=false also the password
     * attribute is returned.
     * 
     * Defaults to true.
     */
    public void setUseStrinctInterfaceReturnTypes(
	    boolean useStrinctInterfaceReturnTypes) {
	this.useStrinctInterfaceReturnTypes = useStrinctInterfaceReturnTypes;
    }

    public boolean isUseStrinctInterfaceReturnTypes() {
	return useStrinctInterfaceReturnTypes;
    }
    
    @SuppressWarnings("unchecked")
    @Override
    public Object toJava(Object jsonObject, Class<?> javaClass,
	    Type genericJavaType, Annotation[] typeAnnotations) throws Exception {
	// check null
	if (jsonObject == JSONObject.NULL) {
	    if (javaClass.isPrimitive())
		throw new IllegalArgumentException(
			"Cannot convert NULL to primitive '"
				+ javaClass.getSimpleName() + "'");
	    return null;
	}

	if (javaClass == String.class) {
	    if (jsonObject instanceof String)
		return jsonObject;
	} else if (javaClass == Integer.class || javaClass == Integer.TYPE) {
	    if (jsonObject instanceof Number)
		return ((Number) jsonObject).intValue();
	    if (jsonObject instanceof String) {
		String s = jsonObject.toString();
		if (s.length() == 0) {
		    if (javaClass.isPrimitive())
			throw new IllegalArgumentException(
				"Cannot convert empty string to primitive 'int'");
		    return null;
		}
		return new Integer(s);
	    }
	} else if (javaClass == Double.class || javaClass == Double.TYPE) {
	    if (jsonObject instanceof Number)
		return ((Number) jsonObject).doubleValue();
	    if (jsonObject instanceof String) {
		String s = jsonObject.toString();
		if (s.length() == 0) {
		    if (javaClass.isPrimitive())
			throw new IllegalArgumentException(
				"Cannot convert empty string to primitive 'double'");
		    return null;
		}
		return new Double(s);
	    }
	} else if (javaClass == Float.class || javaClass == Float.TYPE) {
	    if (jsonObject instanceof Number)
		return ((Number) jsonObject).floatValue();
	} else if (javaClass == Byte.class || javaClass == Byte.TYPE) {
	    if (jsonObject instanceof Number)
		return ((Number) jsonObject).byteValue();
	} else if (javaClass == Boolean.class || javaClass == Boolean.TYPE) {
	    if (jsonObject instanceof Boolean)
		return (Boolean) jsonObject;
	    if (jsonObject instanceof String) {
		return ((String) jsonObject).equalsIgnoreCase("true") || jsonObject.equals("1");
	    }
	} else if (javaClass == Long.class || javaClass == Long.TYPE) {
	    if (jsonObject instanceof Number)
		return ((Number) jsonObject).longValue();
	    if (jsonObject instanceof String)
		return new Long((String) jsonObject);
	} else if (javaClass == Character.class || javaClass == Character.TYPE) {
	    if (jsonObject instanceof String) {
		String s = jsonObject.toString();
		if (s.length() == 0) {
		    if (javaClass.isPrimitive())
			throw new IllegalArgumentException(
				"Cannot convert empty string to primitive 'char'");
		    return null;
		}
		return s.charAt(0);
	    }
	} else if (javaClass==Date.class) {
	    if (jsonObject instanceof Date)
		return (Date) jsonObject;
	} else if (Date.class.isAssignableFrom(javaClass)) { // any other type derived from date -> construct with "long" argument
	    if (jsonObject instanceof Date)
		return javaClass.getConstructor(Long.TYPE).newInstance(((Date)jsonObject).getTime());
	} else if (Enum.class.isAssignableFrom(javaClass)) {
	    if (jsonObject instanceof String) {
		String jsonString=(String) jsonObject;
		if (jsonString.length()==0) return null;
		return Enum.valueOf((Class<Enum>) javaClass,
			jsonString);
	    }
	} else if (javaClass.isArray()) {
	    if (jsonObject instanceof JSONArray) {
		JSONArray jsArray = (JSONArray) jsonObject;
		int length = jsArray.length();
		Class<?> type = javaClass.getComponentType();
		Object array = Array.newInstance(type, length);
		for (int i = 0; i < length; i++) {
		    Array.set(array, i, toJava(jsArray.get(i), type, type,
			    typeAnnotations));
		}
		return array;
	    }
	}

	if (jsonObject instanceof JSONObject)
	{
	    return toJavaBean((JSONObject) jsonObject, javaClass, genericJavaType, typeAnnotations);
	}
	
	throw new IllegalArgumentException("Cannot convert "
		+ jsonObject.getClass().getName() + " to "
		+ javaClass.getName());
	
    }

    
    @SuppressWarnings("unchecked")
    protected Object toJavaBean(JSONObject jsonObject, Class<?> javaClass,
	    Type genericJavaType, Annotation[] typeAnnotations)
	    throws Exception {
	if (javaClass.getName().startsWith("java."))
		throw new IllegalArgumentException("Cannot convert "
			+ jsonObject.getClass().getName() + " to "
			+ javaClass.getName());
	
	Object javaBean=javaClass.newInstance();
	
	for (Iterator<String> keyI=(Iterator<String>)jsonObject.keys();keyI.hasNext();)
	{
	    String key=keyI.next();
	    PropertyDescriptor pd=PropertyUtils.getPropertyDescriptor(javaBean, key);
	    if (pd==null) continue;
	    Method setter=pd.getWriteMethod();
	    if (setter==null) continue;
	    try {
        	    setter.invoke(javaBean, toJava(jsonObject.opt(key),
        		    setter.getParameterTypes()[0],
        		    setter.getGenericParameterTypes()[0],
        		    setter.getParameterAnnotations()[0]));
	    } catch (Exception ex) {
		throw new IllegalArgumentException("Error setting field '"+key+"' on class '"+javaClass.getName()+"': "+ex.getMessage(),ex);
	    }
	}
	
	return javaBean;
    }
	
    
    @SuppressWarnings("unchecked")
    @Override
    public Object fromJava(Object javaObject, Class<?> javaClass,
	    Type genericReturnType, Annotation[] returnTypeAnnotations)
	    throws Exception {
	if (javaObject == null)
	    return JSONObject.NULL;

	if (javaClass == null)
	    javaClass = javaObject.getClass();
	if (genericReturnType == null)
	    genericReturnType = javaClass;

	if (javaObject instanceof Long)
	    return Long.toString((Long) javaObject);

	if (javaClass.isPrimitive())
	    return javaObject;

	if (javaObject instanceof String)
	    return javaObject;
	if (javaObject instanceof Number)
	    return javaObject;
	if (javaObject instanceof Date)
	    return javaObject;

	if (javaObject instanceof Enum)
	    return ((Enum) javaObject).name();
	
	if (javaClass.isArray()) {
	    JSONArray array = new JSONArray();
	    Class oc = javaClass.getComponentType();
	    final int count=Array.getLength(javaObject);
	    for (int i=0;i<count;i++) {
		Object o=Array.get(javaObject, i);
		array.put(fromJava(o, oc, oc, null));
	    }
	    return array;
	}

	if (javaObject instanceof Map) {
	    Type genericValueType = getTypeFromGeneric(genericReturnType, 1);
	    Class<?> valueType = getRawType(genericValueType);
	    
	    JSONObject object = new JSONObject();
	    for (Entry entry : ((Map<?, ?>) javaObject).entrySet()) {
		Object key = entry.getKey();
		Object value = entry.getValue();

		String targetKey;
		if (key==null) targetKey=null;
		else if (key instanceof Enum) targetKey=((Enum)key).name();
		else targetKey=String.valueOf(key);
		
		object.put(targetKey,
			fromJava(value, valueType, genericValueType, null));
	    }
	    return object;
	}

	if (javaObject instanceof Collection) {
	    Type genericCollectionType = getTypeFromGeneric(genericReturnType,
		    0);
	    Class<?> collectionType = getRawType(genericCollectionType);
	    JSONArray array = new JSONArray();
	    for (Object o : (Collection) javaObject) {
		array.put(fromJava(o, collectionType, genericCollectionType,
			returnTypeAnnotations));
	    }
	    return array;
	}

	return fromJavaBean(javaObject, javaClass, genericReturnType,
		returnTypeAnnotations);
    }

    protected Class<?> getRawType(Type type) {
	if (type == null)
	    return null;
	if (type instanceof Class) {
	    return (Class<?>) type;
	}
	if (type instanceof ParameterizedType) {
	    return getRawType(((ParameterizedType) type).getRawType());
	}
	if (type instanceof GenericArrayType) {
	    Class<?> arrayComponentType=getRawType(((GenericArrayType) type).getGenericComponentType());
	    // TODO: Is there better way to get Object[].class from Object.class?
	    return Array.newInstance(arrayComponentType,0).getClass();
	}
	throw new RuntimeException("Unimplemented: " + type.getClass());
    }

    protected Type getTypeFromGeneric(Type type, int typeIndex) {
	if (type == null)
	    return null;
	if (type instanceof Class) {
	    if (typeIndex > 0)
		return null;
	    return (Class<?>) type;
	}
	if (type instanceof ParameterizedType) {
	    ParameterizedType pt = (ParameterizedType) type;
	    Type[] types = pt.getActualTypeArguments();
	    return getTypeFromGeneric(types[typeIndex], 0);
	}
	if (type instanceof WildcardType) {
	    WildcardType wt = (WildcardType) type;
	    return getTypeFromGeneric(wt.getUpperBounds()[typeIndex], 0);
	}
	if (type instanceof GenericArrayType) {
	    return type;
	}
	throw new RuntimeException("Unimplemented: " + type.getClass());
    }

    protected Map<Class<?>,Collection<PropertyDescriptor>> propertyDescriptorMap=new HashMap<Class<?>, Collection<PropertyDescriptor>>();
    protected void findPropertyDescriptors(Class<?> baseClass, Map<String,PropertyDescriptor> results)
    {
        if (baseClass==null) return;
        for (PropertyDescriptor pd: PropertyUtils.getPropertyDescriptors(baseClass))
        {
            if (!results.containsKey(pd.getName())) results.put(pd.getName(), pd);
        }
        if (baseClass.isInterface()) for (Class<?> iface: baseClass.getInterfaces())
        {
            findPropertyDescriptors(iface, results);
        }
        findPropertyDescriptors(baseClass.getSuperclass(), results);
    }
    protected Collection<PropertyDescriptor> findPropertyDescriptors(Class<?> baseClass)
    {
	Collection<PropertyDescriptor> result=propertyDescriptorMap.get(baseClass);
	if (result==null)
	{
            Map<String,PropertyDescriptor> results=new TreeMap<String, PropertyDescriptor>();
            findPropertyDescriptors(baseClass, results);
            result=results.values();
            propertyDescriptorMap.put(baseClass,result);
	}
	return result;
    }
    
    protected Object fromJavaBean(Object javaObject, Class<?> javaClass,
	    Type genericReturnType, Annotation[] returnTypeAnnotations)
	    throws Exception {
	if (javaClass.getName().startsWith("java."))
	    throw new IllegalArgumentException("Cannot convert to JSON: "
		    + javaObject.getClass().getName());

	Class<?> beanClass = null;
	if (useStrinctInterfaceReturnTypes)
	    beanClass = javaClass;
	if (beanClass == null)
	    beanClass = javaObject.getClass();

	JSONObject object = new JSONObject();
	for (PropertyDescriptor pd : findPropertyDescriptors(beanClass)) {
	    if (!filterProperty(pd, javaClass, genericReturnType,
		    returnTypeAnnotations))
		continue;
	    Method method = pd.getReadMethod();
	    if (method == null)
		continue;
	    object.put(pd.getName(), fromJava(method.invoke(javaObject), method
		    .getReturnType(), method.getGenericReturnType(), method
		    .getAnnotations()));
	}
	return object;
    }

    protected boolean filterProperty(PropertyDescriptor pd, Class<?> javaClass,
	    Type genericReturnType, Annotation[] returnTypeAnnotations) {
	if (pd.getName().equals("class"))
	    return false;
	return true;
    }
}
