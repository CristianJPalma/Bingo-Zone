<?php
require_once 'Usuario.php';

// Manejar la solicitud de inserción de usuario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $nombre_pantalla = $_POST['nombre_pantalla'];
    $correo = $_POST['correo'];

    $usuario = new Usuario();
    if ($usuario->insertarUsuario($nombre, $nombre_pantalla, $correo)) {
        echo "Usuario insertado correctamente.";
    } else {
        echo "Error al insertar el usuario.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Insertar Usuario</title>
</head>
<body>
    <h1>Agregar Usuario</h1>
    <form method="POST" action="">
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" required>
        <br>
        <label for="correo">Correo:</label>
        <input type="email" name="correo" required>
        <br>
        <label for="nombre_pantalla">Uuario:</label>
        <input type="text" name="nombre_pantalla" required>
        <br>
        <button type="submit">Agregar</button>
    </form>

    <h2>Lista de Usuarios</h2>
    <ul>
        <?php
        $usuario = new Usuario();
        $usuarios = $usuario->obtenerUsuarios();

        foreach ($usuarios as $user) {
            echo "<li>" . htmlspecialchars($user['nombre']) . " - " . htmlspecialchars($user['correo']) . "</li>";
        }
        ?>
    </ul>
</body>
</html>
