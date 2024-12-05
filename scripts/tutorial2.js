const tarjetaBingo = document.getElementById('tarjetaBingo');
const botonVerificar = document.getElementById('botonVerificar');
const contadorDisponible = document.getElementById('contadorDisponible');
const verificacion = document.getElementById('verificacion');
const imagenVerificacion = document.getElementById('imagen-verificacion');
let marcacionesDisponibles = 3;

tarjetaBingo.addEventListener('click', (event) => {
    const casilla = event.target.closest('.casilla-bingo');
    if (!casilla || !casilla.classList.contains('casilla-marcable')) return;

    if (marcacionesDisponibles > 0 && !casilla.classList.contains('casilla-marcada')) {
        casilla.classList.add('casilla-marcada');
        casilla.textContent = ''; // Quita el texto del número
        const circulo = document.createElement('div'); // Añade el círculo verde
        circulo.classList.add('circulo');
        casilla.appendChild(circulo);

        marcacionesDisponibles--;
        contadorDisponible.textContent = `Números disponibles: ${marcacionesDisponibles}`;

        if (marcacionesDisponibles === 0) {
            botonVerificar.classList.add('activo');
            botonVerificar.disabled = false;
        }
    }
});

botonVerificar.addEventListener('click', () => {
    if (botonVerificar.classList.contains('activo')) {
        // Mostrar pantalla de verificación
        verificacion.classList.add('verificacion-mostrar');

        // Simular verificación
        setTimeout(() => {
            // Cambiar a verificación completa
            const contenidoVerificacion = verificacion.querySelector('.contenido-verificacion');
            contenidoVerificacion.innerHTML = `
                <div class="verificacion-completa">
                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <h2>Verificado</h2>
                    <p>Cartón de Bingo verificado correctamente</p>
                </div>
            `;

            // Mostrar imagen de verificación después de 2 segundos
            setTimeout(() => {
                verificacion.classList.remove('verificacion-mostrar');
                imagenVerificacion.classList.add('imagen-verificacion-mostrar');

                // Redirigir a tutorial3.html después de 3 segundos
                setTimeout(() => {
                    window.location.href = 'tutorial3.html';
                }, 5000);
            }, 3000);
        }, 5000);
    }
});