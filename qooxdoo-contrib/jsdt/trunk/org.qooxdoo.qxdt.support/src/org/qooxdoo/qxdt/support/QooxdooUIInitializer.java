package org.qooxdoo.qxdt.support;

import org.eclipse.core.runtime.IPath;
import org.eclipse.jface.resource.ImageDescriptor;
import org.eclipse.wst.jsdt.core.IJavaProject;
import org.eclipse.wst.jsdt.internal.ui.IJsGlobalScopeContainerInitializerExtension;

public class QooxdooUIInitializer
  implements IJsGlobalScopeContainerInitializerExtension
{

  public ImageDescriptor getImage( IPath containerPath,
                                   String element,
                                   IJavaProject project )
  {
    return ImageDescriptor.createFromFile( this.getClass(), "QooxdooSmall.png" );
  }
}
