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


/**
 * Manages locales and translations. uses the php gettext
 * extension by default.
 * @see http://mel.melaxis.com/devblog/2005/08/06/localizing-php-web-sites-using-gettext/
 */
class qcl_locale_Manager extends qcl_core_Object
{

	//-------------------------------------------------------------
  // class variables
  //-------------------------------------------------------------

  /**
   * The default locale
   * @var string
   */
  public $default_locale = "en";

  /**
   * The curren locale
   * @var string
   */
  public $locale;

	//-------------------------------------------------------------
  // setup
  //-------------------------------------------------------------

	/**
 	* constructor
 	*/
	public function __construct()
	{
	  if ( ! function_exists("gettext") )
	  {
	    throw new JsonRpcException("You must install the php5-gettext extension.");
	  }

  	/*
  	 * initialize parent class
  	 */
	  parent::__construct();

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
   * sets the default locale. if no value is given, the locale is determined on
   * system and browser settings.
   * @return void
   * @param $locale Mixed Locale string or null if locale should be automatically be determined
   */
	public function setLocale($locale=null)
	{
    $locale = either( $locale, $this->getUserLocale() );
    putenv("LC_ALL=$locale");
    setlocale(LC_ALL, $locale);
    bindtextdomain("messages", "./locale");
    textdomain("messages");
    $this->locale = $locale;
	}

  /**
   * determines the user locale from the system or browser
   * @return
   */
  public function getUserLocale()
  {
    $browser_locales = explode(",", $_SERVER["HTTP_ACCEPT_LANGUAGE"] );
    $locale = null;
    foreach ( $browser_locales as $brlc )
    {
      $lc = strtolower( substr( $brlc, 0, 2 ) );
      if ( in_array( $lc, $this->getAvailableLocales() ) )
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

    if ( ! $locale )
    {
      $locale = $this->default_locale;
    }
    return $locale;
  }


  /**
   * Return the available application locales
   * FIXME currently hardcoded
   * @return {String[]} array of available locales
   */
  public function getAvailableLocales()
  {
    return array("de","en");
  }

  /**
   * Translates a message and applies sprintf formatting to it.
   *
   * @param String $messageId message id (may contain format strings)
   * @param Array  $varargs (optional) variable number of argumes applied to the format string
   * @return string
   */
  public function tr ( $messageId, $varargs=array() )
  {
    $translation =  gettext( $messageId );
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
  public function trn ( $singularMessageId, $pluralMessageId, $count, $varargs=array() )
  {
    $translation =  ngettext( $singularMessageId, $pluralMessageId, $count );
    array_unshift( $varargs, $translation );
    return call_user_func_array('sprintf',$varargs);
  }

  /**
   * dumps information on the translation engine to the log
   * @return void
   */
  public function logLocaleInfo()
  {
    $this->info( "Locale information: ");
    $this->info( "  Available locales:  " . implode(",", $this->getAvailableLocales() ) . " ... ");
    $this->info( "  Browser locales :   " . $_SERVER["HTTP_ACCEPT_LANGUAGE"]  );
    $this->info( "  System locale :     " . getenv("LANGUAGE") );
    $this->info( "  User locale:        " . $this->getUserLocale() );
    $this->info( "  Current locale:     " . $this->getLocale() );
  }
}
?>