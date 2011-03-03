#!/usr/bin/perl

################################################################################
#
#  Perl Bindings for QxSelenium
#
#  Copyright:
#    2010 Tim Harsdorf
#
#  License:
#    LGPL: http://www.gnu.org/licenses/lgpl.html
#    EPL: http://www.eclipse.org/org/documents/epl-v10.php
#    See the LICENSE file in the project's top-level directory for details.
#
#  Authors:
#    * Tim Harsdorf (mail@timharsdorf.de)
#
################################################################################

package QxSelenium;

use WWW::Selenium;
use strict;

our @ISA = qw(WWW::Selenium);

sub qxClick {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "qxClick", $locator, $options );
}

sub qxClickAt {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "qxClickAt", $locator, $options );
}

sub qxTableClick {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "qxTableClick", $locator, $options );
}

sub qxTableHeaderClick {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "qxTableHeaderClick", $locator, $options );
}

sub qxEditTableCell {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "qxEditTableCell", $locator, $options );
}

sub getQxTableRowCount {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "getQxTableRowCount", $locator, $options );
}

sub getQxTableModelColCount {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "getQxTableModelColCount", $locator, $options );
}

sub getQxTableVisibleColCount {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "getQxTableVisibleColCount", $locator, $options );
}

sub getQxTableModelColumnIds {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "getQxTableModelColumnIds", $locator, $options );
}

sub getQxTableVisibleColumnIds {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "getQxTableVisibleColumnIds", $locator,
        $options );
}

sub getQxTableColumnIndexByName {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "getQxTableColumnIndexByName", $locator,
        $options );
}

sub qxTableGetSelectedRowData {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "getQxTableSelectedRowData", $locator, $options );
}

sub getQxTableValue {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "getQxTableValue", $locator, $options );
}

sub getQxObjectFunction {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "getQxObjectFunction", $locator, $options );
}

sub getRunInContext {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "getRunInContext", $locator, $options );
}

sub getQxObjectHash {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "getQxObjectHash", $locator, $options );
}

sub qxDragAndDrop {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "qxDragAndDrop", $locator, $options );
}

sub qxDragAndDropToObject {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "qxDragAndDropToObject", $locator, $options );
}

sub qxType {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "qxType", $locator, $options );
}

sub qxTypeKeys {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "qxTypeKeys", $locator, $options );
}

sub get_viewport {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "get_viewport", $locator, $options );
}

sub capture_screenshot {
    my $self    = shift;
    my $locator = shift;
    my $options = shift;
    return $self->do_command( "capture_screenshot", $locator, $options );
}
