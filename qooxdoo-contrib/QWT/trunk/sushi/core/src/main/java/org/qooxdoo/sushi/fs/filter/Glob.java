/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2008 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.sushi.fs.filter;

import java.util.regex.Pattern;

import org.qooxdoo.sushi.util.Strings;

/**
 * File name patterns. Uses oro-matcher because we want to support jdk 1.3
 */
public class Glob {
    public static final Pattern STARSTAR;
    public static final Pattern STAR;

    static {
        STAR = doCompile(translate("*"), false /* same as true*/);
        // put () around to make both patterns !=
        STARSTAR = doCompile(translate("(*)"), false /* same as true */);
        if (STAR == STARSTAR) {
            throw new IllegalStateException();
        }
    }
    
    /** @return Pattern or String */
    public static Object compile(String glob, boolean ignoreCase) {
    	StringBuilder regex;
    	
        if (glob.equals("**")) {
            return STARSTAR;
        } else if (glob.equals("*")) {
            return STAR;
        } else {
        	regex = new StringBuilder();
        	if (translate(glob, regex) && !ignoreCase) {
        		return glob;
        	} else {
        		return doCompile(regex.toString(), ignoreCase);
        	}
        }
    }

    public static boolean matches(Pattern pattern, String str) {
        return pattern.matcher(str).matches();
    }
    
    //--
    
    private static Pattern doCompile(String regexp, boolean ignoreCase) {
        return Pattern.compile(regexp, ignoreCase ? Pattern.CASE_INSENSITIVE : 0);
    }
    
    private static String translate(String glob) {
        StringBuilder result;

        result = new StringBuilder();
        translate(glob, result);
        return result.toString();
    }

    /**
     * Translate a glob PATTERN to a regular expression.
     */
    private static boolean translate(String glob, StringBuilder result) {
        int i;
        int max;
        char c;
        int j;
        String stuff;
        int escaped;
        
        escaped = 0;
        max = glob.length();
        for (i = 0; i < max;) {
            c = glob.charAt(i++);
            if (c == '*') {
                result.append(".*");
            } else if (c == '?') {
                result.append('.');
            } else if (c == '[') {
                j = i;
                if (j < max && glob.charAt(j) == '!') {
                    j++;
                }
                if (j < max && glob.charAt(j) == ']') {
                    j++;
                }
                while (j < max && glob.charAt(j) != ']') {
                    j++;
                }
                if (j >= max) {
                    result.append("\\[");
                } else {
                    stuff = glob.substring(i, j);
                    stuff = Strings.replace(stuff, "\\", "\\\\");
                    i = j+1;
                    if (stuff.charAt(0) == '!') {
                        stuff = '^' + stuff.substring(1);
                    } else if (stuff.charAt(0) == '^') {
                        stuff = '\\' + stuff;
                    }
                    result.append('[');
                    result.append(stuff);
                    result.append(']');
                }
            } else {
            	escaped++;
                result.append(escape(c));
            }
        }
        result.append('$');
        return escaped == max;
    }

    public static String escape(char c) {
        if ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9')) {
            return "" + c;
        } else {
            return "\\" + c;
        }
    }
}
