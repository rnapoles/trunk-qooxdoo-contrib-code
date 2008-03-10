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

package org.qooxdoo.toolkit.plugin.binding.patch;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.util.Strings;

public class PatchSet {
    /** used on every platform */
    private static final String LF = "\n";
    
    private static enum Special {
        ADD, MODIFY;
    }
    
    public static PatchSet load(Node src) throws IOException {
        String file;
        Special current;
        List<String> normal;
        PatchSet patchset;
        
        file = null;
        normal = new ArrayList<String>();
        current = null;
        patchset = new PatchSet();
        for (String line : Strings.split(LF, src.readString())) {
            if (line.startsWith("###")) {
                save(current, normal, file, patchset);
                current = null;
                file = line.substring(3).trim();
            } else if (line.trim().equals("+++")) {
                save(current, normal, file, patchset);
                current = Special.ADD; 
            } else if (line.trim().equals("***")) {
                save(current, normal, file, patchset);
                current = Special.MODIFY;
            } else {
                normal.add(line);
            }
        }
        save(current, normal, file, patchset);
        return patchset;
    }

    private static Special save(Special special, List<String> lines, String file, PatchSet dest) {
        if (special != null) {
            if (file == null) {
                throw new PatchException("no file specified");
            }
            dest.add(file, create(special, lines));
            lines.clear();
        }
        return null;
    }

    private static Patch create(Special special, List<String> lines) {
        switch (special) {
        case ADD:
            return new AddPatch(Strings.join("\n", lines));
        case MODIFY:
            if (lines.size() != 2) {
                throw new PatchException("2 lines expected, got " + lines.size());
            }
            return new ModifyPatch(lines.get(0), lines.get(1));
        default:
            throw new RuntimeException();
        }
    }

    //--
    
    private final Map<String, List<Patch>> patches;

    public PatchSet() {
        patches = new HashMap<String, List<Patch>>();
    }
    
    public int size() {
        return patches.size();
    }
    
    public void add(String name, Patch patch) {
        List<Patch> lst;

        lst = patches.get(name);
        if (lst == null) {
            lst = new ArrayList<Patch>();
            patches.put(name, lst);
        }
        lst.add(patch);
    }
    
    public void apply(Node dir) throws IOException {
        Node file;
        StringBuilder builder;
        
        for (String name : patches.keySet()) {
            file = dir.join(name);
            builder = new StringBuilder(file.readString());
            for (Patch patch : patches.get(name)) {
                try {
                    patch.apply(builder);
                } catch (PatchException e) {
                    throw new PatchException(file + ":" + e.getMessage(), e);
                }
            }
            file.writeString(builder.toString());
        }
    }
}
