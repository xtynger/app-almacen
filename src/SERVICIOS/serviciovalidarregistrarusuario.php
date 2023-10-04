<?php
	require_once("config.php");
    $username = $_REQUEST["username"];

    $rs = mysqli_query($cn,"select * from Usuario where username = '".$username."';");
              
    echo mysqli_num_rows($rs); 
	mysqli_close($cn);
?>