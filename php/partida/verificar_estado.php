<?php
include '../conexion/Conexion.php';

$conexion = new Conexion();
$pdo = $conexion->connect();

$codigoPartida = $_GET['codigoPartida'] ?? '';

if ($codigoPartida) {
    $stmt = $pdo->prepare("SELECT redirigir FROM partida WHERE codigo_partida = :codigo_partida");
    $stmt->execute(['codigo_partida' => $codigoPartida]);
    $partida = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($partida) {
        echo json_encode(['redirigir' => $partida['redirigir']]);
    } else {
        echo json_encode(['error' => 'Partida no encontrada']);
    }
} else {
    echo json_encode(['error' => 'Código de partida no proporcionado']);
}
?>
