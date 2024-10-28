<?php
class Conexion{
    private $servidor;
    private $baseDatos;
    private $puerto;
    private $usuario;
    private $password;   
    private $conxpdo;

    public function __construct(){
        $this->servidor="localhost";
        $this->baseDatos="bingozone";
        $this->puerto="5432";
        $this->usuario="postgres";
        $this->password="123456";
        $this->conxpdo=$this->connect();
    }
    
    public function connect(){
        try {
            $dsn = "pgsql:host=$this->servidor;port=$this->puerto;dbname=$this->baseDatos";
            $this->conxpdo = new PDO($dsn, $this->usuario, $this->password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Mostrar errores
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC // Establecer el modo de fetch a asociativo
            ]);
        
            //echo "Conexión exitosa a PostgreSQL";
        
        } catch (PDOException $e) {
            echo 'Error en la conexión: ' . $e->getMessage();
        }

       return $this->conxpdo;
    }
    
}
?>
