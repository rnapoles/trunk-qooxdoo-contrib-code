<html><head>
<script language="javascript1.2" src="javascript/scrolleriframe.js"></script>
<style type="text/css">
<!--
.style2 {
	font-size: 36px;
	font-family: Verdana, Arial, Helvetica, sans-serif;
	font-weight: bold;
}
-->
</style>
</head>
<body>

<?php

$baseDir = '/Users/fabianpb/Desktop/weida_projects/';
$projectName = $_REQUEST['project'];

$command = 'make';
if ($_REQUEST['mode'] == 'build')
  $command = 'make build';

if ($_REQUEST['mode'] == 'api')
  $command = 'make api';
   
if (strlen($projectName) > 80)
  return false;
    
$projectName = str_replace('/', '', $projectName);    
$projectName = str_replace('\\', '', $projectName);    
$projectName = str_replace(',', '', $projectName);    
    
for ($i = 1; $i <= 40; $i++)
  $projectName = str_replace('..', '.', $projectName);    

$fullDir = $baseDir.$projectName;

//echo($fullDir);
//echo($command);
chdir($fullDir);

echo('<pre>');
system($command);
echo('</pre>');

?>
<br /><br /><br />
<b>Finished (<?php echo(date('r')); ?>)</b>
<br /><br /><br />


</body>
</html>