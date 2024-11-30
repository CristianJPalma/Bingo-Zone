function obtenerNumerosGenerados() {
    fetch(`../php/partida/balotas/generar_balotas.php?codigo=${codigoPartida}`)
    .then(response => response.json())
    .then(data => {
        // Si hay un error, lo mostramos
        if (data.error) {
            console.error(data.error);
            return;
        }

        // Mostrar el nuevo número generado
        const nuevoNumeroElement = document.getElementById('nuevoNumero');
        if (data.nuevo_numero) {
            nuevoNumeroElement.textContent = `Nuevo número: ${data.nuevo_numero.letra} ${data.nuevo_numero.numero}`;
        } else {
            nuevoNumeroElement.textContent = 'Esperando nuevo número...';
        }

        // Mostrar los números generados en la interfaz
        const contenedor = document.getElementById('numerosGenerados');
        contenedor.innerHTML = ''; // Limpiar contenido previo

        data.numeros_generados.forEach(item => {
            const numeroElement = document.createElement('div');
            numeroElement.textContent = `${item.letra} ${item.numero}`;
            contenedor.appendChild(numeroElement);
        });

        // Si ya se generaron todos los números, ya no actualizamos más
        if (data.mensaje && data.mensaje === 'Todos los números han sido generados.') {
            clearInterval(intervaloGeneracion); // Detener la actualización continua
        }
    })
    .catch(error => {
        console.error('Error al obtener los números generados:', error);
        const contenedor = document.getElementById('numerosGenerados');
        contenedor.innerHTML = 'Error al cargar los números.';
    });
}

// Llamar a la función cada 1 segundo para actualizar los números
let intervaloGeneracion = setInterval(obtenerNumerosGenerados, 1000);

// Cargar los números cuando se carga la página por primera vez
window.onload = obtenerNumerosGenerados;
