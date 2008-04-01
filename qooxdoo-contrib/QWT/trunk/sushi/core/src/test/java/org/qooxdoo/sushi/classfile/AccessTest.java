package org.qooxdoo.sushi.classfile;

import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.junit.Test;

public class AccessTest {
    @Test
    public void flags() {
        Set<Access> all;
        
        all = Access.fromFlags((char) 0x0c, false);
        assertEquals(new HashSet<Access>(Arrays.asList(Access.STATIC, Access.PROTECTED)), all);
        assertEquals((char) 0x0c, Access.toFlags(all));
    }
}
