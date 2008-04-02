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

import org.xml.sax.Locator;

import org.qooxdoo.sushi.metadata.Variable;

public class SAXVariableException extends SAXLoaderException {
    public final Variable<?> variable;
    
    public SAXVariableException(Variable<?> variable, Locator locator, Throwable e) {
        super(variable.item.getName() + ": " + e.getMessage(), locator);
        
        this.variable = variable;
    }
}
