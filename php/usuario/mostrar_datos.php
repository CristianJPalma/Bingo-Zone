<?php
session_start();
require_once '../conexion/Conexion.php';
require_once 'Usuario.php';

if (isset($_SESSION['usuario_id'])) {
    $usuario_id = $_SESSION['usuario_id'];

    $usuario = new Usuario();
    $datosUsuario = $usuario->obtenerDatosUsuario($usuario_id);

    if ($datosUsuario) {
        // Enviar datos en formato JSON
        echo json_encode($datosUsuario);
    } else {
        echo json_encode(['error' => 'No se encontraron datos para este usuario']);
    }
} else {
    echo json_encode(['error' => 'Usuario no autenticado']);
}
