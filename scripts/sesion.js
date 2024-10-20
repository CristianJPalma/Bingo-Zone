
// Verifica si hay sesion iniciada
document.addEventListener("DOMContentLoaded", function() {
    fetch('../php/sesion.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.text(); // O response.json() si devuelves JSON
        })
        .then(data => {
            if (data) {
                // Si hay un mensaje de error, redirigir a la página de login
                window.location.href = '../public/login.html'; // Redirige a la página de login
            }
        })
        .catch(error => {
            console.error("Error al verificar la sesión:", error);
        });
});
