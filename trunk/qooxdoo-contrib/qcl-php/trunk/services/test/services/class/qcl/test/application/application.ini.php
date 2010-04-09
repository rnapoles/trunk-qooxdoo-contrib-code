;;<?php exit; ?>;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; leave the above line to make sure nobody can view this file ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[service]
event_transport = yes

[database]

;; database.encoding
;; The default encoding scheme of the database
encoding  = utf8

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

;; database.userdb
;; The name of the databases that will have the data of the users
userdb = qcl_test

;; database.admindb
;; The name of the database holding all the tables with global and
;; administrative information. Can be the same as database.userdb,
;; but it is recommended to keep a separate database for this.
admindb = qcl_test

;; database.tableprefix
;; A global prefix for all tables that are created, which makes
;; it possible to keep the data of several applications in one
;; database. you can omit this if no prefix is needed.
tableprefix = qcl_test_

;; =============================================================
;; Don't touch anything beyond this point
;; =============================================================
dsn_admin="${database.type}:host=${database.host}&port=${database.port}&dbname=${database.admindb}"
;;