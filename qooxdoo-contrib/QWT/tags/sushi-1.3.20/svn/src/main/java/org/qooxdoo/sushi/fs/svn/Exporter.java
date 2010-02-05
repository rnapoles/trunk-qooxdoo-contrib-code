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

package org.qooxdoo.sushi.fs.svn;

import java.io.IOException;
import java.io.OutputStream;

import org.qooxdoo.sushi.fs.MkdirException;
import org.qooxdoo.sushi.fs.Node;
import org.tmatesoft.svn.core.SVNCommitInfo;
import org.tmatesoft.svn.core.SVNErrorCode;
import org.tmatesoft.svn.core.SVNErrorMessage;
import org.tmatesoft.svn.core.SVNException;
import org.tmatesoft.svn.core.SVNPropertyValue;
import org.tmatesoft.svn.core.internal.wc.SVNFileUtil;
import org.tmatesoft.svn.core.io.ISVNEditor;
import org.tmatesoft.svn.core.io.ISVNReporter;
import org.tmatesoft.svn.core.io.ISVNReporterBaton;
import org.tmatesoft.svn.core.io.diff.SVNDeltaProcessor;
import org.tmatesoft.svn.core.io.diff.SVNDiffWindow;

/** See https://wiki.svnkit.com/Updating_From_A_Repository */
public class Exporter implements ISVNReporterBaton, ISVNEditor {
    private final long revision;
    private final Node dest;
    private SVNDeltaProcessor working;
    
    public Exporter(long revision, Node dest) {
        this.revision = revision;
        this.dest = dest;
        this.working = new SVNDeltaProcessor();
    }

    public void report(ISVNReporter reporter) throws SVNException {
        reporter.setPath("", null, revision, true);
        reporter.finishReport();
    }

    public void targetRevision(long revision) throws SVNException {
    }

    public void openRoot(long revision) throws SVNException {
    }

    public void addDir(String path, String copyFromPath, long copyFromRevision) throws SVNException {
        try {
            node(path).mkdir();
        } catch (MkdirException e) {
            throw exception(e); 
        }
    }

    public void openDir(String path, long revision) throws SVNException {
    }

    public void changeDirProperty(String name, String value) throws SVNException {
    }

    public void addFile(String path, String copyFromPath, long copyFromRevision) throws SVNException {
        Node file;

        file = node(path);
        try {
            file.checkNotExists();
            file.writeBytes();
        } catch (IOException e) {
            throw exception(e);
        }
    }
    
    public void openFile(String path, long revision) throws SVNException {
    }

    public void changeFileProperty(String path, String name, String value) throws SVNException {
    }

    public void applyTextDelta(String path, String baseChecksum) throws SVNException {
        Node target = node(path);
        
        try {
            if (!target.exists()) {
                target.writeBytes();
            }
            working.applyTextDelta(SVNFileUtil.DUMMY_IN, target.createOutputStream(), false);
        } catch (IOException e) {
            throw exception(e);
        }
    }

    public OutputStream textDeltaChunk(String path, SVNDiffWindow diff) throws SVNException {
        return working.textDeltaChunk(diff);
    }
 
    public void textDeltaEnd(String path) throws SVNException {
        working.textDeltaEnd();
    }
    
    public void closeFile(String path, String textChecksum) throws SVNException {
    }

    public void closeDir() throws SVNException {
    }

    public void deleteEntry(String path, long revision) throws SVNException {
    }

    public void absentDir(String path) throws SVNException {
    }

    public void absentFile(String path) throws SVNException {
    }

    public SVNCommitInfo closeEdit() throws SVNException {
        return null;
    }

    public void abortEdit() throws SVNException {
    }

    public void changeDirProperty(String arg0, SVNPropertyValue arg1) throws SVNException {
    }

    public void changeFileProperty(String arg0, String arg1, SVNPropertyValue arg2) throws SVNException {
    }
    
    //-- 
        
    private static SVNException exception(IOException e) { 
        return new SVNException(SVNErrorMessage.create(SVNErrorCode.IO_ERROR, e.getMessage()), e);            
    }
        
    private Node node(String path) {
        return dest.join(path);
    }
}
