<?php
include 'conexion.php';
session_start();

$usuario = $_SESSION['usuario'];
$sql = "SELECT nombre_pantalla FROM usuario WHERE correo = '$usuario'"; // Ajusta según tu caso
$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $dato = $row["nombre_pantalla"]; // Cambia "columna" por el nombre de tu columna
} else {
    $dato = "No se encontraron resultados";
}


$conexion->close();
?>
<!-- mostrar_dato.php -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mostrar Dato</title>
</head>
<body>
    <h1>Dato de la Base de Datos</h1>
    <p><?php echo $dato; ?></p> <!-- Mostrar el dato aquí -->
</body>
</html>

