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

package org.qooxdoo.sushi.rss;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.xml.Builder;
import org.qooxdoo.sushi.xml.Selector;
import org.qooxdoo.sushi.xml.XmlException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;

public class Feed {
    private final List<Channel> channels;
    
    public static Feed read(Node src) throws XmlException, IOException, SAXException {
        return fromXml(src.getIO().getXml().selector, src.readXml());
    }

    public static Feed fromXml(Selector selector, Document doc) throws XmlException {
        Feed feed;
        
        feed = new Feed();
        for (Element element : selector.elements(doc.getDocumentElement(), "channel")) {
            feed.channels.add(Channel.fromXml(selector, element));
        }
        return feed;
    }

    public Feed() {
        channels = new ArrayList<Channel>();
    }

    public List<Channel> channels() {
        return channels;
    }

    //-

    public void write(Node dest) throws IOException {
        dest.writeXml(toXml(dest.getIO().getXml().builder));
    }        

    public Document toXml(Builder builder) {
        Document doc;
        Element rss;
        
        doc = builder.createDocument("rss");
        rss = doc.getDocumentElement();
        rss.setAttribute("version", "2.0");
        for (Channel channel : channels) {
            channel.addXml(rss);
        }
        return doc;
    }
}
