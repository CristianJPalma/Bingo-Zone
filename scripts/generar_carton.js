
const urlParams = new URLSearchParams(window.location.search);
const codigoPartida = urlParams.get('codigo');


function cargarCartones() {
    fetch(`../php/partida/carton/generar_carton.php?codigo=${codigoPartida}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('cartonesContainer').innerText = data.error;
                return;
            }

            const cartonesContainer = document.getElementById('cartonesContainer');
            cartonesContainer.innerHTML = ''; // Limpiar el contenido anterior

            // Guardamos los cartones generados para enviarlos más tarde
            let cartonesGenerados = [];

            data.cartones.forEach((carton, index) => {
                const table = document.createElement('table');
                const headerRow = document.createElement('tr');
                ['B', 'I', 'N', 'G', 'O'].forEach(letra => {
                    const th = document.createElement('th');
                    th.innerText = letra;
                    headerRow.appendChild(th);
                });
                table.appendChild(headerRow);

                let cartonNumeros = { B: [], I: [], N: [], G: [], O: [] };

                for (let fila = 0; fila < 5; fila++) {
                    const row = document.createElement('tr');
                    ['B', 'I', 'N', 'G', 'O'].forEach((columna, colIndex) => {
                        const cell = document.createElement('td');
                        const numero = carton[columna][fila];

                        // Guardamos los números en el objeto para enviarlos
                        cartonNumeros[columna].push(numero);

                        // Si la celda está vacía (posición central de 'N'), coloca una imagen
                        if (columna === 'N' && fila === 2) {
                            const img = document.createElement('img');
                            img.src = '../imgs/logos/bingozone.png'; // Ruta de tu imagen
                            img.alt = 'Bingo-Zone';
                            img.classList.add('imagen-central')
                            cell.appendChild(img);
                        } else {
                            cell.innerText = numero || '';
                        }
                        row.appendChild(cell);
                    });
                    table.appendChild(row);
                }
                cartonesContainer.appendChild(table);

                // Añadimos el carton generado al array
                cartonesGenerados.push(cartonNumeros);
            });

            // Almacenar los cartones generados en una variable global
            window.cartonesGenerados = cartonesGenerados;
        })
        .catch(error => {
            console.error('Error al cargar los cartones:', error);
        });
        guardarCartones()
}

function guardarCartones() {
    const data = {
        codigoPartida: codigoPartida,
        cartones: window.cartonesGenerados
    };

    fetch('../php/partida/carton/guardar_carton.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        if (responseData.success) {
            console.log("Cartones guardados exitosamente");
        } else {
            console.error("Error al guardar cartones:", responseData.error);
        }
    })
    .catch(error => console.error('Error en la solicitud:', error));
}


// Ejecuta esta función automáticamente después de 1 minuto
setTimeout(guardarCartones, 3000);
setTimeout(guardarCartones, 35000);


document.getElementById('cambiarNumeros').addEventListener('click', cargarCartones);

cargarCartones();  // Generar los cartones automáticamente cuando se carga la página.

fetch(`../php/partida/tiempo_partida.php?codigo=${codigoPartida}`)
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error:', data.error);
            return;
        }

        // Verificar y convertir a número para evitar NaN
        let tiempoRestante = parseInt(data.tiempoRestante, 10);
        if (isNaN(tiempoRestante)) {
            console.error('El tiempo restante no es un número válido');
            return;
        }

        const intervalo = setInterval(() => {
            tiempoRestante -= 1;
            document.getElementById('tiempo').innerText = tiempoRestante;

            if (tiempoRestante <= 0) {
                clearInterval(intervalo);
                window.location.href = 'juego.html?codigo='+ codigoPartida 
            }
        }, 1000);
    })
    .catch(error => console.error('Error en la solicitud:', error));



async function salirPartida() {
    try {
        const response = await fetch(`../php/partida/partida.php?codigo=${codigoPartida}&accion=salir`);
        const data = await response.json();

        if (data.mensaje) {

            window.location.href = 'menu.html'; // Redirigir a la sala
        } else if (data.error) {
            alert(data.error);
            window.location.href = 'menu.html';
        }
    } catch (error) {
        console.error('Error al salir de la partida:', error);
    }
}