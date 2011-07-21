<?php
/**
 * <code>Max</code>
 *
 * Sql Function "MAX()"
 * Gets the maximum of a grouped column inside the query
 *
 * @package qcl_data_db_function
 * @experimental
 *
 * @author Oliver Friedrich <oliver@familie-friedrich.de>
 * @copyright &copy; 2010 Oliver Friedrich
 * @version $Id$
 */

qcl_import('qcl_data_db_function_ISqlFunction');

/**
 * <code>Max</code>
 *
 * Sql Function "MAX()"
 * Gets the maximum of a grouped column inside the query
 *
 * @package qcl_data_db_function
 * @experimental
 *
 * @author Oliver Friedrich <oliver@familie-friedrich.de>
 * @copyright &copy; 2010 Oliver Friedrich
 * @version 1.0
 */
class qcl_data_db_function_Max implements qcl_data_db_function_ISqlFunction {

    /**
     * @var qcl_data_db_function_Max Singleton variable
     */
    private static $__instance = null;

	private function __construct() {

	}

    /**
     * @param string $property A single column in the query
     */
    public function toSql($property) {
        return 'MAX(' . $property[0] . ')';
    }

    /**
     * Singleton of the class
     * @return qcl_data_db_function_Max
     */
    public static function getInstance() {
    	if(is_null(self::$__instance)) {
    		self::$__instance = new qcl_data_db_function_Max();
    	}
        return self::$__instance;
    }



}
?>
