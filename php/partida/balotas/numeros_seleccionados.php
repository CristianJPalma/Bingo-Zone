<?php
include '../../conexion/Conexion.php';
session_start();

$conexion = new Conexion();
$pdo = $conexion->connect();

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['error' => 'Usuario no autenticado']);
    exit;
}

$idUsuario = $_SESSION['usuario_id'];
$input = json_decode(file_get_contents('php://input'), true);

// Validar datos recibidos
if (empty($input['codigoPartida']) || empty($input['numeroCarton']) || !isset($input['numero']) || empty($input['accion'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

$codigoPartida = $input['codigoPartida'];
$numeroCarton = $input['numeroCarton'];
$numero = $input['numero'];
$accion = $input['accion'];

try {

    if ($accion === 'agregar') {
        // Usamos la función JSONB para agregar un número al array
        $sql = "UPDATE cartones SET numeros_seleccionados = COALESCE(numeros_seleccionados, '[]'::jsonb) || :numero::jsonb
                WHERE numero_carton = :numeroCarton AND id_partida = (
                    SELECT id_partida FROM partida WHERE codigo_partida = :codigoPartida
                ) AND id_usuario = :idUsuario";
    } elseif ($accion === 'eliminar') {
        // Usamos JSONB para eliminar un número del array
        $sql = "UPDATE cartones SET numeros_seleccionados = 
                    (SELECT jsonb_agg(value) 
                     FROM jsonb_array_elements(numeros_seleccionados) 
                     WHERE value != :numero::jsonb)
                WHERE numero_carton = :numeroCarton AND id_partida = (
                    SELECT id_partida FROM partida WHERE codigo_partida = :codigoPartida
                ) AND id_usuario = :idUsuario";
    } else {
        echo json_encode(['error' => 'Acción no válida']);
        exit;
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':numero' => $numero,
        ':numeroCarton' => $numeroCarton,
        ':codigoPartida' => $codigoPartida,
        ':idUsuario' => $idUsuario
    ]);

    echo json_encode(['mensaje' => 'Número actualizado correctamente']);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
