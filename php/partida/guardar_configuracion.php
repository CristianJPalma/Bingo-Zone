<?php
include '../conexion/Conexion.php';

// Configurar las cabeceras para JSON
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$codigoPartida = $data['codigoPartida'] ?? '';
$modo_juego = $data['modo'] ?? '';
$numero_cartones = $data['cartones'] ?? '';
$numero_balotas = $data['numeros'] ?? '';

// Validar que el código de la partida y el modo no estén vacíos
if (empty($codigoPartida)|| empty($numero_balotas) || empty($modo_juego) || empty($numero_cartones)) {
    echo json_encode(['mensaje' => 'Código de partida o modo de juego no especificado']);
    exit();
}

// Crear una instancia de la conexión
$conexion = new Conexion();
$pdo = $conexion->connect();

try {
    // Actualizar el modo de la partida
    $stmt = $pdo->prepare("UPDATE partida SET numero_balotas= :numero_balotas,  modo_juego = :modo_juego, numero_cartones = :numero_cartones WHERE codigo_partida = :codigo_partida");
    $stmt->execute(['numero_balotas' => $numero_balotas, 'modo_juego' => $modo_juego, 'numero_cartones' => $numero_cartones, 'codigo_partida' => $codigoPartida]);

    // Comprobar si se actualizó alguna fila
    if ($stmt->rowCount() > 0) {
        echo json_encode(['mensaje' => 'Modo de juego actualizado exitosamente']);
    } else {
        echo json_encode(['mensaje' => 'No se encontró una partida con el código especificado']);
    }
} catch (PDOException $e) {
    echo json_encode(['mensaje' => 'Error al actualizar el modo: ' . $e->getMessage()]);
}
?>
