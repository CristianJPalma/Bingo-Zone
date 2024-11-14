<?php
header('Content-Type: application/json');
include '../conexion/Conexion.php';
session_start();

$conexion = new Conexion();
$pdo = $conexion->connect();

$codigoPartida = $_GET['codigo'];
$stmt = $pdo->prepare("SELECT tiempo_inicio FROM partida WHERE codigo_partida = :codigo_partida");
$stmt->execute(['codigo_partida' => $codigoPartida]);
$tiempoInicio = $stmt->fetchColumn();

if ($tiempoInicio) {
    $tiempoTranscurrido = time() - strtotime($tiempoInicio);
    $tiempoRestante = max(0, 60 - $tiempoTranscurrido); // por ejemplo, cuenta regresiva de 60 segundos
    echo json_encode(['tiempoRestante' => $tiempoRestante]);
} else {
    echo json_encode(['error' => 'Partida no encontrada']);
}
