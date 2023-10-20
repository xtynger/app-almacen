<?php
	require_once("config.php");

    $desde = isset($_GET['desde']) ? $_GET['desde'] : null;
    $hasta = isset($_GET['hasta']) ? $_GET['hasta'] : null;

	$rs = mysqli_query($cn,"SELECT 
    o.idOrden, o.envio, o.pedidoVentas, 
    CONCAT(u.nombre, ' ', u.apellido) AS nombreUsuario, u.username AS usuario, 
    o.idClienteAx, o.nombreCliente, o.referencia, 
    CONCAT(asignadoPorUser.nombre, ' ', asignadoPorUser.apellido) AS asignadoPorNombre, 
    asignadoPorUser.username AS asignadoPorUsuario,
    CONCAT(asignadoAUser.nombre, ' ', asignadoAUser.apellido) AS asignadoANombre, 
    asignadoAUser.username AS asignadoAUsuario,
    o.fechaSubida, o.fechaInicio, o.fechaCompletado, 
    e.descripcion AS estado, o.avance, o.abierto, o.emitido
    FROM Orden AS o
    LEFT JOIN Usuario u ON o.idUsuario = u.idUsuario
    LEFT JOIN Usuario AS asignadoPorUser ON o.asignadoPor = asignadoPorUser.idUsuario
    LEFT JOIN Usuario AS asignadoAUser ON o.asignadoA = asignadoAUser.idUsuario
    LEFT JOIN Estados_Orden e ON o.estado = e.idEstadoOrden
    WHERE o.fechaSubida >= '$desde' AND o.fechaSubida <= '$hasta'
    ORDER BY o.idOrden DESC;");

    while($row = mysqli_fetch_assoc($rs)){
        $res[] = $row;
    }

    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    mysqli_close($cn);
?>