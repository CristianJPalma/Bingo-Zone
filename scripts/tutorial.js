function changeImages() {
    const images = [
        document.getElementById('image1'),
        document.getElementById('image2'),
        document.getElementById('image3'),
        document.getElementById('image4')
    ];

    // Encontrar el índice de la imagen actualmente visible
    const currentIndex = images.findIndex(img => img.style.opacity === '1' || img.classList.contains('active'));

    // Si estamos en la última imagen, redirigir
    if (currentIndex === 3) {
        window.location.href = 'tutorial2.html';
        return;
    }

    // Ocultar todas las imágenes
    images.forEach((img, index) => {
        img.style.opacity = index === currentIndex + 1 ? '1' : '0';
    });
}

  //funcion carton

 