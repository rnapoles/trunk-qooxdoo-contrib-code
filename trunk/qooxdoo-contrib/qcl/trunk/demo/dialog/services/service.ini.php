;;<?php exit; ?>;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; leave the above line to make sure nobody can view this file ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[service]
control_access = no
event_transport = off

[database]

;; database.encoding
;; The default encoding scheme of the database
encoding  = utf8

;; database.dsnschema
;; The dsn schema type. Currently, only the PEAR schema type is supported
dsnschema = pear

;; database.type
:: the database type. currently, only mysql is supported
type = mysql

;; database.host
;; the database host, usually localhost
host = localhost

;; database.port
;; the port on which the database listens for requests, ususally 3306
port = 8889

;; database.username and database.userpassw
;; The name and password of the user which is used to do normal database insertion
;; and update tasks.
username  = test
userpassw = test

;; database.adminname and database.adminpassw
;; the admin user which is allowed to create and alter tables,
;; indexes and functions.

adminname  = test
adminpassw = test

;; database.userdb
;; The name of the databases that will have the data of the users
userdb = test

;; database.admindb
;; The name of the database holding all the tables with global and
;; administrative information. Can be the same as database.userdb,
;; but it is recommended to keep a separate database for this.
admindb = test

;; database.tableprefix
;; A global prefix for all tables that are created, which makes
;; it possible to keep the data of several applications in one
;; database
tableprefix = test_

;; Expanded variables
;; don't touch this
user_userdb   = "${database.type}://${database.username}:${database.userpassw}@${database.host}:${database.port}/${database.userdb}"
admin_userdb  = "${database.type}://${database.adminname}:${database.adminpassw}@${database.host}:${database.port}/${database.userdb}"
user_admindb  = "${database.type}://${database.username}:${database.userpassw}@${database.host}:${database.port}/${database.admindb}"
admin_admindb = "${database.type}://${database.adminname}:${database.adminpassw}@${database.host}:${database.port}/${database.admindb}"
