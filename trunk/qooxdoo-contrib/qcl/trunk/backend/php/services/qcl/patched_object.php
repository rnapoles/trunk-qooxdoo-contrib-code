<?php

/**
 * base class providing __construct and & __destruct compatibility to php4 objects
 */
class patched_object 
{
  
  /**
   * PHP4 __construct() hack taken from cakephp
   * taken from https://trac.cakephp.org/browser/trunk/cake/1.2.x.x/cake/libs/object.php
   *
   * CakePHP(tm) :  Rapid Development Framework <http://www.cakephp.org/>
   * Copyright 2005-2007, Cake Software Foundation, Inc.
   *                1785 E. Sahara Avenue, Suite 490-204
   *                Las Vegas, Nevada 89104
   *
   * Licensed under The MIT License
   * Redistributions of files must retain the above copyright notice.
   *
   * A hack to support __construct() on PHP 4
   * Hint: descendant classes have no PHP4 class_name() constructors,
   * so this constructor gets called first and calls the top-layer __construct()
   * which (if present) should call parent::__construct()
   *
   * @return Object
   */
  function patched_object() 
  {
    //trigger_error("qcl_object constructor called");
    $args = func_get_args();
    if (method_exists($this, '__destruct')) 
    {
      //$this->info("Registering shutdown function for " . get_class($this));
      register_shutdown_function (array(&$this, '__destruct'));
    }
    if (method_exists($this, '__construct')) 
    {
      call_user_func_array(array(&$this, '__construct'), $args);
    }
  }

    function __construct() {}
    
}

?>