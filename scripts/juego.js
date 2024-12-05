const btnBingo = document.getElementById('btnBingo');
const mensajeBingo = document.getElementById('mensajeBingo');

function verificarBingo(modoPartida, cartones) {
    if (!Array.isArray(cartones)) {
        console.error('Cartones no es un arreglo válido:', cartones);
        return;
    }

    let completo = true;

    cartones.forEach(carton => {
        try {
            const numerosSeleccionados = JSON.parse(carton.numeros_seleccionados || '[]');
            const numerosCarton = JSON.parse(carton.numeros || '{}');

            for (let fila = 0; fila < 5; fila++) {
                for (let colIndex = 0; colIndex < 5; colIndex++) {
                    // Ignorar la celda central
                    if (fila === 2 && colIndex === 2) {
                        continue;
                    }

                    const columna = ['B', 'I', 'N', 'G', 'O'][colIndex];
                    const numero = numerosCarton[columna]?.[fila];

                    if (
                        (modoPartida === 'equis' && esParteDeX(fila, colIndex) && !numerosSeleccionados.includes(numero)) ||
                        (modoPartida === 'diagonal' && esParteDeDiagonal(fila, colIndex) && !numerosSeleccionados.includes(numero)) ||
                        (modoPartida === 'completo' && !numerosSeleccionados.includes(numero)) // Verificación del modo completo
                    ) {
                        completo = false;
                    }
                }
            }
        } catch (error) {
            console.error('Error procesando el cartón:', carton, error);
            completo = false;
        }
    });

    btnBingo.disabled = !completo;
    mensajeBingo.style.display = completo ? 'none' : 'block';
}

function listarCartones() {
    fetch(`../php/partida/carton/consultar_carton.php?codigo=${codigoPartida}`, {
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            if (!data || data.error) {
                console.error('Error en la respuesta del servidor:', data?.error || 'Respuesta inválida');
                document.getElementById('cartonesContainer').innerText = data?.error || 'Error al cargar cartones.';
                return;
            }

            const { cartones, modo } = data;

            if (!Array.isArray(cartones)) {
                console.error('Cartones no es un arreglo:', cartones);
                return;
            }

            const cartonesContainer = document.getElementById('cartonesContainer');
            cartonesContainer.innerHTML = '';

            cartones.forEach(carton => {
                try {
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
                            const numero = numerosCarton[columna]?.[fila];

                            if (fila === 2 && colIndex === 2) {
                                const img = document.createElement('img');
                                img.src = '../imgs/logos/bingozone.png';
                                img.alt = 'Bingo-Zone';
                                cell.appendChild(img);
                                cell.classList.add('celda-central');
                            } else {
                                cell.innerText = numero || '';
                                cell.setAttribute('data-numero', numero);
                                cell.classList.add('celda');

                                if (numerosSeleccionados.includes(numero)) {
                                    cell.classList.add('seleccionado');
                                }

                                if (
                                    (modo === 'equis' && !esParteDeX(fila, colIndex)) ||
                                    (modo === 'diagonal' && !esParteDeDiagonal(fila, colIndex))
                                    
                                ) {
                                    cell.classList.add('no-seleccionable');
                                } else {
                                    cell.addEventListener('click', () => {
                                        toggleNumero(cell, carton.numero_carton, numero, modo);
                                        verificarBingo(modo, cartones);
                                    });
                                }
                            }
                            row.appendChild(cell);
                        });
                        table.appendChild(row);
                    }
                    cartonesContainer.appendChild(table);
                } catch (error) {
                    console.error('Error procesando un cartón:', carton, error);
                }
            });

            verificarBingo(modo, cartones);
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
function toggleNumero(celda, numeroCarton, numero, modoPartida) {
    const seleccionado = celda.classList.contains('seleccionado');
    celda.classList.toggle('seleccionado');

    fetch('../php/partida/balotas/numeros_seleccionados.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            codigoPartida,
            numeroCarton,
            numero,
            accion: seleccionado ? 'eliminar' : 'agregar',
        }),
        credentials: 'include',
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error al actualizar el número:', data.error);
            } else {
                listarCartones();
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
}


btnBingo.addEventListener('click', () => {
    fetch(`../php/partida/bingo/verificar_bingo.php?codigo=${codigoPartida}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigoPartida }),
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error); // Mostrar mensaje de error
            } else {
                alert('¡Bingo correcto!'); // Mensaje de éxito
            }
        })
        .catch(error => {
            console.error('Error al verificar el bingo:', error);
        });
});


document.addEventListener('DOMContentLoaded', listarCartones); 