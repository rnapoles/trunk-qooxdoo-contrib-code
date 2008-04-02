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

package de.mlhartme.mork.compiler;

import de.mlhartme.mork.mapping.Conversion;
import de.mlhartme.mork.mapping.Definition;
import de.mlhartme.mork.semantics.SemanticError;
import de.mlhartme.mork.util.GenericException;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintStream;
import junit.framework.TestCase;

public class MainFunctionalTest extends TestCase {
    /** working directory for runnning mork in. */
    private File tmpDir;

    /** this is where all the test files are from. */
    private File dataDir;

    private String stdout;
    private String stderr;

    private int exitCode;

    private Output output;

    @Override
    protected void setUp() throws Exception {
        super.setUp();

        String name;
        File[] all;
        String className;

        exitCode = 4242;  // to make it obvious if exitCode has not been assigned

        // TODO: guess project home
        name = "target/test-tmp";
        tmpDir = new File(name);
        if (!tmpDir.exists()) {
            tmpDir.mkdirs();
        }
        if (!tmpDir.isDirectory()) {
            fail("no such directory: " + name);
        }

        // do not delete the tmpDir directory (and create a new, empty one)
        // because it is expected to be the current directory and if I remove it,
        // relative file names no longer work.
        all = tmpDir.listFiles();
        for (int i = 0; i < all.length; i++) {
            // remove existing directory
            rmRf(all[i]);
        }

        name = "src/test/java";
        if (name == null) {
            fail("TEST_BASE property missing");
        }
        className = MainFunctionalTest.class.getPackage().getName();
        dataDir = new File(name, (className + ".files").replace('.', File.separatorChar));
        if (!dataDir.isDirectory()) {
            fail("no such directory: " + dataDir);
        }
    }

    @Override
    protected void tearDown() throws Exception {
        // do not delete tmp directory, it might help to locate problems
    }

    public void testEmpty() {
        run(new String[] {});
        assertTrue("stdout", !stdout.equals(""));
        assertEquals("stderr", "", stderr);
        assertEquals("exit code", Main.HELP, exitCode);
    }

    public void testHelp() {
        run(new String[] {"-help"});
        assertTrue("stdout", !stdout.equals(""));
        assertEquals("stderr", "", stderr);
        assertEquals("exit code", Main.HELP, exitCode);
    }

    public void testInvalidOption() {
        run(new String[] {"-invalidoption"});
        assertEquals("stdout", "", stdout);
        assertTrue("stderr", !stderr.equals(""));
        assertEquals("exit code", Main.COMMANDLINE_ERROR, exitCode);
    }

    public void testNormal() throws IOException {
        File file;

        runWithFiles(
            new String[] { "Empty.map", "ab.grm" },
            new String[] { "Empty.map" }
        );
        assertTrue("stdout", !stdout.equals(""));
        assertEquals("stderr", "", stderr);
        assertEquals("exit code", 0, exitCode);

        file = new File("Empty.class");
        assertTrue("class file exists: " + file, file.exists());
        file = new File("Empty.lst");
        assertTrue("no listing: " + file, !file.exists());
    }

    public void testNoSuchFile() throws IOException {
        File[] files;

        runWithFiles(
            new String[] {},
            new String[] { "SomeNonExistingFile,map" }
        );
        assertTrue("stdout", !stdout.equals(""));
        assertTrue("some errors", !stderr.equals(""));
        assertTrue("error code", 0 != exitCode);

        files = tmpDir.listFiles();
        assertEquals("no files", 0, files.length);
    }

    public void testInvalidMapping() throws IOException {
        File[] files;

        runWithFiles(
            new String[] { "Invalid.map" },
            new String[] { "Invalid.map" }
        );
        assertTrue("stdout", !stdout.equals(""));
        assertTrue("stderr", !stderr.equals(""));
        assertEquals("exit code", Main.COMPILE_ERROR, exitCode);

        files = tmpDir.listFiles();
        assertEquals("no files", 1, files.length);
    }

