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
require_once "qcl/locale/QooxdooModel.php";

/**
 * Manages locales and translations. uses a gettext model by default
 * extending controllers should set the "locale" model before calling the
 * parent constructor if they want to use a different locale model.
 */
class qcl_locale_Manager  extends qcl_core_Object
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
   * @var qcl_locale_QooxdooModel
   */
  var $localeModel;

	//-------------------------------------------------------------
  // setup
  //-------------------------------------------------------------

	/**
 	* constructor
 	*/
	function __construct()
	{
  	/*
  	 * initialize parent class
  	 */
	  parent::__construct();

  	/*
  	 * You can set a different locale model in an extending class
  	 */
  	if ( ! $this->localeModel )
    {
      $controller = qcl_server_Server::getInstance()->getController();
      $this->localeModel = new qcl_locale_QooxdooModel( $controller );
    }

    /*
     *  automatically determine locale
     */
    $this->setLocale();

	}

	/**
	 * function to return singleton instance
	 */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }

  /**
   * returns the locale model
   * @return qcl_locale_QooxdooModel
   */
  function getLocaleModel()
  {
    return $this->localeModel;
  }

  /**
   * sets the default locale. if no value is given, the locale is determined on
   * system and browser settings.
   * @return void
   * @param $locale Mixed Locale string or null if locale should be automatically be determined
   */
	function setLocale($locale=null)
	{
		$localeModel = $this->getLocaleModel();
    $locale =  either(
      $locale,
      $this->getUserLocale(),
      $this->default_locale
    );
    //$this->debug("Setting locale '$locale' (was: '". $localeModel->getLocale() . "')");
    $localeModel->setLocale( $locale );
	}

  /**
   * determines the user locale from the system or browser
   * @return
   */
  function getUserLocale()
  {
    $localeModel = $this->getLocaleModel();
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
    $localeModel = $this->getLocaleModel();
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
		$localeModel = $this->getLocaleModel();
    $translation =  either( $localeModel->translate( $messageId ), $messageId );
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
    $localeModel = $this->getLocaleModel();
    $translation =  either(
      $localeModel->trn( $singularMessageId, $pluralMessageId, $count, $varargs ),
      $count > 1 ? $pluralMessageId : $singularMessageId
    );
    array_unshift( $varargs, $translation );
    return call_user_func_array('sprintf',$varargs);
  }

  /**
   * dumps information on the translation engine to the log
   * @return void
   */
  function logLocaleInfo()
  {
    // todo: check access
    $localeModel = $this->getLocaleModel();

    $this->info( "Locale information: ");
    $this->info( "  Available locales: " . implode(",", $localeModel->getAvailableLocales() ) . " ... ");
    $this->info( "  Browser locales : " . $_SERVER["HTTP_ACCEPT_LANGUAGE"]  );
    $this->info( "  System locale : " . getenv("LANGUAGE") );
    $this->info( "  User locale: " . $this->getUserLocale() );
    $this->info( "  Current locale: " . $localeModel->getLocale() );
  }
}
?>