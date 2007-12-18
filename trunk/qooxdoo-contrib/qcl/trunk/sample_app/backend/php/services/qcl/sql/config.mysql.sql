CREATE TABLE `config` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `namedId` varchar(50) collate utf8_unicode_ci NOT NULL,
  `type` varchar(20) character set utf8 NOT NULL default '',
  `value` tinytext character set utf8,
  `user` varchar(50) collate utf8_unicode_ci NOT NULL default 'global',
  `permissionRead` varchar(50) character set utf8 default NULL,
  `permissionWrite` varchar(50) character set utf8 default NULL,
  `note` varchar(100) character set utf8 default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci