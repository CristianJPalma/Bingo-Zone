<?php
session_start();
require_once 'conexion.php';
require_once 'Usuario.php';

// Verificar si el usuario está autenticado
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["status" => "error", "message" => "No tiene sesión iniciada"]);
    exit();
}

$id = $_SESSION['usuario_id'];  // Obtener el ID del usuario desde la sesión
$nombre = $_POST['nombre'] ?? '';
$apellido = $_POST['apellido'] ?? '';
$nombre_pantalla = $_POST['nombre_pantalla'] ?? '';
$correo = $_POST['correo'] ?? '';

$usuario = new Usuario();
$resultado = $usuario->actualizarUsuario($id, $nombre, $apellido, $nombre_pantalla, correo: $correo);

// Retornar el resultado en formato JSON
echo json_encode($resultado);
?>
