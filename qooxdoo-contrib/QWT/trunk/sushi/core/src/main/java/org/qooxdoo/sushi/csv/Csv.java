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
import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.qooxdoo.sushi.fs.Node;
import org.qooxdoo.sushi.util.Strings;

/** A list of lines. http://de.wikipedia.org/wiki/CSV-Datei. */
public class Csv implements Iterable<Line> {
    public static Csv read(Format format, Node src) throws IOException {
        StringBuilder msg;
        int[] idx = new int[1];
        String str;
        String line;
        Csv csv;
        int no;

        no = 1;
        idx[0] = 0;
        str = src.readString();
        csv = new Csv(format);
        msg = new StringBuilder();
        while (true) {
            line = Strings.next(str, idx, "\r\n", "\n", "\r");
            if (line == null) {
                break;
            }
            try {
                csv.add(line);
            } catch (CsvLineException e) {
                if (msg.length() > 0) {
                    msg.append('\n');
                }
                msg.append(src.toString() + ":" + no + ": " + e.getMessage());
            }
            no++;
        }
        if (msg.length() > 0) {
            throw new CsvExceptions(msg.toString());
        }
        return csv;
    }

    //--

    private final Format format;
    private final List<Line> lines;
    
    public Csv(Format format) {
        this.format = format;
        this.lines = new ArrayList<Line>();
    }

    public Format getFormat() {
        return format;
    }
    
    public int size() {
        return lines.size();
    }
    
    public Line get(int line) {
        return lines.get(line);
    }
    
    public Iterator<Line> iterator() {
        return lines.iterator();
    }
    
    public void add(Line current) {
        if (format.merged && current.size() > 0) {
            for (Line line : lines) {
                if (line.equalsAfter(1, current)) {
                    line.merge(current, 0);
                    return;
                }
            }
        }
        lines.add(current);
    }

    public Csv addAll(String ... lines) throws CsvLineException {
        for (String line : lines) {
            add(line);
        }
        return this;
    }
    
    public Csv add(String line) throws CsvLineException {
        add(format.read(line));
        return this;
    }
    
    
    public void write(Node file) throws IOException {
        Writer dest;
        
        dest = file.createWriter();
        write(dest);
        dest.close();
    }

    public void write(Writer dest) throws IOException {
        for (Line line : lines) {
            format.write(line, dest);
        }
        dest.flush();
    }
    
    @Override
    public String toString() {
        StringWriter dest;
        
        dest = new StringWriter();
        try {
            write(dest);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return dest.toString();
    }
}
