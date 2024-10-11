<?php
// Crear un arreglo de personas
$personas = [
    [   
        "posicion" => 1,
        "nombre" => "Juan",
        "porcentaje" => "100%",
        "bingoCoins" => 350,
        "imagen"=> "../imgs/iconos/bingocoin.png"
    ],
    [
        "posicion" => 2,
        "nombre" => "Pedro",
        "porcentaje" => "80%",
        "bingoCoins" => 290,
        "imagen"=> "../imgs/iconos/bingocoin.png"

    ],
    [
        "posicion" => 3,
        "nombre" => "Raul",
        "porcentaje" => "50%",
        "bingoCoins" => 150,
        "imagen"=> "../imgs/iconos/bingocoin.png"
    ],
    [
        "posicion" => 4,
        "nombre" => "Daniel",
        "porcentaje" => "20%",
        "bingoCoins" => 0,
        "imagen"=> "../imgs/iconos/bingocoin.png"
    ],
    [
        "posicion" => 5,
        "nombre" => "Cristian",
        "porcentaje" => "0%",
        "bingoCoins" => 0,
        "imagen"=> "../imgs/iconos/bingocoin.png"
    ]
];

// Establecer el encabezado para indicar que la salida será JSON
header('Content-Type: application/json');

// Convertir el arreglo a formato JSON y mostrarlo
echo json_encode($personas);
?>
