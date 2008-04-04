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

package org.qooxdoo.grep.server;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.grep.common.GrepService;
import org.qooxdoo.grep.common.Match;
import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;

public class Grep implements GrepService {
    private static final int MAX = 100;
    private final IO io = new IO();
    private final Node root = io.getWorking();

    public List<Match> grep(String substring) {
        List<Match> result;
        
        System.out.println("Searching " + root + " for substring '" + substring + "'");
        result = new ArrayList<Match>();
        try {
            for (Node file : root.find("**/src/main/**/*.java")) {
                for (String line : file.readLines()) {
                    if (line.contains(substring)) {
                        result.add(new Match(file.getRelative(root), line));
                        if (result.size() >= MAX) {
                            System.out.println("too many results - returning first " + MAX);
                            return result;
                        }
                    }
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("TODO", e);
        }
        return result;
    }
}
