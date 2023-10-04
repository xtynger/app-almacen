<?php
	require_once("config.php");
    $idUsuario = $_REQUEST["idUsuario"];
	$nombre = $_REQUEST["nombre"];
    $apellido = $_REQUEST["apellido"];
    $correo = $_REQUEST["correo"];
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];
    $estado= '1';
	$passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $nivelUsuario = $_REQUEST["nivelUsuario"];

    //$estado = 0;
    /* CREAMOS EL USERNAME */
    /*$in = substr($nombre,0,1);
    $ap = substr($apellido,0);
    $username = ($in.$ap);*/

	$rs = mysqli_query($cn,
		"UPDATE Usuario SET nombre = '$nombre',
        apellido = '$apellido',
        correo = '$correo',
        username = '$username',
        password  = '$password',
        passwordHash  = '$passwordHash',
        nivelUsuario  = '$nivelUsuario',
        estado  = '$estado'
        WHERE idUsuario = ".$idUsuario);

    echo mysqli_insert_id($cn); 
	mysqli_close($cn);
?>