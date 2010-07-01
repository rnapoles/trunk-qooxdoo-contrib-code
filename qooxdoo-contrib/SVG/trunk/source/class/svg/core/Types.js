/**
 * Validation functions to check values for special SVG data types.
 * 
	   * More info:
	   * <ul>
	   *   <li>http://www.w3.org/TR/SVG/types.html</li>
	   *   <li>http://www.w3.org/TR/SVG/types.html#BasicDataTypes</li>
	   * </ul>
 */
qx.Class.define("svg.core.Types", {
	
	type: "static",
	
	statics :
	{
	  
	  /**
	   * Checks if value is a valid length. Does not accept CSS length values.
	   * 
	   * More info:
	   * <ul>
	   *   <li>http://www.w3.org/TR/SVG/types.html#DataTypeLength</li>
	   * </ul>
	   * 
	   * @param value {var}
	   *   value to check
	   *   
	   * @return {Boolean}
	   *   true if value is a valid length
	   */
	  isLength : function(value) {
	
	    //if value is a number, it's valid if (and only if) it's not negative.  
	    if (!isNaN(value)) {
	    	return value >= 0;
	    }
	    
	    //exclude types other than strings
	    if (typeof(value) != "string") {
	    	return false;
	    }
	    
	    //is it a percentage?
	    if (value.charAt(value.length - 1) == "%") {
	    	value = value.slice(0, value.length - 1);
	    	return !isNaN(value) && value >= 0;
	    }
	    
	    //is it one of the others?
	    var exp = /\d+(em|ex|px|in|cm|mm|pt|pc)/;
	    
	    if (exp.test(value)) {
	    	value = value.slice(0, value.length - 2);
	    	return !isNaN(value) && value >= 0;
	    }
	    
	    //all checks failed.
	    return false;
	    
    },
    
	  /**
	   * Checks if value is a valid percentage.
	   * 
	   * More info:
	   * <ul>
	   *   <li>http://www.w3.org/TR/SVG/types.html#DataTypePercentage</li>
	   * </ul>
	   * 
	   * @param value {var}
	   *   value to check
	   *   
	   * @return {Boolean}
	   *   true if value is a valid percentage
	   */
    isPercentage : function(value) {
	    if (value.charAt(value.length - 1) == "%") {
	    	value = value.slice(0, value.length - 1);
	    	return !isNaN(value);
	    }
    }
	
  }
	
});