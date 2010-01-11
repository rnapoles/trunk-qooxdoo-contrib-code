qcl sample application: access
==============================

This is a sample application to show the access control system 
of the qcl library. 

There are two ways you can use this application. 

1) Stand-alone test mode

You can test it with the simple backend implementation in 
class/access which is self-contained and does not need the qcl 
backend library. For this, the RpcPhp jsonrpc server v.1.0 is
included in this distribution

2) MySql-Based production mode (not ready yet)

You can use the MySql-based qcl backend which required some
configuration but will show you how to write an application for
production. You will need to

  a) check out the qooxdoo-contrib projects "qcl" and "RpcPhp"  
     from SVN. They must be in one folder.
  b) "chmod 0777 log/" so that the server can write log files.
  c) create a MySql database "test", with a user "test" and
     password "test". You might need to adapt the file "service.ini.php"
     if you want to use different parameters, or if your MySql server 
     doesn't listen on localhost:3606.

This mode is not yet ready, I will announce it on the mailing list.