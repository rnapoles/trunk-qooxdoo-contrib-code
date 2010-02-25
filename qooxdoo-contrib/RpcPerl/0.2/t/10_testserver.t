use Test::More tests => 2;

my $out = qx/$^X -I . jsonrpc.pl/;
like($out, qr/^Set-Cookie:/);
like($out, qr/Your HTTP Client is not using the JSON-RPC protocol/);

