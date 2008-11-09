<?php
/*
 * qooxdoo - the new era of web development
 *
 * http://qooxdoo.org
 *
 * Copyright:
 *   2006-2007 Derrell Lipman
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Derrell Lipman (derrell)
 *  * Christian Boulanger (cboulanger) 
 */


/*
 * class JsonRpcError
 *
 * This class allows service methods to easily provide error information for
 * return via JSON-RPC.
 */
class JsonRpcError
{
    var             $json;
    var             $data;
    var             $id;
    var             $scriptTransportId;
    
    function JsonRpcError($json,
                          $origin = JsonRpcError_Origin_Server,
                          $code = JsonRpcError_Unknown,
                          $message = "Unknown error")
    {
        $this->json = $json;
        $this->data = array("origin"  => $origin,
                            "code"    => $code,
                            "message" => $message);

        /* Assume we're not using ScriptTransporrt */
        $this->scriptTransportId = ScriptTransport_NotInUse;
    }
    
    function SetOrigin($origin)
    {
        $this->data["origin"] = $origin;
    }

    function SetError($code, $message)
    {
        $this->data["code"] = $code;
        $this->data["message"] = $message;
    }
    
    function SetId($id)
    {
        $this->id = $id;
    }
    
    function SetScriptTransportId($id)
    {
        $this->scriptTransportId = $id;
    }
    
    function SendAndExit()
    {
        $error = $this;
        $id = $this->id;
        $ret = array("error" => $this->data,
                     "id"    => $id);
        SendReply($this->json->encode($ret), $this->scriptTransportId);
        exit;
    }
}

//=================================================================
// error handling for jsonrpc 
// contributed by Christian Boulanger (info at bibliograph dot org)
//
// The main idea of this code is to keep PHP from messing up the 
// JSONRPC response if a parsing or runtime error occurs, and to 
// allow the client application to handle those errors nicely
//=================================================================

/**
 * switches error handling on or off. Override in global_settings.php
 * default: on
 *
 */
if (! defined("JsonRpcErrorHandling"))
{
    define("JsonRpcErrorHandling",             "on");
}

/**
 * error handling callback function 
 * php4 cannot handle all errors, that's why we have to use a
 * workaround using output buffering (see post by
 * smp at ncoastsoft dot com at
 *   http://www.php.net/manual/en/function.set-error-handler.php
 */ 
function jsonrpc_catch_errors($buffer)
{
    if (ereg("(error</b>:)(.+)(<br)", $buffer, $regs) ) 
    {
        // parse error string from PHP error message 
        $err = preg_replace("/<.*?>/","",$regs[2]);

        // return error formatted as a JSONRPC error response
        return
            '{' .
            '  error:' .
            '  {' .
            '    "origin":' . JsonRpcError_Origin_Server . ',' . 
            '    "code":' .  JsonRpcError_ScriptError . ',' .
            '    "message":"Fatal PHP Error: '. addslashes($err) .
            ' "}' .
            '}';
    } 
    else
    {
        // Buffer does not contain a php error message, so return it
        // unmodified.
        return $buffer;
    }
}


/**
 * jsonrpc error handler to output json error response messages
 */
function jsonRpcErrorHandler($errno, $errstr, $errfile, $errline)
{
    // determine error type
    // todo: remove those which are not captured by set_error_handler()
    switch($errno){
    case E_ERROR:
        $errtype= "Error";
        break;
        
    case E_WARNING:
        $errtype= "Warning";
        break;
        
    case E_PARSE:
        $errtype= "Parse Error";
        break;
        
    case E_NOTICE:
        $errtype= "Notice";
        break;
        
    case E_CORE_ERROR:
        $errtype= "Core Error";
        break;
        
    case E_CORE_WARNING:
        $errtype= "Core Warning";
        break;
        
    case E_COMPILE_ERROR:
        $errtype= "Compile Error";
        break;
        
    case E_COMPILE_WARNING:
        $errtype= "Compile Warning";
        break;
        
    case E_USER_ERROR:
        $errtype= "User Error";
        break;
        
    case E_USER_WARNING:
        $errtype= "User Warning";
        break;
        
    case E_USER_NOTICE:
        $errtype= "User Notice";
        break;
        
    case E_STRICT:
        $errtype= "Strict Notice";
        break;
        
    case E_RECOVERABLE_ERROR:
        $errtype= "Recoverable Error";
        break;
        
    default:
        $errtype= "Unknown error ($errno)";
        break;
    } 
    
    // respect error_reporting level
    $errno = $errno & error_reporting();
    if($errno == 0) return true;
    
    $errmsg =   "PHP $errtype in $errfile, line $errline: $errstr";

    // if not called through jsonrpc request
    global $error;
    if (! is_object($error))
    {
        echo nl2br($errmsg);
        exit(1);
    }
  
    switch($errno)
    {
      case E_WARNING:
      case E_NOTICE:
          require_once dirname(__FILE__) . "/../core/object.php";
          qcl_core_object::writeLog($errmsg);
          break;
      
      default:
        // return jsonrpc error
        $error->SetError($errno, $errmsg);
        $error->SendAndExit();
    }   
   // never gets here
}

/**
 * main error handling code
 */
if (JsonRpcErrorHandling == "on")
{
    // start buffering to catch errors with handler function
    ob_start("jsonrpc_catch_errors");
  
    // This will not always work, so do some more hacking to comment out
    // uncaught errors.  You'll need to examine the http response to see
    // the uncaught errors!
    ini_set('error_prepend_string', "/*");
    ini_set('error_append_string', "*/");
  
    // error handler function for php jsonrpc
    set_error_handler("jsonRpcErrorHandler"); 
}



?>