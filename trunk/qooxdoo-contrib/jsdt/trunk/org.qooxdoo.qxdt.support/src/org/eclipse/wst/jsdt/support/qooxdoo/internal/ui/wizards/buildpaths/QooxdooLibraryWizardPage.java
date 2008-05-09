package org.eclipse.wst.jsdt.support.qooxdoo.internal.ui.wizards.buildpaths;

import org.eclipse.core.runtime.Path;
import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.wst.jsdt.core.IIncludePathEntry;
import org.eclipse.wst.jsdt.core.IJavaScriptProject;
import org.eclipse.wst.jsdt.core.JavaScriptCore;
import org.eclipse.wst.jsdt.internal.ui.wizards.dialogfields.DialogField;
import org.eclipse.wst.jsdt.internal.ui.wizards.dialogfields.LayoutUtil;
import org.eclipse.wst.jsdt.ui.wizards.IJsGlobalScopeContainerPage;
import org.eclipse.wst.jsdt.ui.wizards.IJsGlobalScopeContainerPageExtension;
import org.eclipse.wst.jsdt.ui.wizards.IJsGlobalScopeContainerPageExtension2;
import org.eclipse.wst.jsdt.ui.wizards.NewElementWizardPage;

public class QooxdooLibraryWizardPage extends NewElementWizardPage
  implements IJsGlobalScopeContainerPage, IJsGlobalScopeContainerPageExtension,
  IJsGlobalScopeContainerPageExtension2
{

  private static final String CONTAINER_ID = "org.qooxdoo.qxdt.support.QooxdooLibrary";

  public QooxdooLibraryWizardPage() {
    super( "QooxdooLib" );
  }

  public boolean finish() {
    return true;
  }

  public IIncludePathEntry getSelection() {
    System.out.println( "Unimplemented method:QooxdooLibraryWizardPage.getSelection" );
    return null;
  }

  public void setSelection( IIncludePathEntry containerEntry ) {
  }

  public void createControl( Composite parent ) {
    Composite composite = new Composite( parent, SWT.NONE );
    composite.setFont( parent.getFont() );
    DialogField field = new DialogField();
    field.setLabelText( "Qooxdoo (0.7.2) Library added to Project.\n\n  - This library contains the Qooxdoo framework classes." );
    LayoutUtil.doDefaultLayout( composite, new DialogField[]{
      field
    }, false, SWT.DEFAULT, SWT.DEFAULT );
    Dialog.applyDialogFont( composite );
    setControl( composite );
    setDescription( "Qooxdoo Support" );
  }

  public void initialize( IJavaScriptProject project,
                          IIncludePathEntry[] currentEntries )
  {
  }

  public IIncludePathEntry[] getNewContainers() {
    IIncludePathEntry library = JavaScriptCore.newContainerEntry( new Path( CONTAINER_ID ) );
    return new IIncludePathEntry[]{
      library
    };
  }
}