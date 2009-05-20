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

package org.qooxdoo.sushi.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.file.FileNode;

/**
 * Wraps a Process builder to add some convenience methods
 */
public class Program {
    public final IO io;
    private final FileNode dir;
    public final ProcessBuilder builder;
    
    public Program(FileNode dir, String ... args) {
        this.io = dir.getIO();
        this.dir = dir;
        this.builder = new ProcessBuilder();
        this.builder.directory(dir.getFile());
        add(args);
    }
        
    public Program add(String ... args) {
        for (String a : args) {
            builder.command().add(a);
        }
        return this;
    }
    
    public Program addAll(List<String> args) {
        builder.command().addAll(args);
        return this;
    }
    
    public void execNoOutput() throws IOException {
        String result;
        
        result = exec();
        if (result.trim().length() > 0) {
            throw new IOException(builder.command().get(0) + ": unexpected output " + result);
        }
    }
    
    public String exec() throws IOException {
        ByteArrayOutputStream result;
        
        result = new ByteArrayOutputStream();
        exec(result);
        return io.getSettings().string(result.toByteArray());
    }
    
    /** executes a command in this directory, returns the output */
    public void exec(OutputStream dest) throws IOException {
        Process process;
        int exit;
        String output;
        
        builder.redirectErrorStream(true);
        process = builder.start();
        // this looks like a busy wait to me, but it's what all the examples suggest:
        io.getBuffer().copy(process.getInputStream(), dest);
        try {
            exit = process.waitFor();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        if (exit != 0) {
            if (dest instanceof ByteArrayOutputStream) {
                output = io.getSettings().string(((ByteArrayOutputStream) dest));
            } else {
                output = "";
            }
            throw new ExitCode(builder.command(), exit, output);
        }
    }

    @Override
    public String toString() {
        return "[" + dir + "] " + Strings.join(" ", builder.command());
    }
}
