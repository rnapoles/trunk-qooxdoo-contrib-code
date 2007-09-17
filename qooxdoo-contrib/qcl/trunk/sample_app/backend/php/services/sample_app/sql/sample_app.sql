-- phpMyAdmin SQL Dump
-- version 2.8.1
-- http://www.phpmyadmin.net
-- 
-- Host: localhost
-- Erstellungszeit: 17. September 2007 um 22:42
-- Server Version: 5.0.21
-- PHP-Version: 4.4.2-pl1
-- 
-- Datenbank: `sample_app`
-- 

-- --------------------------------------------------------

-- 
-- Tabellenstruktur für Tabelle `config`
-- 

DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `namedId` varchar(50) collate latin1_general_ci NOT NULL,
  `type` varchar(20) character set latin1 NOT NULL default '',
  `value` tinytext collate latin1_general_ci,
  `permissionRead` varchar(50) collate latin1_general_ci default NULL,
  `permissionWrite` varchar(50) collate latin1_general_ci default NULL,
  `userId` int(11) default NULL,
  `note` varchar(100) collate latin1_general_ci default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=32 ;

-- 
-- Daten für Tabelle `config`
-- 

INSERT INTO `config` VALUES (30, 'sample_app.application.name', 'string', 'qooxdoo component library (qcl) sample application', NULL, NULL, NULL, NULL);
INSERT INTO `config` VALUES (31, 'sample_app.application.splashTextHtml', 'string', '<h2>qooxdoo component library sample application</h2>\n<p>(c) 2007 Christian Boulanger. Use admin/admin, manager/manager, or user/user for login ...</p>', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

-- 
-- Tabellenstruktur für Tabelle `link_roles_permissions`
-- 

DROP TABLE IF EXISTS `link_roles_permissions`;
CREATE TABLE `link_roles_permissions` (
  `roleId` int(10) unsigned NOT NULL default '0',
  `permissionId` int(10) unsigned NOT NULL default '0',
  PRIMARY KEY  (`permissionId`,`roleId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- 
-- Daten für Tabelle `link_roles_permissions`
-- 

INSERT INTO `link_roles_permissions` VALUES (4, 1);
INSERT INTO `link_roles_permissions` VALUES (1, 4);
INSERT INTO `link_roles_permissions` VALUES (7, 9);
INSERT INTO `link_roles_permissions` VALUES (4, 12);
INSERT INTO `link_roles_permissions` VALUES (2, 14);
INSERT INTO `link_roles_permissions` VALUES (4, 16);
INSERT INTO `link_roles_permissions` VALUES (2, 17);

-- --------------------------------------------------------

-- 
-- Tabellenstruktur für Tabelle `link_user_roles`
-- 

DROP TABLE IF EXISTS `link_user_roles`;
CREATE TABLE `link_user_roles` (
  `userId` int(10) unsigned NOT NULL default '0',
  `roleId` int(10) unsigned NOT NULL default '0',
  PRIMARY KEY  (`userId`,`roleId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- 
-- Daten für Tabelle `link_user_roles`
-- 

INSERT INTO `link_user_roles` VALUES (1, 4);
INSERT INTO `link_user_roles` VALUES (2, 4);
INSERT INTO `link_user_roles` VALUES (3, 4);
INSERT INTO `link_user_roles` VALUES (5, 1);
INSERT INTO `link_user_roles` VALUES (6, 4);
INSERT INTO `link_user_roles` VALUES (7, 4);
INSERT INTO `link_user_roles` VALUES (9, 4);
INSERT INTO `link_user_roles` VALUES (10, 4);
INSERT INTO `link_user_roles` VALUES (11, 2);
INSERT INTO `link_user_roles` VALUES (11, 4);
INSERT INTO `link_user_roles` VALUES (14, 4);
INSERT INTO `link_user_roles` VALUES (16, 4);
INSERT INTO `link_user_roles` VALUES (17, 4);
INSERT INTO `link_user_roles` VALUES (18, 4);
INSERT INTO `link_user_roles` VALUES (19, 4);
INSERT INTO `link_user_roles` VALUES (21, 4);
INSERT INTO `link_user_roles` VALUES (23, 4);
INSERT INTO `link_user_roles` VALUES (28, 4);
INSERT INTO `link_user_roles` VALUES (30, 4);
INSERT INTO `link_user_roles` VALUES (31, 4);
INSERT INTO `link_user_roles` VALUES (34, 4);
INSERT INTO `link_user_roles` VALUES (35, 4);
INSERT INTO `link_user_roles` VALUES (36, 4);
INSERT INTO `link_user_roles` VALUES (37, 4);
INSERT INTO `link_user_roles` VALUES (38, 4);
INSERT INTO `link_user_roles` VALUES (39, 4);
INSERT INTO `link_user_roles` VALUES (42, 3);
INSERT INTO `link_user_roles` VALUES (43, 4);
INSERT INTO `link_user_roles` VALUES (44, 4);

-- --------------------------------------------------------

-- 
-- Tabellenstruktur für Tabelle `permissions`
-- 

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `namedId` varchar(50) character set utf8 NOT NULL default '',
  `name` varchar(50) character set utf8 NOT NULL default '',
  `note` varchar(255) character set utf8 default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=18 ;

-- 
-- Daten für Tabelle `permissions`
-- 

INSERT INTO `permissions` VALUES (1, 'sample_app.permissions.default.*', 'Default Permission', 'Without this permission, the user cannot operate the GUI at all');
INSERT INTO `permissions` VALUES (4, '*', 'Can do everything', 'Master permission - should only be given to the system administrator');
INSERT INTO `permissions` VALUES (14, 'qcl.auth.permissions.*', 'Manage Authentication', 'User is allowed to add/edit/delete users, roles and permissions');
INSERT INTO `permissions` VALUES (7, 'asdb', '', NULL);
INSERT INTO `permissions` VALUES (17, 'sample_app.permissions.access.manage', 'Can change access to this application', NULL);
INSERT INTO `permissions` VALUES (16, 'sample_app.permissions.preferences.manage', 'Can change the application''s preferences', 'This allows only access, individual preference settings might be protected');

-- --------------------------------------------------------

-- 
-- Tabellenstruktur für Tabelle `roles`
-- 

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `namedId` varchar(50) character set latin1 NOT NULL default '',
  `name` varchar(50) character set latin1 NOT NULL default '',
  `note` varchar(255) character set latin1 default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=10 ;

-- 
-- Daten für Tabelle `roles`
-- 

INSERT INTO `roles` VALUES (1, 'qcl.roles.Administrator', 'Administrator', 'System Administrator, Can do everything. Do not delete this role!');
INSERT INTO `roles` VALUES (2, 'sample_app.roles.Manager', 'Manager', 'Can do management tasks');
INSERT INTO `roles` VALUES (4, 'sample_app.roles.User', 'User', 'Normal User');

-- --------------------------------------------------------

-- 
-- Tabellenstruktur für Tabelle `users`
-- 

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(255) collate latin1_general_ci default NULL,
  `username` varchar(50) collate latin1_general_ci default NULL,
  `password` varchar(50) collate latin1_general_ci default NULL,
  `email` varchar(255) character set latin1 default NULL,
  `note` mediumtext character set latin1,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=45 ;

-- 
-- Daten für Tabelle `users`
-- 

INSERT INTO `users` VALUES (1, 'Sommer, Cherie', 'sommer', '6a8ace7dcf47dae3ec5b04e41deb2460', 'cherie.sommer@bibliograph.org', '');
INSERT INTO `users` VALUES (2, 'Cox, Madyson', 'cox', '6df46fb85c2217ead3f9eca9bfec4c37', 'madyson.cox@bibliograph.org', '');
INSERT INTO `users` VALUES (3, 'Fea, Muriel', 'fea', 'ff9549ef7eb6d3a4b01cdfb5f849cbef', 'muriel.fea@bibliograph.org', '');
INSERT INTO `users` VALUES (5, 'Weingarten, Norton', 'admin', 'admin', 'norton.weingarten@bibliograph.org', '');
INSERT INTO `users` VALUES (6, 'Jones, Raelene', 'jones', 'c2c32d685a8169c8e672416c65bc51bf', 'raelene.jones@bibliograph.org', '');
INSERT INTO `users` VALUES (7, 'Soames, Netta', 'soames', '1e72a29502a1a2bf01926e59bc75248d', 'netta.soames@bibliograph.org', '');
INSERT INTO `users` VALUES (9, 'Howe, Jaime', 'howe', '967fc0ee903cd7fd9388cc6e9c3cc0e0', 'jaime.howe@bibliograph.org', '');
INSERT INTO `users` VALUES (10, 'Tomey, Morton', 'tomey', 'e83fefe6389add51a1520328ad1740aa', 'morton.tomey@bibliograph.org', '');
INSERT INTO `users` VALUES (11, 'Nickolson, Kerri', 'manager', 'manager', 'kerri.nickolson@bibliograph.org', '');
INSERT INTO `users` VALUES (14, 'Mills, Lacy', 'mills', 'ce1eb05bd44c9eab33b92eef261731c7', 'lacy.mills@bibliograph.org', '');
INSERT INTO `users` VALUES (16, 'Millard, Steve', 'millard', '81b8a1b77068d06e1c8190825253066f', 'steve.millard@bibliograph.org', '');
INSERT INTO `users` VALUES (17, 'Dean, Hedley', 'dean', '61b5a63b2efe2d81584b3d52afd4ebec', 'hedley.dean@bibliograph.org', '');
INSERT INTO `users` VALUES (18, 'Parrish, Dayton', 'parrish', '03d9a5d75a2648b612f2c7c40c4dd120', 'dayton.parrish@bibliograph.org', '');
INSERT INTO `users` VALUES (19, 'Reichard, Valentine', 'reichard', 'c00a35ddba52071d452455238b12b616', 'valentine.reichard@bibliograph.org', '');
INSERT INTO `users` VALUES (21, 'Roche, Mitchell', 'roche', '8c676a88df49c6e1127bb3bf7a4eeb5e', 'mitchell.roche@bibliograph.org', '');
INSERT INTO `users` VALUES (23, 'Rumbaugh, Irene', 'rumbaugh', '79ae3e10d1ff66922e58d98656315b9e', 'irene.rumbaugh@bibliograph.org', '');
INSERT INTO `users` VALUES (28, 'Murray, Mayson', 'murray', '81581341cec0f27c1aeb114425ddf085', 'mayson.murray@bibliograph.org', '');
INSERT INTO `users` VALUES (30, 'Branson, Rosemary', 'user', 'user', 'rosemary.branson@bibliograph.org', '');
INSERT INTO `users` VALUES (31, 'Kiefer, Louisa', 'kiefer', '6fdcbf9b3aec9bbc76429c1fae3e465b', 'louisa.kiefer@bibliograph.org', '');
INSERT INTO `users` VALUES (34, 'Moore, Deforest', 'moore', '79f867c59a6bed4234837066b1748b8f', 'deforest.moore@bibliograph.org', '');
INSERT INTO `users` VALUES (35, 'Wentzel, Logan', 'wentzel', '2e1d1e3fe8265865efbc8cbb4baaf4e8', 'logan.wentzel@bibliograph.org', '');
INSERT INTO `users` VALUES (36, 'Moulton, Lourdes', 'moulton', '14c5b43d5ef28ecbd3832782ed57f968', 'lourdes.moulton@bibliograph.org', '');
INSERT INTO `users` VALUES (37, 'Knisely, Maryvonne', 'knisely', '14515a9be3cea7d5ea7f13bace6f9eb3', 'maryvonne.knisely@bibliograph.org', '');
INSERT INTO `users` VALUES (38, 'Seidner, Emmy', 'seidner', 'd9afa6dadeb4a070df48ee86d9b6e19a', 'emmy.seidner@bibliograph.org', '');
INSERT INTO `users` VALUES (39, 'Bunten, Bob', 'bunten', '2fc1c0beb992cd7096975cfebf9d5c3b', 'bob.bunten@bibliograph.org', '');
INSERT INTO `users` VALUES (43, 'Gibson, Maverick', 'gibson', '04282d9922258bf1b152e6f8e1f281e8', 'maverick.gibson@bibliograph.org', '');
INSERT INTO `users` VALUES (44, 'Robinson, Rosanna', 'robinson', 'ae01b486faf025c0500d47d101bcb0ef', 'rosanna.robinson@bibliograph.org', '');
