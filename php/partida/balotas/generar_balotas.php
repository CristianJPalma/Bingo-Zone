<?php
header('Content-Type: application/json');
include '../../conexion/Conexion.php';
session_start();

$conexion = new Conexion();
$pdo = $conexion->connect();

$codigoPartida = $_GET['codigo'];

// Obtener los datos de la partida
$stmt = $pdo->prepare("SELECT numeros_generados, numero_balotas, tiempo_inicio FROM partida WHERE codigo_partida = :codigo_partida");
$stmt->execute(['codigo_partida' => $codigoPartida]);
$partida = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$partida) {
    echo json_encode(['error' => 'Partida no encontrada']);
    exit;
}

$numerosGenerados = json_decode($partida['numeros_generados'], true) ?? [];
$numeroBalotas = (int)$partida['numero_balotas'];
$tiempoInicio = $partida['tiempo_inicio'];

// Calcular el tiempo transcurrido desde el inicio de la partida
$tiempoTranscurrido = time() - strtotime($tiempoInicio);

// Intervalo en segundos (cada cuánto se genera un nuevo número)
$intervalo = 5; // 5 segundos

// ¿Cuántos números deben haberse generado hasta ahora?
$numeroGeneraciones = floor($tiempoTranscurrido / $intervalo);

// Verificar si ya se generaron todos los números
if (count($numerosGenerados) >= $numeroBalotas) {
    echo json_encode([
        'mensaje' => 'Todos los números han sido generados.',
        'numeros_generados' => $numerosGenerados,
        'nuevo_numero' => null
    ]);
    exit;
}

// Si aún no se han generado todos los números, generar uno más:
if (count($numerosGenerados) < $numeroGeneraciones) {
    do {
        // Generar un nuevo número aleatorio
        $nuevoNumero = rand(1, $numeroBalotas);
    } while (in_array($nuevoNumero, $numerosGenerados)); // Evitar duplicados

    // Determinar la letra según el número
    $letra = '';
    if ($nuevoNumero <= 15) $letra = 'B';
    elseif ($nuevoNumero <= 30) $letra = 'I';
    elseif ($nuevoNumero <= 45) $letra = 'N';
    elseif ($nuevoNumero <= 60) $letra = 'G';
    else $letra = 'O';

    // Agregar el nuevo número a la lista de números generados
    $numerosGenerados[] = $nuevoNumero;

    // Actualizar el campo `numeros_generados` en la base de datos
    $stmt = $pdo->prepare("UPDATE partida SET numeros_generados = :numeros_generados WHERE codigo_partida = :codigo_partida");
    $stmt->execute([
        'numeros_generados' => json_encode($numerosGenerados),
        'codigo_partida' => $codigoPartida
    ]);
}

// Responder con los números generados y el último número generado
echo json_encode([
    'nuevo_numero' => isset($nuevoNumero) ? ['letra' => $letra, 'numero' => $nuevoNumero] : null,
    'numeros_generados' => array_map(function ($num) {
        $letra = '';
        if ($num <= 15) $letra = 'B';
        elseif ($num <= 30) $letra = 'I';
        elseif ($num <= 45) $letra = 'N';
        elseif ($num <= 60) $letra = 'G';
        else $letra = 'O';
        
        return ['numero' => $num, 'letra' => $letra];
    }, $numerosGenerados)
]);
?>
