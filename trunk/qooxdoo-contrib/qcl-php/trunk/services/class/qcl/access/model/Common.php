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
require_once "qcl/data/model/xmlSchema/DbModel.php";

/**
 * Common base class for permission, role and user models
 */
class qcl_access_model_Common
  extends qcl_data_model_xmlSchema_DbModel
{

  /**
   * Array of names that canot be used as names for users, permissions and
   * roles.
   * @var array
   */
  public $reservedNames = array();

	/**
	 * Creates a new record and optionally links it to a role. Raises an error
	 * if the namedId of the record already exists.
	 * @todo rewrite
	 * @override
	 * @param string	$namedId
	 * @return int the id of the inserted row
	 */
	public function create( $namedId=null )
  {
 		if ( is_null($namedId) )
 		{
 		  $this->raiseError("You must supply a named id.");
 		}

 		/*
 		 * check
 		 */
    if ( in_array( $namedId, $this->reservedNames ) )
 		{
 			$this->raiseError ( "'$namedId' is a reserved name and cannto be used." );
 		}
 		if ( $this->namedIdExists ( $namedId ) )
 		{
 			$this->raiseError ( "'$namedId' already exists." );
 		}

   	/*
   	 * insert new empty record
   	 */
	   $itemId = parent::create( $namedId );

    /*
     * return item id
     */
		return $itemId;
  }

	/**
	 * creates a new record if its named id doesn't already exist and optionally links it to a role.
	 * returns false if record exists otherwise the id of the record
	 * @param string	$namedId
	 * @param int		$parentId 	id of role (unused if class is qcl_access_model_Role)
	 * @return int the id of the inserted row
	 */
	public function createIfNotExists( $namedId, $parentId=null )
  {
 		if ( $id = $this->namedIdExists ( $namedId ) )
 		{
 			return $id;
 		}
 		return $this->create( $namedId, $parentId );
  }
}
?>