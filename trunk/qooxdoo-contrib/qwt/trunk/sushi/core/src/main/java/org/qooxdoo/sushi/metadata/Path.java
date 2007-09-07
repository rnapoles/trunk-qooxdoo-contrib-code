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

package org.qooxdoo.sushi.metadata;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import org.qooxdoo.sushi.util.Strings;

public class Path {
    private final String path;
    
    public Path(String path) {
        this.path = path;
    }

    public String getPath() {
        return path;
    }
    
    /** @return never null */
    public List<Instance<?>> select(Instance<?> context) {
        List<Instance<?>> current;
        List<Instance<?>> next;
        Collection<Instance<?>> tmp;
        Item item;
        
        current = new ArrayList<Instance<?>>();
        current.add(context);
        for (Step step : steps()) {
            next = new ArrayList<Instance<?>>();
            for (Instance<?> pos : current) {
                if (!(pos.getType() instanceof ComplexType)) {
                    throw new PathException("complex type expected: " + pos.getType());
                }
                item = ((ComplexType) pos.getType()).lookup(step.name);
                if (item == null) {
                    throw new PathException(pos.getType().getName() + ": no such field: " + step);
                }
                tmp = item.getData(pos.get());
                if (step.idx != -1) {
                    if (step.idx >= tmp.size()) {
                        tmp = Collections.emptyList();
                    } else {
                        tmp = (Collection) Collections.singleton(get(tmp.iterator(), step.idx));
                    }
                }
                next.addAll(tmp);
            }
            current = next;
        }
        return current;
    }
    
    private static Instance<?> get(Iterator<Instance<?>> iter, int idx) {
        while (idx-- > 0) {
            iter.next();
        }
        return iter.next();
    }

    /** @return never null */
    public Instance<?> selectOne(Instance<?> context) {
        List<Instance<?>> result;
        
        result = select(context);
        switch (result.size()) {
        case 0:
            throw new PathException("not found: " + this);
        case 1:
            return result.get(0);
        default:
            throw new PathException("ambiguous path: " + this);
        }
    }
    
    /** @return null if not found */
    public Variable<?> access(Instance<?> context, boolean create) {
        Iterator<Step> steps;
        Step step;
        Instance<?> current;
        Item<Object> item;
        Object parent;
        Object child;
        List<Object> children;
        
        steps = steps().iterator();
        if (!steps.hasNext()) {
            throw new PathException("cannot get value on empty path");
        }
        current = context;
        while (true) {
            step = steps.next();
            if (!(current.getType() instanceof ComplexType)) {
                throw new PathException("complex type expected: " + current.getType());
            }
            item = ((ComplexType) current.getType()).lookup(step.name);
            if (item == null) {
                throw new PathException(current.getType().getName() + ": no such field: " + step);
            }
            parent = current.get();
            if (!steps.hasNext()) {
                if (step.idx != -1) {
                    throw new PathException("index in last step is not supported: " + path);
                }
                return new Variable<Object>(parent, item);
            } 
            children = new ArrayList<Object>(item.get(parent));
            if (step.idx == -1) {
                switch (children.size()) {
                    case 0: 
                        if (!create) {
                            return null;
                        }
                        child = item.getType().newInstance();
                        item.setOne(parent, child);
                        break;
                    case 1:
                        child = children.iterator().next();
                        break;
                    default:
                        throw new PathException("cannot access ambiguous path: " + step);
                }
            } else {
                int missing = step.idx - children.size() + 1;
                if (missing > 0) {
                    if (!create) {
                        return null;
                    }
                    children = addNew(parent, item, missing);
                }
                child = children.get(step.idx);
            }
            current = new Instance<Object>(item.getType(), child);
        }
    }

    private List<Object> addNew(Object parent, Item<Object> item, int count) {
        List<Object> children;
        
        children = new ArrayList<Object>(item.get(parent));
        do {
            children.add(item.getType().newInstance());
        } while (--count > 0);
        item.set(parent, children);
        return children;
    }
    
    @Override
    public String toString() {
        return Strings.join("/", path);
    }
    
    //--
    
    protected List<Step> steps() {
        List<Step> result;

        result = new ArrayList<Step>();
        for (String step : Strings.split("/", path)) {
            result.add(Step.parse(step));
        }
        return result;
    }
    
    protected static class Step {
        public static Step parse(String step) {
            int idx;
            
            if (step.endsWith("]")) {
                idx = step.lastIndexOf('[');
                if (idx == -1) {
                    throw new IllegalArgumentException(step);
                }
                return new Step(step.substring(0, idx), Integer.parseInt(step.substring(idx + 1, step.length() - 1)));
            } else {
                return new Step(step);
            }
        }
        
        public final String name;
        public final int idx;
        
        public Step(String name) {
            this(name, -1);
        }
        
        public Step(String name, int idx) {
            this.name = name;
            this.idx = idx;
        }
        
        @Override
        public String toString() {
            if (idx != -1) {
                return name + '[' + idx + ']';
            } else {
                return name;
            }
        }
    }
}
