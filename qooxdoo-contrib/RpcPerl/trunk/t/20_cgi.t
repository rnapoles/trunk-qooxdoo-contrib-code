use Test::More tests => 15;

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
    my $out = qx{$^X -I . -I t/lib t/bin/tserver.pl $infile $sid};
    like($out, qr/$expected/, "content in $expfile matches");
}
