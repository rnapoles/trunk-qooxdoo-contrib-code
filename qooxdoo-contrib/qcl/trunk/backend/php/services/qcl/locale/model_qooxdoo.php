<?php

require_once "qcl/mvc/AbstractModel.php";
require_once "qcl/persistence/db/Object.php";

/**
 * locale model using the  the qooxdoo translation system.
 * @todo externally set paths
 */
class qcl_locale_model_qooxdoo extends qcl_persistence_db_Object
{
	  
  /**
   * The current message catalogue
   * @var array
   */
  var $catalogue = array();
  
  /**
   * The default locale
   */
  var $default_locale = "en";

  /**
   * The current locale
   * @var string
   */
  var $locale = null;
  
  /*
   * paths to files
   */
  var $locale_dir; 
  var $locale_js_dir;  
  var $translation_js; 

  /**
   * Constuctor
   *
   * @param qcl_locale_manager $manager
   */
  function __construct( $manager )
  {
    parent::__construct( &$manager, __CLASS__ );
    
    $this->locale_dir     = "../../../frontend/source/translation"; 
    $this->locale_js_dir  = "../../../frontend/source/class/bibliograph/translation";  // todo
    $this->translation_js = "../../../frontend/source/class/bibliograph/backend.js"; // todo
    
  }
  
  /**
   * does the actual lookup
   * @return 
   * @param $messageId Object
   */
  function gettext($messageId)
  {    
    if ( ! trim ( $messageId ) ) return "";
    
    $locale = $this->getLocale();
   
    // translation found?
    $translation = $this->catalogue[$messageId];
    
    if ( $translation)
    {
      return $translation;
    }
        
    if ( $locale != $default_locale )
    {
      $this->markForTranslation( $messageId );
    }
    return $messageId;
    
  }


	//-------------------------------------------------------------
  // interface methods
  //-------------------------------------------------------------

  /**
   * sets the locale
   * @return void
   * @param $locale String
   */	
	function setLocale($locale)
	{
    $this->locale = $locale;
    $this->loadTranslations();      
    $this->save();
	}
	
  /**
   * getter for locale
   * @return 
   */
  function getLocale()
  {
    return $this->locale;
  }
  
  /**
   * Loads the translation strings for the current locale
   */
  function loadTranslations()
  {

    //$this->debug("Loading translations for locale '$this->locale'");    
    
    /*
     * check
     */
    if ( ! $this->locale )
    {
      $this->raiseError("No locale set!");
    }
    
    /*
     * clear translations
     */
    $this->catalogue = array();
    
    /*
     * load file contents
     */
    $file = file_get_contents( $this->locale_js_dir . "/{$this->locale}.js" );
    preg_match_all('/"(.+)": "(.+)",/',$file,$matches);
    for ( $i=0; $i<count($matches[0]); $i++)
    {
      $this->catalogue[$matches[1][$i]] = $matches[2][$i];
    }
  }
  
  /**
   * gets a list of available locales
   * @return array
   */
  function getAvailableLocales()
  {
    static $availableLocales = array();
    if ( ! count( $availableLocales ) )
    {
      foreach( scandir( $this->locale_dir ) as $file )
      {
        if ( substr($file,-3) == ".po" )
        {
          $availableLocales[] = substr( $file, 0, strpos( $file, "." ) );
        }
      }
    }
    return array_unique( $availableLocales );
  }  
  
  /**
   * checks if a locale is supported
   * @return Boolean
   * @param $locale String
   */
  function hasLocale($locale)
  {
    return ( in_array( $locale, $this->getAvailableLocales() ) );
  }

  /**
   * Translate a message
   *
   * @param messageId {String} message id (may contain format strings)
   * @return string
   */
  function translate ( $messageId )
  {
      return $this->gettext($messageId);
  }

  /**
   * Translate a plural message. Depending on the third argument the plural or the singular form is chosen.
   * @param string   $singularMessageId Message id of the singular form 
   * @param string   $pluralMessageId   Message id of the plural form
   * @param int      $count
   * @return string
   */
  function translate_plural_msg ( $singularMessageId, $pluralMessageId, $count )
  {
    return $this->ngettext( $singularMessageId, $pluralMessageId, $count );
  }

  /**
   * on-the-fly addition of untranslated
   * messages to a special file. This will also catch dynamically
   * generated message strings.
   * @return 
   * @param $messageId String
   */
  function markForTranslation ( $messageId )
  {
    if ( trim($messageId)  ) 
    {
      $content   = @file_get_contents( $this->translation_js );
      $messageId = addslashes( $messageId );
      
      if ( ! strstr( $content, $messageId ) )
      {
        $content .= "\n" . 'this.marktr("' . $messageId . '");';
        file_put_contents( $this->translation_js, $content );
      }      
    }
  }
}

?>