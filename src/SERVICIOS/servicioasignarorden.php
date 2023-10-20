<?php
    require_once("config.php");
    $idOrden = $_REQUEST["idOrden"];
    $asignadoPor = $_REQUEST["asignadoPor"];
    $asignadoA = $_REQUEST["asignadoA"];
    $fechaAsignacion = $_REQUEST["fechaAsignacion"];
    $estado = "2";

    $sql = "UPDATE Orden 
    SET asignadoPor = '".$asignadoPor."', asignadoA = '".$asignadoA."', estado = '".$estado."', fechaAsignacion = '".$fechaAsignacion."' 
    WHERE idOrden = ".$idOrden;

    $rs = mysqli_query($cn, $sql);

    if ($rs) {
        echo "Registro actualizado";
    } else {
        echo "Error: " . mysqli_error($cn);
    }
    
    mysqli_close($cn);
?>
