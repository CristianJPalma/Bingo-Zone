<?php
include '../conexion/Conexion.php';

// Crear una instancia de la clase Conexion
$conexion = new Conexion();
$pdo = $conexion->connect();
session_start();

// Obtener el código de la partida y la acción desde la URL
$codigoPartida = $_GET['codigo'] ?? '';
$accion = $_GET['accion'] ?? '';

// Inicializar un arreglo de respuesta
$response = ['codigo' => $codigoPartida, 'miembros' => [], 'esCreador' => false];
// Accion para salir de la partida
if ($accion === 'salir' && isset($_SESSION['usuario_id'])) {
    $id_usuario = $_SESSION['usuario_id'];

    // Obtener el ID de la partida usando el código
    $stmt = $pdo->prepare("SELECT id_partida FROM partida WHERE codigo_partida = :codigo_partida");
    $stmt->execute(['codigo_partida' => $codigoPartida]);
    $partida = $stmt->fetch();

    if ($partida) {
        $idPartida = $partida['id_partida'];

        // Eliminar la relación del usuario con la partida
        $stmtDelete = $pdo->prepare("DELETE FROM usuarios_partidas WHERE id_usuario = :id_usuario AND id_partida = :id_partida");
        $stmtDelete->execute(['id_usuario' => $id_usuario, 'id_partida' => $idPartida]);

        // Verificar si quedan otros usuarios en la partida
        $stmtCheck = $pdo->prepare("SELECT COUNT(*) as count FROM usuarios_partidas WHERE id_partida = :id_partida");
        $stmtCheck->execute(['id_partida' => $idPartida]);
        $count = $stmtCheck->fetchColumn();

        if ($count == 0) {
            // No quedan usuarios, eliminar la partida
            $stmtDeletePartida = $pdo->prepare("DELETE FROM partida WHERE id_partida = :id_partida");
            $stmtDeletePartida->execute(['id_partida' => $idPartida]);

            $response['mensaje'] = 'Has salido de la partida y la partida ha sido eliminada, ya que no quedan jugadores.';
        } else {
            $response['mensaje'] = 'Has salido de la partida exitosamente.';
        }
    } else {
        $response['error'] = 'No se encontró la partida.';
    }
}

if ($codigoPartida) {
    // Obtener el ID de la partida y el ID del creador usando el código
    $stmt = $pdo->prepare("SELECT id_partida, id_creador FROM partida WHERE codigo_partida = :codigo_partida");
    $stmt->execute(['codigo_partida' => $codigoPartida]);
    $partida = $stmt->fetch();

    // Verificar si se encontró la partida
    if ($partida) {
        $idPartida = $partida['id_partida'];
        $idCreador = $partida['id_creador'];
        
        // Determinar si el usuario actual es el creador de la partida
        if (isset($_SESSION['usuario_id']) && $_SESSION['usuario_id'] == $idCreador) {
            $response['esCreador'] = true;
        }

        // Obtener los miembros de la partida incluyendo la imagen de perfil
        $stmtMiembros = $pdo->prepare("
            SELECT usuario.nombre_pantalla, usuario.imagen_perfil 
            FROM usuarios_partidas 
            JOIN usuario ON usuario.id = usuarios_partidas.id_usuario 
            WHERE usuarios_partidas.id_partida = :id_partida
        ");
        $stmtMiembros->execute(['id_partida' => $idPartida]);
        $miembros = $stmtMiembros->fetchAll();

        // Agregar los nombres de pantalla y la imagen de perfil al arreglo de respuesta
        foreach ($miembros as $miembro) {
            $response['miembros'][] = [
                'nombre' => $miembro['nombre_pantalla'],
                'imagen' => $miembro['imagen_perfil']
            ];
        }
    }

    // Si se solicita una actualización de miembros
    if ($accion === 'actualizar') {
        $jugadores = [];

        foreach ($miembros as $miembro) {
            $jugadores[] = [
                'nombre' => $miembro['nombre_pantalla'],
                'imagen' => $miembro['imagen_perfil']
            ];
        }

        // Enviar solo los nombres de los jugadores y sus imágenes en formato JSON
        header('Content-Type: application/json');
        echo json_encode($jugadores);
        exit();
    }
}

// Enviar respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($response);
