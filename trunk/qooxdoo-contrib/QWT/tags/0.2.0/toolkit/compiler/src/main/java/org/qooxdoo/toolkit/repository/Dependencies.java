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

package org.qooxdoo.toolkit.repository;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.Strings;

/**
 * Dependencies to modules. Never contains a module twice.
 * Doesn't use sets internally because I want to keep the ordering.
 */
public class Dependencies {
    private static final String DELIM = ",";
    private static final String OPEN = "[";
    private static final String CLOSE = "]";
    
    private final List<String> names;
    
    public Dependencies() {
        names = new ArrayList<String>();
    }
    
    public List<String> names() {
        return names;
    }
    
    public boolean contains(String name) {
        return names.contains(name);
    }
    
    public void addOpt(String name) {
        if (name != null) {
            add(name);
        }
    }

    public void add(String name) {
        if (!contains(name)) {
            names.add(name);
        }
    }

    public void addAll(Dependencies from) {
        for (String name : from.names) {
            add(name);
        }
    }
    
    public void remove(String name) {
        names.remove(name);
    }
    
    @Override
    public int hashCode() {
        return names.hashCode();
    }
    
    @Override
    public boolean equals(Object obj) {
        Dependencies dependencies;
        
        if (obj instanceof Dependencies) {
            dependencies = (Dependencies) obj;
            return names.equals(dependencies.names);
        }
        return false;
    }

    @Override
    public String toString() {
        StringBuilder builder;
        
        builder = new StringBuilder();
        toString(builder);
        return builder.toString();
    }
    
    public void toString(StringBuilder dest) {
        boolean first;
        
        first = true;
        dest.append(OPEN);
        for (String name : names) {
            if (first) {
                first = false;
            } else {
                dest.append(DELIM);
            }
            dest.append(name);
        }
        dest.append(CLOSE);
    }
    
    public static Dependencies fromString(String line) {
        Dependencies dependencies;

        if (!line.startsWith(OPEN)) {
            throw new RepositoryException("missing " + OPEN + " in line " + line);
        }
        if (!line.endsWith(CLOSE)) {
            throw new RepositoryException("closing " + CLOSE + " not found in line " + line);
        }
        dependencies = new Dependencies();
        for (String name: Strings.split(DELIM, line.substring(OPEN.length(), line.length() - CLOSE.length()))) {
            dependencies.add(name.trim());
        }
        return dependencies;
    }
}
