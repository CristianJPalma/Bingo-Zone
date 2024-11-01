<?php
session_start();
require_once '../conexion/Conexion.php';
require_once 'Usuario.php';

if (isset($_SESSION['usuario_id'])) {
    $usuario_id = $_SESSION['usuario_id'];
    $datos = json_decode(file_get_contents("php://input"), true);

    if (isset($datos["nombre"], $datos["apellido"], $datos["nombre_pantalla"], $datos["correo"], $datos["imagen_perfil"])) {
        $usuario = new Usuario();
        $resultado = $usuario->actualizarDatos($usuario_id, $datos["nombre"], apellido: $datos["apellido"], nombre_pantalla: $datos["nombre_pantalla"], correo: $datos["correo"], imagen_perfil: $datos["imagen_perfil"]);

        if ($resultado) {
            echo json_encode(["status" => "success", "message" => "Datos actualizados."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error al actualizar datos."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Datos incompletos."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No hay sesión iniciada."]);
}
?>
