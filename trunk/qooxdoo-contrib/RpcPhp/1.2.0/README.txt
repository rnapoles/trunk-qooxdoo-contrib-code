===== RpcPhp =====

qooxdoo RPC server in PHP (5.2-5.3)

Authors:
 * Derrell Lipman (derrell)
 * Christian Boulanger (cboulanger)

This is the object-oriented rewrite of the PHP JSON-RPC server for PHP.  

How it works: It receives a service name in dot-separated path format and 
expect to find the class containing the service in a file of the service
name (with dots converted to slashes and ".php" appended). If the service 
name is "foo.bar.Baz", the class can be named "class_Baz" or 
"class_foo_bar_Baz". The name of the service method is prefixed by "method_",
so "doFoo" becomes "method_doFoo()". The prefixes can be changed.

Usage:

require "path/to/services/server/JsonRpcServer.php";
$server = new JsonRpcServer;
$server->start();

You can also use the index.php provided in this package.

The service classes are placed in the "class/" subfolder. You can
also choose a different location for the service classes by
defining the "servicePathPrefix" in the global_settings.php file
(if you use it) or elsewhere in your code. Make sure to include
a trailing slash.

The server is extremely flexible, you can subclass the JsonRpcServer and
finetune almost every aspect of its behavior by overriding the different
methods.

As an example for the subclassing of the server, a PostRpcServer class
has been included which can be used for testing purposes. This class
transforms GET and POST requests into jsonrpc requests. This can serve
 as an example how to write other servers on top of the jsonrpc server 
 (for example, using XML-RPC, etc.).

For more information see
  * http://qooxdoo.org/documentation/1.1/RPC
  * http://qooxdoo.org/documentation/1.1/rpc_php
  
Important Changes since version 1.1.0:

- PHP4 support has been dropped, it now supports PHP 5.2-5.3 only.

- The handleQooxdooDates constant has been changed to false as default value.
  This means that by default, the json response doesn't encode dates as
  javascript objects. The main reason is performance: the PHP-based JSON encoder 
  class performes really poor with large datasets compared to using json_encode()
  or json_decode(), so the default is now to use these functions.

- The error behavior has changed. We now fully rely on native PHP exceptions 
  for handling errors.Instead of returning an error object, use 
    throw new JsonRpcException("Error message", <Optional error code>);

- The signature of JsonRpcError has been changed. In previous versions,
  it was (int $code, string $message, int $origin). Now it behaves like a 
  normal PHP Exception and the signature is (string $message, int $code, 
  Exception $previous, int $origin). Please update your code accordingly.