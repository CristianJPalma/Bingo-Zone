
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