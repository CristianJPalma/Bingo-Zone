<?php
// login.php
session_start();
require_once 'Conexion.php';
require_once 'Usuario.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    $usuario = new Usuario();  
    
    $resultado = $usuario->logearUsuario($correo, $contrasena);

    if ($resultado) {
        // Iniciar sesión y almacenar datos en la sesión
        $_SESSION['usuario_id'] = $resultado['id'];
        $_SESSION['nombre_usuario'] = $resultado['nombre'];
        header("Location: ../../public/menu.html"); // Redirigir a una página de bienvenida
        exit();
    } else {
        header("Location: ../../public/login.html?error=credenciales");
    }
}
