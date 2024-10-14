<?php

include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $nombre_pantalla = $_POST['nombre_pantalla'];
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];

    // encriptar la contraseña (pensaba que era mas largo)
    $contraseña = hash('sha512', $contraseña);


    // Verificar si el correo ya está registrado
    $verificar_correo = mysqli_query($conexion, "SELECT * FROM usuario WHERE correo='$correo'");

    if (mysqli_num_rows($verificar_correo) > 0) {
        // Redirigir con un parámetro que indique el error
        header("Location: ../public/register.html?error=correo");
        exit();
    } else {
        // Insertar el registro en la base de datos
        $query = "INSERT INTO usuario(nombre, apellido, nombre_pantalla, correo, contraseña) 
                VALUES('$nombre', '$apellido', '$nombre_pantalla', '$correo', '$contraseña')";

        $ejecutar = mysqli_query($conexion, $query);

        if ($ejecutar) {
            // Redirigir con un parámetro que indique el éxito
            header("Location: ../public/register.html?status=exito");
            exit();
        } else {
            // Redirigir con un parámetro que indique un error
            header("Location: ../public/register.html?error=registro");
            exit();
        }
    }

}
mysqli_close($conexion);
