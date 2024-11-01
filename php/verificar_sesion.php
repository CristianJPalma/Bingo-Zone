<?php
session_start();

if (isset($_SESSION['usuario_id'])) {
    // Usuario con sesión iniciada
    echo json_encode(["status" => "success"]);
} else {
    // Usuario sin sesión iniciada
    echo json_encode(["status" => "error", "message" => "No tiene sesión iniciada."]);
}
?>
