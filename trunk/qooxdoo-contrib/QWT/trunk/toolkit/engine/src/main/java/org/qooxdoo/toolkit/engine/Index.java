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

package org.qooxdoo.toolkit.engine;

import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.toolkit.repository.Compressor;
import org.qooxdoo.toolkit.repository.Module;

/** generates application frame */
public class Index {
    private final boolean compress;
    
    private final Node file;
    
    private final Qooxdoo qooxdoo;
    
    public Index(boolean compress, Node file, Qooxdoo qooxdoo) {
        this.compress = compress;
        this.file = file;
        this.qooxdoo = qooxdoo;
    }

    /** 
     * @param arguments  passed to the contructor. Key is the server-side id, value is the interface
     */
    public void generate(String title, String client, Map<Integer, Class<?>> arguments) throws IOException {
        Writer writer;
        
        writer = file.createWriter();
        lines(writer, "<html>",
              "  <head>",
              "    <script type='text/javascript'>window._htmlstart=(new Date).valueOf()</script>",
              "    <title>" + title + "</title>",
              "    <script type='text/javascript'>");
        lines(writer, 
                "window.qxsettings = {" +
                "  'qx.version' : '" + qooxdoo.version + "'," +
                "};");
        // TODO: no escaping!?
        modules(writer, Proxy.class.getName(), client);
        lines(writer,
                "qx.core.Init.getInstance().setApplication(", 
                createClient(client, arguments),
                ");",
                "    </script>",
                "  </head>",
                "  <body>",
                "    <div></div>",
                "  </body>",
                "</html>");
        writer.close();
    }

    private String createClient(String client, Map<Integer, Class<?>> arguments) {
        StringBuilder builder;
        boolean first;
        
        builder = new StringBuilder();
        builder.append("new ").append(client).append("(");
        first = true;
        for (Map.Entry<Integer, Class<?>> entry : arguments.entrySet()) {
            if (first) {
                first = false;
            } else {
                builder.append(", ");
            }
            builder.append("new Proxy(").append(entry.getKey()).append(",");
            methods(entry.getValue(), builder);
            builder.append(')');
        }
        builder.append(')');
        return builder.toString(); 
    }

    private static String methods(Class<?> ifc, StringBuilder builder) {
        builder.append("[");
        for (Method m : ifc.getDeclaredMethods()) {
            if (builder.length() == 1) {
                builder.append("'");
            } else {
                builder.append(", '");
            }
            builder.append(m.getName());
            builder.append("'");
        }
        builder.append(']');
        return builder.toString();
    }
    
    private void modules(Writer dest, String ... names) throws IOException {
        List<Module> modules;
        List<String> lst;
        String code;
        int q;
        int other;
        
        modules = qooxdoo.repository.executable(dest, compress, qooxdoo.repository.getAll(names));
        lst = new ArrayList<String>();
        q = 0;
        other = 0;
        for (Module module : modules) {
            code = module.getCode();
            if (compress) {
                code = Compressor.run(code);
            }
            lst.add(module.getName() + '\t' + code.length());
            if (module.getName().startsWith("org.qooxdoo.toolkit.qooxdoo")) {
                q += code.length();
            } else {
                other += code.length();
            }
        }
        lst.add("");
        lst.add("org.qooxdoo.toolkit.qooxdoo.* " + q);
        lst.add("other " + other);
        file.getParent().join("modules.lst").writeLines(lst);
    }

    public void lines(Writer dest, String ... lines) throws IOException {
        for (String line : lines) {
            dest.write(line + "\n");
        }
    }
    
    @Override
    public String toString() {
        return file.toString();
    }
}
