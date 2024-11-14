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

            data.cartones.forEach((carton, index) => {
                const numerosCarton = JSON.parse(carton.numeros); // Asegúrate de guardar en JSON
                const table = document.createElement('table');
                const headerRow = document.createElement('tr');
                
                ['B', 'I', 'N', 'G', 'O'].forEach(letra => {
                    const th = document.createElement('th');
                    th.innerText = letra;
                    headerRow.appendChild(th);
                });
                table.appendChild(headerRow);

                for (let fila = 0; fila < 5; fila++) {
                    const row = document.createElement('tr');
                    ['B', 'I', 'N', 'G', 'O'].forEach((columna) => {
                        const cell = document.createElement('td');
                        const numero = numerosCarton[columna][fila];
                        cell.innerText = numero || '';
                        if (columna === 'N' && fila === 2) {
                            const img = document.createElement('img');
                            img.src = '../imgs/logos/bingozone.png'; // Ruta de tu imagen
                            img.alt = 'Estrella';
                            cell.appendChild(img);
                        } else {
                            cell.innerText = numero || '';
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

document.addEventListener('DOMContentLoaded', listarCartones);

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