package org.eclipse.wst.jsdt.qooxdoo.validation.internal.mixins;

import java.util.HashMap;
import java.util.Map;

import org.eclipse.wst.jsdt.core.infer.InferredType;

public class MixinManager {

  private Map<String, Mixin> mixins = new HashMap<String, Mixin>();

  public Mixin getMixin( InferredType type ) {
    // Assert.isNotNull( type );
    // String key = new String( type.getName() );
    // if( !mixins.containsKey( key ) ) {
    // mixins.put( key, new Mixin( type ) );
    // }
    // return mixins.get( key );
    if( type.userData == null ) {
      type.userData = new Mixin( type );
    }
    return ( Mixin )type.userData;

  }
}
