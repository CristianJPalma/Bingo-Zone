<?php

    $conexion = mysqli_connect("localhost", "root", "","login_register");

    if($conexion){
        echo 'Conexion correcta';
    }else{
        echo 'No se pudo conectar';
    }