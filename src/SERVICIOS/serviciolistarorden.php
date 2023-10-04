<?php
require_once("config.php");

// Obtener la fecha actual
$fechaActual = date("Y-m-d");

// Obtener la fecha de ayer
$fechaAyer = date("Y-m-d", strtotime("-1 day"));

$rs = mysqli_query($cn,"SELECT idOrden, envio, pedidoVentas, idUsuario, idClienteAx, nombreCliente, referencia, asignadoPor, asignadoA, fechaSubida, fechaInicio, fechaCompletado, estado, avance, abierto, emitido
                        FROM Orden 
                        WHERE (DATE(fechaSubida) >= '$fechaAyer' OR DATE(fechaInicio) >= '$fechaAyer') or estado = 2 or estado = 3 or estado = 4
                        ORDER BY idOrden DESC");

$res = array();
while($row = mysqli_fetch_assoc($rs)){
    $res[] = $row;
}

echo json_encode($res, JSON_UNESCAPED_UNICODE);
mysqli_close($cn);
?>
