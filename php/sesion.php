<?php
// verificar_sesion.php
session_start();

if (!isset($_SESSION['usuario'])) {
    echo 'Debes iniciar sesión'; // Esto puede ser opcional si no se utiliza.
    session_destroy();
    die();
}

