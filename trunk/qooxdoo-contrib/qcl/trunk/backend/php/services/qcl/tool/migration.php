<?php

require_once "qcl/jsonrpc/controller.php";
require_once "qcl/lang/ArrayList.php";

class class_qcl_tool_migration extends qcl_jsonrpc_controller
{

  /**
   * method counter
   * @var int
   */
  var $methodCounter = 0;  
  
  /**
   * generated javascript code
   * @var ArrayList
   */
  var $js;
  
  /**
   * RPC method to extract event handlers from qxml files and store them 
   * in a separate javascript class file
   *
   * @param array $params
   * @return array
   */
  function method_extractHandlers($params)
  {
    /*
     * arguments
     */
    $dir = realpath("../../../frontend/source/xml");
    //$dir = realpath("../../../../../qooxdoo-contrib/qcl/trunk/frontend/source/xml/components");
    $application_namespace = "bibliograph";
    //$application_namespace = "qcl";
    
    $this->info("Extracting handler code from $dir ...");
    $this->js = new ArrayList();
    $this->namespace = $application_namespace;
    $this->extractHandlers($dir);
    
    $js_code = substr( trim( implode("\n    ", $this->js->toArray() ) ), 0, -1 );
    
    $js_content = 
"/**
 * qooxdoo class containing all extracted handler code as methods.
 **/
qx.Class.define('$application_namespace.ApplicationEventHandlers',
{
  extend : qx.application.Gui,

  members :
  {
    " .$js_code . "
  }
});";
    
    $js_file = "$dir/$application_namespace.ApplicationEventHandlers.js";
    file_put_contents($js_file,$js_content);
    
    return $this->getResponseData();
  }
  
  
  
