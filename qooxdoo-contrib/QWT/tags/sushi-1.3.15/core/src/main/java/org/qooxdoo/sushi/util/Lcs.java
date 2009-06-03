package org.qooxdoo.sushi.util;

import java.util.ArrayList;
import java.util.List;

public class Lcs<T extends Object> {
    public static <T> List<T> compute(List<T> vert, List<T> hor) {
        List<T>[] previous;
        List<T>[] current;
        
        previous = new List[hor.size() + 1];
        for (int i = 0; i < previous.length; i++) {
            previous[i] = new ArrayList<T>();
        }

        for (T value : vert) {
            current = new List[hor.size() + 1];
            current[0] = new ArrayList<T>();
            for (int i = 1; i < current.length; i++) {
                if (value.equals(hor.get(i - 1))) {
                    current[i] = append(previous[i - 1], value);
                } else {
                    current[i] = longest(current[i - 1], previous[i]);
                }
            }
            previous = current;
        }
        return previous[previous.length - 1];
    }
    
    private static <T> List<T> append(List<T> lst, T value) {
        List<T> result;
        
        result = new ArrayList<T>(lst.size() + 1);
        result.addAll(lst);
        result.add(value);
        return result;
    }
    
    private static <T> List<T> longest(List<T> a, List<T> b) {
        return new ArrayList<T>(a.size() >= b.size() ? a : b);
    }
}
