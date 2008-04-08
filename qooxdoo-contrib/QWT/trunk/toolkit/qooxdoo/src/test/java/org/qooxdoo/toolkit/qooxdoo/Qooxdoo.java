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

package org.qooxdoo.toolkit.qooxdoo;

import java.io.IOException;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.toolkit.compiler.Naming;
import org.qooxdoo.toolkit.repository.Module;
import org.qooxdoo.toolkit.repository.Repository;

import qx.core.Bootstrap;
import qx.ui.core.Widget;

public class Qooxdoo {
    public static void main(String[] args) throws IOException {
        System.out.println(load(new IO()));
    }
    
    public static Qooxdoo load(IO io) {
        Repository repository;
        
        try {
            repository = Naming.createRootRepository(io);
            repository.load(io.locateClasspathItem("/java/lang/Object.js"));
            repository.load(io.locateClasspathItem(Widget.class));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return create(io, repository);
    }

    private static Qooxdoo create(IO io, Repository repository) {
        String str;
        String version;
        
        patch(repository);
        try {
            str = io.node("resource:log/info.log").readString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        version = Qooxdoo.class.getPackage().getImplementationVersion();
        return new Qooxdoo(version, extract(str, "URL:"), Long.parseLong(extract(str, "Last Changed Rev:")), repository);
    }

    // TODO: duplicates Server code
    private static void patch(Repository repository) {
        addBootstrapDependency(repository);
        
        repository.get("qx.log.Logger").head().deps.add("qx.log.appender.Native");
        repository.get("qx.log.Logger").head().deps.add("qx.Interface");

        // TODO: Qooxdoo loads runtime dependencies earlier ...
        repository.get("qx.Class").head().deps.add("qx.lang.Object");
        repository.get("qx.Class").head().deps.add("qx.lang.Core");
        repository.get("qx.Class").head().deps.add("qx.lang.Generics");
        repository.get("qx.Class").head().deps.add("qx.lang.String");
        repository.get("qx.Class").head().deps.add("qx.lang.Function");

        // TODO: Qooxdoo loads runtime dependencies earlier ...
        repository.get("qx.ui.component.DateChooser").head().deps.add("qx.locale.Manager");
        
        // TODO: called from Property initializer
        repository.get("qx.ui.treevirtual.MDragAndDropSupport").head().deps.add("qx.util.ColorUtil");

        // TODO:
        repository.get("qx.ui.table.cellrenderer.Abstract").head().deps.add("qx.html.StyleSheet");
    }

    private static void addBootstrapDependency(Repository repository) {
        String bs = Bootstrap.class.getName();
        for (Module module : repository) {
            if (!bs.equals(module.getName()) && module.getName().startsWith("qx.")) {
                module.head().deps.add(bs);
            }
        }
    }

    private static String extract(String str, String key) {
        int start;
        int end;
        
        start = str.indexOf(key);
        if (start == - 1) {
            throw new IllegalArgumentException("missing " + key + " in " + str);
        }
        start += key.length();
        end = str.indexOf('\n', start);
        if (end == -1) {
            throw new IllegalArgumentException("missing newline in " + str);
        }
        return str.substring(start, end).trim();
    }

    //--
    
    public final String version;
    public final String src;
    public final long revision;
    public final Repository repository;
    
    public Qooxdoo(String version, String src, long revision, Repository repository) {
        this.version = version;
        this.src = src;
        this.revision = revision;
        this.repository = repository;
    }

    @Override
    public String toString() {
        return "qooxdoo " + version + ": src=" + src + ", revision=" + revision + ", classes=" + repository.size();
    }
    
}
