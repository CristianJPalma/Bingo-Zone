<?php
header('Content-Type: application/json');
include '../../conexion/Conexion.php';
session_start();

// Verifica si el usuario está autenticado
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['error' => 'Usuario no autenticado']);
    exit;
}

$conexion = new Conexion();
$pdo = $conexion->connect();

$data = json_decode(file_get_contents('php://input'), true);
$codigoPartida = $data['codigoPartida'];
$idUsuario = $_SESSION['usuario_id']; // Obtener el ID del usuario de la sesión
$cartones = $data['cartones'];

// Obtener el id_partida desde el código de la partida
$stmt = $pdo->prepare("SELECT id_partida FROM partida WHERE codigo_partida = :codigo_partida");
$stmt->execute(['codigo_partida' => $codigoPartida]);
$idPartida = $stmt->fetchColumn();

if (!$idPartida) {
    echo json_encode(['success' => false, 'error' => 'Partida no encontrada']);
    exit;
}

// Guardar cada cartón en la base de datos
foreach ($cartones as $index => $cartonNumeros) {
    $numeroCarton = $index + 1; // Para indicar el número de cartón (1, 2 o 3)
    $numeros = json_encode($cartonNumeros); // Convierte los números a formato JSON

    $query = "INSERT INTO cartones (id_partida, id_usuario, numero_carton, numeros)
              VALUES (:id_partida, :id_usuario, :numero_carton, :numeros)
              ON CONFLICT (id_partida, id_usuario, numero_carton) DO UPDATE SET numeros = EXCLUDED.numeros";
    
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':id_partida', $idPartida);
    $stmt->bindParam(':id_usuario', $idUsuario);
    $stmt->bindParam(':numero_carton', $numeroCarton);
    $stmt->bindParam(':numeros', $numeros);
    $stmt->execute();
}

echo json_encode(['success' => true]);
?>
