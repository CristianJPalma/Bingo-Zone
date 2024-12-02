<?php
header('Content-Type: application/json');
include '../../conexion/Conexion.php';
session_start();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['error' => 'Usuario no autenticado']);
    exit;
}

$conexion = new Conexion();
$pdo = $conexion->connect();

// Obtener datos del cliente
$data = json_decode(file_get_contents('php://input'), true);
$idCarton = $data['id_carton']; // ID del cartón
$numerosSeleccionados = $data['numeros_seleccionados']; // Números seleccionados en el cartón

// Actualizar la columna 'numeros_seleccionados'
$stmt = $pdo->prepare("UPDATE cartones SET numeros_seleccionados = :numeros WHERE id_carton = :id_carton");
$stmt->execute([
    'numeros' => json_encode($numerosSeleccionados),
    'id_carton' => $idCarton
]);

echo json_encode(['success' => true]);
?>
