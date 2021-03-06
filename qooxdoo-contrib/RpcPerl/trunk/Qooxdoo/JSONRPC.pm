package Qooxdoo::JSONRPC;

# qooxdoo - the new era of web development
#
# http://qooxdoo.org
#
# Copyright:
#   2006-2007 Nick Glencross
#   2008-2009 Tobi Oetiker
#
# License:
#   LGPL: http://www.gnu.org/licenses/lgpl.html
#   EPL: http://www.eclipse.org/org/documents/epl-v10.php
#  This software, the Qooxdoo RPC Perl backend, is licensed under the same
#  terms as Qooxdoo itself, as included in `LICENSE.Qooxdoo'
#
# Authors:
#  * Nick Glencross
#  * Tobi Oetiker
#
# The JSON-RPC implementation.
# Use perldoc on this file to view documentation

use strict;

use JSON;


# map NULL to undef
$JSON::UnMapping=1;

my $json1 = $JSON::VERSION < 2;



#use CGI;
#use CGI::Session;

# Enabling debugging will log information in the apache logs, and in
# some cases provide more information in error responses
$Qooxdoo::JSONRPC::debug = 0;
# By default methods are located in the Qooxdoo/Services directory
$Qooxdoo::JSONRPC::service_path = 'Qooxdoo::Services';
# By default methods have to be prefixed by 'method_'
$Qooxdoo::JSONRPC::method_prefix = 'method_';

# we expose all services (Qooxdoo::Service::* modules) by default
# for backward compatibility
my $DEFAULT_EXPOSED_SERVICES = [ qr/.*/ ];

##############################################################################

# JSON-RPC error origins

use constant JsonRpcError_Origin_Server      => 1;
use constant JsonRpcError_Origin_Application => 2;
use constant JsonRpcError_Origin_Transport   => 3;
use constant JsonRpcError_Origin_Client      => 4;


# JSON-RPC server-generated error codes

use constant JsonRpcError_Unknown            =>  0;
use constant JsonRpcError_IllegalService     =>  1;
use constant JsonRpcError_ServiceNotFound    =>  2;
use constant JsonRpcError_ClassNotFound      =>  3;
use constant JsonRpcError_MethodNotFound     =>  4;
use constant JsonRpcError_ParameterMismatch  =>  5;
use constant JsonRpcError_PermissionDenied   =>  6;

# Method Accessibility values

use constant Accessibility_Public            => "public";
use constant Accessibility_Domain            => "domain";
use constant Accessibility_Session           => "session";
use constant Accessibility_Fail              => "fail";

use constant defaultAccessibility            => Accessibility_Domain;

# Script transport not-in-use setting

use constant ScriptTransport_NotInUse        => -1;

##############################################################################

# This is the main entry point for handling requests

