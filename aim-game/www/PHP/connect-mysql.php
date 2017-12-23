<?php

DEFINE ('DB_USER', 'root');
DEFINE ('DB_PSWD', '');
DEFINE ('DB_HOST', '127.0.0.1:3306');
DEFINE ('DB_NAME', 'aimgame');

$dbcon = mysqli_connect(DB_HOST, DB_USER, DB_PSWD, DB_NAME);

if (!$dbcon) {
	die('Error connecting to database');
}

echo ('You have connected to the database');

?>