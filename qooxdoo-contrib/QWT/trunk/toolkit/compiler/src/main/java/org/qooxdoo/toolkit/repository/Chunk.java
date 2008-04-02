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

package org.qooxdoo.toolkit.repository;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.Strings;

/** Building block of a module: code with dependencies */
public class Chunk {
    private static final String HEADER = "//++";

    /** qualified name, like Java class names */
    public final String name;

    /** never null */
    public final List<String> vnames;
    
    public final Dependencies deps;

    private String code;
    
    public Chunk(String name, String code) {
        this(name, new ArrayList<String>(), new Dependencies(), code);
    }
    
    public Chunk(String name, List<String> vnames, Dependencies deps, String code) {
        if (name.startsWith(".")) {
            throw new IllegalArgumentException(name);
        }
        this.name = name;
        this.vnames = vnames;
        this.deps = deps;
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public void addCode(String add) {
        if (this.code.length() == 0) {
            this.code = add;
        } else {
            this.code = code + '\n' + add;
        }
    }
    
    @Override
    public String toString() {
        StringBuilder builder;
        
        builder = new StringBuilder();
        toString(builder);
        return builder.toString();
    }
    
    public void toString(StringBuilder dest) {
        dest.append(HEADER);
        dest.append(' ');
        dest.append(name);
        for (String vname : vnames) {
            dest.append(' ');
            dest.append(vname);
        }
        dest.append(' ');
        deps.toString(dest);
        dest.append('\n');
        dest.append(code);
    }
    
    public static List<Chunk> fromString(String chunks) {
        List<Chunk> result;
        int idx;
        int depIdx;
        int start;
        int end;
        String name;
        List<String> vnames;
        Dependencies deps;
        
        result = new ArrayList<Chunk>();
        idx = 0;
        while (true) {
            if (idx == chunks.length()) {
                return result;
            }
            if (!chunks.startsWith(HEADER, idx)) {
                throw new RepositoryException("chunk expected at index " + idx);
            }
            depIdx = chunks.indexOf('[', idx);
            if (depIdx == -1) {
                throw new RepositoryException("missing deps at index " + idx);
            }
            vnames = Strings.split(" ", chunks.substring(idx + HEADER.length(), depIdx).trim());
            if (vnames.size() == 0) {
                throw new RepositoryException("missing name at index " + idx);
            }
            Strings.trim(vnames);
            name = vnames.remove(0);
            start = chunks.indexOf('\n', depIdx) + 1;
            if (start == 0) {
                throw new RepositoryException("chunk is not terminated");
            }
            deps = Dependencies.fromString(chunks.substring(depIdx, start).trim());
            end = chunks.indexOf(HEADER, start);
            if (end == -1) {
                result.add(new Chunk(name, vnames, deps, chunks.substring(start)));
                return result;
            }
            result.add(new Chunk(name, vnames, deps, chunks.substring(start, end)));
            idx = end;
        }
    }
}
