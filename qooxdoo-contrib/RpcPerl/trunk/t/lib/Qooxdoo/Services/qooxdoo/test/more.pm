package Qooxdoo::Services::qooxdoo::test::more;

use Qooxdoo::Services::qooxdoo::test;

sub AUTOLOAD {
    my ($what) = ($AUTOLOAD =~ /([^:]+)$/);
    my $func = "Qooxdoo::Services::qooxdoo::test::$what";
    $func->(@_);
}

sub method_isTrue
{
    my $error  = shift;
    my @params = @_;

    my $istrue = Qooxdoo::JSONRPC::json_istrue($params[0]);
    return Qooxdoo::JSONRPC::json_bool($istrue);
}

1;
