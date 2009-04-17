package org.qooxdoo.sushi.fs;

import java.io.IOException;

public class TemplateException extends IOException {
    public TemplateException(String msg) {
        super(msg);
    }
    public TemplateException(String msg, Throwable t) {
        super(msg, t);
    }
}
