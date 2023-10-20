<?php
	require_once("config.php");

    //$id = $_POST[uniqid()]  ;
    //$idDetalleOrden = $_REQUEST[uniqid()];
    $idOrden = $_REQUEST["idOrden"];
    $abierto = $_REQUEST["abierto"];
    $fechaInicio = $_REQUEST["fechaInicio"];


    //$date = getdate();
     //echo $date[year],'-',$date[mon],'-',$date[mday],' ',$date[hours],':',$date[minutes],':',$date[seconds];

	$rs = mysqli_query($cn,
		"update Orden set abierto = $abierto, fechaInicio = '$fechaInicio' where idOrden = ".$idOrden);
	mysqli_close($cn);
?>