<?php
	require_once("config.php");
    try{
        $codigoHijo = $_REQUEST["codigoHijo"];
        $rs = mysqli_query($cn, "delete from Detalle_Orden where codigoHijo='$codigoHijo'");
    }catch(Exception $e){
        echo $e->getMessage();

    }catch(InvalidArgumentException $e){
        echo $e->getMessage();
    }
    mysqli_close($cn);
?>

