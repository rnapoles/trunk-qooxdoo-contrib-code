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

package org.qooxdoo.toolkit.plugin.binding.qx;

import java.io.IOException;
import java.io.Reader;
import java.util.List;

import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.metadata.ComplexType;
import org.qooxdoo.sushi.metadata.xml.Loader;
import org.qooxdoo.sushi.metadata.xml.LoaderException;
import org.qooxdoo.sushi.xml.Builder;
import org.qooxdoo.sushi.xml.XmlException;
import org.qooxdoo.toolkit.plugin.binding.Normalizer;
import org.qooxdoo.toolkit.plugin.binding.java.Set;
import org.qooxdoo.toolkit.plugin.binding.metadata.ReflectSchema;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class Doctree {
    public static final ReflectSchema SCHEMA = new ReflectSchema();
    private static final ComplexType TYPE = SCHEMA.complex(Doctree.class);
    private static final Normalizer N = new Normalizer();
    
    static {
        init();
    }

    public static void init() {
        N.removes("appearances", "states", "errors", "types", "params", "constants", "events", "properties", 
                "methods", "methods-static", "packages", "classes", "hasWarning", "hasError");
        
        N.rename("class", "clazz");
        N.rename("fullName", "full-name");
        N.rename("packageName", "package-name");
        N.rename("superClass", "super-class");
        N.rename("return", "retur-n");
        N.rename("defaultValue", "default-value");
        N.rename("fromProperty", "from-property");
        N.rename("propertyType", "property-type");
        N.rename("isStatic", "is-static");
        N.rename("isAbstract", "is-abstract");
        N.rename("isCtor", "is-ctor");
        N.rename("isMixin", "is-mixin");
        N.rename("isSingleton", "is-singleton");
        N.rename("isInternal", "is-internal");
        N.rename("docFrom", "doc-from");
        N.rename("oldProperty", "old-property");
        N.rename("overriddenFrom", "overridden-from");
        N.rename("allowNull", "allow-null");
        N.rename("childClasses", "child-classes");
        N.rename("possibleValues", "possible-values");
    }

    public static Doctree load(Node src) throws IOException, SAXException, LoaderException {
        return (Doctree) load(TYPE, src);
    }

    public static Object load(ComplexType type, Node src) throws IOException, SAXException, LoaderException {
        Node tmp;
        Object result;
        Reader in;
        
        // TODO: no validation
        tmp = src.getIO().stringNode("");
        N.run(src, tmp);
        in = tmp.createReader();
        result = new Loader(type, Builder.createSAXParser()).run(new InputSource(in));
        in.close();
        return result;
    }
    //--
    
    public List<Package> packages;
    
    public Set createJava() throws IOException, SAXException, LoaderException, XmlException {
        Set set;

        set = new Set();
        for (Package p : packages) {
            p.addJava(set);
        }
        set.link();
        return set;
    }
    
}
