package org.eclipse.wst.jsdt.qooxdoo.validation.internal.typeassembling;

public abstract class AbstractTypeConfigurationHandler
  implements ITypeConfigurationVisitor
{

  private String key;

  /**
   * @param key The field name for which the visit(...) method will be called.
   */
  public AbstractTypeConfigurationHandler( String key ) {
    super();
    this.key = key;
  }

  public String getKey() {
    return key;
  }
}
