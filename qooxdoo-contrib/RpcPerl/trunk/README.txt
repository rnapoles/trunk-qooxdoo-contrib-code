Perl Bindings for Qooxdoo
-------------------------
$Id$

Please refer to the manual page below for information about this module.

For more information see

  * http://qooxdoo.org/documentation/RPC
  * http://qooxdoo.org/documentation/RPC_Perl


Release Notes
-------------
0.2 - added new Qooxdoo::SessionLite module to use as a replacement for
      CGI::Session. For file based sessions it has the advantage that it is
      not prone to race conditions when multiple instances of the script
      modifying the stored data.

    - Compatibility with JSON-2.07 module  (patch by Niko Tyni) 
      all new Testsuite (patch by Niko Tyni)

    - Do not exit from JSONRPC after sending an Error. Just return
      to the caller. Otherwhise sending out erros can get quite expensive
      with the jsonrpc part having to restart every time.

0.1 - initial release, preserving full backward compatibility
      with previous unversioned releases.

Manual Page
-----------


NAME

    Qooxdoo::JSONRPC.pm - A Perl implementation of JSON-RPC for Qooxdoo

SYNOPSIS
    The cgi/fcgi script

     #!/usr/bin/perl -w
     use strict;
     use CGI;
     use CGI::Session::Driver::file;
     # make sure session files do not clash
     $CGI::Session::Driver::file::FileName =
        ($ENV{USER}||'').$0.'%s.session';

     use Qooxdoo::JSONRPC;

     # talk about what we do in the apache error log
     #$Qooxdoo::JSONRPC::debug = 0;

     # By default methods are located in Qooxdoo/Services
     #$Qooxdoo::JSONRPC::service_path = 'Qooxdoo::Services';

     # By default methods have to be prefixed by 'method_'
     #$Qooxdoo::JSONRPC::method_prefix = 'method_';

     my $cgi = new CGI;
     my $session = new CGI::Session(undef,$cgi);
     Qooxdoo::JSONRPC::handle_request ($cgi, $session);

     # or if you load CGI::Fast you can easily create a
     # fastcgi aware version
     #while (my $cgi = new CGI::Fast) {
     #   my $session = new CGI::Session(undef,$cgi);
     #   Qooxdoo::JSONRPC::handle_request ($cgi, $session);
     #}

    Along with the cgi wrapper setup a service module the example below
    shows how to handle logins on the server side.

     package Qooxdoo::Services::Demo;
     use strict;

     sub GetAccessibility {
         # name of method about to be called
         my $method = shift;
         # access level based on connection
         my $access = shift;
         # session handle
         my $session = shift;
         if ($method eq 'login'
            or $method eq 'logoff'
            or $session->param('authenticated')||'' eq 'yes'){
           return 'public'; # grant everyone access
         }
         else {
            return 'fail'; #deny access
         }
     }

     sub method_login {
         my $error = shift;
         my $session = $error->{session};
         my @args = @_;
         # if login ok
         $session->param('authenticated','yes');
         $session->flush();
         return 1;
         # if login is not ok
         $error->set_error(101,'Login faild');
         return $error;
     }

     sub method_logout {
        my $error = shift;
        my $session = $error->{session};
        $session->delete();
        $session->flush();
        return 1;
     }

     sub method_fun {
        my $error = shift;
        my $session = $error->{session};
        my $arg_a = shift;
        my $arg_b = shift;
        # do something
        return $pointer_to_data;
     }

     1;

DESCRIPTION
    RPC-JSON is a straightforward Remote Procedure Call mechanism, primarily
    targeted at Javascript clients, and hence ideal for Qooxdoo. This module
    implements the server side handling of RPC request in perl.

  JSON RPC Basics
    JSON-RPC Services may be implemented in any language provided they
    provide a conformant implementation. This module uses the CGI module to
    parse HTTP headers, and the JSON module to manipulate the JSON body.

    A simple, but typical exchange might be:

     client->server:

       {"service":"qooxdoo.test","method":"echo","id":1,"params":["Hello"],"server_data":null}

     server->client:

       {"id":1,"result":"Client said: [Hello]"}

    Here the service 'qooxdoo.test' is requested to run a method called
    'echo' with an argument 'Hello'.

    This Perl implementation will locate a module called
    Qooxdoo::Services::qooxdoo::test (corresponding to
    Qooxoo/Services/qooxdoo/test.pm in Perl's library path). It will then
    execute the function Qooxdoo::Services::qooxdoo::test::echo with the
    supplied arguments.

    The function will receive the error object as the first argument, and
    subsequent arguments as supplied by the remote call. Your method call
    would therefore start with something equivalent to:

        my $error  = shift;
        my @params = @_;

    See test.pm for how to deal with errors and return responses.

    The response is sent back with the corresponding id (essential for
    asynchronous calls).

    The protocol also provides an exception handling mechanism, where a
    response is formatted something like:

        {"error":{"origin":2,"code":23,"message":"This is an application-provided error"},"id":21}

    There are 4 error origins:

    JsonRpcError_Origin_Server 1
        The error occurred within the server.

    JsonRpcError_Origin_Application 2
        The error occurred within the application.

    JsonRpcError_Origin_Transport 3
        The error occurred somewhere in the communication (not raised in
        this module).

    JsonRpcError_Origin_Client 4
        The error occurred in the client (not raised in this module).

    For Server errors, there are also some predefined error codes.

    JsonRpcError_Unknown 0
        The cause of the error was not known.

    JsonRpcError_IllegalService 1
        The Service name was not valid, typically due to a bad character in
        the name.

    JsonRpcError_ServiceNotFound 2
        The Service was not found. In this implementation this means that
        the module containing the Service could not be found in the library
        path.

    JsonRpcError_ClassNotFound 3
        This means the class could not be found with, is not actually raised
        by this implementation.

    JsonRpcError_MethodNotFound 4
        The method could not be found. This is raised if a function cannot
        be found with the method name in the requested package namespace.

        Note: In Perl, modules (files containing functionality) and packages
        (namespaces) are closely knitted together, but there need not be a
        one-to-one correspondence -- packages can be shared across multiple
        modules, or a module can use multiple packages. This module assumes
        a one-to-one correspondence by looking for the method in the same
        namespace as the module name.

    JsonRpcError_ParameterMismatch 5
        This is typically raised by individual methods when they do not
        receive the parameters they are expecting.

    JsonRpcError_PermissionDenied 6
        Again, this error is raised by individual methods. Remember that RPC
        calls need to be as secure as the rest of your application!

  Access Control
    There is also some infrastructure to implement access control. Before
    each method call, the "GetAccessibility" method of the service is
    called. Depending on the response from "GetAccessibility" the actual
    method will be called, or an error is returned to the remote caller. The
    example in the synopsis shows how to use that for implementing an
    authentication process.

    "GetAccessibility" must return one of the following access levels

    Accessibility_Public ("public")
        The method may be called from any session, and without any checking
        of who the Referer is.

    Accessibility_Domain ("domain")
        The method may only be called by a script obtained via a web page
        loaded from this server. The Referer must match the request URI,
        through the domain part.

    Accessibility_Session ("session")
        The Referer must match the Referer of the very first RPC request
        issued during the session.

    Accessibility_Fail ("fail")
        Access is denied

  Persistant Data in the Session module
    Methods get access to the session handle as a parameter of the error
    object. Session allows to easy storage of persistant data. Since the
    session module writes all parameters in one go, this can result in a
    race condition when two instances store data.

AUTHOR
    Nick Glencross <nick.glencross@gmail.com>, 
    Tobi Oetiker <tobi@oetiker.ch>

