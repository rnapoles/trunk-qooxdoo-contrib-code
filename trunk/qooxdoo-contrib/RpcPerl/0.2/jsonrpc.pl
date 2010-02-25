#!/usr/bin/perl -w

# qooxdoo - the new era of web development
#
# http://qooxdoo.org
#
# Copyright:
#   2006-2007 Nick Glencross
#
# License:
#   LGPL: http://www.gnu.org/licenses/lgpl.html
#   EPL: http://www.eclipse.org/org/documents/epl-v10.php
#   See the LICENSE file in the project's top-level directory for details.
#
# Authors:
#  * Nick Glencross
#  * Tobi Oetiker

# This is a simple JSON-RPC server.  We receive a service name in
# dot-separated path format and expect to find the class containing the
# service in a module corresponding to the service name

# This harness script should be run using CGI or preferably mod_perl

use strict;
use CGI;
#use CGI::Fast;
use CGI::Session::Driver::file;

# make sure session files do not clash
$CGI::Session::Driver::file::FileName = ($ENV{USER}||'').$0.'%s.session';

# Change this space-separated list of directories to include
# Qooxdoo::JSONRPC.pm and co-located Services
#use lib qw(/PATH_TO_QOOXDOO/backend/perl);

use Qooxdoo::JSONRPC;   

# talk about what we do in the apache error log
#$Qooxdoo::JSONRPC::debug = 0;

# By default methods are located in Qooxdoo/Services
#$Qooxdoo::JSONRPC::service_path = 'Qooxdoo::Services';

# By default methods have to be prefixed by 'method_'
#$Qooxdoo::JSONRPC::method_prefix = 'method_';

# It is recommended that you limit the services exposed by this script
# This example will only expose the Qooxdoo::Services::My::App class
my $exposed = [ 'my.app' ];

# You can customise this harness here to handle cases before treating
# the request as being JSON-RPC

my $cgi = new CGI;
my $session = new CGI::Session;
Qooxdoo::JSONRPC::handle_request ($cgi, $session);

# or preferably
# Qooxdoo::JSONRPC::handle_request ($cgi, $session, $exposed);

# or if you load CGI::Fast you can easily create a fastcgi aware version

#while (my $cgi = new CGI::Fast) {  
#   my $session = new CGI::Session;
#   Qooxdoo::JSONRPC::handle_request ($cgi, $session, $exposed);
#}
