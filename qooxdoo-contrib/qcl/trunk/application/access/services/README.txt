This is a sample application to show the access control system 
of the qcl library. 

You need to "chmod 0777 log/" so that the server can write log files. 

If you want to use the database backend,
you need to create a MySql database "test", with a user "test" and
password "test". You might need to adapt the file "service.ini.php"
if your MySql server doesn't listen on localhost:3606.