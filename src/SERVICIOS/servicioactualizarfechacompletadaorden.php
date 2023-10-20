<?php
	require_once("config.php");

    //$id = $_POST[uniqid()]  ;
    //$idDetalleOrden = $_REQUEST[uniqid()];
    $idOrden = $_REQUEST["idOrden"];
    $abierto = $_REQUEST["abierto"];
    $fechaCompletado = $_REQUEST["fechaCompletado"];


    //$date = getdate();
     //echo $date[year],'-',$date[mon],'-',$date[mday],' ',$date[hours],':',$date[minutes],':',$date[seconds];

	$rs = mysqli_query($cn,
		"UPDATE Orden set abierto = $abierto, fechaCompletado = '$fechaCompletado' where idOrden = ".$idOrden);
	mysqli_close($cn);
?>

