<?php
require_once 'Conexion.php';

class Usuario {
    private $conn;

    public function __construct() {
        $database = new  Conexion();
        $this->conn = $database->connect();
    }

    public function obtenerUsuarios() {
        $query = "SELECT * FROM usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function insertarUsuario($nombre, $nombre_pantalla, $correo) {
        $query = "INSERT INTO usuario (nombre, nombre_pantalla, correo) VALUES (:nombre, :nombre_pantalla, :correo)";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':nombre_pantalla', $nombre_pantalla);
        $stmt->bindParam(':correo', $correo);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
?>
