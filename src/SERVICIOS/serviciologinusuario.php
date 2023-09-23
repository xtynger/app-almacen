<?php
require_once("config.php");

// Validación básica de entrada
if (!isset($_POST["username"]) || !isset($_POST["password"])) {
    echo json_encode(["error" => "Datos de entrada incompletos"]);
    exit;
}

$username = $_POST["username"];
$password = $_POST["password"];

// Uso de consultas preparadas para prevenir inyección SQL
$stmt = $cn->prepare("SELECT username, passwordHash FROM Usuario WHERE username = ?");
$stmt->bind_param("s", $username);

if ($stmt->execute()) {
    $stmt->bind_result($dbUsername, $dbPasswordHash);

    if ($stmt->fetch()) {
        if (password_verify($password, $dbPasswordHash)) {
            echo json_encode(["message" => "Autenticación exitosa"]);
        } else {
            echo json_encode(["error" => "Contraseña incorrecta"]);
        }
    } else {
        echo json_encode(["error" => "Usuario no encontrado"]);
    }
} else {
    echo json_encode(["error" => "Error en la consulta"]);
}

$stmt->close();
$cn->close();
?>
