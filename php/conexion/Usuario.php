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

    public function insertarUsuario($nombre, $apellido, $nombre_pantalla, $correo, $contrasena){
        // Verificar si el correo ya existe
        $queryVerificar = "SELECT * FROM usuario WHERE correo = :correo";
        $stmtVerificar = $this->conn->prepare($queryVerificar);
        $stmtVerificar->bindParam(':correo', $correo);
        $stmtVerificar->execute();

    if ($stmtVerificar->rowCount() > 0) {
        return "El correo ya está registrado.";
    }
        $contrasena = password_hash($contrasena, PASSWORD_BCRYPT);
        $query = "INSERT INTO usuario (nombre, apellido, nombre_pantalla, correo, contrasena) VALUES (:nombre, :apellido, :nombre_pantalla, :correo, :contrasena)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellido', $apellido);
        $stmt->bindParam(':nombre_pantalla', $nombre_pantalla);
        $stmt->bindParam(':correo', $correo);
        $stmt->bindParam(':contrasena',$contrasena);
        try {
            if ($stmt->execute()) {
                return true; // Devuelve true si la inserción fue exitosa
            }
        } catch (PDOException $e) {
            // Devuelve el mensaje de error si ocurre una excepción
            return "Error al insertar usuario: " . $e->getMessage();
        }
    
        return false;
    }
    public function logearUsuario($correo, $password){
        $query = "SELECT * FROM usuario WHERE correo = :correo";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':correo', $correo);
        $stmt->execute();
    
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($usuario && password_verify($password, $usuario['password'])) {
            return $usuario; // Contraseña correcta, retorna los datos del usuario
        } else {
            return false; // Contraseña incorrecta
        }
    }
}
?>
