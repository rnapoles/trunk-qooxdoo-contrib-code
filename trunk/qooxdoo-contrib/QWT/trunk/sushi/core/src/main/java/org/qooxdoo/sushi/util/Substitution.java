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

package org.qooxdoo.sushi.util;

import java.util.Map;

public class Substitution {
    public static Substitution ant(Map<String, String> variables) {
        return new Substitution("${", "}", '\\', variables);        
    }
    public static Substitution path(Map<String, String> variables) {
        return new Substitution("__", "__", '\\', variables);     
    }
    
	private final String prefix;
	private final String suffix;
	/** do not match if this character prefixes the prefix */ 
    private final char escape;
    private final Map<String, String> variables;
	
	public Substitution(String prefix, String suffix, char escape, Map<String, String> variables) {
		this.prefix = prefix;
		this.suffix = suffix;
		this.escape = escape;
		this.variables = variables;
	}
	
	public String apply(String content) throws SubstitutionException {
		StringBuilder builder;
		int start;
		int end;
		int last;
		String var;
		String replaced;
		
		builder = new StringBuilder();
		last = 0;
		while (true) {
			start = content.indexOf(prefix, last);
			if (start == -1) {
				if (last == 0) {
					return content;
				} else {
					builder.append(content.substring(last));
					return builder.toString();
				}
			}
			end = content.indexOf(suffix, start + prefix.length());
			if (start > 0 && content.charAt(start - 1) == escape) {
			    builder.append(content.substring(last, start - 1));
			    builder.append(prefix);
			    last = start + prefix.length();
			} else {
			    if (end == -1) {
			        throw new SubstitutionException("missing end marker");
			    } 
			    var = content.substring(start + prefix.length(), end);
			    replaced = variables.get(var);
			    if (replaced == null) {
			        throw new SubstitutionException("undefined variable: " + var);
			    }
			    builder.append(content.substring(last, start));
			    builder.append(replaced);
			    last = end + suffix.length();
			}
		}
	}
}
