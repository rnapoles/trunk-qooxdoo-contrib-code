/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.toolkit.engine.common;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;


/** 
 * TODO
 * o use string builder when supported by Runtime
 * o base class fields
 * o static fields 
 */ 
public class Serializer {
    public static String run(Registry registry, Object obj) {
        return new Serializer(registry).any(obj);
    }
    
    public static Class<?> getServiceType(Class<?> clazz) {
        for (Class<?> i : clazz.getInterfaces()) {
            if (i.getName().endsWith("Service")) {
                return i;
            }
        }
        return null;
    }
    
    //--
    
    private final List<Object> objects;
    private final Registry registry;
    
    public Serializer(Registry registry) {
        this.objects = new ArrayList<Object>();
        this.registry = registry;
    }

    private String any(Object obj) {
        String result;
        boolean first;
        Proxy proxy;
        Class<?> service;
        
        if (obj == null) {
            return "null";
        } else if (Boolean.TRUE.equals(obj)) {
            return "true";
        } else if (Boolean.FALSE.equals(obj)) {
            return "false";
        } else if (obj instanceof Long) {
            return "&" + obj;
        } else if (obj instanceof Integer) {
            return "#" + obj;
        } else if (obj instanceof Proxy) {
            proxy = (Proxy) obj;
            return "\\" + proxy.id + "," + string(proxy.type.getName()) + "\\";
        }
        service = getServiceType(obj.getClass());
        if (service != null) {
            return "/" + registry.addIfNew(obj) + "," + string(service.getName()) + "/";
        }
        for (int i = 0; i < objects.size(); i++) {
            if (objects.get(i) == obj) {
                return "@" + i;
            }
        }
        objects.add(obj);
        if (obj instanceof String) {
            return string((String) obj); 
        } else if (obj instanceof List) {
            result = "[";
            first = true;
            for (Object element : (List<?>) obj) {
                if (first) {
                    first = false;
                } else {
                    result = result + ",";
                }
                result = result + any(element);
            }
            return result + "]";
        } else if (obj instanceof Set) {
            result = "{";
            first = true;
            for (Object element : (Set<?>) obj) {
                if (first) {
                    first = false;
                } else {
                    result = result + ",";
                }
                result = result + any(element);
            }
            return result + "}";
        } else if (obj instanceof Map) {
            return map((Map<?, ?>) obj);
        } else {
            return object(obj);
        }
    }

    private String map(Map<?, ?> map) {
        String result;
        boolean first;
        
        result = "(";
        first = true;
        for (Map.Entry<Object, Object> entry : ((Map<Object, Object>) map).entrySet()) {
            if (first) {
                first = false;
            } else {
                result = result + ",";
            }
            result = result + any(entry.getKey()) + ":" + any(entry.getValue());
        }
        return result + ")";
    }

    private String object(Object obj) {
        Class<?> clazz;
        String result;
        
        clazz = obj.getClass();
        result = "<";
        clazz = obj.getClass();
        result = result + string(clazz.getName());
        result = result + ",";
        result = result + map(fieldmap(clazz.getDeclaredFields(), obj));
        return result + ">";
    }
    
    private Map<String, Object> fieldmap(Field[] fields, Object obj) {
        Map<String, Object> result;

        try {
            result = new HashMap<String, Object>();
            for (Field field : fields) {
                field.setAccessible(true);
                result.put(field.getName(), field.get(obj));
            }
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return result;
    }
    
    private String string(String str) {
        String result;
        char c;
        
        result = "'";
        for (int i = 0, max = str.length(); i < max; i++) {
            c = str.charAt(i);
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
                result = result + c;
            } else if (c >= 256) {
                result = result + "+" + digit2(c / 256) + digit2(c % 256);
            } else {
                result = result + "%" + digit2(c);
            }
        }
        return result + "'";
    }

    private static String digit2(int c) {
        return "" + digit(c, 16) + digit(c, 1);        
    }
    
    private static char digit(int c, int div) {
        int digit;

        digit = c / div % 16;
        if (digit > 9) {
            return (char) (digit - 10 + 'a');
        } else {
            return (char) (digit + '0');
        }
    }
}
