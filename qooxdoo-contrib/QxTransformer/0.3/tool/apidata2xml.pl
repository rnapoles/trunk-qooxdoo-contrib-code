#! /usr/bin/perl

use XML::XML2JSON;
use File::Slurp;
use JSON::DWIW;

my $XML2JSON = XML::XML2JSON->new();

$dirname = "../../../qooxdoo-0.7-sdk/frontend/application/apiviewer/source/script/";

opendir MYDIR, $dirname;
@contents = grep !/^\.\.?$/, readdir MYDIR;
closedir MYDIR;

my $JSON = "";
my $XML = "";

foreach $filename ( @contents )
{
	print $filename . "\n";
	if ( $filename ne "apiindex.js" && $filename ne "apidata.js" && $filename ne "apiviewer.js") 
	{
		$JSON .= ' "' . $filename . '" : '. read_file( $dirname . $filename) . ",";
	}
}

$JSON = '{ "root" : { ' . $JSON . ' } }';

$XML2JSON->{attribute_prefix} = "";
$XML2JSON->{pretty} = true; 
#$XML2JSON->{debug} = true;
$XML2JSON->{_loaded_module} = "JSON::DWIW";


$XML = $XML2JSON->json2xml($JSON);
write_file ( "./apidata.xml", $XML);
