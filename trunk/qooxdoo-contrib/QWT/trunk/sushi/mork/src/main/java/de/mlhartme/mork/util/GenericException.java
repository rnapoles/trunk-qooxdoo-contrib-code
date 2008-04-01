// �{header}:
// 
// This is file src/de/mlhartme/mork/util/GenericException.java,
// Mork version 0.6  Copyright � 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// �.

package de.mlhartme.mork.util;

/**
 * Exception with a type. Using this class avoids defining may exceptions
 * classes to distinguish different types of exceptions.
 */

public class GenericException extends Exception {
    public final String id;      // != null, used to identigy the exception
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
