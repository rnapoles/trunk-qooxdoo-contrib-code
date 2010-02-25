<?php
/*
 * qcl - the qooxdoo component library
 *
 * http://qooxdoo.org/contrib/project/qcl/
 *
 * Copyright:
 *   2007-2009 Christian Boulanger
 *
 * License:
 *   LGPL: http://www.gnu.org/licenses/lgpl.html
 *   EPL: http://www.eclipse.org/org/documents/epl-v10.php
 *   See the LICENSE file in the project's top-level directory for details.
 *
 * Authors:
 *  * Christian Boulanger (cboulanger)
 */

/**
 * Interface for classes that implement configuration management
 *
 * the idea of the class is the following:
 * - configuration entries (properties) have a name(key), a type, and a value
 * - types accepted currently are string, number and boolean (others might follow
 *   if there is a need)
 * - for each configuration entry, you can also set a read and a write permission.
 *   if set, the active user requesting an action must have the corresponding
 *   permission.
 * - each configuration entry can also have a user variant, i.e. users can,
 *   if allowed, create their own versions of the entry. When they edit
 *   this entry, they will all other variants will be left untouched including
 *   the default value, to which the user variant can be reset.
 * - on the client, a qcl.config.Manager singleton object takes care of retrieval
 *   and update of the config entries. on login, all or a subset of the configuration
 *   entries that an individual user has access to will be sent to the client and
 *   cached there.
 *
 *   @todo
 */

interface qcl_config_Iconfig
{

}
?>