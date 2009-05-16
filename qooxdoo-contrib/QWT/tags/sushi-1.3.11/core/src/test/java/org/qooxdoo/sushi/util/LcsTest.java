package org.qooxdoo.sushi.util;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

/** 
 * Computes the longest common subsequence as described in
 * http://en.wikipedia.org/wiki/Longest_common_subsequence_problem 
 */
public class LcsTest {
    @Test
    public void empty() {
        check("", "", "");
    }
    
    @Test
    public void same() {
        check("a", "a", "a");
        check("abc", "abc", "abc");
    }

    @Test
    public void different() {
        check("", "a", "b");
        check("", "abc", "123");
    }
    
    @Test
    public void mixed() {
        check("ga", "agcat", "gac");
        check("MJAU", "MZJAWXU", "XMJYAUZ");
    }
    
    private void check(String expected, String left, String right) {
        assertEquals(lst(expected), Lcs.compute(lst(left), lst(right)));
    }
    
    private List<Character> lst(String arg) {
        int max;
        List<Character> result;

        max = arg.length();
        result = new ArrayList<Character>(max);
        for (int i = 0; i < max; i++) { 
            result.add(new Character(arg.charAt(i)));
        }
        return result;
    }
}
