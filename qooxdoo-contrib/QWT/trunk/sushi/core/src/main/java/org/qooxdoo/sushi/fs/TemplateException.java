package org.qooxdoo.sushi.fs;

public class TemplateException extends Exception {
    public TemplateException(String msg) {
        super(msg);
    }
    public TemplateException(String msg, Throwable t) {
        super(msg, t);
    }
}
