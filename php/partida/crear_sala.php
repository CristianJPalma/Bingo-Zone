<?php
require_once 'sala.php';
require_once '../usuario/Usuario.php';

// Inicia sesión y verifica que el usuario esté autenticado
session_start();
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['error' => 'Usuario no autenticado']);
    exit;
}

$usuario_id = $_SESSION['usuario_id'];
$sala = new Sala();

try {
    // Crea la sala y obtiene el código generado
    $codigoSala = $sala->crearSala($usuario_id);
    
    // Retorna solo el mensaje en formato JSON
    echo json_encode([
        'mensaje' => 'Sala creada exitosamente.',
        'codigo_sala' => $codigoSala
    ]);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al crear la sala: ' . $e->getMessage()]);
}
?>
