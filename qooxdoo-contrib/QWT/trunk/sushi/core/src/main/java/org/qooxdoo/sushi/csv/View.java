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

package org.qooxdoo.sushi.csv;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.metadata.Instance;
import org.qooxdoo.sushi.metadata.Path;
import org.qooxdoo.sushi.metadata.Schema;
import org.qooxdoo.sushi.metadata.SimpleType;
import org.qooxdoo.sushi.metadata.SimpleTypeException;
import org.qooxdoo.sushi.metadata.annotation.AnnotationSchema;
import org.qooxdoo.sushi.metadata.annotation.Sequence;
import org.qooxdoo.sushi.metadata.annotation.Type;
import org.qooxdoo.sushi.metadata.annotation.Value;
import org.qooxdoo.sushi.metadata.xml.LoaderException;

/** Defines how to turn instances into csv an vice versa */ 
@Type public class View {
    public static View fromXml(Node src) throws IOException, LoaderException {
        Schema metadata;
        
        metadata = new AnnotationSchema();
        metadata.add(new SimpleType(metadata, Path.class, "string") {
            @Override
            public Object newInstance() {
                return "";
            }
            
            @Override
            public Object stringToValue(String str) {
                return new Path(str);
            }

            @Override
            public String valueToString(Object value) {
                return ((Path) value).getPath();
            }
        });
        return metadata.type(View.class).<View>loadXml(src).get();
    }

    @Value private Path scope;
    @Sequence(Field.class) private final List<Field> fields;
    
    public View() { // TODO
        this(new Path(""));
    }

    public View(Path scope) {
        this.scope = scope;
        this.fields = new ArrayList<Field>();
    }

    public Path getScope() {
        return scope;
    }
    
    public void setScope(Path scope) {
        this.scope = scope;
    }
    
    public List<Field> fields() {
        return fields;
    }
    
    public void add(Field field) {
        if (lookup(field.getName()) != null) {
            throw new ViewException("duplicate field: " + field.getName());
        }
        fields.add(field);
    }
    
    public int size() {
        return fields.size();
    }
    
    public Field lookup(String name) {
        for (Field field : fields) {
            if (field.getName().equals(name)) {
                return field;
            }
        }
        return null;
    }
    
    //--
    
    public void toCsv(Instance<?> src, Csv dest, String ... selected) {
        toCsv(src, dest, Arrays.asList(selected));
    }
    
    public void toCsv(Instance<?> src, Csv dest, List<String> selected) {
        List<String> keys;
        String key;
        int idx;
        Instance<?>[] found;
        
        found = new Instance<?>[selected.size()];
        for (Instance<?> value : scope.select(src)) {
            keys = fields.get(0).get(value);
            if (keys.size() == 1) {
                key = keys.get(0);                
                idx = selected.indexOf(key);
                if (idx != -1) {
                    if (found[idx] != null) {
                        throw new IllegalArgumentException("duplicate key: " + key);
                    }
                    found[idx] = value;
                }
            }
        }
        dest.add(header());
        for (int i = 0; i < found.length; i++) {
            if (found[i] == null) {
                throw new IllegalArgumentException("key not found: " + selected.get(i));
            }
            toCsv(found[i], dest);
        }
    }

    public void toCsv(Instance<?> value, Csv dest) {
        Line line;
        List<String> strings;
        
        line = new Line();
        for (Field field : fields) {
            strings = field.get(value);
            if (strings == null) {
                line.addNull();
            } else {
                line.add().addAll(strings);
            }
        }
        dest.add(line);
    }

    public void fromCsv(Csv src, Instance<?> dest) throws SimpleTypeException {
        List<Field> header;
    
        header = null;
        for (Line line : src) {
            if (header == null) {
                // don't care wether about line.isComment
                header = parseHeader(line);
            } else {
                setLine(header, line, dest);
            }
        }
    }
    
    public void setLine(List<Field> header, Line line, Instance<?> dest) throws SimpleTypeException {
        int size;
        Instance<?> selected;
        
        size = line.size();
        if (size != header.size()) {
            throw new ViewException("column mismatch: expected " + header.size() + ", got " + size);
        }
        for (String id : line.get(0)) {
            selected = find(scope.select(dest), header.get(0).getPath(), id);
            for (int i = 1; i < size; i++) {
                header.get(i).set(selected, line.get(i));
            }
        }
    }
    
    private Instance<?> find(List<Instance<?>> all, Path path, String value) {
        for (Instance<?> i : all) {
            if (value.equals(path.selectOne(i).valueToString())) {
                return i;
            }
        }
        throw new ViewException("no such value: " + value);
    }
    
    //--
    
    private Line header() {
        Line line;
        
        line = new Line();
        for (Field field : fields) {
            line.addOne(field.getName());
        }
        return line;
    }

    private List<Field> parseHeader(Line line) {
        List<Field> result;
        Field field;
        String name;
        
        result = new ArrayList<Field>();
        for (int i = 0, max = line.size(); i < max; i++) {
            name = line.getOne(i);
            field = lookup(name);
            if (field == null) {
                throw new ViewException("unkown field in header: '" + name + "'");
            }
            result.add(field);
        }
        return result;
    }
}
