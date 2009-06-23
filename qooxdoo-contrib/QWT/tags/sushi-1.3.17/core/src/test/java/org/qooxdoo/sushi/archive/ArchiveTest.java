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

package org.qooxdoo.sushi.archive;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import org.qooxdoo.sushi.fs.IO;
import org.qooxdoo.sushi.fs.Node;

import static org.junit.Assert.*;

public class ArchiveTest {
    private static final IO IO_OBJ = new IO();

    private List<String> directories;
    private List<String> fileNames;
    private List<String> fileData;
    
    @Before 
    public void setUp() {
        directories = new ArrayList<String>();
        fileNames = new ArrayList<String>();
        fileData = new ArrayList<String>();
    }

    @Test 
    public void empty() throws IOException {
        checkZip();
        checkJar();
    }

    @Test
    public void normal() throws IOException {
        dir("dir");
        file("file", "data");
        file("empty", "");
        checkZip();
        checkJar();
    }
    
    @Test(expected=ArchiveException.class) 
    public void explicitManifest() throws IOException {
        dir(Archive.META_INF);
        file(Archive.MANIFEST, "foo");
        checkZip();
        checkJar();
    }

    private void dir(String name) {
        directories.add(name);
    }
    
    private void file(String name, String data) {
        fileNames.add(name);
        fileData.add(data);
    }

    private void checkZip() throws IOException {
        Node file;
        Archive zip;
        
        zip = Archive.createZip(IO_OBJ);
        for (String dir : directories) {
            zip.data.join(dir).mkdir();
        }
        for (int i = 0; i < fileNames.size(); i++) {
            zip.data.join(fileNames.get(i)).writeString(fileData.get(i));
        }

        file = IO_OBJ.getTemp().createTempFile();
        zip.save(file);
        zip = Archive.loadZip(file);
        assertEquals(directories.size() + fileNames.size(), zip.data.find("**/*").size());
        for (String dir : directories) {
            assertTrue(zip.data.join(dir).isDirectory());
        }
        for (int i = 0; i < fileNames.size(); i++) {
            assertEquals(fileData.get(i), zip.data.join(fileNames.get(i)).readString());
        }
        // TODO do not try "diff" on zip files, because they contain a timestamp that occasionally 
        // yields differences
    }
    
    private void checkJar() throws IOException {
        Node file;
        Archive archive;
        Node reloaded;
        
        archive = Archive.createJar(IO_OBJ);
        for (String dir : directories) {
            archive.data.join(dir).mkdir();
        }
        for (int i = 0; i < fileNames.size(); i++) {
            archive.data.join(fileNames.get(i)).writeString(fileData.get(i));
        }

        file = IO_OBJ.getTemp().createTempFile();
        archive.save(file);
        archive = Archive.loadJar(file);
        assertEquals(directories.size() + fileNames.size(), archive.data.find("**/*").size());
        for (String dir : directories) {
            assertTrue(archive.data.join(dir).isDirectory());
        }
        for (int i = 0; i < fileNames.size(); i++) {
            assertEquals(fileData.get(i), archive.data.join(fileNames.get(i)).readString());
        }
        reloaded = IO_OBJ.getTemp().createTempFile();
        archive.save(reloaded);
        // TODO do not try "diff" on jar files, because they contain a timestamp that occasionally 
        // yields differences
    }
}
