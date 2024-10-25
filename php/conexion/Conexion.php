<?php
class Conexion{
    private $host = 'localhost';
    private $dbName = 'bingozone';
    private $username = 'postgres';
    private $password = '123456';   
    private $conn;

    public function connect() {
        $this->conn = null;

        try {
            $this->conn = new PDO("pgsql:host=" . $this->host . ";dbname=" . $this->dbName, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Conexión exitosa"; // Mensaje para verificar conexión
        } catch (PDOException $e) {
            echo "Error en la conexión: " . $e->getMessage();
        }

        return $this->conn;
    }
}
?>
