<?php
	require_once("config.php");

    //$id = $_POST[uniqid()]  ;
    //$idDetalleOrden = $_REQUEST[uniqid()];
    $idArticulo = $_REQUEST["idArticulo"];
    $estado = $_REQUEST["estado"];
       
    //$date = getdate();
     //echo $date[year],'-',$date[mon],'-',$date[mday],' ',$date[hours],':',$date[minutes],':',$date[seconds];

	$rs = mysqli_query($cn,
		"update Detalle_Orden set estado = '".$estado."' where idArticulo = ".$idArticulo);
	mysqli_close($cn);
?>