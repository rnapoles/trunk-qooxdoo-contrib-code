package org.qooxdoo.qxdt.support;

import org.eclipse.ui.plugin.AbstractUIPlugin;
import org.osgi.framework.BundleContext;

public class QxSupport extends AbstractUIPlugin {

  public static final String ID = "org.qooxdoo.qxdt.support";
  private static QxSupport instance = null;

  public QxSupport() {
  }

  public static QxSupport getDefault() {
    return instance;
  }

  @Override
  public void start( BundleContext context ) throws Exception {
    super.start( context );
    instance = this;
  }

  @Override
  public void stop( BundleContext context ) throws Exception {
    super.stop( context );
    instance = null;
  }
}
