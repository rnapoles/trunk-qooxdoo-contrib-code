package org.eclipse.wst.jsdt.qooxdoo.functional.util;

import java.util.List;

import junit.framework.Assert;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IMarker;
import org.eclipse.core.resources.IProject;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.ui.part.FileEditorInput;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import de.mkempka.sammy.operators.SammyProperties;
import de.sammy.mkempka.ide.SammyIDE;
import de.sammy.mkempka.ide.operators.TextEditorOperator;

/**
 * Sets up a file in a javascript project. The file contents is defined by a
 * subclass in {@link #getFileContents()}. The test case opens the file in the
 * javascript editor and ensures the file validates.
 * 
 * @version $Id: AbstractFileContentsValidates_PDETest.java,v 1.0 May 15, 2008
 *          12:39:45 PM user Exp $
 */
public abstract class AbstractFileContentsValidates_PDETest extends Assert {

  private SammyIDE sammy;
  private IFile file;

  @Before
  public void setUp() throws Exception {
    this.sammy = new SammyIDE();
    this.file = QxProjectUtil.createQxFileWithContents( sammy,
                                                        getFileName(),
                                                        getFileContents() );
    modifyProject( file.getProject() );
  }

  protected void modifyProject( IProject project ) throws Exception {
    // hook for subclasses
  }

  /**
   * Hook for subclasses. The return value must stay the same during the
   * lifetime of the object.
   * 
   * @return Returns a string that must validate when opened in the JavaScript
   *         editor.
   */
  abstract protected String getFileContents();

  /**
   * Subclasses may override.
   * 
   * @return returns the file name for the file that must validate.
   */
  protected String getFileName() {
    return "Application.js";
  }

  /**
   * @return returns the file that was created using the information from
   *         {@link #getFile()} and {@link #getFileContents()}.
   */
  protected final IFile getFile() {
    return file;
  }

  protected SammyIDE getSammy() {
    return sammy;
  }

  @After
  public void tearDown() throws Exception {
    sammy.cleanUp();
  }

  @Test
  public void fileContentsValidates() throws Exception {
    sammy.openEditor( new FileEditorInput( this.file ) );
    TextEditorOperator teo = new TextEditorOperator( getFileName(),
                                                     getProperties() );
    triggerAutoBuild( teo );
    List<IMarker> errorMarkers = getErrorMarkers( teo );
    assertTrue( getFirstErrorMessage( errorMarkers ), errorMarkers.isEmpty() );
  }

  protected List<IMarker> getErrorMarkers( TextEditorOperator teo )
    throws CoreException
  {
    return teo.getMarkers(IMarker.SEVERITY_ERROR);
  }

  private void triggerAutoBuild( TextEditorOperator teo ) {
    teo.getSource().selectAndReveal( 0, 0 );
    teo.type( " " );
    teo.save();
  }

  private String getFirstErrorMessage( List<IMarker> errorMarkers )
    throws CoreException
  {
    String result = "";
    if( !errorMarkers.isEmpty() ) {
      result = errorMarkers.get( 0 ).getAttribute( "message" ).toString();
    }
    return result;
  }

  /**
   * @return returns a SammyProperties instance with a timeout of 10 seconds.
   */
  protected final SammyProperties getProperties() {
    SammyProperties properties = new SammyProperties();
    properties.setTimeoutInMillies( 10000L );
    return properties;
  }
}
/*******************************************************************************
 * $Log: StaticMembers_PDETest.java,v $
 ******************************************************************************/
