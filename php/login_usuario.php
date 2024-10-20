<?php

session_start();

include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];

    // Encriptar la contraseña
    $contraseña = hash('sha512', $contraseña);

    // Verificar si el correo y la contraseña coinciden
    $verificar_login = mysqli_query($conexion, "SELECT * FROM usuario WHERE correo='$correo' AND contraseña='$contraseña'");

    if (mysqli_num_rows($verificar_login) > 0) {
        $_SESSION['usuario'] = $correo;
        // Redirigir al menú si el login es exitoso
        header("Location: ../public/menu.html");
        exit();
    } else {
        // Redirigir con un parámetro que indique el error
        header("Location: ../public/login.html?error=credenciales");
        exit();
    }
}
mysqli_close($conexion);
