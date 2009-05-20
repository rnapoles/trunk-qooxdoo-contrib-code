<?php

require "qcl/core/object.php";

class qcl_db_property_AbstractProperty extends qcl_core_object  
{
  /**
   * The name of the property
   *
   * @var string
   */
  var $name = null;
  
  /**
   * The sql type
   */
  var $type =null;
  
  /**
   * The length of the data in bytes (if applicable)
   * 
   * @var int
   */
  var $length;
  
  /**
   * If property is nullable
   * @var bool
   */
  var $nullable = true;
  
  /**
   * optional statements
   */
  var $options = "";
  
  /**
   * Constructor
   * @param string $name
   * @param bool $nullable
   */
  function __construct( $name, $nullable=true )
  {
    if ( !$name)
    {
      $this->raiseError("Name cannot be empty.");
    }
    
    $this->name = $name;
    $this->nullable = $nullable;
  }
  
  /**
   * Returns the sql statement used to set up the column in a 
   * CREATE TABLE statement
   * @return string
   */
  function sql()
  {
    if ( is_null($this->name) )
    {
      $this->raiseError("Property does not have a name.");
    }
    
    if ( is_null($this->type) )
    {
      $this->raiseError("You need to subclass qcl_db_property_AbstractProperty.");
    }
    
    return (
      $this->name . " " .
      $this->type . " " .
      ( $this->length ? "({$this->length}) ":"" ) .
      ( $this->nullable ? "NULL " : "NOT NULL " ) .
      $this->options
    );
  }
}
?>