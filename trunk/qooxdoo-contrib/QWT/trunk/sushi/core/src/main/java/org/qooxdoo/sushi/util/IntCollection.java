/* Copyright (c) 1&1. All Rights Reserved. */

package org.qooxdoo.sushi.util;

/**
 * This interface is quite incomplete, I add methods as necessary.
 */
public interface IntCollection {
    void add(int ele);
    void remove(int ele);
    void clear();
    boolean contains(int ele);
    int size();
    int[] toArray();
}
