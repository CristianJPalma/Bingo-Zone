const urlParams = new URLSearchParams(window.location.search);
const codigoPartida = urlParams.get('codigo');

function listarCartones() {
    fetch(`../php/partida/carton/consultar_carton.php?codigo=${codigoPartida}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('cartonesContainer').innerText = data.error;
                return;
            }

            const cartonesContainer = document.getElementById('cartonesContainer');
            cartonesContainer.innerHTML = ''; // Limpiar el contenido anterior

            data.cartones.forEach((carton) => {
                const numerosCarton = JSON.parse(carton.numeros); // Asegúrate de guardar en JSON
                const table = document.createElement('table');
            
                // Asignar clase o ID al cartón
                table.setAttribute('data-carton-id', carton.numero_carton); // O usa carton.id_carton si prefieres
                table.classList.add('carton');
            
                // Crear encabezado
                const headerRow = document.createElement('tr');
                ['B', 'I', 'N', 'G', 'O'].forEach(letra => {
                    const th = document.createElement('th');
                    th.innerText = letra;
                    headerRow.appendChild(th);
                });
                table.appendChild(headerRow);
            
                // Crear las filas de números
                for (let fila = 0; fila < 5; fila++) {
                    const row = document.createElement('tr');
                    ['B', 'I', 'N', 'G', 'O'].forEach((columna) => {
                        const cell = document.createElement('td');
                        const numero = numerosCarton[columna][fila];
                        cell.innerText = numero || '';
            
                        // Atributos únicos para la celda
                        cell.setAttribute('data-numero', numero); // Número de la celda
                        cell.classList.add('celda'); // Clase común para todas las celdas
            
                        // Agregar evento de clic
                        cell.addEventListener('click', () => toggleNumero(cell, carton.numero_carton, numero)); // Usar numero_carton
            
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

document.addEventListener('DOMContentLoaded', listarCartones);

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

function toggleNumero(celda, idCarton, numero) {
    const seleccionado = celda.classList.contains('seleccionado');

    // Alterna la clase visual
    celda.classList.toggle('seleccionado');

    const accion = seleccionado ? 'eliminar' : 'agregar';

    const datos = {
        codigoPartida: codigoPartida,
        idCarton: idCarton,
        numero: numero,
        accion: accion,
    };

    console.log("Enviando datos:", datos);

    fetch('../php/partida/balotas/numeros_seleccionados.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
        .then(async (response) => {
            const text = await response.text();
            try {
                const data = JSON.parse(text);
                console.log('Respuesta del servidor:', data);
                if (data.error) {
                    console.error('Error al actualizar el número:', data.error);
                } else {
                    console.log('Número actualizado correctamente:', data.numerosSeleccionados);
                }
            } catch (error) {
                console.error('Error en la solicitud: No se recibió JSON válido', text);
            }
        })
        .catch((error) => console.error('Error en la solicitud:', error));
}
