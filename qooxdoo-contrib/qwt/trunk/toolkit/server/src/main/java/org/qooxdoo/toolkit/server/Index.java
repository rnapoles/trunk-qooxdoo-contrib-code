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

package org.qooxdoo.toolkit.server;

import java.io.IOException;
import java.io.Writer;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.qooxdoo.toolkit.qooxdoo.Qooxdoo;
import org.qooxdoo.toolkit.repository.Compressor;
import org.qooxdoo.toolkit.repository.Module;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.util.Strings;

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

    /** @return index file */
    public void generate(String title, String client, Map<String, Class<?>> declarations) throws IOException {
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
                "  'qx.application' : 'QwtApplication'" +
                "};");
        // TODO: no escaping!?
        modules(writer, Proxy.class.getName(), client);
        
        lines(writer, 
                "qx.Class.define('QwtApplication', {",
                "  extend : qx.application.Gui,",
                "  members : {",
                "    main : function() {",
                "      this.base(arguments);", 
                "      var root = new " + client + "();");
        initProxies(writer, declarations);
        lines(writer, 
                "      root.createRoot().addToDocument();" +
                "      if (root.background) {" +
                "        QWT_BACKGROUND = function() {" +
                "          try {" +
                "            root.background();" +
                "          } finally {" +
                "            window.setTimeout(\"QWT_BACKGROUND()\", 1000);" +
                "          }" +
                "        };" +
                "        window.setTimeout(\"QWT_BACKGROUND()\", 1000)" +
                "      }",
                "    }",
                "  }",
                "});");
        lines(writer,
              "    </script>",
              "  </head>",
              "  <body>",
              "    <div></div>",
              "  </body>",
              "</html>");
        writer.close();
    }

    private void initProxies(Writer dest, Map<String, Class<?>> declarations) throws IOException {
        String name;
        String methods;
        
        for (Map.Entry<String, Class<?>> entry : declarations.entrySet()) {
            name = entry.getKey();
            methods = Index.methods(entry.getValue());
            dest.write("root.init" + Strings.capitalize(name) + "(new Proxy('" + name + "', " + methods + "));\n");
        }
    }

    private static String methods(Class<?> ifc) {
        StringBuilder builder;
        
        builder = new StringBuilder();
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