    public void testInvalidGrammar() throws IOException {
        File[] files;

        runWithFiles(
            new String[] { "InvalidGrammar.map", "invalid.grm" },
            new String[] { "InvalidGrammar.map" }
        );
        assertTrue("stdout", !stdout.equals(""));
        assertTrue("stderr", !stderr.equals(""));
        assertEquals("exit code", Main.COMPILE_ERROR, exitCode);

        files = tmpDir.listFiles();
        assertEquals("no files", 2, files.length);
    }

    //-------------------------------------------------------------
    // check individual error messages

    public void testUndefinedSymbol() throws IOException {
        assertError("UndefinedSymbol.map", "ab.grm", Stubs.UNDEFINED_SYMBOL);
    }

    public void testArgumentNotAssigable() throws IOException {
        assertError("ArgumentNotAssignable.map", "ab.grm", Definition.ARGUMENT_NOT_ASSIGNABLE);
    }
    public static void noArguments() {
    }

    public void testArgumentTypeMismatch() throws IOException {
        assertError("ArgumentTypeMissmatch.map", "ab.grm", Conversion.ARGUMENT_TYPE_MISMATCH);
    }
    public static String ab(int a) {
        return null;
    }
    public static String ab(String b) {
        return null;
    }
    public static int aNumber() {
        return 1;
    }
    public static String aString() {
        return "string";
    }

    private void assertError(String mapFile, String grmFile, String error) throws IOException {
        Object obj;

        runWithFiles(new String[] { mapFile, grmFile }, new String[] { mapFile });
        assertEquals("exit code", Main.COMPILE_ERROR, exitCode);
        assertEquals(1, output.getErrorCount());
        obj = output.getLastError();
        if (obj instanceof SemanticError) {
            obj = ((SemanticError) obj).exception;
        }
        if (obj instanceof GenericException) {
            obj = ((GenericException) obj).id;
        }
        assertEquals(error, obj);
    }



    public void testListing() throws IOException {
        File file;

        runWithFiles(
            new String[] { "Empty.map", "ab.grm" },
            new String[] { "-lst", "Empty.map" }
        );
        assertTrue("stdout <" + stdout + ">", !stdout.equals(""));
        assertEquals("stderr", "", stderr);
        assertEquals("exit code", 0, exitCode);

        file = new File(tmpDir, "Empty.class");
        assertTrue("class file exists: " + file, file.exists());
        file = new File(tmpDir, "Empty.lst");
        assertTrue("listing file exists: " + file, file.exists());
    }

    /**
     * @param output  out arguments, receiving command output
     *
     * @return standard output and error out
     */
    private void run(String[] args) {
        ByteArrayOutputStream fakedOut;
        ByteArrayOutputStream fakedErr;

        fakedOut = new ByteArrayOutputStream();
        fakedErr = new ByteArrayOutputStream();
        output = new Output(new PrintStream(fakedErr));
        output.normal = new PrintStream(fakedOut);
        exitCode = new Main(output).run(args);
        stdout = fakedOut.toString();
        stderr = fakedErr.toString();
    }

    private void runWithFiles(String[] names, String[] args) throws IOException {
        for (int i = 0; i < names.length; i++) {
            copy(new File(dataDir, names[i]), new File(tmpDir, names[i]));
        }
        run(args);
    }

    private static void copy(File srcFile, File destFile) throws IOException {
        FileReader src;
        FileWriter dest;
        int c;

        src = new FileReader(srcFile);
        try {
            dest = new FileWriter(destFile);
            try {
                for (c = src.read(); c != -1; c = src.read()) {
                    dest.write((char) c);
                }
            } finally {
                dest.close();
            }
        } finally {
            src.close();
        }
    }

    private static void rmRf(File file) throws IOException {
        File[] lst;

        if (file.isDirectory()) {
            lst = file.listFiles();
            for (int i = 0; i < lst.length; i++) {
                rmRf(lst[i]);
            }
        }
        if (!file.delete()) {
            throw new IOException("cannot delete TMP_DIR: " + file);
        }

    }
}
