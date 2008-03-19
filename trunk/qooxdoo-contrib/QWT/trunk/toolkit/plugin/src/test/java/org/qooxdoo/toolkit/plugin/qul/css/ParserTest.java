package org.qooxdoo.toolkit.plugin.qul.css;

import org.junit.Test;
import static org.junit.Assert.*;

public class ParserTest {
    private Css css;
    
    @Test
    public void empty() {
        css = Css.loadString("");
        assertEquals(0, css.rules.size());
    }

    @Test
    public void one() {
        css = Css.loadString("abc { a : bc }");
        assertEquals(1, css.rules.size());
    }
}
