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

package org.qooxdoo.toolkit.plugin.qul.css;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.mapping.Mapper;
import org.qooxdoo.sushi.scanner.Position;
import org.qooxdoo.toolkit.plugin.binding.java.Clazz;
import org.qooxdoo.toolkit.plugin.qul.Loader;

public class Css {
    public static Css loadString(String str) {
        try {
            return load(new StringReader(str));
        } catch (IOException e) {
            throw new RuntimeException("unexpected", e);
        }
    }

    public static Css load(Node src) throws IOException {
        Reader reader;
        Css result;
        
        reader = src.createReader();
        result = load(reader);
        reader.close();
        return result;
    }

    public static Css load(Reader r) throws IOException {
        Mapper mapper;
        
        mapper = new Mapper("org.qooxdoo.toolkit.plugin.qul.css.Mapper");
        return (Css) mapper.run(new Position(), r)[0];
    }

    //--
    
    public final List<Ruleset> rules;
    
    public Css(Ruleset[] ruleset) {
        rules = new ArrayList<Ruleset>(Arrays.asList(ruleset));
    }
    
    public void run(String element, Clazz clazz, String v, Loader dest) {
        Ruleset ruleset;
        
        ruleset = null;
        for (Ruleset r : rules) {
            if (r.matches(element)) {
                ruleset = r;
            }
        }
        if (ruleset != null) {
            ruleset.apply(clazz, v, dest);
        }
    }
    
    @Override
    public String toString() {
        StringBuilder builder;
        
        builder = new StringBuilder();
        for (Ruleset rule : rules) {
            builder.append(rule.toString());
        }
        return builder.toString();
    }
}