  /**
   * Recurses the given directory and extracts all javascript handler code
   * form qxml files that exceeds 5 lines of javascript as separate handler
   * methods, rewriting the qxml code accordingly. Backup your original files
   * before doing this! 
   *
   * @param string $dir
   * @return string Code of a qooxdoo class containing all the handler methods
   */
  function extractHandlers($dir)
  {
    if ( ! file_exists($dir) )
    {
      $this->raiseError("$dir is not a valid directory.",__FILE__,__LINE__);
    }
        
    /*
     * get directory content
     */
    $content = scandir($dir);
    
    /*
     * go through each entry
     */
    foreach ( $content as $entry )
    {      
      /*
       * skip each entry that starts with a period
       */
      if ( $entry{0} == "." ) continue;
      
      /*
       * file or directory path
       */
      $path = "$dir/$entry";
      
      /*
       * recurse into subdirectories
       */
      if ( is_dir( $path ) )
      {
        $this->extractHandlers( $path );
        continue;
      }
      
      /*
       * get file extension
       */
      $ext = strtolower( get_file_extension( $path ) );
      
      /*
       * if not a qxml file, ignore it
       */
      if ( ! in_array( $ext, array("qxml","xml","qinc") ) ) 
      {
        $this->info("Skipping $entry ...");
        continue;
      }
      
      $this->info("Parsing $entry ...");
      
      /*
       * get file content as an array
       */
      $lines = new ArrayList( file( $path ) );
      
      /*
       * qxml file content
       */
      $qxml = new ArrayList();
      
      /*
       * whether code was extracted
       */
      $extractedCode = false;
      
      /*
       * method counter
       */
      $method_counter = 0;     

      /*
       * line number
       */
      $line_no = 1;
      
      /*
       * check each line
       */
      while ( $line = $lines->next() )
      {

        /*
         * check for tag, if not found, skip
         */
        if ( ! ( 
             $isEvent      = stristr($line, "<qx:eventListener") 
          or $isConfig     = stristr($line, "<qx:configChangeEventListener" )
          or $isCondition  = stristr($line, "<qx:condition" )
          or $isPermission = stristr($line, "<qx:permission" )
          or $isMessage    = stristr($line, "<qx:messageSubscriber" ) 
        ) )
        {
          $qxml->add($line);
          $line_no++;
          continue;
        }
                  
        /*
         * get rest of the tag
         */
        if ( ! strstr( $line, ">") )
        {
          $header_lines = 1;
          while ( $line2 = $lines->next() )
          {
            if ( ! trim($line2) ) continue;
            $header_lines++;
            $line .= " " . $line2;
            if ( strstr($line2, ">") ) break;
          }
        }
        
        /*
         * continue if event handler is short, delegates or dispatche a message
         */
        if ( stristr($line, "</qx:eventListener") or
            stristr($line, "</qx:messageSubscriber") or 
            stristr($line, "</qx:configChangeEventListener") or
            stristr($line, "</qx:condition") or
            stristr($line, "/>") or
            stristr($line, "delegate") or 
            stristr($line, "dispatchMessage") )  
        {
          $qxml->add($line);
          $line_no += $header_lines;
          continue;
        }
        
        /*
         * event listener header
         */
        $eventListener = $line;
        
        /*
         * get event type, message filter or config key
         */ 
        $lookup = $isEvent        ? "type" : 
                  ( $isConfig     ? "key" : 
                  ( $isMessage    ? "filter" : 
                  ( $isPermission ? "name" :
                  "description" ) ) );
                  
        preg_match('/' . $lookup .'\s?=\s?"([^"]+)"/s', $line, $matches);
        $type = $matches[1];
         
        /*
         * is permission, remember name and continue
         */
        if ( $isPermission )
        {
          $lastPermission = $type;
          $qxml->add($line);
          $line_no += $header_lines;
          continue;
        }
        
         /*
          * store event handling code
          */
         $tmp    = new ArrayList();
         $orig   = new ArrayList();
         $indent = false;
         while ( $line = $lines->next() )
         {
           
           /*
            * store original code
            */
           $orig->add($line);
           
           /*
            * break if end of handler code is reached
            */
           if ( stristr($line, "</qx:eventListener") or 
                stristr($line, "</qx:messageSubscriber") or
                stristr($line, "</qx:configChangeEventListener") or
                stristr($line, "</qx:condition")
           ) break;
           
           /*
            * indentation
            */
           $line = str_replace("\t","  ", $line );
           if ($indent === false )
           {
             $i=0;
             while ( $line{$i} == " " )
             {
               $indent .= " ";
               $i++;
             }
           }
           $line = "  " . str_replace($indent,"",$line);
           
           /*
            * remove CDATA markup
            */
           $line = rtrim( str_replace("<![CDATA[", "", str_replace("]]>", "", $line ) ) );
           
           /*
            * convert "this" to "target" because "this" refers to the application instance in the
            * handler code
            */
           $line = preg_replace("/\bthis\b/", "target",  $line ) ;
           
           /*
            * add code
            */
           $tmp->add($line);
         }
         
         /*
          * if event handler is larger than 5 lines, move event code to javascript
          */
         if ( $tmp->size() > 0 )
         {
           
           /*
            * prefix is filename plus method counter
            */
           $prefix = str_replace(".", "_", 
                     str_replace( "-","_", 
                     substr( $entry,0, -strlen($ext) ) ) ) . 
                     sprintf("%02s",$method_counter++);
           
           /*
            * create javascript method
            */
           if ( $isEvent )
           {
             $methodName =  $prefix . "_on_" . $type;
             $this->js->addAll( array( 
                "/**",
                " * Handler for event '$type'",
                " * @param event {qx.event.type.Event} Event object",
                " * @param target {qx.core.Target} Event target object",
                " * @return void",
                " */",
                "$methodName : function(event,target)",
                "{"
             ) );
           }
           elseif ( $isMessage )
           {
             $methodName = $prefix . "_on_" . 
                str_replace(
                  array(".","*"),"_",
                  substr( $type, strlen( $this->namespace . ".messages." ) )
                );
                
             $this->js->addAll( array( 
                "/**",
                " * Handler for message '$type'",
                " * @param message {qx.event.message.Message} Message object",
                " * @param target {qx.core.Target} Widget context object ",
                " * @return void",
                " */",
                "$methodName : function(message,target)",
                "{"
             ) );               
           }
           elseif ( $isConfig )
           {
             $methodName =$prefix . "_on_config_change_" . 
                str_replace(
                  array(".","*"),"_",
                  substr( $type, strlen( $this->namespace . "." ) )
                );
             
             
             $this->js->addAll( array( 
                "/**",
                " * Event handler for configuration key '$type'",
                " * @param event {qx.event.type.Event} Event object",
                " * @param target {qx.core.Target} Widget context object ",
                " * @return void",
                " */",
                "$methodName : function(event,target)",
                "{"
             ) );               
           }
           elseif ( $isCondition )
           {
             $methodName =$prefix . "_permission_"  .
                str_replace(
                  array(".","*"),"_",
                  substr( $lastPermission, strlen( $this->namespace . ".permissions." ) )
                );
                
             $this->js->addAll( array( 
                "/**",
                " * Condition function for permission '$lastPermission'" ,
                " * $type",
                " * @param target {qx.core.Target} Widget context object ",
                " * @return {Boolean}",
                " */",
                "$methodName : function(target)",
                "{"
             ) );               
           }
           
           $this->js->addAll( $tmp );
           $this->js->addAll( array( "},","" ) );

           /*
            * replace event listener
            */
           $eventListener = substr( $eventListener, 0, strrpos($eventListener,">") ) . 
              " delegate=\"$methodName\" />\n";
           $qxml->add($eventListener);
                      
         }
         else
         {
           /*
            * otherwise, add everything back to the qxml output
            */
           $qxml->add($eventListener);
           $qxml->addAll($orig);
           $line_no += ( $header_lines + $orig->size() );
         }
         
         /*
          * remember this change
          */
          $extractedCode = true;

      } /* end while lines-next() */

      
     if ( $extractedCode )
     {
       /*
        * save qxml file
        */
       $qxml_content = $qxml->join();
       $qxml_file    = $path . ".new";
       file_put_contents($qxml_file,$qxml_content);
     }

    } /* end foreach file */
     
  } 
  
}

?>