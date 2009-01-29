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

;deprecated ini values
dsn = mysql://bibliograph:bibliograph@localhost/bibliograph
userdsn = mysql://bibliograph:bibliograph@localhost/bibliograph_users
encoding = utf8

;admin-level access to userdata
database.dsn.userdata.admin = mysql://bibliograph:bibliograph@localhost/bibliograph_users

;user-level access to userdata
database.dsn.userdata.user = mysql://bibliograph:bibliograph@localhost/bibliograph_users

;admin-level access to application data
database.dsn.appdata.admin = mysql://bibliograph:bibliograph@localhost/bibliograph

;user-level access to application data
database.dsn.appdata.user = mysql://bibliograph:bibliograph@localhost/bibliograph