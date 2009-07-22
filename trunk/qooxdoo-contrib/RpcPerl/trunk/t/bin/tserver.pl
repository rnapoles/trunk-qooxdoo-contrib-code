#!/usr/bin/perl -w

# qooxdoo - the new era of web development
#
# http://qooxdoo.org
#
# Copyright:
#   2006-2007 Nick Glencross
#   2009      Niko Tyni
#
# License:
#   LGPL: http://www.gnu.org/licenses/lgpl.html
#   EPL: http://www.eclipse.org/org/documents/epl-v10.php
#   See the LICENSE file in the project's top-level directory for details.
#
# Authors:
#  * Nick Glencross
#  * Niko Tyni

# This is a modified JSON-RPC server for the test suite.
# It is derived from the original jsonrpc.pl by Nick Glencross.

use strict;

use CGI;
use CGI::Session;

use vars qw($cgi $session);

use Qooxdoo::JSONRPC;

# Instantiating the CGI module which parses the HTTP request

# the test suite in parses the CGI request from a command line parameter

require Getopt::Std;
my %opts;
Getopt::Std::getopts('d', \%opts) or die("usage: $0 [-d] <infile>");
$Qooxdoo::JSONRPC::debug = exists $opts{d};
my $infile = shift;
open(my $in, "<", $infile) or die("open $infile: $!");
$ENV{REQUEST_METHOD}="GET";
$ENV{HTTP_REFERER}="http://localhost/";
$cgi     = new CGI($in);
close $in;
$session = new CGI::Session;
$session->param("referer_domain", "localhost");

Qooxdoo::JSONRPC::handle_request ($cgi, $session);
