<?php
	require_once("config.php");
	$rs = mysqli_query($cn,"select * from Usuario");
    while($row = mysqli_fetch_assoc($rs)){
        $res[] = $row;
    }
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    mysqli_close($cn);
?>