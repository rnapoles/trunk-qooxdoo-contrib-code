package Qooxdoo::SessionLite;
use strict;
use warnings;

use Digest::MD5;
use Storable qw(fd_retrieve lock_retrieve store_fd);
use Carp;
use Fcntl qw(:flock);
use Time::HiRes qw(usleep gettimeofday);

=head1 NAME

Qooxdoo::SessionLite - Simple Session handler race resistant

=head1 SYNOPSIS

 use CGI;
 use Qooxdoo::SessionLite;
 my $q = new CGI;
 my $sess = new Qooxdoo::SessionLite($cgi,'/tmp/mydir',$max_age);
 my $value = $sess->param('key');
 $sess->param('key',$value);
 my $id = $sess->id();
 print $sess->header();
    
=head1 DESCRIPTION

This is a simple file based session manager for qooxdoo. It supports only a
small subset of L<CGI::Session> functionality. Its main advantage is, that
it is race resistant in the sense that it merges param settings on disk. It
uses L<Storable> as its on-disk format.

=cut

use Carp;
use vars qw($VERSION);
$VERSION   = '0.01';
our $COOKIE_NAME = 'SessionLiteId';
our $SESSION_EXT = 'session';

=head1 METHODS

=over

=item my $sess = Qooxdoo::SessionLite($cgi,'/tmp/mydir',$max_age, $timeout);

The 'new' method expects a hash pointer as its first argument. The hash
contains keys for all parameter keys of the new method the values of the
hash are regular expressions, for checking the actual values.

=cut

sub new {
    my $proto   = shift;
    my $class   = ref($proto) || $proto;
    my $self    = bless {
        _cgi    =>$_[0],
        _path   =>$_[1],
        _maxage =>$_[2] || 3600 ,
        _timeout =>$_[3] || 1.5
    }, $class;    
    my $id = $self->{_cgi}->cookie($COOKIE_NAME);
    if (not defined $id){
        my $md5 = new Digest::MD5();
        $md5->add(rand());
        $id = $md5->hexdigest();
    }
    $self->{_id} = $id;
    $self->{_data} = {};
    $self->{_file} = $self->{_path}.'/'.$self->id().'.'.$SESSION_EXT;
    _mkdirp($self->{_path});
    my $clean_check = $self->{_path}.'/LAST_SESSSION_CLEAN';
    my $last_clean = -M $clean_check;
    if (not defined $last_clean or $last_clean > ( 1 / 24 / 6 ) ){
        open (my $x, ">", $clean_check );
        $self->_cleandir();
    }
    return $self;
}

