<?php
require_once 'sala.php';
require_once '../usuario/Usuario.php';

// Inicia sesión y verifica que el usuario esté autenticado
session_start();
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['error' => 'Usuario no autenticado']);
    exit;
}

$usuario_id = $_SESSION['usuario_id']; // ID del usuario que se quiere unir
$codigo_partida = $_POST['codigo_partida']; // Código de partida que ingresó el usuario

try {
    // Verificar si existe la partida con el código proporcionado
    $database = new Conexion();
    $pdo = $database->connect();

    // Obtener el id de la partida con el código
    $stmt = $pdo->prepare("SELECT id_partida FROM partida WHERE codigo_partida = :codigo_partida");
    $stmt->execute(['codigo_partida' => $codigo_partida]);
    $partida = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$partida) {
        echo json_encode(['error' => 'Partida no encontrada']);
        exit;
    }

    $id_partida = $partida['id_partida'];

    // Insertar el usuario en la partida
    $stmt = $pdo->prepare("INSERT INTO usuarios_partidas (id_usuario, id_partida) VALUES (:id_usuario, :id_partida)");
    $stmt->execute(['id_usuario' => $usuario_id, 'id_partida' => $id_partida]);

    echo json_encode(['mensaje' => 'Te has unido a la partida con éxito']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al unirse a la partida: ' . $e->getMessage()]);
}
?>
