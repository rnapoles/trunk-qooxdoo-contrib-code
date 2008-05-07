package org.qooxdoo.qxdt.releng;

public interface IConverter {

  /**
   * Applies rules to a given string and returns a new string based on these
   * rules.
   * 
   * @param orig
   * @return
   */
  public String applyRules( String orig );
}
