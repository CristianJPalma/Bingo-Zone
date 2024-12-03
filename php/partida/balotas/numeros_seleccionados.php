<?php
header('Content-Type: application/json');
include '../../conexion/Conexion.php';
session_start();

$conexion = new Conexion();
$conn = $conexion->connect();

try {
    // Verificar que se haya incluido el archivo de conexión previamente
    if (!isset($conn)) {
        throw new Exception("Conexión a la base de datos no encontrada");
    }

    // Obtener el cuerpo de la solicitud
    $input = json_decode(file_get_contents('php://input'), true);

    // Verificar que los datos requeridos estén presentes
    if (!isset($input['codigoPartida'], $input['idCarton'], $input['numero'], $input['accion'])) {
        throw new Exception("Datos incompletos");
    }

    $codigoPartida = $input['codigoPartida'];
    $idCarton = $input['idCarton'];
    $numero = $input['numero'];
    $accion = $input['accion'];

    // Validar acción
    if (!in_array($accion, ['agregar', 'eliminar'])) {
        throw new Exception("Acción no válida");
    }

    // Obtener los números seleccionados actuales del cartón
    $query = $conn->prepare("SELECT numeros_seleccionados FROM cartones WHERE id_carton = :idCarton");
    $query->bindParam(':idCarton', $idCarton, PDO::PARAM_INT);
    $query->execute();
    $result = $query->fetch(PDO::FETCH_ASSOC);

    if (!$result) {
        throw new Exception("Cartón no encontrado");
    }

    $numerosSeleccionados = json_decode($result['numeros_seleccionados'], true) ?: [];

    // Actualizar los números seleccionados según la acción
    if ($accion === 'agregar') {
        if (!in_array($numero, $numerosSeleccionados)) {
            $numerosSeleccionados[] = $numero;
        }
    } elseif ($accion === 'eliminar') {
        $numerosSeleccionados = array_filter($numerosSeleccionados, fn($n) => $n !== $numero);
    }

    // Guardar los números actualizados en la base de datos en formato JSON
    $numerosSeleccionadosJson = json_encode($numerosSeleccionados);
    $updateQuery = $conn->prepare("UPDATE cartones SET numeros_seleccionados = :numeros WHERE id_carton = :idCarton");
    $updateQuery->bindParam(':numeros', $numerosSeleccionadosJson, PDO::PARAM_STR);
    $updateQuery->bindParam(':idCarton', $idCarton, PDO::PARAM_INT);
    $updateQuery->execute();

    // Enviar respuesta al cliente
    echo json_encode([
        'mensaje' => 'Número actualizado correctamente',
        'numerosSeleccionados' => $numerosSeleccionados
    ]);
} catch (Exception $e) {
    // Manejar errores
    http_response_code(400); // Código de error para solicitudes incorrectas
    echo json_encode(['error' => $e->getMessage()]);
}
