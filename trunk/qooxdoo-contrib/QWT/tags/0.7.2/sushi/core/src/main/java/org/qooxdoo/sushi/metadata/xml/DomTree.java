/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2007 1&1 Internet AG, Germany, http://www.1and1.org
   
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

import org.qooxdoo.sushi.xml.Builder;
import org.w3c.dom.Element;

/** You'll normally not use this class directly, use Data.toXml instead */
public class DomTree extends Tree {
    private final List<Element> parents;
    
    public DomTree(Element root) {
        parents = new ArrayList<Element>();
        parents.add(root);
    }

    @Override
    public Element done() {
        if (parents.size() != 1) {
            throw new IllegalStateException("" + parents.size());
        }
        return parents.get(0);
    }

    @Override
    public void ref(String name, int idref) throws IOException {
        Element element;
        
        element = Builder.element(parent(), name);
        element.setAttribute("idref", Integer.toString(idref));
        parents.add(element);
    }

    @Override
    public void begin(String name, int id, int children) throws IOException {
        Element element;
        
        element = Builder.element(parent(), name);
        if (id != -1) {
            element.setAttribute("id", Integer.toString(id));
        }
        parents.add(element);
    }

    @Override
    public void end(String name) {
        parents.remove(parents.size() - 1);
    }

    @Override
    public void text(String name, String content) {
        Builder.textElement(parent(), name, content);
    }
    
    private Element parent() {
        return parents.get(parents.size() - 1);
    }
}
