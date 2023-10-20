<?php
	require_once("config.php");

    //$id = $_POST[uniqid()]  ;
    //$idDetalleOrden = $_REQUEST[uniqid()];
    $idOrden = $_REQUEST["idOrden"];
    $estado = $_REQUEST["estado"];
    $avance = $_REQUEST["avance"];

    //$date = getdate();
     //echo $date[year],'-',$date[mon],'-',$date[mday],' ',$date[hours],':',$date[minutes],':',$date[seconds];

	$rs = mysqli_query($cn,
		"update Orden set estado = $estado, avance = $avance where idOrden = ".$idOrden);
	mysqli_close($cn);
?>