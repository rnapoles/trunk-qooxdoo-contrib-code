;;<?php exit; ?>;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Leave the above line to make sure nobody can access this file ;;
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
;; and update tasks. The user should not be allowed to create, alter or delete tables.
;; Currently, use the same user for both access types.
username  = test
userpassw = test
adminname  = test
adminpassw = test

;; database.userdb
;; The name of the databases that contains the user data
userdb = test

;; database.admindb
;; The name of the database holding all the tables with global and
;; administrative information. Can be the same as database.userdb,
;; but if you can access or create more than one database,
;; is recommended to keep a separate database for this.
admindb = test

;; database.tableprefix
;; A global prefix for all tables that are created, which makes
;; it possible to keep the data of several applications in one
;; database. you can omit this if no prefix is needed.
tableprefix = access_

;; database.encoding
;; The default encoding scheme of the database. It is recommended
;; to use the default utf8.
encoding  = utf8

[service]

;; service.event_transport
;; Whether the server response should contain messages and events
;; for the qooxdoo application
event_transport = yes

[macros]

;; DSN information. Since the ";" character cannot be used in value
;; definitions, it is replaced by "&" in the the dsn string.
dsn_user = "${database.type}:host=${database.host}&port=${database.port}&dbname=${database.admindb}"
dsn_admin ="${database.type}:host=${database.host}&port=${database.port}&dbname=${database.admindb}"
