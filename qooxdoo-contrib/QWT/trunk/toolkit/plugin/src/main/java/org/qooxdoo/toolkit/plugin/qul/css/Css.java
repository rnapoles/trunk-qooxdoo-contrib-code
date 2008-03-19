package org.qooxdoo.toolkit.plugin.qul.css;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.qooxdoo.sushi.io.Node;

import de.mlhartme.mork.mapping.Mapper;
import de.mlhartme.mork.scanner.Position;

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
