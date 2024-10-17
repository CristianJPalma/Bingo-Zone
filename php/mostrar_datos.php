<?php
include 'conexion.php';
session_start();

$usuario = $_SESSION['usuario'];

if ($usuario) {
    $sql = "SELECT nombre_pantalla FROM usuario WHERE correo = '$usuario'";
    $result = $conexion->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo trim($row["nombre_pantalla"]); // Limpiar posibles espacios en blanco
    } else {
        echo "No se encontraron resultados";
    }
} else {
    echo "No hay usuario en sesión";
}

$conexion->close();
?>
