fetch('../php/conexion/mostrar_datos.php')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                    document.getElementById('nombre_pantalla').textContent = 'Invitado';
                } else {
                    // Mostrar el nombre del usuario en el HTML
                    document.getElementById('nombre_pantalla').textContent = data.nombre_pantalla;
                }
            })
            .catch(error => console.error('Error al obtener datos del usuario:', error));
            document.addEventListener("DOMContentLoaded", function() {
                fetch("../php/conexion/mostrar_datos.php")
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            console.error(data.error);
                        } else {
                            document.getElementById("imagen_perfil").src = data.imagen_perfil;
                        }
                    })
                    .catch(error => console.error("Error al obtener datos:", error));
            });