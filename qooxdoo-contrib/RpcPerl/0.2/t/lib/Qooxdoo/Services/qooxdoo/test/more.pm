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

sub method_explainDate
{
    my $error = shift;
    my $date = shift;
    if (ref $date ne "Qooxdoo::JSONRPC::Date") {
        return "Client sent an invalid JavaScript date object: $date";
    }
    return map { [ $_ => $date->{$_} ] } (qw(year month day hour minute second millisecond));
}

1;
