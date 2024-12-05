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

$codigoPartida = $_GET['codigo'] ?? '';
$idUsuario = $_SESSION['usuario_id'];


$stmtGanador = $pdo->prepare("SELECT ganador FROM partida WHERE codigo_partida = :codigo");
$stmtGanador->execute(['codigo' => $codigoPartida]);
$ganador = $stmtGanador->fetchColumn();

if ($ganador) {
    echo json_encode(['mensaje' => 'Ya hay un ganador: ' . $ganador]);
    exit;
}

// Obtener el modo y el cartón del jugador, así como los números generados de la partida
$stmt = $pdo->prepare("
    SELECT modo_juego, numeros, numeros_seleccionados, numeros_generados
    FROM partida
    JOIN cartones ON partida.id_partida = cartones.id_partida
    WHERE partida.codigo_partida = :codigo AND cartones.id_usuario = :id_usuario
");
$stmt->execute(['codigo' => $codigoPartida, 'id_usuario' => $idUsuario]);
$data = $stmt->fetch();

if (!$data) {
    echo json_encode(['error' => 'Datos de la partida no encontrados']);
    exit;
}

$modo = $data['modo_juego'];
$numeros = json_decode($data['numeros'], true);
$numerosSeleccionados = json_decode($data['numeros_seleccionados'], true);
$numerosGenerados = json_decode($data['numeros_generados'], true); // Nuevos números generados

// Validar si las celdas requeridas están seleccionadas
function esParteDeX($fila, $columna) {
    // Convertir explícitamente a enteros
    $fila = (int) $fila;
    $columna = (int) $columna;

    return $fila === $columna || $fila + $columna === 4;
}

function esParteDeDiagonal($fila, $columna) {
    return $fila === $columna;
}

// Asegurarse de que no se verifique la celda central
$celdaCentralFila = 2;
$celdaCentralColumna = 2;

$completo = true;

// Recorremos todos los números para ver si se cumplen las condiciones
foreach ($numeros as $colIndex => $columna) {
    foreach ($columna as $fila => $numero) {
        // Ignorar la celda central
        if ($fila == $celdaCentralFila && $colIndex == $celdaCentralColumna) {
            continue; // No verificar la celda central
        }

        // Verificar que el número está seleccionado y si ha salido en los números generados
        if (!in_array((int)$numero, $numerosSeleccionados) || !in_array((int)$numero, $numerosGenerados)) {
            $completo = false;
            break 2; // No es necesario seguir verificando una vez que encontramos un error
        }
    }
}

// Verificación de los modos de juego
if ($modo === 'equis' || $modo === 'diagonal' || $modo === 'completo') {
    // Verificar los números seleccionados en el modo completo, equis o diagonal
    $completo = true; // Inicializamos la variable como verdadera

    foreach ($numerosSeleccionados as $numeroSeleccionado) {
        if (!in_array($numeroSeleccionado, $numerosGenerados)) {
            $completo = false;
            break;
        }
    }
}

// Si no se ha completado correctamente
if ($completo) {
    $stmtActualizarGanador = $pdo->prepare("UPDATE partida SET ganador = :id_usuario WHERE codigo_partida = :codigo");
    $stmtActualizarGanador->execute(['id_usuario' => $idUsuario, 'codigo' => $codigoPartida]);
    echo json_encode(['mensaje' => '¡Bingo correcto!', 'ganador' => $idUsuario]);
    exit;
}

echo json_encode(['error' => 'No has completado las celdas necesarias para el modo']);