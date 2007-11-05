package org.qooxdoo.widgets.client;

import org.qooxdoo.widgets.common.PongService;

public class Pong implements PongService {
    public void pong(String msg) {
        System.out.println("pong: " + msg);
    }
}
