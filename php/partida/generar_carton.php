<?php
header('Content-Type: application/json');
include '../conexion/Conexion.php';
session_start();

$conexion = new Conexion();
$pdo = $conexion->connect();
$codigoPartida = $_GET['codigo']; // Obtener el código de la partida de la URL

// Obtener la configuración de la partida
$stmt = $pdo->prepare("SELECT numero_cartones, numero_balotas FROM partida WHERE codigo_partida = :codigo_partida");
$stmt->execute(['codigo_partida' => $codigoPartida]);
$configuracion = $stmt->fetch();

if (!$configuracion) {
    echo json_encode(['error' => 'Partida no encontrada']);
    exit;
}

$cantidadCartones = $configuracion['numero_cartones'];
$cantidadBalotas = $configuracion['numero_balotas'];

// Función para generar un cartón
function generarCarton($cantidadBalotas) {
    $rangos = ($cantidadBalotas == 75) 
        ? ['B' => [1, 15], 'I' => [16, 30], 'N' => [31, 45], 'G' => [46, 60], 'O' => [61, 75]]
        : ['B' => [1, 18], 'I' => [19, 36], 'N' => [37, 54], 'G' => [55, 72], 'O' => [73, 90]];

    $carton = [];
    foreach ($rangos as $columna => [$min, $max]) {
        // Generar un array con los números en el rango
        $numeros = range($min, $max);
        
        // Mezclar los números aleatoriamente
        shuffle($numeros);
        
        // Seleccionar los primeros 5 números de la lista mezclada
        $carton[$columna] = array_slice($numeros, 0, 5);
    }

    // Quitar el valor de la posición central en la columna 'N'
    $carton['N'][2] = '';
    return $carton;
}

// Generar los cartones y almacenarlos en un arreglo
$cartones = [];
for ($i = 0; $i < $cantidadCartones; $i++) {
    $cartones[] = generarCarton($cantidadBalotas);
}

// Enviar los datos en formato JSON
echo json_encode([
    'cantidad_cartones' => $cantidadCartones,
    'cantidad_balotas' => $cantidadBalotas,
    'cartones' => $cartones
]);
?>
