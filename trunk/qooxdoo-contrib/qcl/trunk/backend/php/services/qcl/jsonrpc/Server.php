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
 * This is a simple JSON-RPC server.  We receive a service name in
 * dot-separated path format and expect to find the class containing the
 * service in a file of the service name (with dots converted to slashes and
 * ".php" appended).
 */

/*
 * include json class, either a wrapper around a php extension/php-only implementation
 * (php4) or built-in functions (php5)
 */
require_once dirname(__FILE__) . "/Json.php";

/*
 * include JsonRpcError class
 */
require_once dirname(__FILE__) . "/JsonRpcError.php";

/*
 * There may be cases where all services need use of some libraries or
 * system-wide definitions.  Those may be provided by a file named
 * "global_settings.php" in the same directory as this file.  If it exists, we
 * include it.
 *
 * The global settings file may provide values for the following manifest
 * constants whose default values are otherwise provided below:
 *
 *   servicePathPrefix
 *   defaultAccessibility
 *
 */
if (file_exists("global_settings.php"))
{
    require_once "global_settings.php";
}

/**
 * The location of the service class directories.
 */
define("servicePathPrefix", "");

/**
 * Prefixes for RPC classes and methods
 * 
 * Since you do not want to expose all classes or all methods that are 
 * present in the files accessible to the server, a prefix is needed
 * for classes and methods. By default, this is "class_" for classes
 * and "method_" for methods. You might want to keep those prefixes if
 * you want to share backend class code with others (otherwise, a simple
 * search & replace takes care of quickly, too) - otherwise define the 
 * following constants in global_settings.php
 */
if (! defined("JsonRpcClassPrefix"))
{
    define("JsonRpcClassPrefix", "class_");
}
 
if (! defined("JsonRpcMethodPrefix"))
{
    define("JsonRpcMethodPrefix", "method_");
}

/*
 * Method Accessibility values
 *
 * Possible values are:
 *
 *   "public" -
 *     The method may be called from any session, and without any checking of
 *     who the Referer is.
 *
 *   "domain" -
 *     The method may only be called by a script obtained via a web page
 *     loaded from this server.  The Referer must match the request URI,
 *     through the domain part.
 *
 *   "session" -
 *     The Referer must match the Referer of the very first RPC request
 *     issued during the session.
 *
 *   "fail" -
 *     Access is denied
 */
define("Accessibility_Public",  "public");
define("Accessibility_Domain",  "domain");
define("Accessibility_Session", "session");
define("Accessibility_Fail",    "fail");

/**
 * Default accessibility for methods when not overridden by the service class.
 */
if ( ! defined("defaultAccessibility") )
{
  define("defaultAccessibility", Accessibility_Domain);
}


/**
 * Static class JsonRpcServer
 */
class JsonRpcServer
{

  /**
   * Default debug method. Override if necessary
   */
  function debug($str)
  {
      static $fw = null;
      if ($fw === null)
      {
          $fw = fopen("/tmp/phpinfo", "a");
      }
      fputs($fw, $str, strlen($str));
      fflush($fw);
  }  
  
  /**
   * Sends the result output
   */
  function SendReply($reply, $scriptTransportId)
  {
    /* If not using ScriptTransport... */
    if ($scriptTransportId == ScriptTransport_NotInUse)
    {
        /* ... then just output the reply. */
        print $reply;
    }
    else
    {
        /* Otherwise, we need to add a call to a qooxdoo-specific function */
        $reply =
            "qx.remote.ScriptTransport._requestFinished(" .
            $scriptTransportId . ", " . $reply .
            ");";
        print $reply;
    }
  }
  
  /**
   * Starts the server
   */
  function start()
  {
    /*
     * Start or join an existing session
     */
    session_start();
    
    /*
     * Create a new instance of JSON and get the JSON-RPC request from
     * the POST data.
     */
    $json  = new JSON();
    $error = new JsonRpcError($json);
    
    /* Assume (default) we're not using ScriptTransport */
    $scriptTransportId = ScriptTransport_NotInUse;
    
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        /*
         * For POST data, the only acceptable content type is application/json.
         */
        switch(substr($_SERVER["CONTENT_TYPE"], 
            0, 
            strcspn($_SERVER["CONTENT_TYPE"], ";")))
        {
        case "application/json":
            /* We found literal POSTed json-rpc data (we hope) */
            $input = file_get_contents('php://input');
            $jsonInput = $json->decode($input);
            break;
        
        default:
            /*
             * This request was not issued with JSON-RPC so echo the error rather
             * than issuing a JsonRpcError response.
             */
            echo
                "JSON-RPC request expected; " .
                "unexpected data received";
            exit;
        }
    }
    else if ($_SERVER["REQUEST_METHOD"] == "GET" &&
             isset($_GET["_ScriptTransport_id"]) &&
             $_GET["_ScriptTransport_id"] != ScriptTransport_NotInUse &&
             isset($_GET["_ScriptTransport_data"]))
    {
        /* We have what looks like a valid ScriptTransport request */
        $scriptTransportId = $_GET["_ScriptTransport_id"];
        $error->SetScriptTransportId($scriptTransportId);
        $input = $_GET["_ScriptTransport_data"];
        $jsonInput = $json->decode(get_magic_quotes_gpc()
                                   ? stripslashes($input)
                                   : $input);
    }
    else
    {
        /*
         * This request was not issued with JSON-RPC so echo the error rather than
         * issuing a JsonRpcError response.
         */
        echo "Services require JSON-RPC<br>";
        exit;
    }
    
