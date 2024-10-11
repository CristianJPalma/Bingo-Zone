<?php

include 'conexion.php';

$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$nombre_pantalla = $_POST['nombre_pantalla'];
$correo = $_POST['correo'];
$contraseña = $_POST['contraseña'];

$query = "INSERT INTO usuario(nombre, apellido, nombre_pantalla, correo, contraseña) 
        VALUES('$nombre', '$apellido', '$nombre_pantalla', '$correo', '$contraseña')";

$ejecutar = mysqli_query($conexion, $query);

if($ejecutar){
    echo '
    <script>
    alert("Usuario registrado exitosamente")
        window.location = "../public/login.html";
    </script>
    ';
}else{
    echo '
    <script>
    alert("error")
    window.location = "../public/error.html";
    </script>
    ';
}
mysqli_close($conexion);