<?php
	require_once("config.php");

    //$id = $_POST[uniqid()]  ;
    //$idDetalleOrden = $_REQUEST[uniqid()];
    //$idDetalleOrden = $_REQUEST["idDetalleOrden"];
    //$idUsuario = $_REQUEST["idUsuario"];
    $idClienteAx = $_REQUEST["idClienteAx"];
    $emitido = $_REQUEST["emitido"];
    $nombreCliente = $_REQUEST["nombreCliente"];
    $referencia = $_REQUEST["referencia"];
    $envio = $_REQUEST["envio"];
    $pedidoVentas = $_REQUEST["pedidoVentas"];
    $idUsuario = $_REQUEST["idUsuario"];
    //$asignadoPor = $_REQUEST["asignadoPor"];
    //$completadoPor = $_REQUEST["completadoPor"];
    $fechaSubida = $_REQUEST["fechaSubida"];
    //$fechaInicio = $_REQUEST["fechaInicio"];
    //$fechaCompletado = $_REQUEST["fechaCompletado"];
    $estado = $_REQUEST["estado"];

    $nombreCliente = mysqli_real_escape_string($cn, $nombreCliente);
    $referencia = mysqli_real_escape_string($cn, $referencia);
    //$date = getdate();
     //echo $date[year],'-',$date[mon],'-',$date[mday],' ',$date[hours],':',$date[minutes],':',$date[seconds];

	$rs = mysqli_query($cn,
		"insert into Orden (idClienteAx,emitido,nombreCliente,
        referencia,envio,pedidoVentas,idUsuario,fechaSubida,estado) 
        values('".$idClienteAx."','".$emitido."',
        '".$nombreCliente."','".$referencia."','".$envio."',
        '".$pedidoVentas."','".$idUsuario."','".$fechaSubida."','".$estado."')");

	echo mysqli_insert_id($cn); 
	mysqli_close($cn);
?>