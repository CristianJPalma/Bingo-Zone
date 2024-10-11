<?php

include 'conexion.php';

$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$nombre_pantalla = $_POST['nombre_pantalla'];
$correo = $_POST['correo'];
$contraseña = $_POST['contraseña'];

$query = "INSERT INTO usuario(nombre, apellido, nombre_pantalla, correo, contraseña) 
        VALUES('$nombre', '$apellido', '$nombre_pantalla', '$correo', '$contraseña')";

//verificar correo
$verificar_correo = mysqli_query($conexion, "SELECT * FROM usuario WHERE correo='$correo' ");

if(mysqli_num_rows($verificar_correo) > 0){
    echo '
        <script>
            alert("Este correo ya está registrado");
            window.location = "../public/register.html";
        </script>
    ';
    exit();
}

$ejecutar = mysqli_query($conexion, $query);

if($ejecutar){
    echo '
    <script>
    alert("Usuario registrado exitosamente")
        window.location = "../public/menu.html";
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