# perl impementation of mkdir -p
sub _mkdirp {
    my $path = shift;
    if (not -d $path){
        my $dir = '';
        while ($path =~ s{^(/*[^/]+)}{}){
            $dir .= $1;
            next if -d $dir;
            mkdir $dir;
        }
    };
}

# remove old session files from the session directory
sub _cleandir {
    my $self = shift;
    my $path = $self->{_path};
    my $now = time();
    my $maxage = $self->{_maxage};
    for my $file (<$path/*.$SESSION_EXT>){
        my $last = (stat $file)[9];
        next not $last;
        if ($now - $last > $maxage){
            unlink $file;
        }
    }
}

=item print $sess->header();

This works exactly like CGI::header except that it adds a cookie with the
session ID so that we can recognize requests coming from the same browser.

=cut

sub header {
    my $self = shift;
    my $cgi = $self->{_cgi};
    return $cgi->header(
        -cookie=>$cgi->cookie(
            -name   => $COOKIE_NAME,
            -value  => $self->id(),
            -path   => $cgi->url(-absolute=>1)
        ),
        @_
    );
}

# lock the session file, fetch current data, run callback, store data

sub _exclusive_data_op {
    my $self = shift;
    my $operation = shift;
    my $writeback = shift;
    my $file = $self->{_file};
    my $fh;
    my $locktype = $writeback ? (LOCK_EX|LOCK_NB) : ( LOCK_SH|LOCK_NB );
    if ( open ($fh, '+>>' , $file) ) {
        my $start = scalar gettimeofday();
        while (1) {
            last if flock($fh, $locktype);
            my $elapsed = scalar gettimeofday() - $start;          
            croak "SessionLite.$$ faild to lock $file for $elapsed s" if $elapsed > $self->{_timeout};
            usleep(50*1000) # try again in 50ms;
        }
        if ($Qooxdoo::SessionLite::debug){
            my $elapsed = scalar gettimeofday() - $start; 
            carp "SessionLite.$$ got lock on $file after $elapsed s" if $elapsed > 0.02;
        }
        binmode($fh);
        my $size = tell $fh;        
        if ($size > 0){
            seek $fh, 0, 0;
            $self->{_data} = eval { fd_retrieve $fh };
            croak "SessionLite.$$ Reading $file ($size): $@" if $@;
        } else {
            $self->{_data} = {};
        }
        $operation->($self->{_data});
        if ($writeback){
            seek $fh, 0, 0;
            truncate $fh, 0;
            store_fd($self->{_data}, $fh) or do {
                croak "SessionLite.$$ problem saveing $file: $!";
            };
            carp "SessionLite.$$ saved $file\n" if $Qooxdoo::SessionLite::debug;        
            $self->{_mtime} = -M $file;
        }
        close $fh;
    }
    else {
        croak "SessionLite.$$ faild to operate on $file";
    }
}

=item my $value = $sess->param($key); $sess->param($key,$value)

Set and get a session parameter. This command acts on the disk copy of the
session. Locking makes this race-save in contrast to CGI::Session.

=cut

sub param {
    my $self = shift;
    my $key = shift;
    my $value = shift;
    if (not defined $value){
        my $file = $self->{_file};
        my $mtime = -M $file;
        if (-r $file and not -z $file and (not defined $self->{_mtime} or $self->{_mtime} > $mtime)){
            # exclusive data op will re-read the session ... 
            $self->_exclusive_data_op( sub { 1 }, 0);
        };
    }
    else {
        $self->_exclusive_data_op( sub {
            shift->{$key}=$value;
            carp "SessionLite.$$ set $key => $value\n" if $Qooxdoo::SessionLite::debug;
        },1);
    }
    return $self->{_data}{$key};   
}

=item $sess->clear([$key1,$key2]) or $sess->clear($key)

Clear one or several people work for you.

=cut

sub clear {
    my $self = shift;
    my $keys = shift;
    $self->_exclusive_data_op( sub {
        my $d = shift;
        if (ref $keys eq 'ARRAY'){
            for (@$keys){
                carp "SessionLite.$$ remove $_" if $Qooxdoo::SessionLite::debug;        
                delete $d->{$_};
            }
        } else {
            carp "SessionLite.$$ remove $keys" if $Qooxdoo::SessionLite::debug;        
            delete $d->{$keys}
        }
    },1);
}

=item $sess->delete();

Delete the session completely.

=cut

sub delete {
    my $self = shift;
    unlink $self->{_file};
}

=item $sess->id();

Return the id.

=cut

sub id {
    my $self = shift;
    return $self->{_id};
}

1;

__END__

=back

=head1 COPYRIGHT

Copyright (c) 2009 by OETIKER+PARTNER AG. All rights reserved.

=head1 LICENSE

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.

=head1 AUTHOR

S<Tobias Oetiker E<lt>tobi@oetiker.chE<gt>>

=head1 HISTORY

 2009-12-23 to 1.0 first version for remOcular

=cut

# Emacs Configuration
#
# Local Variables:
# mode: cperl
# eval: (cperl-set-style "PerlStyle")
# mode: flyspell
# mode: flyspell-prog
# End:
#
# vi: sw=4 et
