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

package org.qooxdoo.sushi;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.cli.Cli;
import org.qooxdoo.sushi.cli.Command;
import org.qooxdoo.sushi.cli.Option;
import org.qooxdoo.sushi.cli.Value;
import org.qooxdoo.sushi.cli.Remaining;

public class CliSample extends Cli implements Command {
    public static void main(String[] args) {
        System.exit(new CliSample().run(args));
    }

    @Option("flag")
    private boolean flag = false;
    
    @Option("number")
    private int number = 7;
    
    @Value(name = "first", position = 1)
    private String first = null;

    private List<String> remaining = new ArrayList<String>();
    
    @Remaining
    public void addRemaining(String str) {
        remaining.add(str);
    }
    
    public void invoke() {
        console.info.println("command invoked with ");
        console.info.println("   flag = " + flag);
        console.info.println("   number = " + number);
        console.info.println("   first = " + first);
        console.info.println("   remaining = " + remaining);
    }
    
    @Override
    public void printHelp() {
        console.info.println("usage: [-flag | -number n] first remaining*");
    }
}
