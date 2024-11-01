        // Función para verificar sesión al cargar la página
        document.addEventListener("DOMContentLoaded", function() {
            fetch("../php/verificar_sesion.php")
                .then(response => response.json())
                .then(data => {
                    if (data.status === "error") {
                        // Redirigir al formulario de inicio de sesión si no hay sesión activa
                        window.location.href = "../public/login.html";
                    }
                })
                .catch(error => console.error("Error al verificar la sesión:", error));
        });