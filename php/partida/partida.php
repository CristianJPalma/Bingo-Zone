<?php
// Incluir la clase de conexión
include '../conexion/Conexion.php';

// Crear una instancia de la clase Conexion
$conexion = new Conexion();
$pdo = $conexion->connect();

// Obtener el código de la partida desde la URL
$codigoPartida = $_GET['codigo'] ?? '';

// Inicializar un arreglo de respuesta
$response = ['codigo' => $codigoPartida, 'miembros' => []];

// Si hay un código de partida, realizar las consultas
if ($codigoPartida) {
    // Obtener el ID de la partida usando el código
    $stmt = $pdo->prepare("SELECT id_partida FROM partida WHERE codigo_partida = :codigo_partida");
    $stmt->execute(['codigo_partida' => $codigoPartida]);
    $partida = $stmt->fetch();

    // Verificar si se encontró la partida
    if ($partida) {
        $idPartida = $partida['id_partida'];

        // Consulta para obtener los miembros de la partida
        $stmtMiembros = $pdo->prepare("
            SELECT usuario.nombre_pantalla 
            FROM usuarios_partidas 
            JOIN usuario ON usuario.id = usuarios_partidas.id_usuario 
            WHERE usuarios_partidas.id_partida = :id_partida
        ");
        $stmtMiembros->execute(['id_partida' => $idPartida]);
        $miembros = $stmtMiembros->fetchAll();

        // Agregar los nombres de pantalla al arreglo de respuesta
        foreach ($miembros as $miembro) {
            $response['miembros'][] = $miembro['nombre_pantalla'];
        }
    }
    if (isset($_GET['accion']) && $_GET['accion'] === 'actualizar') {
        $jugadores = [];
        
        foreach ($miembros as $miembro) {
            $jugadores[] = ['nombre' => $miembro['nombre_pantalla']];
        }
        
        // Devolver los jugadores en formato JSON
        header('Content-Type: application/json');
        echo json_encode($jugadores);
        exit(); // Terminar el script aquí para evitar mostrar el HTML
    }
    
}

// Enviar respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($response);
