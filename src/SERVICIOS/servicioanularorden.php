<?php
	require_once("config.php");
	$idOrden = $_REQUEST["idOrden"];
	$estado = "6";

	$rs = mysqli_query($cn,
		"update Orden set  estado = '".$estado."' where idOrden=".$idOrden);
	mysqli_close($cn);
?>