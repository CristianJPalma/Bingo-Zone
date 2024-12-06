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
$stmtGanador = $pdo->prepare("
    SELECT ganador, (SELECT nombre_pantalla FROM usuario WHERE id = partida.ganador) AS nombre_pantalla
    FROM partida
    WHERE codigo_partida = :codigo
");
$stmtGanador->execute(['codigo' => $codigoPartida]);
$dataGanador = $stmtGanador->fetch(PDO::FETCH_ASSOC);

if (!$dataGanador) {
    echo json_encode(['error' => 'Partida no encontrada']);
    exit;
}

// Consultar los demás jugadores en la partida (excluyendo al ganador)
$stmtJugadores = $pdo->prepare("
    SELECT u.nombre_pantalla
    FROM usuario u
    INNER JOIN usuarios_partidas pj ON u.id = pj.id_usuario
    WHERE pj.codigo_partida = :codigo AND u.id != :ganador
    ORDER BY u.nombre_pantalla ASC
");
$stmtJugadores->execute([
    'codigo' => $codigoPartida,
    'ganador' => $dataGanador['ganador']
]);
$jugadores = $stmtJugadores->fetchAll(PDO::FETCH_ASSOC);

// Construir la respuesta
$response = [
    'mensaje' => 'Resultados de la partida',
    'ganador' => $dataGanador['nombre_pantalla'],
    'jugadores' => $jugadores
];

echo json_encode($response);
?>
