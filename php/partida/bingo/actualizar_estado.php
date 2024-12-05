<?php
header('Content-Type: application/json');
include '../../conexion/Conexion.php';
session_start();

$codigoPartida = $_GET['codigo'] ?? '';

// Verificar que el código de partida está presente
if (!$codigoPartida) {
    echo json_encode(['error' => 'Código de partida no proporcionado']);
    exit;
}

$conexion = new Conexion();
$pdo = $conexion->connect();

// Consultar si hay un ganador en la partida
$stmt = $pdo->prepare("
    SELECT ganador 
    FROM partida
    WHERE codigo_partida = :codigo
");
$stmt->execute(['codigo' => $codigoPartida]);
$data = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$data) {
    echo json_encode(['error' => 'Partida no encontrada']);
    exit;
}

// Si hay un ganador
if (!empty($data['ganador'])) {
    echo json_encode([
        'mensaje' => '¡Un jugador ha ganado!',
        'ganador' => $data['ganador']
    ]);
} else {
    echo json_encode(['mensaje' => 'Sin ganador aún']);
}
?>
