<?php
require_once '../conexion/Conexion.php';

class Sala {
    private $conxpdo;
    private $codigo_partida;

    public function __construct() {
        $database = new Conexion();
        $this->conxpdo = $database->connect();
    }

    public function generarCodigo() {
        // Genera un código de 6 dígitos con ceros a la izquierda si es necesario
        $this->codigo_partida = str_pad(rand(0, 999999), 6, '0', STR_PAD_LEFT);
    }

    public function crearSala($id_creador) {
        $this->generarCodigo();
    
        // Iniciar una transacción para asegurar la atomicidad de las operaciones
        $this->conxpdo->beginTransaction();
        
        try {
            // Insertar la nueva sala
            $sql = "INSERT INTO partida (codigo_partida, id_creador) VALUES (:codigo_partida, :id_creador)";
            $stmt = $this->conxpdo->prepare($sql);
            $stmt->execute(['codigo_partida' => $this->codigo_partida, 'id_creador' => $id_creador]);
            
            // Obtener el id de la nueva partida
            $id_partida = $this->conxpdo->lastInsertId();
            
            // Insertar al creador en la tabla usuario_partida
            $sql = "INSERT INTO usuarios_partidas (id_usuario, id_partida) VALUES (:id_usuario, :id_partida)";
            $stmt = $this->conxpdo->prepare($sql);
            $stmt->execute(['id_usuario' => $id_creador, 'id_partida' => $id_partida]);
    
            // Confirmar la transacción
            $this->conxpdo->commit();
    
            return $this->codigo_partida;
        } catch (PDOException $e) {
            // Revertir la transacción en caso de error
            $this->conxpdo->rollBack();
            throw $e; // Lanzar la excepción para manejarla en el método llamador
        }
    }

    public function obtenerJugadores($codigoSala) {
        // Obtenemos los nombres de los jugadores en una partida específica
        $sql = "SELECT u.nombre 
                FROM usuario u
                JOIN Usuarios_Partidas up ON u.id_usuario = up.id_usuario
                JOIN partida p ON up.id_partida = p.id_partida
                WHERE p.codigo_partida = :codigoSala";
        $stmt = $this->conxpdo->prepare($sql);
        $stmt->execute(['codigoSala' => $codigoSala]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC); // Devuelve los nombres de los jugadores
    }
}
?>
