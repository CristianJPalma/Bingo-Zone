window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    
    // Esperar un segundo antes de ocultar el loader
    setTimeout(() => {
        loader.style.display = 'none'; // Oculta el loader
        content.style.display = 'block'; // Muestra el contenido
    }, 4000); // Duración de la animación
});

document.getElementById('btn').addEventListener('click', () => {
    const content1 = document.getElementById('content1');
    const content2 = document.getElementById('content2');
    // Ocultar primer contenido
    content1.classList.add('hidden');
    setTimeout(() => {
        content1.style.display = 'none';

        // Mostrar segundo contenido
        content2.classList.add('show');
    }, 200);
});