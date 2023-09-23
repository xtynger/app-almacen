<?php
//header("Access-Control-Allow-Headers: X-Requested-With");
header ("Access-Control-Allow-Origin: *");
header ("Access-Control-Expose-Headers: Content-Length, X-JSON");
header ("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header ("Access-Control-Allow-Headers: *");

$hostname = 'mollykasoc.com';
$username = 'mollykas_grupo6u';
$password = '~7}4}jo4i7PI';
$database = 'mollykas_grupo6';

$cn = mysqli_connect($hostname,$username,$password,$database);
?>