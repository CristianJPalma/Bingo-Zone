<?php
require_once 'Conexion.php';


class Usuario {
    private $conxpdo;

    public function __construct() {
        $database = new  Conexion();
        $this->conxpdo = $database->connect();
    }

    public function obtenerUsuarios() {
        $query = "SELECT * FROM usuario";
        $stmt = $this->conxpdo->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function insertarUsuario($nombre, $apellido, $nombre_pantalla, $correo, $contrasena){
        // Verificar si el correo ya existe
        $queryVerificar = "SELECT * FROM usuario WHERE correo = :correo";
        $stmtVerificar = $this->conxpdo->prepare($queryVerificar);
        $stmtVerificar->bindParam(':correo', $correo);
        $stmtVerificar->execute();

    if ($stmtVerificar->rowCount() > 0) {
        return "El correo ya está registrado.";
    }
        $contrasena = password_hash($contrasena, PASSWORD_BCRYPT);
        $query = "INSERT INTO usuario (nombre, apellido, nombre_pantalla, correo, contrasena) VALUES (:nombre, :apellido, :nombre_pantalla, :correo, :contrasena)";
        $stmt = $this->conxpdo->prepare($query);
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
    public function logearUsuario($correo, $contrasena) {
        $query = "SELECT * FROM usuario WHERE correo = :correo";
        $stmt = $this->conxpdo->prepare($query);
        $stmt->bindParam(':correo', $correo);
        $stmt->execute();

        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($contrasena, $usuario['contrasena'])) {
            return $usuario; // Contraseña correcta, devuelve los datos del usuario
        } else {
            return false; // Contraseña incorrecta o usuario no encontrado
        }
    }
    
    public function obtenerDatosUsuario($usuario_id) {
        $query = "SELECT * FROM usuario WHERE id = :id";
        $stmt = $this->conxpdo->prepare($query);
        $stmt->bindParam(':id', $usuario_id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna los datos del usuario como un arreglo asociativo
    }
    public function actualizarDatos($usuario_id, $nombre, $apellido, $nombre_pantalla, $correo, $imagen_perfil) {
        $query = $this->conxpdo->prepare("UPDATE usuario SET nombre = :nombre, apellido = :apellido, nombre_pantalla = :nombre_pantalla, correo = :correo, imagen_perfil = :imagen_perfil WHERE id = :id");
        $query->bindParam(":nombre", $nombre);
        $query->bindParam(":apellido", $apellido);
        $query->bindParam(":nombre_pantalla", $nombre_pantalla);
        $query->bindParam(":correo", $correo);
        $query->bindParam(":imagen_perfil", $imagen_perfil);
        $query->bindParam(":id", $usuario_id);
        return $query->execute();
    }
    
    

}
?>
