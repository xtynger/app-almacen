<?php
	require_once("config.php");
	$idUsuario = $_REQUEST["idUsuario"];
	$estado = $_REQUEST["estado"];;

	$rs = mysqli_query($cn,
		"UPDATE Usuario SET  estado = $estado WHERE idUsuario = $idUsuario;");
	mysqli_close($cn);
?>