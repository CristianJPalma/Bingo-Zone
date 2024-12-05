const urlParams = new URLSearchParams(window.location.search);
const codigoPartida = urlParams.get('codigo');

function obtenerNumerosGenerados() {
    fetch(`../php/partida/balotas/generar_balotas.php?codigo=${codigoPartida}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }

            // Actualizamos la lista de números generados
            const contenedor = document.getElementById('numerosGenerados');
            const numeros = data.numeros_generados.slice(-5); // Obtén solo los últimos 5 números
            contenedor.innerHTML = ''; // Limpia el contenedor

            numeros.forEach(item => {
                const numeroElement = document.createElement('div');
                numeroElement.textContent = `${item.letra} ${item.numero}`;
                contenedor.appendChild(numeroElement);
            });

            // Si todos los números ya se generaron, detenemos la actualización
            if (data.mensaje && data.mensaje === 'Todos los números han sido generados.') {
                clearInterval(intervaloGeneracion);
            }
        })
        .catch(error => {
            console.error('Error al obtener los números generados:', error);
        });
}


// Llamar a la función cada 1 segundo para actualizar los números
let intervaloGeneracion = setInterval(obtenerNumerosGenerados, 1000);

// Cargar los números cuando se carga la página por primera vez
window.onload = obtenerNumerosGenerados;
