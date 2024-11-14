<?php
header('Content-Type: application/json');
include '../../conexion/Conexion.php';
session_start();

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['error' => 'Usuario no autenticado']);
    exit;
}

$conexion = new Conexion();
$pdo = $conexion->connect();

$codigoPartida = $_GET['codigo'];
$idUsuario = $_SESSION['usuario_id'];

// Primero obtenemos el id de la partida usando el código de partida
$stmtPartida = $pdo->prepare("SELECT id_partida, numero_cartones FROM partida WHERE codigo_partida = :codigo_partida");
$stmtPartida->execute(['codigo_partida' => $codigoPartida]);
$partida = $stmtPartida->fetch();

if (!$partida) {
    echo json_encode(['error' => 'Partida no encontrada']);
    exit;
}

$idPartida = $partida['id_partida'];
$numeroCartones = $partida['numero_cartones'];

// Luego obtenemos los números de los cartones asociados a este usuario y partida
$stmtNumeros = $pdo->prepare("
    SELECT numero_carton, numeros 
    FROM cartones 
    WHERE id_partida = :id_partida AND id_usuario = :id_usuario
    ORDER BY numero_carton ASC
");
$stmtNumeros->execute([
    'id_partida' => $idPartida,
    'id_usuario' => $idUsuario
]);

// Obtenemos todos los cartones del usuario en la partida
$cartones = $stmtNumeros->fetchAll(PDO::FETCH_ASSOC);

if (empty($cartones)) {
    echo json_encode(['error' => 'No se encontraron números para este usuario en esta partida']);
} else {
    echo json_encode([
        'numero_cartones' => $numeroCartones,
        'cartones' => $cartones // Cada item tiene 'numero_carton' y 'numeros' en formato JSON
    ]);
}
?>
