package org.eclipse.wst.jsdt.support.qooxdoo.core.compiler.libraries;

import org.eclipse.core.runtime.IPath;
import org.eclipse.jface.resource.ImageDescriptor;
import org.eclipse.wst.jsdt.core.IJavaProject;
import org.eclipse.wst.jsdt.core.IJsGlobalScopeContainer;
import org.eclipse.wst.jsdt.core.JsGlobalScopeContainerInitializer;
import org.eclipse.wst.jsdt.core.compiler.libraries.LibraryLocation;
import org.eclipse.wst.jsdt.core.compiler.libraries.SystemLibraryLocation;
import org.eclipse.wst.jsdt.internal.ui.IJsGlobalScopeContainerInitializerExtension;


public class QooxdooLibraryInitializer
  extends JsGlobalScopeContainerInitializer implements IJsGlobalScopeContainerInitializerExtension
{

  protected static final String PLUGIN_ID = "org.eclipse.wst.jsdt.support.qooxdoo";
  private static final String ContainerDescription = "Qooxdoo Class Library";

  public QooxdooLibraryInitializer() {
  }

  public LibraryLocation getLibraryLocation() {
    return new SystemLibraryLocation() {
      @Override
      public char[][] getLibraryFileNames() {
        return new char[][] {
          "qx.0.7.2.js".toCharArray()
        };
      }
      @Override
      protected String getPluginId() {
        return PLUGIN_ID;
      }
    };
  }


  public ImageDescriptor getImage(IPath containerPath, String element, IJavaProject project) {
      return ImageDescriptor.createFromFile(this.getClass(), "QooxdooSmall.png");
  }

  public String getDescription(IPath containerPath, IJavaProject project) {
      return ContainerDescription;
  }

  public String getDescription() {
      return ContainerDescription;
  }
  /*
   * (non-Javadoc)
   * 
   * @see org.eclipse.wst.jsdt.core.IJsGlobalScopeContainer#getKind()
   */
  public int getKind() {
      return IJsGlobalScopeContainer.K_SYSTEM;
  }

  public boolean canUpdateJsGlobalScopeContainer(IPath containerPath, IJavaProject project) {
      return true;
  }
}

