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

// Obtener el id de la partida y el número de cartones
$stmtPartida = $pdo->prepare("
    SELECT id_partida, numero_cartones 
    FROM partida 
    WHERE codigo_partida = :codigo_partida
");
$stmtPartida->execute(['codigo_partida' => $codigoPartida]);
$partida = $stmtPartida->fetch();

if (!$partida) {
    echo json_encode(['error' => 'Partida no encontrada']);
    exit;
}

$idPartida = $partida['id_partida'];
$numeroCartones = $partida['numero_cartones'];

// Obtener los números de los cartones y los números seleccionados
$stmtNumeros = $pdo->prepare("
    SELECT numero_carton, numeros, COALESCE(numeros_seleccionados, '[]') AS numeros_seleccionados
    FROM cartones 
    WHERE id_partida = :id_partida AND id_usuario = :id_usuario
    ORDER BY numero_carton ASC
");
$stmtNumeros->execute([
    'id_partida' => $idPartida,
    'id_usuario' => $idUsuario
]);

$cartones = $stmtNumeros->fetchAll(PDO::FETCH_ASSOC);

if (empty($cartones)) {
    echo json_encode(['error' => 'No se encontraron cartones para este usuario en esta partida']);
} else {
    echo json_encode([
        'numero_cartones' => $numeroCartones,
        'cartones' => $cartones // Incluye 'numero_carton', 'numeros' y 'numeros_seleccionados'
    ]);
}
?>
