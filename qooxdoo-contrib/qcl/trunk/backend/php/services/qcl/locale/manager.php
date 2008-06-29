<?php

/*
 * dependencies
 * 
 */
require_once "qcl/object.php";
require_once "qcl/locale/model_qooxdoo.php";

/**
 * manages locales and translations. uses a gettext model by default
 * extending controllers should set the "locale" model before calling the
 * parent constructor if they want to use a different locale model.
 */
class qcl_locale_manager extends qcl_object
{

	//-------------------------------------------------------------
  // class variables
  //-------------------------------------------------------------
  	
  /**
   * The default locale
   * @var string
   */
  var $default_locale = "en"; 
 
  /**
   * The locale model. Access with getLocaleModel()
   * @var qcl_locale_model_qooxdoo
   */
  var $localModel;
  
	//-------------------------------------------------------------
  // setup
  //-------------------------------------------------------------
  
	/**
 	* constructor
 	*/
	function __construct()
	{
  	parent::__construct();

  	/*
  	 * You can set a different locale model in an extending class 
  	 */
  	if ( ! $this->localeModel )
    {  
      $this->localeModel =& $this->getSingleton("qcl_locale_model_qooxdoo");
    }
    
    /*
     *  automatically determine locale
     */
    $this->setLocale();
	}

	//-------------------------------------------------------------
  // public non-rpc methods
  //-------------------------------------------------------------

  /**
   * returns the locale model
   * @return qcl_locale_model_qooxdoo
   */
  function &getLocaleModel()
  {
    return $this->localModel;
  }
  
  /**
   * sets the default locale. if no value is given, the locale is determined on
   * system and browser settings.
   * @return void
   * @param $locale Mixed Locale string or null if locale should be automatically be determined
   */
	function setLocale($locale=null)
	{
		$localeModel =& $this->getLocaleModel();   
    $localeModel->setLocale( either( $locale, $this->getUserLocale(), $this->default_locale ) );
	}

  /**
   * determines the user locale from the system or browser
   * @return 
   */
  function getUserLocale()
  {
    $localeModel =& $this->getLocaleModel();
    $browser_locales = explode(",", $_SERVER["HTTP_ACCEPT_LANGUAGE"] );
    $locale = null;
    foreach ( $browser_locales as $brlc )
    {
      $lc = strtolower( substr( $brlc, 0, 2 ) );
      if ( $localeModel->hasLocale( $lc ) )
      {
        $locale = $lc; 
        break;
      }
    }
    
    if ( ! $locale )
    {
       $system_locale = getenv("LANGUAGE");
       if ( $system_locale )
       {
         $locale = substr( $system_locale, 0, 2 );
       }
    }
    
    if ( !$locale )
    {
      $locale = $this->default_locale;
    }
    return $locale;
  }


  /**
   * Return the available application locales
   *
   * This corresponds to the Makefile APPLICATION_LOCALES setting
   * @return {String[]} array of available locales
   */
  function getAvailableLocales()
  {
    $localeModel =& $this->getLocaleModel();
    return $localeModel->getAvailableLocales();
  }

  /**
   * Translates a message and applies sprintf formatting to it.
   *
   * @param String $messageId message id (may contain format strings)
   * @param Array  $varargs (optional) variable number of argumes applied to the format string
   * @return string
   */
  function tr ( $messageId, $varargs=array() )
  {
		$localeModel =& $this->getLocaleModel();
    $translation =  $localeModel->translate( $messageId );  
    array_unshift( $varargs, $translation );
    return call_user_func_array('sprintf',$varargs);    
  }

  /**
   * Translate a plural message.Depending on the third argument the plural or the singular form is chosen.
   * sprintf formatting is applied to the result string
   * 
   * @param string   $singularMessageId Message id of the singular form (may contain format strings)
   * @param string   $pluralMessageId   Message id of the plural form (may contain format strings)
   * @param int      $count             If greater than 1 the plural form otherwhise the singular form is returned.
   * @param Array    $varargs           (optional) Variable number of arguments for the sprintf formatting
   * @return string
   */
  function trn ( $singularMessageId, $pluralMessageId, $count, $varargs=array() )
  {
    $localeModel =& $this->getLocaleModel();
    $translation =  $localeModel->trn( $singularMessageId, $pluralMessageId, $count, $varargs );
    array_unshift( $varargs, $translation );
    return call_user_func_array('sprintf',$varargs);     
  }

	//-------------------------------------------------------------
  // public rpc methods
  //-------------------------------------------------------------

  /**
   * dumps information on the translation engine to the log
   * @return void
   */
  function method_logLocaleInfo()
  {
    // todo: check access
    $localeModel =& $this->getLocaleModel();
    
    $this->info( "Locale information: ");
    $this->info( "  Available locales: " . implode(",", $localeModel->getAvailableLocales() ) . " ... ");
    $this->info( "  Browser locales : " . $_SERVER["HTTP_ACCEPT_LANGUAGE"]  );
    $this->info( "  System locale : " . getenv("LANGUAGE") );
    $this->info( "  User locale: " . $this->getUserLocale() );
  }  
}


