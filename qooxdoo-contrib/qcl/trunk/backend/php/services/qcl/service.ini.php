;;<?php exit; ?>;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; leave the above line to make sure nobody can view this file ;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[service]
name = "Bibliograph"
path = "bibliograph"
plugin_path = "bibliograph/plugins"
control_access = yes
allow_guest_access = yes

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

;; database.username and database.userpassw
;; The name and password of the user which is used to do normal database insertion
;; and update tasks.

username  = bibliograph
userpassw = bibliograph 

;; database.adminname and database.adminpassw
;; the admin user which is allowed to create and alter tables,
;; indexes and functions. Format is name:password

adminname  = bibliograph
adminpassw = bibliograph

;; database.userdb
;; The name of the databases that will have the data of the users

userdb = bibliograph_users

;; database.admindb
;; The name of the database holding all the tables with global and
;; administrative information. Can be the same as database.userdb,
;; but it is recommended to keep a separate database for this.

admindb = bibliograph

;; Expanded variables
;; dont't touch this
user_userdb   = ${database.type}://${database.username}:${database.userpassw}@${database.host}/${database.userdb}
admin_userdb  = ${database.type}://${database.adminname}:${database.adminpassw}@${database.host}/${database.userdb}
user_admindb  = ${database.type}://${database.username}:${database.userpassw}@${database.host}/${database.admindb}
admin_admindb = ${database.type}://${database.adminname}:${database.adminpassw}@${database.host}/${database.admindb}
