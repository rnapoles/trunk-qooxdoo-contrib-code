;;<?php exit; ?>;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Leave the above line to make sure nobody can access this file ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; These are the server-side default configuration values
;; for your application. They are unchangeable by the application
;; and typically should not be exposed to the client.
;;
;; You can access a configuration value with
;;    $app = qcl_application_Application::getInstance();
;;    $myconfigValue = $app->getIniValue( "sectionname.keyname" );
;;
;; The section name is found in square brackets below, the key name
;; is the string before the "=" character.
;;
;; Please note:
;;   - If values contain whitespace, they have to be quoted
;;   - values "on" and "yes" will be converted in boolean true,
;;     values "off" and "no" into boolean false
;;   - you can use macros (see below in the section 'macros' to
;;     compose values from other values.
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[database]

;; database.type
;; the database type. currently, only mysql is supported and tested. Since
;; the PDO abstraction layer is used, it will be easy to support other backends.
type = mysql

;; database.host
;; the database host, usually localhost
host = localhost

;; database.port
;; the port on which the database listens for requests, ususally 3306
port = 3306

;; database.username and database.userpassw
;; The name and password of the user which is used to do normal database insertion
;; and update tasks. The user should not be allowed to create, alter or delete tables
username  = test
userpassw = test

;; database.adminname and database.adminpassw
;; credentials for the admin user which is allowed to create and alter tables,
;; indexes and stored procedures. Also must have the "RELOAD" permission.
;; You need this user for initial installation and for update tasks.
;; For security reasons, you should remove this information in production mode.

adminname  = test
adminpassw = test

;; database.admindb
;; The name of the database holding all the tables with global and
;; administrative information.
admindb = qcl_test

;; database.userdb
;; The name of the databases that contains the user data.
;; Can be the same as database.admindb, but if you have access
;; to more than one database, is recommended to keep a separate
;; database for this.
userdb = qcl_test

;; database.tmpdb
;; The name of the database holding all the tables with temporary data.
;; Can be the same as database.admindb, but if you have access
;; to more than one database, is recommended to keep a separate
;; database for this.
tmp_db = qcl_test

;; database.tableprefix
;; A global prefix for all tables that are created, which makes
;; it possible to keep the data of several applications in one
;; database. you can omit this if no prefix is needed.
tableprefix =

;; database.encoding
;; The default encoding scheme of the database. It is recommended
;; to use the default utf8.
encoding  = utf8

[service]

;; service.event_transport
;; Whether the server response should contain messages and events
;; for the qooxdoo application
;; Values are on/off
event_transport = on

;; ================================================================
;; Don't touch anything beyond this point
;; ================================================================

[macros]

;; DSN information. Since the ";" character cannot be used in value
;; definitions, it is replaced by "&" in the the dsn string.
dsn_user = "${database.type}:host=${database.host}&port=${database.port}&dbname=${database.admindb}"
dsn_admin ="${database.type}:host=${database.host}&port=${database.port}&dbname=${database.admindb}"
dsn_tmp = "${database.type}:host=${database.host}&port=${database.port}&dbname=${database.tmp_db}"

;; ================================================================
;; End
;; ================================================================