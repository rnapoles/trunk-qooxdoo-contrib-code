/*******************************************************************************
 * Deutsche Post Com GmbH Tulpenfeld 9 53113 Bonn Germany (c) Copyright 2008 by
 * Deutsche Post Com GmbH ALL RIGHTS RESERVED
 * -----------------------------------------------------------------------------
 * $Id: StaticMembers_PDETest.java,v 1.0 Feb 11, 2008 user Exp $
 ******************************************************************************/
package org.eclipse.wst.jsdt.qooxdoo.functional;

import java.util.List;

import junit.framework.Assert;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.resources.IMarker;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.ui.part.FileEditorInput;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import de.mkempka.sammy.operators.SammyProperties;
import de.sammy.mkempka.ide.SammyIDE;
import de.sammy.mkempka.ide.operators.TextEditorOperator;

public class GlobalTypeWindow_PDETest extends Assert {

  private SammyIDE sammy;
  private IFile file;
  private String fileContents = "new Window()\n"
                                + "qx.Class.define(\"my.Window\", {});\n";

  @Before
  public void setUp() throws Exception {
    this.sammy = new SammyIDE();
    this.file = QxProjectUtil.createQxFileWithContents( sammy,
                                                        "Application.js",
                                                        fileContents );
  }

  @After
  public void tearDown() throws Exception {
    sammy.cleanUp();
  }

  @Ignore("Test case for Eclipse Bug https://bugs.eclipse.org/bugs/show_bug.cgi?id=231809")
  @Test
  public void getStaticMembersInAutoCompletion() throws Exception {
    sammy.openEditor( new FileEditorInput( this.file ) );
    TextEditorOperator teo = new TextEditorOperator( "Application.js",
                                                     getProperties() );
    triggerAutoBuild( teo );
    List<IMarker> errorMarkers = teo.getMarkers( IMarker.SEVERITY_ERROR );
    assertTrue( getFirstErrorMessage( errorMarkers ), errorMarkers.isEmpty() );
  }

  private void triggerAutoBuild( TextEditorOperator teo ) {
    teo.setCurserAfter( "new Window()" );
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

  private SammyProperties getProperties() {
    SammyProperties properties = new SammyProperties();
    properties.setTimeoutInMillies( 10000L );
    return properties;
  }
}
/*******************************************************************************
 * $Log: StaticMembers_PDETest.java,v $
 ******************************************************************************/
