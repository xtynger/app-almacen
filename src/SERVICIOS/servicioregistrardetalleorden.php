<?php
	require_once("config.php");

    //$id = $_POST[uniqid()]  ;
    //$idDetalleOrden = $_REQUEST[uniqid()];
    $envio = $_REQUEST["envio"];
    $codigoArticulo = $_REQUEST["codigoArticulo"];
    $descripcion = $_REQUEST["descripcion"];
    $numeroLote = $_REQUEST["numeroLote"];
    $ubicacion = $_REQUEST["ubicacion"];
    $idPallet = $_REQUEST["idPallet"];
    $fechaCaducidad = $_REQUEST["fechaCaducidad"];
    $cantidad = $_REQUEST["cantidad"];
    $rama = '1';
    $estado = '7';
    $codigoHijo = $_REQUEST["codigoHijo"];
       
    //$date = getdate();
    //echo $date[year],'-',$date[mon],'-',$date[mday],' ',$date[hours],':',$date[minutes],':',$date[seconds];
    $descripcion = mysqli_real_escape_string($cn, $descripcion);

	$rs = mysqli_query($cn,
		"insert into Detalle_Orden (envio,codigoArticulo,descripcion,numeroLote, ubicacion,idPallet,fechaCaducidad,cantidad, rama,estado) 
        values('".$envio."','".$codigoArticulo."','".$descripcion."',
         '".$numeroLote."','".$ubicacion."','".$idPallet."', '".$fechaCaducidad."','".$cantidad."','".$rama."','".$estado."')");

	echo mysqli_insert_id($cn); 
	mysqli_close($cn);
?>