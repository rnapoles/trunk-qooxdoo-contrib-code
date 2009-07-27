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

package org.qooxdoo.sushi.misc;

/**
 * Exception with a type. Using this class avoids defining may exceptions
 * classes to distinguish different types of exceptions.
 */

public class GenericException extends Exception {
    public final String id;      // != null, used to identify the exception
    public final String details; // != null
    public final Throwable base; // nullable

    public GenericException(String id) {
        this(id, "", null);
    }

    public GenericException(String id, String details) {
        this(id, details, null);
    }

    public GenericException(String id, Throwable base) {
        this(id, "", base);
    }

    public GenericException(String id, String details, Throwable base) {
        // adding details to the message improves the error message
        // you get by just printing the exception
        super(str(id, details));

        this.id = id;
        this.details = details;
        this.base = base;
    }

    private static String str(String msg, String details) {
        if (details.length() != 0) {
            return msg + ":" + details;
        } else {
            return msg;
        }
    }

    @Override
    public String toString() {
        return getMessage();
    }
}
