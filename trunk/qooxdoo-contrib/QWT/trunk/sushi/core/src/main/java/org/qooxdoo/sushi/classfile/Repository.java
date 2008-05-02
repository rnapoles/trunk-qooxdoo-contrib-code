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

package org.qooxdoo.sushi.classfile;

import java.io.IOException;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.fs.file.FileNode;
import org.qooxdoo.sushi.fs.zip.ZipFilesystem;

/** A set of class definitions */
public class Repository {
    public static Repository load(Node file) throws IOException {
        Repository set;
        
        set = new Repository();
        set.addAll(file);
        return set;
    }

    private final List<ClassDef> defs;
    
    private final List<Node> lazy;
    
    public Repository() {
        defs = new ArrayList<ClassDef>();
        lazy = new ArrayList<Node>();
    }
    
    public void addLazy(Node node) throws IOException {
        lazy.add(getDir(node));
    }

    private Node getDir(Node file) throws IOException {
        return file.isFile() && (file instanceof FileNode) ? 
                new ZipFilesystem(file.getIO()).node((FileNode) file, "") : file;
    }
    
    public void addAll(Node file) throws IOException {
        Node dir;
        
        file.checkExists();
        dir = getDir(file);
        for (Node node : dir.find("**/*.class")) {
            add(Input.load(node));
        }
    }

    public void add(ClassDef load) {
        defs.add(load);
    }

    public ClassDef lookup(ClassDef c) {
        ClassDef def;
        
        def = lookup(c.accessFlags, c.getName(), c.superClass, c.interfaces);
        if (def != null) {
            return def;
        }
        // TODO: lazy load
        return null;
    }
    
    public ClassDef lookup(java.util.Set<Access> accessFlags, String name, ClassRef superClass, List<ClassRef> interfaces) {
        for (ClassDef def : defs) {
            if (def.getName().equals(name) && def.accessFlags.equals(accessFlags) 
                    && def.superClass.equals(superClass) && def.interfaces.equals(interfaces)) {
                return def;
            }
        }
        return null;
    }
    
    //--
    
    public ClassDef lookup(String name) throws IOException {
        Node file;
        String path;
        ClassDef added;

        for (ClassDef def : defs) {
            if (def.getName().equals(name)) {
                return def;
            }
        }
        path = ClassRef.classToResName(name);
        for (Node dir : lazy) {
            file = dir.join(path);
            if (file.exists()) {
                added = Input.load(file);
                add(added);
                return added;
            }
        }
        return null;
    }

    public void dump(PrintStream dest) {
        for (ClassDef def : defs) {
            dest.println(def.toString());
        }
    }

    public void diff(Repository rightSet, PrintStream info) {
        ClassDef tmp;
        
        for (ClassDef left : defs) {
            if (rightSet.lookup(left) == null) {
                info.println("- " + left.toSignatureString());
            }
        }
        for (ClassDef right : rightSet.defs) {
            if (this.lookup(right) == null) {
                info.println("+ " + right.toSignatureString());
            }
        }
        for (ClassDef left : defs) {
            tmp = rightSet.lookup(left);
            if (tmp != null) {
                diffBody(left, tmp, info);
            }
        }
    }
    
    public void defines(List<Reference> pblic, List<Reference> prvate) {
        ClassRef owner;

        for (ClassDef def : defs) {
            owner = def.reference();
            for (MethodDef m : def.methods) {
                (m.accessFlags.contains(Access.PUBLIC) ? pblic : prvate).
                    add(m.reference(owner, def.accessFlags.contains(Access.INTERFACE)));
            }
            for (FieldDef f : def.fields) {
                (f.accessFlags.contains(Access.PUBLIC) ? pblic : prvate).add(f.reference(owner));
            }
        }
    }
    
    public static void diffBody(ClassDef left, ClassDef right, PrintStream info) {
        List<FieldDef> removedFields;
        List<FieldDef> addedFields; 
        List<MethodDef> removedMethods;
        List<MethodDef> addedMethods; 
        
        removedFields = new ArrayList<FieldDef>();
        addedFields = new ArrayList<FieldDef>();
        for (FieldDef lf : left.fields) {
            if (right.lookupField(lf) == null) {
                removedFields.add(lf);
            }
        }
        for (FieldDef rf : right.fields) {
            if (left.lookupField(rf) == null) {
                addedFields.add(rf);
            }
        }

        removedMethods = new ArrayList<MethodDef>();
        addedMethods = new ArrayList<MethodDef>();
        for (MethodDef lm : left.methods) {
            if (right.lookupMethod(lm) == null) {
                removedMethods.add(lm);
            }
        }
        for (MethodDef rm : right.methods) {
            if (left.lookupMethod(rm) == null) {
                addedMethods.add(rm);
            }
        }

        if (removedFields.size() > 0 || addedFields.size() > 0 
                || removedMethods.size() > 0 || addedMethods.size() > 0) {
            info.println("* " + left.toSignatureString());
            for (FieldDef f : removedFields) {
                info.println("  - " + f.toString() + ";");
            }
            for (FieldDef f : addedFields) {
                info.println("  + " + f.toString() + ";");
            }
            for (MethodDef m : removedMethods) {
                info.println("  - " + m.toSignatureString());
            }
            for (MethodDef m : addedMethods) {
                info.println("  + " + m.toSignatureString());
            }
        }
    }
    
    public void ref(List<Usage> result) {
        Code code;
        java.util.Set<Reference> refs;
        ClassRef owner;
        MethodRef from;
        
        for (ClassDef def : defs) {
            owner = def.reference();
            for (MethodDef m : def.methods) {
                code = m.getCode();
                if (code != null) {
                    from = m.reference(owner, def.accessFlags.contains(Access.INTERFACE));
                    refs = new HashSet<Reference>();
                    code.references(refs);
                    for (Reference ref : refs) {
                        result.add(new Usage(from, ref));
                    }
                }
            }
        }
    }
}
