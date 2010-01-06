<?php

header("Content-Type: text/plain"); // important!
echo "You posted: ";
foreach( $_POST as $key => $value)
{
	echo "$key:$value ";
}

?>