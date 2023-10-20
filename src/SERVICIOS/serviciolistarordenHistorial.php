<?php
require_once("config.php");

$mes = isset($_GET['mes']) ? $_GET['mes'] : null;

// Obtener el último día del mes anterior
$ultimoDiaMesAnterior = date('Y-m-d', strtotime('last day of last month'));

// Calcular el penúltimo día del mes anterior
$fechaActual = date('Y-m-d');
$penultimoDiaMesAnterior = date('Y-m-d', strtotime('-2 days', strtotime($ultimoDiaMesAnterior)));

$rs = mysqli_query($cn, "SELECT idOrden, envio, pedidoVentas, idUsuario, idClienteAx, nombreCliente, referencia, asignadoPor, asignadoA, fechaSubida,fechaInicio, fechaCompletado, estado, avance, abierto, emitido
                        FROM Orden 
                        WHERE (MONTH(fechaSubida) = '$mes' 
                               OR (fechaSubida BETWEEN '$penultimoDiaMesAnterior' AND '$ultimoDiaMesAnterior') 
                               OR (fechaSubida = '$ultimoDiaMesAnterior'))
                        OR estado = 2 OR estado = 3 OR estado = 4
                        ORDER BY idOrden DESC");

while($row = mysqli_fetch_assoc($rs)){
    $res[] = $row;
}
echo json_encode($res, JSON_UNESCAPED_UNICODE);
mysqli_close($cn);
?>
