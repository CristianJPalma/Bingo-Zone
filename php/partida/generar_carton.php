<?php
include '../conexion/Conexion.php';
session_start();

$conexion = new Conexion();
$pdo = $conexion->connect();
$codigoPartida = $_GET['codigo'];

// Obtener la configuración de la partida
$stmt = $pdo->prepare("SELECT numero_balotas, numero_cartones FROM partida WHERE codigo_partida = :codigo_partida");
$stmt->execute(['codigo_partida' => $codigoPartida]);
$configuracion = $stmt->fetch();

$cantidadCartones = $configuracion['numero_cartones'];
$cantidadBalotas = $configuracion['numero_balotas'];

// Función para generar un cartón
function generarCarton($cantidadBalotas) {
    $rangos = ($cantidadBalotas == 75) 
        ? ['B' => [1, 15], 'I' => [16, 30], 'N' => [31, 45], 'G' => [46, 60], 'O' => [61, 75]]
        : ['B' => [1, 18], 'I' => [19, 36], 'N' => [37, 54], 'G' => [55, 72], 'O' => [73, 90]];
    
    $carton = [];
    foreach ($rangos as $columna => [$min, $max]) {
        $carton[$columna] = array_rand(array_flip(range($min, $max)), 5);
    }
    
    // Quitar el valor de la posición central en la columna 'N'
    $carton['N'][2] = ''; 
    return $carton;
}

// Generar los cartones y mostrarlos
$cartones = [];
for ($i = 0; $i < $cantidadCartones; $i++) {
    $cartones[] = generarCarton($cantidadBalotas);
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Cartón de Bingo</title>
</head>
<body>
    <?php foreach ($cartones as $carton): ?>
        <table border="1">
            <tr>
                <th>B</th><th>I</th><th>N</th><th>G</th><th>O</th>
            </tr>
            <?php for ($fila = 0; $fila < 5; $fila++): ?>
                <tr>
                    <?php foreach (['B', 'I', 'N', 'G', 'O'] as $columna): ?>
                        <td><?= $carton[$columna][$fila] ?></td>
                    <?php endforeach; ?>
                </tr>
            <?php endfor; ?>
        </table>
    <?php endforeach; ?>

    <button id="cambiarNumeros">Cambiar Números</button>

    <script>
    document.getElementById('cambiarNumeros').addEventListener('click', function() {
        location.reload();
    });
    </script>
</body>
</html>
