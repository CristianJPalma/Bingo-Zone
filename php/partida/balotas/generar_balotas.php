<?php
header('Content-Type: application/json');
include '../../conexion/Conexion.php';
session_start();

$conexion = new Conexion();
$pdo = $conexion->connect();

$codigoPartida = $_GET['codigo'];

// Obtener los datos de la partida
$stmt = $pdo->prepare("SELECT numeros_generados, numero_balotas FROM partida WHERE codigo_partida = :codigo_partida");
$stmt->execute(['codigo_partida' => $codigoPartida]);
$partida = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$partida) {
    echo json_encode(['error' => 'Partida no encontrada']);
    exit;
}

// Convertir los números generados a un arreglo
$numerosGenerados = json_decode($partida['numeros_generados'], true) ?? [];
$numeroBalotas = (int)$partida['numero_balotas'];

// Verificar si ya se generaron todas las balotas
if (count($numerosGenerados) >= $numeroBalotas) {
    echo json_encode([
        'mensaje' => 'Todos los números han sido generados.',
        'numeros_generados' => $numerosGenerados,
        'nuevo_numero' => null
    ]);
    exit;
}

// Generar un nuevo número único
do {
    $nuevoNumero = rand(1, $numeroBalotas);
} while (in_array($nuevoNumero, $numerosGenerados));

// Agregar el nuevo número al historial
$numerosGenerados[] = $nuevoNumero;

// Actualizar los números en la base de datos
$stmt = $pdo->prepare("UPDATE partida SET numeros_generados = :numeros_generados WHERE codigo_partida = :codigo_partida");
$stmt->execute([
    'numeros_generados' => json_encode($numerosGenerados),
    'codigo_partida' => $codigoPartida
]);

// Determinar la letra del número (B, I, N, G, O)
$letra = '';
if ($nuevoNumero <= 15) $letra = 'B';
elseif ($nuevoNumero <= 30) $letra = 'I';
elseif ($nuevoNumero <= 45) $letra = 'N';
elseif ($nuevoNumero <= 60) $letra = 'G';
else $letra = 'O';

// Responder con el nuevo número y el historial completo
echo json_encode([
    'nuevo_numero' => ['letra' => $letra, 'numero' => $nuevoNumero],
    'numeros_generados' => array_map(function ($num) use ($numeroBalotas) {
        return [
            'numero' => $num,
            'letra' => $num <= 15 ? 'B' : ($num <= 30 ? 'I' : ($num <= 45 ? 'N' : ($num <= 60 ? 'G' : 'O')))
        ];
    }, $numerosGenerados)
]);
?>
