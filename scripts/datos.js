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