    /* Ensure that this was a JSON-RPC service request */
    if (! isset($jsonInput) ||
        ! isset($jsonInput->service) ||
        ! isset($jsonInput->method) ||
        ! isset($jsonInput->params))
    {
        /*
         * This request was not issued with JSON-RPC so echo the error rather than
         * issuing a JsonRpcError response.
         */
        echo
            "JSON-RPC request expected; " .
            "service, method or params missing<br>";
        exit;
    }
    
    /*
     * Ok, it looks like JSON-RPC, so we'll return an Error object if we encounter
     * errors from here on out.
     */
    $error->SetId($jsonInput->id);
    
    /*
     * Ensure the requested service name is kosher.  A service name should be:
     *
     *   - a dot-separated sequences of strings; no adjacent dots
     *   - first character of each string is in [a-zA-Z] 
     *   - other characters are in [_a-zA-Z0-9]
     */
    
    /* First check for legal characters */
    if (ereg("^[_.a-zA-Z0-9]+$", $jsonInput->service) === false)
    {
        /* There's some illegal character in the service name */
        $error->SetError(JsonRpcError_IllegalService,
                         "Illegal character found in service name.");
        $error->SendAndExit();
        /* never gets here */
    }
    
    /* Now ensure there are no double dots */
    if (strstr($jsonInput->service, "..") !== false)
    {
        $error->SetError(JsonRpcError_IllegalService,
                         "Illegal use of two consecutive dots in service name");
        $error->SendAndExit();
    }
    
    /* Explode the service name into its dot-separated parts */
    $serviceComponents = explode(".", $jsonInput->service);
    
    /* Ensure that each component begins with a letter */
    for ($i = 0; $i < count($serviceComponents); $i++)
    {
        if (ereg("^[a-zA-Z]", $serviceComponents[$i]) === false)
        {
            $error->SetError(JsonRpcError_IllegalService,
                             "A service name component does not begin with a letter");
            $error->SendAndExit();
            /* never gets here */
        }
    }
    
    /*
     * Now replace all dots with slashes so we can locate the service script.  We
     * also retain the exploded components of the path, as the class name of the
     * service is the last component of the path.
     * == added CB: look for a folder "controllers" and append it if exists ==
     */
    $servicePath = implode("/", $serviceComponents);
    
    /* Try to load the requested service */
    if ( file_exists( servicePathPrefix . $servicePath . ".php") )
    {
      require_once servicePathPrefix . $servicePath . ".php";
    }
    else
    {
      array_splice($serviceComponents,count($serviceComponents)-1,0,array("controllers"));
      $servicePath2 = implode("/", $serviceComponents);
      if ( file_exists( servicePathPrefix . $servicePath2 . ".php") )
      {
        require_once servicePathPrefix . $servicePath2 . ".php";
      }
      else
      {  
          /* Couldn't find the requested service */
          $error->SetError(JsonRpcError_ServiceNotFound,
                           "Service `$servicePath` not found.");
          $error->SendAndExit();
          /* never gets here */
      }
    }
    
    
    /* The service class is the last component of the service name */
    $className = JsonRpcClassPrefix . $serviceComponents[count($serviceComponents) - 1];
    
    /* or the fully qualified service name */
    $longClassName = JsonRpcClassPrefix . implode("_", $serviceComponents );
    
    /* Ensure that the class exists.  First try the short class name. */
    $classExists = class_exists($className);
    if (! $classExists)
    {
        /* Short class name doesn't exist.  Try the long class name. */
        $className = $longClassName;
        $classExists = class_exists($className);
    }
    
    if (! $classExists)
    {
        $error->SetError(JsonRpcError_ClassNotFound,
                         "Service class `" .
                         $serviceComponents[count($serviceComponents) - 1] .
                         "` not found.");
        $error->SendAndExit();
        /* never gets here */
    }
    
    /* Instantiate the service */
    $service = new $className();
    
    /*
     * Do referer checking.  There is a global default which can be overridden by
     * each service for a specified method.
     */
    
    /* Assign the default accessibility */
    $accessibility = defaultAccessibility;
    
    /*
     * See if there is a "GetAccessibility" method in the class.  If there is, it
     * should take two parameters: the method name and the default accessibility,
     * and return one of the Accessibililty values.
     */
    if (method_exists($service, "GetAccessibility"))
    {
        /* Yup, there is.  Get the accessibility for the requested method */
        $accessibility = $service->GetAccessibility($jsonInput->method,
                                                    $accessibility);
    }
    
