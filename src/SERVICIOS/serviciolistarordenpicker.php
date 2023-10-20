<?php
	require_once("config.php");
    try{
        $idUsuario = $_REQUEST["idUsuario"];
        $rs = mysqli_query($cn, "SELECT idOrden, envio, pedidoVentas, idUsuario, idClienteAx, nombreCliente, 
                            referencia, asignadoPor, asignadoA, fechaSubida, fechaInicio, fechaCompletado, 
                            estado, avance 
                            FROM Orden 
                            WHERE asignadoA = $idUsuario
                            AND estado 
                            BETWEEN 2 AND 4
                            ORDER BY idOrden DESC");
        while ($row = mysqli_fetch_assoc($rs)) {
            $res[] = $row;
        }
    }catch(Exception $e){
        echo $e->getMessage();

    }catch(InvalidArgumentException $e){
        echo $e->getMessage();
    }
    
    echo json_encode($res, JSON_UNESCAPED_UNICODE);
    mysqli_close($cn);
?>
