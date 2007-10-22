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

package org.qooxdoo.widgets;

import qx.application.Gui;
import qx.event.type.DataEvent;
import qx.ui.basic.Image;
import qx.ui.basic.Label;
import qx.ui.form.ComboBox;
import qx.ui.layout.GridLayout;
import qx.ui.layout.VerticalBoxLayout;
import qx.ui.pageview.tabview.Button;
import qx.ui.pageview.tabview.Page;
import qx.ui.pageview.tabview.TabView;
import org.qooxdoo.toolkit.qooxdoo.EventListener;

public class Application extends Gui {
    private IServices services;
    
    public Application() {
    }
    
    public void background() {
        System.out.println("back");
    }
    
    public void initServices(IServices services) {
        System.out.println("init services");
        this.services = services;
    }

    @Override
    public void main() {
        TabView view;
        
        super.main();
        System.out.println("welcome!");

        new GridLayout().add(new Label("hi"), 1, 2);
        view = new TabView();
        view.setLeft(20);
        view.setTop(48);
        view.setRight(335);
        view.setBottom(48);

        addWelcome(view);
        addControls(view);
        
        view.addToDocument();
    }

    private void addWelcome(TabView view) {
        Button button;
        Page page;
        VerticalBoxLayout box;
        
        button = new Button("Welcome");
        button.setChecked(true);
        view.getBar().add(button);
        page = new Page(button);
        box = new VerticalBoxLayout();
        page.add(box);
        for (int i = 1; i <= 5; i++) {
            box.add(new Label("Line " + i));
        }
        box.add(new Image("images/demo.gif"));
        view.getPane().add(page);
    }

    private void addControls(TabView view) {
        Button button;
        Page page;
        VerticalBoxLayout box;
        ComboBox<String> combo;
        qx.ui.form.Button but;
        
        
        button = new Button("Controls");
        view.getBar().add(button);
        page = new Page(button);
        box = new VerticalBoxLayout();
        page.add(box);
        combo = ComboBox.<String>createT(new String[] {"first", "second"});
        combo.addChangeValueListener(new Changes(combo));
        box.add(combo);
        but = new qx.ui.form.Button("Ping");
        but.setWidth(50);
        but.setHeight(20);
        but.addExecuteListener(new Clicked(services));
        box.add(but);
        view.getPane().add(page);
    }

    // TODO: none-static class
    public static class Clicked implements EventListener {
        private final IServices services;
        
        public Clicked(IServices services) {
            this.services = services;
        }
        
        public void notify(DataEvent obj) {
            System.out.println("clicked: " + obj);
            Object result = services.ping("pong");
            System.out.println("result: " + result);
        }
    }
    
    public static class Changes implements EventListener {
        private final ComboBox<?> dest;

        public Changes(ComboBox<?> dest) {
            this.dest = dest;
        }

        public void notify(DataEvent obj) {
            System.out.println("selection changed: " + dest.getValue());
        }
    }
}