    /* Do the accessibility test. */
    switch($accessibility)
    {
      case Accessibility_Public:
        /* Nothing to do.  The method is accessible. */
        break;
        
      case Accessibility_Domain:
        /* Determine the protocol used for the request */
        if (isset($_SERVER["SSL_PROTOCOL"]))
        {
            $requestUriDomain = "https://";
        }
        else
        {
            $requestUriDomain = "http://";
        }
    
        // Add the server name
        $requestUriDomain .= $_SERVER["SERVER_NAME"];
    
        // The port number optionally follows.  We don't know if they manually
        // included the default port number, so we just have to assume they
        // didn't.
        if ((! isset($_SERVER["SSL_PROTOCOL"]) && $_SERVER["SERVER_PORT"] != 80) ||
            (  isset($_SERVER["SSL_PROTOCOL"]) && $_SERVER["SERVER_PORT"] != 443))
        {
            // Non-default port number, so append it.
            $requestUriDomain .= ":" . $_SERVER["SERVER_PORT"];
        }
    
        /* Get the Referer, up through the domain part */
        if (ereg("^(https?://[^/]*)", $_SERVER["HTTP_REFERER"], $regs) === false)
        {
            /* unrecognized referer */
            $error->SetError(JsonRpcError_PermissionDenied,
                             "Permission Denied [2]");
            $error->SendAndExit();
            /* never gets here */
        }
    
        /* Retrieve the referer component */
        $refererDomain = $regs[1];
    
        /* Is the method accessible? */
        if ($refererDomain != $requestUriDomain)
        {
            /* Nope. */
            $error->SetError(JsonRpcError_PermissionDenied,
                             "Permission Denied [3]");
            $error->SendAndExit();
            /* never gets here */
        }
    
        /* If no referer domain has yet been saved in the session... */
        if (! isset($_SESSION["session_referer_domain"]))
        {
            /* ... then set it now using this referer domain. */
            $_SESSION["session_referer_domain"] = $refererDomain;
        }
        break;
        
      case Accessibility_Session:
        /* Get the Referer, up through the domain part */
        if (ereg("(((http)|(https))://[^/]*)(.*)",
                 $_SERVER["HTTP_REFERER"],
                 $regs) === false)
        {
            /* unrecognized referer */
            $error->SetError(JsonRpcError_PermissionDenied,
                             "Permission Denied [4]");
            $error->SendAndExit();
            /* never gets here */
        }
    
        /* Retrieve the referer component */
        $refererDomain = $regs[1];
    
        /* Is the method accessible? */
        if (isset($_SESSION["session_referer_domain"]) &&
            $refererDomain != $_SESSION["session_referer_domain"])
        {
            /* Nope. */
            $error->SetError(JsonRpcError_PermissionDenied,
                             "Permission Denied [5]");
            $error->SendAndExit();
            /* never gets here */
        }
        else if (! isset($_SESSION["session_referer_domain"]))
        {
            /* No referer domain is yet saved in the session.  Save it. */
            $_SESSION["session_referer_domain"] = $refererDomain;
        }
    
        break;
    
      case Accessibility_Fail:
        $error->SetError(JsonRpcError_PermissionDenied,
                         "Permission Denied [6]");
        $error->SendAndExit();
        /* never gets here */
        break;
    
      default:
        /* Service's GetAccessibility() function returned a bogus value */
        $error->SetError(JsonRpcError_PermissionDenied,
                         "Service error: unknown accessibility.");
        $error->SendAndExit();
        /* never gets here */
    }
    
    /* Now that we've instantiated service, we should find the requested method */
    $method = JsonRpcMethodPrefix . $jsonInput->method;
    if (! method_exists($service, $method))
    {
        $error->SetError(JsonRpcError_MethodNotFound,
                         "Method `" . $jsonInput->method . "` not found " .
                         "in service class `" .
                         $serviceComponents[count($serviceComponents) - 1] .
                         "`.");
        $error->SendAndExit();
        /* never gets here */
    }
    
    /* Errors from here on out will be Application-generated */
    $error->SetOrigin(JsonRpcError_Origin_Application);
    
    /* Call the requested method passing it the provided params */
    $output = $service->$method($jsonInput->params, $error);
    
    /* See if the result of the function was actually an error */
    if (get_class($output) == "JsonRpcError")
    {
        /* Yup, it was.  Return the error */
        $error->SendAndExit();
        /* never gets here */
    }
    
    /* Give 'em what they came for! */
    $ret = array("result" => $output,
                 "id"     => $jsonInput->id);    
    
    $jsonStr = $json->encode($ret);
    /*
    $service->info( "\n\n *** End of request {$jsonInput->id}: " . 
                    $service->className() . "." . $method . 
                    "(" .implode (", ", $jsonInput->params ) .") *** \n" );
    $service->info( $jsonStr );
    */
    $this->sendReply($jsonStr, $scriptTransportId);
    exit;
  }
  
}
