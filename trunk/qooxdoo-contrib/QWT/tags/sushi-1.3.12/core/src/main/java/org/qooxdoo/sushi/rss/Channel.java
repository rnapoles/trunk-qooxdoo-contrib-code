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

import java.util.ArrayList;
import java.util.List;

import org.w3c.dom.Element;

import org.qooxdoo.sushi.xml.Builder;
import org.qooxdoo.sushi.xml.Selector;
import org.qooxdoo.sushi.xml.XmlException;

public class Channel {
    public static Channel fromXml(Selector selector, Element channel) throws XmlException {
        Channel result;
        
        result = new Channel();
        result.title = selector.string(channel, "title");
        result.link = selector.string(channel, "link");
        result.description = selector.string(channel, "description");
        for (Element item : selector.elements(channel, "item")) {
            result.items.add(Item.fromXml(selector, item));
        }
        return result;
    }

    private String title;
    private String link;
    private String description;
    private final List<Item> items;
    
    public Channel() {
        this("", "", "");
    }
    
    public Channel(String title, String link, String description) {
        this.title = title;
        this.link = link;
        this.description = description;
        this.items = new ArrayList<Item>();
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getLink() {
        return link;
    }
    public void setLink(String link) {
        this.link = link;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    
    public List<Item> items() {
        return items;
    }
    
    public void add(Item item, int maxItems) {
        int remove;

        items.add(0, item);
        remove = items.size() - maxItems;
        while (remove-- > 0) {
            items.remove(maxItems);
        }
    }
    
    public void addXml(Element rss) {
        Element channel;
        
        channel = Builder.element(rss, "channel");
        Builder.textElement(channel, "title", title);
        Builder.textElement(channel, "link", link);
        Builder.textElement(channel, "description", description);
        for (Item item : items) {
            item.addXml(channel);
        }
    }
}
