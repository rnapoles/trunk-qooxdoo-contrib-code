CREATE TABLE `link_user_roles` (
  `userId` int(10) unsigned NOT NULL default '0',
  `roleId` int(10) unsigned NOT NULL default '0',
  PRIMARY KEY  (`userId`,`roleId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci