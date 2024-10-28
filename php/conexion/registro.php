<?php
require_once 'Usuario.php';

// Manejar la solicitud de inserción de usuario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $nombre_pantalla = $_POST['nombre_pantalla'];
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    $usuario = new Usuario();
    $resultado = $usuario->insertarUsuario($nombre, $apellido, $nombre_pantalla, $correo, contrasena: $contrasena);

    if ($resultado === true) {
        header('Location:../../public/register.html?status=exito');
    } else {
        header('Location:../../public/register.html?error=correo');
    }
}
?>
        <?php
        $usuario = new Usuario();
        $usuarios = $usuario->obtenerUsuarios();

        foreach ($usuarios as $user) {
            echo "<li>" . htmlspecialchars($user['nombre']) . " - " . htmlspecialchars($user['correo']) . "</li>";
        }
        ?>
