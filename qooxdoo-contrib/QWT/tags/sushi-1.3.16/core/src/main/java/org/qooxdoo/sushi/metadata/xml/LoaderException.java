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

package org.qooxdoo.sushi.metadata.xml;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

/** A none-empty list of sax exceptions with position information in the message. */
public class LoaderException extends IOException {
    private static final long serialVersionUID = 2L;

    /** 
     * @param lst 
     *     if the document is not well-formed: exactly one none-loader exception;
     *     if the document is well-formed but invalid: both loader and none-loader exceptions
     */
    public static void check(List<SAXException> lst, InputSource src, Object loaded) throws LoaderException {
        StringBuilder builder;
        List<SAXException> loader;
        
        if (lst.size() == 0) {
            return;
        }
        loader = getLoaderExceptions(lst);
        if (loader.size() > 0) {
            // Forget about other exception, consider loader exceptions only
            lst = loader;
        }
        builder = new StringBuilder();
        for (SAXException e : lst) {
            if (builder.length() > 0) {
                builder.append('\n');
            }
            builder.append(msg(e, src));
        }
        throw new LoaderException(builder.toString(), lst, loaded);
    }
    
    private static List<SAXException> getLoaderExceptions(List<SAXException> lst) {
        List<SAXException> result;
        
        result = new ArrayList<SAXException>();
        for (SAXException e : lst) {
            if (e instanceof SAXLoaderException) {
                result.add(e);
            }
        }
        return result;
    }

    //--
    
    private final List<SAXException> causes;
    private final Object loaded;
    
    public LoaderException(String msg, List<SAXException> causes, Object loaded) {
        super(msg);
        this.causes = causes;
        this.loaded = loaded;
    }

    public Object getLoaded() {
        return loaded;
    }
    
    public List<SAXException> causes() {
        return causes;
    }
    
    private static String msg(SAXException e, InputSource src) {
        SAXParseException pe;
        
        if (e instanceof SAXParseException) {
            pe = (SAXParseException) e;
            return pe.getSystemId() + ":" + pe.getLineNumber() + ":" + pe.getColumnNumber() + ": " + pe.getMessage();
        } else {
            return src.getSystemId() + ": " + e.getMessage();
        }
    }
}
