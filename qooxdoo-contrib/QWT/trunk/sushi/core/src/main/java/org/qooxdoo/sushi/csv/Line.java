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

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.Misc;

/** A list of cells, where each cell is a list of values */
public class Line {
    public static Line create(String ... values) {
        Line line;
        
        line = new Line();
        for (String value : values) {
            line.add().add(value);
        }
        return line;
    }
    
    private final List<List<String>> cells;
    
    public Line() {
        this.cells = new ArrayList<List<String>>();
    }
    
    public boolean equalsAfter(int ofs, Line line) {
        int max;
        
        max = cells.size();
        if (max != line.cells.size()) {
            return false;
        }
        for (int i = ofs; i < max; i++) {
            if (!Misc.eq(cells.get(i), line.cells.get(i))) {
                return false;
            }
        }
        return true;
    }
    
    public void addOne(String value) {
        add().add(value);
    }
    
    public List<String> add() {
        List<String> cell;
        
        cell = new ArrayList<String>();
        cells.add(cell);
        return cell;
    }
    
    public void addNull() {
        cells.add(null);
    }

    public void merge(Line line, int ofs) {
        cells.get(ofs).addAll(line.cells.get(ofs));
    }
    
    public List<String> get(int idx) {
        return cells.get(idx);
    }

    public String getOne(int idx) {
        List<String> cell;
        
        cell = cells.get(idx);
        switch (cell.size()) {
        case 0:
            throw new ViewException("cell is empty: " + idx);
        case 1:
            return cell.get(0);
        default:
            throw new ViewException("cell with multiple values");
        }
    }

    public int size() {
        return cells.size();
    }
}
