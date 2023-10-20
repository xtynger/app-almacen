<?php
	require_once("config.php");
	    $rs = mysqli_query($cn,"SELECT Usuario.username, Usuario.nombre, Usuario.apellido, Usuario.nivelUsuario,
        Orden.envio, Orden.pedidoVentas, Orden.nombreCliente, Orden.referencia, Orden.estado, Orden.avance
        FROM Orden
        INNER JOIN Usuario
        ON Usuario.idUsuario=Orden.asignadoA
    ");
    while($row = mysqli_fetch_assoc($rs)){
        $res[] = $row;
    }
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
    mysqli_close($cn);
?>