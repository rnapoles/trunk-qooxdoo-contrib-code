CREATE TABLE `users` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(255) character set utf8 default NULL,
  `username` varchar(50) character set utf8 default NULL,
  `password` varchar(50) character set utf8 default NULL,
  `email` varchar(255) character set utf8 default NULL,
  `note` mediumtext character set utf8,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci