function listarCartones() {
    fetch(`../php/partida/carton/consultar_carton.php?codigo=${codigoPartida}`, {
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('cartonesContainer').innerText = data.error;
                return;
            }

            const cartonesContainer = document.getElementById('cartonesContainer');
            cartonesContainer.innerHTML = '';

            const modoPartida = data.modo; // Recibir el modo desde el servidor

            data.cartones.forEach(carton => {
                const numerosCarton = JSON.parse(carton.numeros);
                const numerosSeleccionados = JSON.parse(carton.numeros_seleccionados || '[]');
                const table = document.createElement('table');

                table.setAttribute('data-carton-id', carton.numero_carton);
                table.classList.add('carton');

                const headerRow = document.createElement('tr');
                ['B', 'I', 'N', 'G', 'O'].forEach(letra => {
                    const th = document.createElement('th');
                    th.innerText = letra;
                    headerRow.appendChild(th);
                });
                table.appendChild(headerRow);

                for (let fila = 0; fila < 5; fila++) {
                    const row = document.createElement('tr');
                    ['B', 'I', 'N', 'G', 'O'].forEach((columna, colIndex) => {
                        const cell = document.createElement('td');
                        const numero = numerosCarton[columna][fila];

                        if (fila === 2 && colIndex === 2) {
                            const img = document.createElement('img');
                            img.src = '../imgs/logos/bingozone.png';
                            img.alt = 'Bingo-Zone';
                            cell.appendChild(img);
                            cell.classList.add('celda-central');
                            row.appendChild(cell);
                            return;
                        }

                        cell.innerText = numero || '';
                        cell.setAttribute('data-numero', numero);
                        cell.classList.add('celda');

                        // Resaltar números seleccionados
                        if (numerosSeleccionados.includes(numero)) {
                            cell.classList.add('seleccionado');
                        }

                        // Validar según el modo
                        if (
                            (modoPartida === 'equis' && !esParteDeX(fila, colIndex)) ||
                            (modoPartida === 'diagonal' && !esParteDeDiagonal(fila, colIndex))
                        ) {
                            cell.classList.add('no-seleccionable');
                        } else {
                            // Agregar evento para seleccionar/deseleccionar
                            cell.addEventListener('click', () => toggleNumero(cell, carton.numero_carton, numero));
                        }

                        row.appendChild(cell);
                    });

                    table.appendChild(row);
                }

                cartonesContainer.appendChild(table);
            });
        })
        .catch(error => {
            console.error('Error al listar los cartones:', error);
        });
}

function esParteDeX(fila, colIndex) {
    // Validar las posiciones que forman la X (diagonales principales)
    return fila === colIndex || fila + colIndex === 4;
}
function esParteDeDiagonal(fila, colIndex) {
    // Validar la diagonal principal \
    return fila === colIndex;
}

async function salirPartida() {
    try {
        const response = await fetch(`../php/partida/partida.php?codigo=${codigoPartida}&accion=salir`);
        const data = await response.json();

        if (data.mensaje) {
            window.location.href = 'menu.html'; // Redirigir al menú
        } else if (data.error) {
            alert(data.error);
            window.location.href = 'menu.html';
        }
    } catch (error) {
        console.error('Error al salir de la partida:', error);
    }
}
function toggleNumero(celda, numeroCarton, numero) {
    const seleccionado = celda.classList.contains('seleccionado');
    celda.classList.toggle('seleccionado');

    const accion = seleccionado ? 'eliminar' : 'agregar';

    const datos = {
        codigoPartida: codigoPartida,
        numeroCarton: numeroCarton,
        numero: numero,
        accion: accion,
    };

    console.log('Enviando datos:', datos);

    fetch('../php/partida/balotas/numeros_seleccionados.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error al actualizar el número:', data.error);
            } else {
                console.log('Número actualizado correctamente:', data.mensaje);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
}

document.addEventListener('DOMContentLoaded', listarCartones);
