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

import java.util.Date;

import junit.framework.TestCase;
import org.qooxdoo.sushi.xml.Xml;
import org.qooxdoo.sushi.xml.XmlException;

public class FeedTest extends TestCase {
    private static final Xml XML = new Xml();
    
    public void testEmpty() throws XmlException {
        Feed feed;
        
        feed = new Feed();
        feed = Feed.fromXml(XML.selector, feed.toXml(XML.builder));
        assertEquals(0, feed.channels().size());
    }

    public void testNormal() throws XmlException {
        Feed feed;
        Channel channel;
        Item item;
        Date date = new Date();
        
        feed = new Feed();
        channel = new Channel();
        channel.items().add(new Item());
        channel.items().add(new Item());
        feed.channels().add(channel);
        
        channel = new Channel("t", "l", "d");
        channel.items().add(new Item("t", "l", "d", "a", "g", date));
        feed.channels().add(channel);
        
        feed = Feed.fromXml(XML.selector, feed.toXml(XML.builder));
        assertEquals(2, feed.channels().size());
        assertEquals(2, feed.channels().get(0).items().size());

        channel = feed.channels().get(1);
        assertEquals("t", channel.getTitle());
        assertEquals("l", channel.getLink());
        assertEquals("d", channel.getDescription());
        assertEquals(1, channel.items().size());
        
        item = channel.items().get(0);
        assertEquals("t", item.getTitle());
        assertEquals("l", item.getLink());
        assertEquals("d", item.getDescription());
        assertEquals("a", item.getAuthor());
        assertEquals("g", item.getGuid());
        // dates do not equal because milli seconds get lost:
        assertEquals(date.toString(), item.getPubDate().toString());
    }
}
