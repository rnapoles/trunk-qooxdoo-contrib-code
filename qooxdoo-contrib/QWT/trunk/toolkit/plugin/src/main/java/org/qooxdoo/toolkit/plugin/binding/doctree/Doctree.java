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

package org.qooxdoo.toolkit.plugin.binding.doctree;

import java.io.IOException;
import java.util.List;

import org.qooxdoo.sushi.archive.Archive;
import org.qooxdoo.sushi.io.IO;
import org.qooxdoo.sushi.io.Node;
import org.qooxdoo.sushi.metadata.ComplexType;
import org.qooxdoo.sushi.metadata.Instance;
import org.qooxdoo.sushi.metadata.xml.LoaderException;
import org.qooxdoo.toolkit.plugin.binding.Normalize;
import org.qooxdoo.toolkit.plugin.binding.metadata.ReflectSchema;
import org.xml.sax.SAXException;

public class Doctree {
    private static final ReflectSchema SCHEMA = new ReflectSchema();
    private static final ComplexType TYPE = SCHEMA.complex(Doctree.class);
    private static final Normalize N = new Normalize();
    
    static {
        try {
            init(new IO());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static void init(IO io) throws IOException, ClassNotFoundException {
        Node jar;
        Node root;
        String name;
        
        N.removes("packages", "classes", "errors", "hasWarning", "hasError");
        N.rename("class", "clazz");
        
        jar = io.locateClasspathItem(Doctree.class);
        if (jar.isDirectory()) {
            root = jar;
        } else {
            root = Archive.loadJar(jar).data;
        }
        for (Node clazz : root.find("org/qooxdoo/toolkit/plugin/binding/doctree/*.class")) {
            name = clazz.getRelative(root);
            name = name.replace('/', '.');
            name = name.substring(0, name.length() - 6);
            SCHEMA.complex(Class.forName(name));
        }
    }

    public static Doctree load(Node src) throws IOException, SAXException, LoaderException {
        Node tmp;
        Instance<Doctree> result;
        
        tmp = src.io.stringNode("");
        N.run(src, tmp);
        result = TYPE.loadXml(tmp);
        return result.get();
    }

    public List<Package> packages;
}
