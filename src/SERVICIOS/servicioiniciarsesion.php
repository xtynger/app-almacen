<?php
	require_once("config.php");
	$usuario = $_REQUEST["usuario"];
	$clave = $_REQUEST["clave"];
	$hash = password_hash($clave, PASSWORD_DEFAULT);

	$rs = mysqli_query($cn,
		"select * from clientes where usuario='".$usuario."'"."' and passwordHash='".$hash."'");
	if(mysqli_num_rows($rs)==1){
	    $row = mysqli_fetch_assoc($rs);
	    if($row["clave"]==$clave){
	        $res[] = array_map("utf8_encode",$row);
	        echo json_encode($res);
	    }
	    else{
	        echo "-2";
	    }
	}
	else{
		echo "-1";
	}
	mysqli_close($cn);
?>