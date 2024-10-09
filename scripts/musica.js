document.addEventListener("DOMContentLoaded", function() {
    const music = document.getElementById("background-music");
    const volumeControl = document.getElementById("volume");

    // Cargar el volumen desde localStorage
    const savedVolume = localStorage.getItem("musicVolume");
    if (savedVolume) {
        music.volume = savedVolume; // Establece el volumen guardado
        volumeControl.value = savedVolume; // Actualiza el control deslizante
    } else {
        music.volume = 0.5; // Valor por defecto
    }

    // Función para cambiar el volumen
    volumeControl.addEventListener("input", function() {
        const volume = volumeControl.value;
        music.volume = volume; // Cambia el volumen de la música
        localStorage.setItem("musicVolume", volume); // Guarda el volumen en localStorage
    });

    // Iniciar la música automáticamente
    music.play();
});
document.getElementById('music').addEventListener('mouseover','click', function() {
    var audio = document.getElementById('background-music');
    audio.play();
});