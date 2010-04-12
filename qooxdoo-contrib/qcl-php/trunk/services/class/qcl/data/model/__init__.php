<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

/*
 * constants
 */
define("ID", "id");
define("NAMED_ID", "namedId");
define("QCL_RELATIONS_HAS_ONE", "n:1");
define("QCL_RELATIONS_HAS_MANY", "1:n");
define("QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY", "n:n");

/*
 * exceptions
 */
class qcl_data_model_Exception extends LogicException{}
class qcl_data_model_RecordExistsException extends qcl_data_model_Exception{}
class qcl_data_model_RecordNotFoundException extends qcl_data_model_Exception{}
class qcl_data_model_NoRecordLoadedException extends qcl_data_model_Exception{}

/*
 * log filters
 */
define("QCL_LOG_MODEL","model");
qcl_log_Logger::getInstance()->registerFilter( QCL_LOG_MODEL, "Messages concerning models", false);

define("QCL_LOG_MODEL_RELATIONS","relations");
qcl_log_Logger::getInstance()->registerFilter( QCL_LOG_MODEL_RELATIONS, "Model relations", false);

?>