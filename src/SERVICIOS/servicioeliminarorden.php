<?php
	require_once("config.php");
	$idOrden = $_REQUEST["idOrden"];
	$rs = mysqli_query($cn, "delete from Orden where idOrden=".$idOrden);
	mysqli_close($cn);
?>

