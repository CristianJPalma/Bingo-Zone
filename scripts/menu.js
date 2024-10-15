

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


// Arreglo con las rutas de las imágenes
const images = ['../imgs/capi/capi-furia.png', '../imgs/capi/capi-baño.png',
     '../imgs/capi/capi-idea.png'];
let currentImageIndex = 0;

// Al hacer clic en el botón, cambia la imagen de perfil
document.getElementById('cambiar').addEventListener('click', () => {
    // Obtén la imagen actual
    const profilePic = document.getElementById('imgPerfil');
    
    // Incrementa el índice de la imagen, volviendo al inicio si se pasa del último
    currentImageIndex = (currentImageIndex + 1) % images.length;
    
    // Cambia la ruta de la imagen a la siguiente en el arreglo
    profilePic.src = images[currentImageIndex];
});