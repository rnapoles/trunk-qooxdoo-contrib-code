<?php

/**
 * The base class for all classes that are used as the result of a
 * service method. Works as a "marker interface" and contains the
 * serialization method toArray().
 * @todo When fully upgrading to PHP5, use interface rather than
 * base class.
 */
class qcl_data_Result
  extends qcl_core_BaseClass {}
?>