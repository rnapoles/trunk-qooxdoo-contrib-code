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
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;


public class Parser {
    public static Object run(Registry registry, CallListener callListener, String str) {
        Parser parser;
        Object result;
        
        parser = new Parser(registry, callListener, str);
        result = parser.any();
        if (parser.idx != str.length()) {
            throw parser.syntaxError();
        }
        return result;
    }

    private final List<Object> objects;
    private final Registry registry;
    private final CallListener callListener;
    private final String str;
    private int idx;

    public Parser(Registry registry, CallListener callListener, String str) {
        this.objects = new ArrayList<Object>();
        this.registry = registry;
        this.callListener = callListener;
        this.str = str;
        this.idx = 0;
    }

    private Object any() {
        switch (peek()) {
        case '\'':
            return string(true);
        case '@':
            return ref();
        case '#':
            return integer();
        case '&':
            return lonG();
        case '<':
            return object();
        case '/':
            return serviceToProxy();
        case '\\':
            return proxyToService();
        case '[':
            return list();
        case '{':
            return set();
        case '(':
            return map(true);
        default:
            if (idx == str.indexOf("null", idx)) {
                idx += 4;
                return null;
            }
            if (idx == str.indexOf("true", idx)) {
                idx += 4;
                return Boolean.TRUE;
            }
            if (idx == str.indexOf("false", idx)) {
                idx += 5;
                return Boolean.FALSE;
            }
            throw new IllegalArgumentException(str + ": " + idx);
        }
    }

    private String string(boolean add) {
        String result;
        char c;
        
        idx++;
        result = "";
        while (true) {
            c = str.charAt(idx);
            switch (c) {
            case '\'':
                idx++;
                if (add) {
                    objects.add(result);
                }
                return result;
            case '%':
                result = result + (char) ((hex(str.charAt(idx + 1)) * 16 + hex(str.charAt(idx + 2))));
                idx += 3;
                break;
            case '+':
                result = result + (char) ((hex(str.charAt(idx + 1)) * 4096 + hex(str.charAt(idx + 2)) * 256 
                        + hex(str.charAt(idx + 3)) * 16 + hex(str.charAt(idx + 4))));
                idx += 5;
                break;
            default:
                idx++;
                result = result + c;
            }
        }
    }

    private Object ref() {
        int start;
        int no;
        
        idx++;
        start = idx;
        idx = whileNumber();
        no = Integer.parseInt(str.substring(start, idx));
        return objects.get(no);
    }

    private Object serviceToProxy() {
        int start;
        int id;
        Class<?> type; // TODO
        
        idx++;
        start = idx;
        idx = whileNumber();
        id = Integer.parseInt(str.substring(start, idx));
        if (peek() != ',') {
            throw new IllegalArgumentException();
        }
        idx++;
        try {
            type = Class.forName(string(false));
        } catch (ClassNotFoundException e) {
            throw new IllegalArgumentException(e);
        }
        if (peek() != '/') {
            throw new IllegalArgumentException();
        }
        idx++;
        return Proxy.create(registry, id, type, callListener);
    }

    private Object proxyToService() {
        int start;
        int no;
        
        idx++;
        start = idx;
        idx = whileNumber();
        no = Integer.parseInt(str.substring(start, idx));
        if (peek() != ',') {
            throw new IllegalArgumentException();
        }
        idx++;
        string(false);
        if (peek() != '\\') {
            throw new IllegalArgumentException();
        }
        idx++;
        return registry.get(no);
    }

    private Integer integer() {
        int start;
        
        idx++;
        start = idx;
        idx = whileNumber();
        // TODO: autoboxing
        return new Integer(Integer.parseInt(str.substring(start, idx)));
    }

    private Long lonG() {
        int start;
        
        idx++;
        start = idx;
        idx = whileNumber();
        // TODO: autoboxing
        return new Long(Long.parseLong(str.substring(start, idx)));
    }

    private int whileNumber() {
        char c;
        
        while (idx < str.length()) {
            c = str.charAt(idx);
            if (c != '-' && (c < '0' || c > '9')) {
                break;
            }
            idx++;
        }
        return idx;
    }

    private int hex(char c) {
        if (c >= 'a') {
            return c - 'a' + 10;
        } else {
            return c - '0';
        }
    }

    private List<Object> list() {
        List<Object> result;
        char c;
        
        idx++;
        result = new ArrayList<Object>();
        objects.add(result);
        if (peek() == ']') {
            idx++;
            return result;
        }
        while (true) {
            result.add(any());
            c = peek();
            if (c == ']') {
                idx++;
                return result;
            }
            if (c != ',') {
                throw syntaxError();
            }
            idx++;
        }
    }
    
    private Set<Object> set() {
        Set<Object> result;
        char c;
        
        idx++;
        result = new HashSet<Object>();
        objects.add(result);
        if (peek() == '}') {
            idx++;
            return result;
        }
        while (true) {
            result.add(any());
            c = peek();
            if (c == '}') {
                idx++;
                return result;
            }
            if (c != ',') {
                throw syntaxError();
            }
            idx++;
        }
    }
    
    private Map<Object, Object> map(boolean add) {
        Map<Object, Object> result;
        Object key;
        Object value;
        char c;
        
        idx++;
        result = new HashMap<Object, Object>();
        if (add) {
            objects.add(result);
        }
        if (peek() == ')') {
            idx++;
            return result;
        }
        while (true) {
            key = any();
            eat(':');
            value = any();
            result.put(key, value);
            c = peek();
            if (c == ')') {
                idx++;
                return result;
            }
            eat(',');
        }
    }

    private void eat(char c) {
        if (peek() != c) {
            throw syntaxError();
        }
        idx++;
    }
    
    private Object object() {
        Class<?> clazz;
        Map<Object, Object> fieldmap;
        Object obj;
        Object value;

        try {
            eat('<');
            clazz = Class.forName(string(false));
            obj = clazz.newInstance();
            objects.add(obj);
            eat(',');
            fieldmap = map(false);
            for (Field field : clazz.getDeclaredFields()) {
                value = fieldmap.get(field.getName());
                field.setAccessible(true);
                field.set(obj, value);
            }
            eat('>');
            return obj;
        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    
    //--
    
    private char peek() {
        if (idx == str.length()) {
            return 0;
        } else {
            return str.charAt(idx);
        }
    }

    private IllegalArgumentException syntaxError() {
        return new IllegalArgumentException("parse error: " + idx + ":" + str);
    }

}
