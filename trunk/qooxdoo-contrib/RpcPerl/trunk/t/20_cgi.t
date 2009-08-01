use Test::More tests => 45;

use Qooxdoo::JSONRPC;
use CGI::Session;

my $session = CGI::Session->new;
my $sid = $session->id;

my @in = <t/input/*>;
ok(@in, "test input files found");

for my $infile (@in) {
    my ($expected, $expfile);
    {
        ($expfile = $infile) =~ s,input,output,;
        local $/ = undef;
        open(my $handle, "<", $expfile);
        $expected = <$handle>;
        close $handle;
    }
    chomp $expected;
    ok($expected, "found expected content in $expfile");
    my $out = qx{$^X -I . -I t/lib t/bin/tserver.pl -l 'qooxdoo.test qooxdoo.test.more' -L 'qooxdoo\.test\.a*\$' $infile $sid};
    like($out, qr/$expected/, "content in $expfile matches");

    my $expected2 = ($infile =~ /disallowed/ ? qr/not found/ : $expected);
    $out = qx{$^X -I . -I t/lib t/bin/tserver.pl $infile $sid};
    like($out, qr/$expected2/, "output for $infile matches with no limits to exposed services");

    my $expected3 = ($infile =~ /bad_request/ ? $expected : qr/not available/);
    $out = qx{$^X -I . -I t/lib t/bin/tserver.pl -l " " $infile $sid};
    like($out, qr/$expected3/, "output for $infile matches when no exposed services are configured");

}