sub handle_request
{
    my ($cgi, $session, $exposed) = @_;

    if ($exposed && (ref $exposed ne 'ARRAY')) {
	    print STDERR "invalid exposed services list passed to handle_request() (not an ARRAY ref), ignoring\n"
            if $Qooxdoo::JSONRPC::debug;
        $exposed = undef;
    }
    $exposed ||= $DEFAULT_EXPOSED_SERVICES;
	print STDERR "exposed services set to " . join(" ", @$exposed) . "\n"
            if $Qooxdoo::JSONRPC::debug;

    my $session_id = $session->id ();

    print STDERR "Session id: $session_id\n"
	if $Qooxdoo::JSONRPC::debug;

    print $session->header(-charset=>'utf-8',
                           -content_type => 'text/javascript');

    # 'selfconvert' is enabled for date conversion. Ideally we also want
    # 'convblessed', but this then disabled 'selfconvert'.
    my $json;
    if ($json1) {
        $json = new JSON (selfconvert => 1);
    } else {
        $json = new JSON;
        $json->convert_blessed;
	$json->utf8;
    }

    # Create the RPC error state

    my $error = new Qooxdoo::JSONRPC::error ($json);

    $error->set_session($session);

    my $script_transport_id = ScriptTransport_NotInUse;

    #----------------------------------------------------------------------

    # Deal with various types of HTTP request and extract the JSON
    # body

    my $input;

    my $request_method = $cgi->request_method || '';

    if ($request_method eq 'POST')
    {
        my $content_type = $cgi->content_type;

        print STDERR "POST Content type is '$content_type'\n"
            if $Qooxdoo::JSONRPC::debug;

        if ($content_type =~ m{application/json})
        {	    
            $input = $cgi->param('POSTDATA');
        }
        else
        {
            print "JSON-RPC request expected -- unexpected data received\n";
            print STDERR "JSON-RPC request expected -- unexpected data received\n"
                if $Qooxdoo::JSONRPC::debug;
            exit;
        }
    }
    elsif ($request_method eq 'GET' &&
           defined $cgi->param ('_ScriptTransport_id') &&
           $cgi->param ('_ScriptTransport_id') != ScriptTransport_NotInUse &&
           defined $cgi->param ('_ScriptTransport_data'))
    {
        print STDERR "GET request\n" if $Qooxdoo::JSONRPC::debug;

        # We have what looks like a valid ScriptTransport request
        $script_transport_id = $cgi->param ('_ScriptTransport_id');
        $error->set_script_transport_id ($script_transport_id);
        $input = $cgi->param ('_ScriptTransport_data');
        # sometimes the request contains escaped characters
        # this may happen due redirection
        $input =~ s/%([0-9a-z]{2})/chr(hex($1))/ieg;
    }
    else
    {
        print "Your HTTP Client is not using the JSON-RPC protocol\n";
        exit;
    }

    #----------------------------------------------------------------------

    # Transform dates into JSON which the parser can handle
    Qooxdoo::JSONRPC::Date::transform_date (\$input);
    my $sanitized = $input;
    # try to NOT to print passwords
    $sanitized =~ s/(pass[a-z]+":").+?("[,}])/${1}*******${2}/g;
    print STDERR "JSON received: $sanitized\n" if $Qooxdoo::JSONRPC::debug;

    #----------------------------------------------------------------------

    # Convert the JSON string to a Perl datastructure

    $@ = '';
    my $json_input;
    eval
    {
        $json_input = $json1 ? $json->jsonToObj ($input)
                             : JSON::from_json ($input,{utf8 => 1});
    };

    if ($@)
    {
        print STDERR "JSON Parser sais: $@\n"
            if $Qooxdoo::JSONRPC::debug;
        $error->set_error (JsonRpcError_Unknown,
                           "A bad JSON-RPC request was received which could not be parsed");
        $error->send;
        return;
    }

    unless ($json_input && 
            exists $json_input->{service} &&
            exists $json_input->{method} &&
            exists $json_input->{params})
    {
        print STDERR "A bad JSON-RPC request was received\n"
            if $Qooxdoo::JSONRPC::debug;
        $error->set_error (JsonRpcError_Unknown,
                           "A bad JSON-RPC request was received");
        $error->send;
        return;
    }

    $error->set_id ($json_input->{id});

    #----------------------------------------------------------------------

    # Perform various sanity checks on the received request

    unless ($json_input->{service} =~ /^[_.a-zA-Z0-9]+$/)
    {
        $error->set_error (JsonRpcError_IllegalService,
                           "Illegal character found in service name");
        $error->send;
        return;
    }

    if ($json_input->{service} =~ /\.\./)
    {
        $error->set_error (JsonRpcError_IllegalService,
                           "Illegal use of two consecutive dots " .
                           "in service name");
        $error->send;
        return;
    }
    if (!_is_service_allowed($json_input->{service}, $exposed)) {
        $error->set_error (JsonRpcError_IllegalService,
                           "Requested service is not available");
        $error->send;
        return;
    }

    my @service_components = split (/\./, $json_input->{service});

    # Surely this can't actually happen after earlier checks?
    foreach (@service_components)
    {
        unless (/^[_.a-zA-Z0-9]+$/)
        {
            $error->set_error (JsonRpcError_IllegalService,
                               "A service name component does not begin " .
                               "with a letter");
            $error->send;
            return;
        }
    }

    #----------------------------------------------------------------------

    # Generate the name of the module corresponding to the Service

    my $module = join ('::', ($Qooxdoo::JSONRPC::service_path, @service_components));

    # Attempt to load the module

    $@ = '';
    eval "require $module";

    if ($@)
    {
        print STDERR "$@\n" if $Qooxdoo::JSONRPC::debug;

        # The error description used here provides more information when
        # debugging, but probably reveals too much on a live stable
        # server

        if ($Qooxdoo::JSONRPC::debug)
        {
            $error->set_error (JsonRpcError_ServiceNotFound,
                               "Service '$module' could not be loaded ($@)");
        }
        else
        {
            $error->set_error (JsonRpcError_ServiceNotFound,
                               "Service '$module' not found");
        }
        $error->send;
        return;
    }

    #----------------------------------------------------------------------

    # Determine the accessibility of the requested method

    my $method = $json_input->{method};

    my $accessibility = defaultAccessibility;

    my $accessibility_method = "${module}::GetAccessibility";

    if (defined $accessibility_method)
    {
        print STDERR "Module $module has GetAccessibility\n"
            if $Qooxdoo::JSONRPC::debug;

        $@ = '';
        $accessibility = eval $accessibility_method . 
            '($method,$accessibility,$session)';

        if ($@)
        {
            print STDERR "$@\n" if $Qooxdoo::JSONRPC::debug;

            $error->set_error (JsonRpcError_Unknown,
                               "$@"); # force stringification for error objects
            $error->send;
            return;
        }

        print STDERR "GetAccessibility for $method returns $accessibility\n"
            if $Qooxdoo::JSONRPC::debug;

    }

    #----------------------------------------------------------------------

    # Do referer checking based on accessibility


    if ($accessibility eq Accessibility_Public)
    {
        # Nothing to do as the method is always accessible
    }
    elsif ($accessibility eq Accessibility_Domain)
    {
        my $requestUriDomain;

        my $server_protocol = $cgi->server_protocol;

        my $is_https = $cgi->https ? 1 : 0;

        $requestUriDomain = $is_https ? 'https://' : 'http://';

        $requestUriDomain .= $cgi->server_name;

        $requestUriDomain .= ":" . $cgi->server_port 
            if $cgi->server_port != ($is_https ? 443 : 80);

        if ($cgi->referer and $cgi->referer !~ m|^(https?://[^/]*)|)
        {
            $error->set_error (JsonRpcError_PermissionDenied,
                               "Permission denied");
            $error->send;
            return;
        }

        my $refererDomain = $1;

        if ($refererDomain ne $requestUriDomain)
        {
            $error->set_error (JsonRpcError_PermissionDenied,
                               "Permission denied");
            $error->send;
            return;
        }

        if (!defined $session->param ('session_referer_domain'))
        {
            $session->param ('session_referer_domain', $refererDomain);
        }

    }
    elsif ($accessibility eq Accessibility_Session)
    {
        if ($cgi->referer !~ m|^(https?://[^/]*)|)
        {
            $error->set_error (JsonRpcError_PermissionDenied,
                               "Permission denied");
            $error->send;
            return;
        }

        my $refererDomain = $1; 

        if (defined $session->param ('session_referer_domain') &&
            $session->param ('session_referer_domain') ne $refererDomain)
        {
            $error->set_error (JsonRpcError_PermissionDenied,
                               "Permission denied");
            $error->send;
            return;
        }
        else
        {
            $session->param ('session_referer_domain', $refererDomain);
        }
    }
    elsif ($accessibility eq Accessibility_Fail)
    {
        $error->set_error (JsonRpcError_PermissionDenied,
                           "Permission denied");
        $error->send;
        return;

    }
    else
    {
        $error->set_error (JsonRpcError_PermissionDenied,
                           "Service error: unknown accessibility");
        $error->send;
        return;
    }

    #----------------------------------------------------------------------

    # Generate the name of the function to call and check it exists

    my $package_method = ${module}.'::'.$Qooxdoo::JSONRPC::method_prefix.$method;

    unless (defined &$package_method)
    {
        $error->set_error (JsonRpcError_MethodNotFound,
                           "Method '$method' not found " .
                           "in service class '$module'");
        $error->send;
        return;
    }

    #----------------------------------------------------------------------

    # Errors from here come from the Application

    $error->set_origin (JsonRpcError_Origin_Application);

    # Retrieve the arguments

    my $params = $json_input->{params};

    unless (ref $params eq 'ARRAY')
    {
        $error->set_error (JsonRpcError_ParameterMismatch,
                           "Arguments were not received in an array");
        $error->send;
        return;
    }

    my @params = @{$params};

    # Do a shallow scan of parameters, and promote hashes which are
    # dates
    foreach (@params)
    {
        if (ref eq 'HASH' &&
            exists $_->{Qooxdoo_date})
        {
            bless $_, 'Qooxdoo::JSONRPC::Date';
        }
    }

    # Invoke the method dynamically using eval

    $@ = '';
    my @result = eval $package_method .  '($error, @params)';

    if ($@)
    {
        print STDERR "$@\n" if $Qooxdoo::JSONRPC::debug;

        $error->set_error (JsonRpcError_Unknown,
                           $@);
        $error->send;
        return;
    }

    # (I've had to assume this behaviour based on the test results)

    my $result;

    if ($#result == 0)
    {
        $result = shift @result;
    }
    else
    {
        $result = \@result;
    }

    # Either send an error, or the application response

    if (ref $result eq 'Qooxdoo::JSONRPC::error')
    {
        $error->send();
	return;
    }

    $result = {id     => $json_input->{id},
               result => $result};

    my $reply = $json1 ? $json->objToJson ($result)
                       : $json->encode ($result);

    # warning: a really ugly hack ahead
    #
    # Qooxdoo JSON-RPC is an extension to JSON with a new syntax
    # for encoding date objects
    # 
    # unfortunately JSON.pm >= 2 can't be made to output the literal
    #  new Date(Date.UTC(...))
    # but insists on quoting it:
    #  "new Date(Date.UTC(...))"
    # so we lose.
    #
    # The workaround is to put signpost zero bytes (\0) around
    # the date object notation in Qooxdoo::JSONRPC::Date::TO_JSON
    # and strip them here along with the quotation marks
    #
    # see http://qooxdoo.org/documentation/0.8/rpc_server_writer_guide
    $reply =~ s,"\\u0000(new Date\(.*?\))\\u0000",$1, if !$json1;

    send_reply ($reply, $script_transport_id);
}


##############################################################################

# only for internal use
sub _is_service_allowed
{
    my ($service, $allowed_services) = @_;
    for my $allowed (@$allowed_services) {
        print STDERR "_is_service_allowed: testing $service against $allowed\n"
	        if $Qooxdoo::JSONRPC::debug;
        if (ref $allowed eq 'Regexp') {
            return 1 if $service =~ /$allowed/;
        } else {
            return 1 if $service eq $allowed;
        }
    }
    return 0;
}

##############################################################################

# Send the application response

sub send_reply
{
    my ($reply, $script_transport_id) = @_;

    if ($script_transport_id == ScriptTransport_NotInUse)
    {
        print STDERR "Send $reply\n" if $Qooxdoo::JSONRPC::debug;
        print $reply;
    }
    else  
    {
        $reply = "qx.io.remote.transport.Script._requestFinished" .
            "($script_transport_id, $reply);";

        print STDERR "Send $reply\n" if $Qooxdoo::JSONRPC::debug;
        print $reply;
    }
}


##############################################################################

# These two routines are useful to the Services themselves

sub json_bool
{
    my $value = shift;

    return $json1 ? ($value ? &JSON::True : &JSON::False)
                  : ($value ? &JSON::true : &JSON::false);
}


sub json_istrue
{
    my $value = shift;

    my $is_true = $json1 ? (ref $value eq 'JSON::NotString'
        && defined $value->{value} && $value->{value} eq 'true'
    ) : ( JSON::is_bool($value) && defined $value && $value eq 'true' );

    return $is_true;
}

##############################################################################

package Qooxdoo::JSONRPC::error;

use strict;

# The error object enumerates various types of error

sub new
{
    my $self          = shift ;
    my $class         = ref ($self) || $self ;

    my $json          = shift ;
    my $origin        = shift || Qooxdoo::JSONRPC::JsonRpcError_Origin_Server;
    my $code          = shift || Qooxdoo::JSONRPC::JsonRpcError_Unknown;
    my $message       = shift || "Unknown error";

    $self = bless
    {
        json                => $json,
        origin              => $origin,
        code                => $code,
        message             => $message,
        script_transport_id => Qooxdoo::JSONRPC::ScriptTransport_NotInUse

    }, $class ;

    return $self ;
}

sub set_origin
{
    my $self   = shift;
    my $origin = shift;

    $self->{origin} = $origin;
}

sub set_error
{
    my $self    = shift;
    my $code    = shift;
    my $message = shift;

    $self->{code}    = $code;
    $self->{message} = $message;
}

sub set_id
{
    my $self   = shift;
    my $id     = shift;

    $self->{id} = $id;
}

sub set_session
{
    my $self    = shift;
    my $session = shift;

    $self->{session} = $session;
}

sub set_script_transport_id
{
    my $self                = shift;
    my $script_transport_id = shift;

    $self->{script_transport_id} = $script_transport_id;
}


sub send
{
    my $self                = shift;

    my $result = {'id'    => $self->{id},
                  'error' => {origin  => $self->{origin},
                              code    => $self->{code},
                              message => $self->{message}}};

    my $script_transport_id =  $self->{script_transport_id};

    my $reply = $json1 ? $self->{json}->objToJson ($result)
                       : $self->{json}->encode ($result);
    Qooxdoo::JSONRPC::send_reply ($reply,
                                  $script_transport_id);
}

sub send_and_exit
{
    my $self = shift;
    $self->send();
    exit;
}

##############################################################################

# Implementation of a Date class with set/get methods

package Qooxdoo::JSONRPC::Date;

use strict;

sub new
{
    my $self   = shift ;
    my $class  = ref ($self) || $self ;

    my $time   = shift;
    $self = bless {}, $class ;

    $self->set_epoch_time ($time);

    return $self ;
}


sub set_epoch_time
{
    my $self = shift;
    my $time = shift;

    $time = time () unless defined $time;

    my ($sec, $min, $hour, $mday, $mon, $year, $wday, $yday, $isdst) =
        gmtime ($time);

    $self->{year}        = 1900+$year;
    $self->{month}       = $mon; # Starts from 0
    $self->{day}         = $mday;
    $self->{hour}        = $hour;
    $self->{minute}      = $min;
    $self->{second}      = $sec;
    $self->{millisecond} = 0;

    return $self;
}


# Month is passed in 1..12, but stored 0..11

sub set
{
    my $self = shift;
    my ($year, $month, $day, $hour, $minute, $second, $millisecond) = @_;

    $hour        ||= 0;
    $minute      ||= 0;
    $second      ||= 0;
    $millisecond ||= 0;

    $self->{year}        = $year;
    $self->{month}       = $month-1;
    $self->{day}         = $day;
    $self->{hour}        = $hour;
    $self->{minute}      = $minute;
    $self->{second}      = $second;
    $self->{millisecond} = $millisecond;
}

sub set_year
{
    my $self = shift;
    my $year = shift;

    $self->{year} = $year;
}

sub set_month
{
    my $self  = shift;
    my $month = shift;

    $self->{month} = $month-1;
}


sub set_day
{
    my $self = shift;
    my $day = shift;

    $self->{day} = $day;
}


sub set_hour
{
    my $self = shift;
    my $hour = shift;

    $self->{hour} = $hour;
}


sub set_minute
{
    my $self   = shift;
    my $minute = shift;

    $self->{minute} = $minute;
}

sub set_second
{
    my $self   = shift;
    my $second = shift;

    $self->{second} = $second;
}

sub set_millisecond
{
    my $self        = shift;
    my $millisecond = shift;

    $self->{millisecond} = $millisecond;
}




sub get_year
{
    my $self = shift;

    return $self->{year};
}

sub get_month
{
    my $self  = shift;

    return $self->{month}+1;
}


sub get_day
{
    my $self = shift;

    return $self->{day};
}


sub get_hour
{
    my $self = shift;

    return $self->{hour};
}


sub get_minute
{
    my $self   = shift;

    return $self->{minute};
}

sub get_second
{
    my $self   = shift;

    return $self->{second};
}

sub get_millisecond
{
    my $self        = shift;

    return $self->{millisecond};
}


# This is the special method used by the JSON module to serialise a class.
# The feature is enabled with the 'selfconvert' parameter

my $sub_toJson = sub
{
    my $self = shift;

    my $time = $self->{time};

    my $year        = $self->{year};
    my $month       = $self->{month};
    my $day         = $self->{day};
    my $hour        = $self->{hour};
    my $minute      = $self->{minute};
    my $second      = $self->{second};
    my $millisecond = $self->{millisecond};

    my $ret = sprintf 'new Date(Date.UTC(%d,%d,%d,%d,%d,%d,%d))',
    $year,
    $month,
    $day,
    $hour,
    $minute,
    $second,
    $millisecond;

    # see the elaborate comment in Qooxdoo::JSONRPC::handle_request() above
    $ret = "\0$ret\0" if !$json1;

    return $ret;
};

if ($json1) {
    *toJson = $sub_toJson;
} else {
    *TO_JSON = $sub_toJson;
}

# Routine to convert the date embedded in the JSON string to something
# that can be parsed

sub transform_date
{
    my $input_ref = shift;

    ${$input_ref} =~ 
        s/new\s+Date\s*\(Date.UTC\(
           (\d+),(\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)\)/
        blessed_date($1,$2,$3,$4,$5,$6,$7)/gxe;
}

# This function is called by the regexp in transform_date

sub blessed_date
{
    my ($year, $month, $day, $hour, $minute, $second, $millisecond) = @_;

    return sprintf('{"Qooxdoo_date":1,"year":%d,"month":%d,"day":%d,"hour":%d,"minute":%d,"second":%d,"millisecond":%d}',
                   $year,
                   $month,
                   $day,
                   $hour,
                   $minute,
                   $second,
                   $millisecond);
}

1;

__END__

##############################################################################

=head1 NAME

Qooxdoo::JSONRPC.pm - A Perl implementation of JSON-RPC for Qooxdoo

=head1 SYNOPSIS

The cgi/fcgi script

 #!/usr/bin/perl -w
 use strict;
 use CGI;
 use CGI::Session::Driver::file;
 # make sure session files do not clash
 $CGI::Session::Driver::file::FileName =
    ($ENV{USER}||'').$0.'%s.session';

 use Qooxdoo::JSONRPC;

 # talk about what we do in the apache error log
 #$Qooxdoo::JSONRPC::debug = 0;

 # By default methods are located in Qooxdoo/Services
 #$Qooxdoo::JSONRPC::service_path = 'Qooxdoo::Services';

 # By default methods have to be prefixed by 'method_'
 #$Qooxdoo::JSONRPC::method_prefix = 'method_';

 my $cgi = new CGI;
 my $session = new CGI::Session(undef,$cgi);
 Qooxdoo::JSONRPC::handle_request ($cgi, $session);
 # or preferably
 # Qooxdoo::JSONRPC::handle_request ($cgi, $session, [ "my.app" ]);

 # or if you load CGI::Fast you can easily create a
 # fastcgi aware version
 #while (my $cgi = new CGI::Fast) {
 #   my $session = new CGI::Session(undef,$cgi);
 #   Qooxdoo::JSONRPC::handle_request ($cgi, $session, [ "my.app" ]);
 #}

Along with the cgi wrapper setup a service module the example
below shows how to handle logins on the server side.

 package Qooxdoo::Services::Demo;
 use strict;

 sub GetAccessibility {
     # name of method about to be called
     my $method = shift;
     # access level based on connection
     my $access = shift;
     # session handle
     my $session = shift;
     if ($method eq 'login'
        or $method eq 'logoff'
        or $session->param('authenticated')||'' eq 'yes'){
       return 'public'; # grant everyone access
     }
     else {
        return 'fail'; #deny access
     }
 }

 sub method_login {
     my $error = shift;
     my $session = $error->{session};
     my @args = @_;
     # if login ok
     $session->param('authenticated','yes');
     $session->flush();
     return 1;
     # if login is not ok
     $error->set_error(101,'Login faild');
     return $error;
 }

 sub method_logout {
    my $error = shift;
    my $session = $error->{session};
    $session->delete();
    $session->flush();
    return 1;
 }

 sub method_fun {
    my $error = shift;
    my $session = $error->{session};
    my $arg_a = shift;
    my $arg_b = shift;
    # do something
    return $pointer_to_data;
 }

 1;

=head1 DESCRIPTION

RPC-JSON is a straightforward Remote Procedure Call mechanism, primarily
targeted at Javascript clients, and hence ideal for Qooxdoo. This module
implements the server side handling of RPC request in perl.

=head2 JSON RPC Basics

JSON-RPC Services may be implemented in any language provided they provide a
conformant implementation. This module uses the CGI module to parse
HTTP headers, and the JSON module to manipulate the JSON body.

A simple, but typical exchange might be:

 client->server:

   {"service":"qooxdoo.test","method":"echo","id":1,"params":["Hello"],"server_data":null}

 server->client:

   {"id":1,"result":"Client said: [Hello]"}

Here the service 'qooxdoo.test' is requested to run a method called
'echo' with an argument 'Hello'. 

This Perl implementation will locate
a module called Qooxdoo::Services::qooxdoo::test (corresponding to
Qooxoo/Services/qooxdoo/test.pm in Perl's library path, but see
L</"Exposed services"> below). It will
then execute the function Qooxdoo::Services::qooxdoo::test::echo
with the supplied arguments.

The function will receive the error object as the first argument, and
subsequent arguments as supplied by the remote call. Your method call
would therefore start with something equivalent to:

    my $error  = shift;
    my @params = @_;

See test.pm for how to deal with errors and return responses.

The response is sent back with the corresponding id (essential for
asynchronous calls).

The protocol also provides an exception handling mechanism, where a
response is formatted something like:

    {"error":{"origin":2,"code":23,"message":"This is an application-provided error"},"id":21}

There are 4 error origins:

=over

=item JsonRpcError_Origin_Server 1

The error occurred within the server.

=item JsonRpcError_Origin_Application 2

The error occurred within the application.

=item JsonRpcError_Origin_Transport 3

The error occurred somewhere in the communication (not raised in this module).

=item JsonRpcError_Origin_Client 4

The error occurred in the client (not raised in this module).

=back

For Server errors, there are also some predefined error codes.

=over

=item JsonRpcError_Unknown 0

The cause of the error was not known.

=item JsonRpcError_IllegalService 1

The Service name was not valid, typically due to a bad character in
the name or due to not being on the list of allowed services (see
L</"Exposed services"> below.)

=item JsonRpcError_ServiceNotFound 2

The Service was not found. In this implementation this means that the
module containing the Service could not be found in the library path.

=item JsonRpcError_ClassNotFound 3

This means the class could not be found with, is not actually raised
by this implementation.

=item JsonRpcError_MethodNotFound 4

The method could not be found. This is raised if a function cannot be
found with the method name in the requested package namespace.

Note: In Perl, modules (files containing functionality) and packages
(namespaces) are closely knitted together, but there need not be a
one-to-one correspondence -- packages can be shared across multiple
modules, or a module can use multiple packages. This module assumes a
one-to-one correspondence by looking for the method in the same
namespace as the module name.

=item JsonRpcError_ParameterMismatch 5

This is typically raised by individual methods when they do not
receive the parameters they are expecting.

=item JsonRpcError_PermissionDenied 6

Again, this error is raised by individual methods. Remember that RPC
calls need to be as secure as the rest of your application!

=back

=head2 Access Control

There is also some infrastructure to implement access control. Before
each method call, the C<GetAccessibility> method of the service is
called. Depending on the response from C<GetAccessibility> the actual
method will be called, or an error is returned to the remote caller.
The example in the synopsis shows how to use that for implementing an
authentication process.

C<GetAccessibility> must return one of the following access levels

=over

=item Accessibility_Public ("public")

The method may be called from any session, and without any checking of
who the Referer is.

=item Accessibility_Domain ("domain")

The method may only be called by a script obtained via a web page
loaded from this server.  The Referer must match the request URI,
through the domain part.

=item Accessibility_Session ("session")

The Referer must match the Referer of the very first RPC request
issued during the session.

=item Accessibility_Fail ("fail")

Access is denied

=back

=head2 Persistant Data in the Session module

Methods get access to the session handle as a parameter of the error object.
Session allows to easy storage of persistant data. Since the session module
writes all parameters in one go, this can result in a race condition when
two instances store data.

=head2 Exposed services

For backward compatibility reasons the module will by default expose
all Qooxdoo::Services::* modules on the Perl's search path. This is a
bit liberal, and most applications should probably only make a known
limited subset of services available.  This can be accomplished by
passing a reference to a list of allowed service names or regular
expressions as the third parameter of the C<handle_request> function.

The service names are checked against the JSON service name: if you
want to enable only the C<Qooxdoo::Services::My::App> module, use
C<handle_request($cgi, $session, [ "my.app" ])>

The handle_request() function will return the C<JsonRpcError_IllegalService>
error code if the requested service is not on the list.

=head1 AUTHOR

Nick Glencross E<lt>nick.glencross@gmail.comE<gt>,
Tobi Oetiker E<lt>tobi@oetiker.chE<gt>

=cut
