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
document.addEventListener('DOMContentLoaded', function() {
    const cartonesContainer = document.getElementById('cartonesContainer');
    const cartones = cartonesContainer.querySelectorAll('table');
    
    // Si hay 2 o 3 cartones, aplicamos lógica de carrusel
    if (cartones.length >= 2 && cartones.length <= 3) {
        // Estilos base para todos los cartones
        cartones.forEach(carton => {
            carton.style.transition = 'all 0.5s ease';
            carton.style.opacity = '0.6';
            carton.style.transform = 'scale(0.8)';
            carton.style.cursor = 'pointer';
        });

        // Si son 2 cartones
        if (cartones.length === 2) {
            cartones[0].style.transform = 'translateX(-50%) scale(0.7)';
            cartones[1].style.transform = 'translateX(50%) scale(0.7)';
        }

        // Si son 3 cartones
        if (cartones.length === 3) {
            cartones[0].style.transform = 'translateX(-150%) scale(0.7)';
            cartones[1].style.transform = 'scale(1)';
            cartones[1].style.opacity = '1';
            cartones[2].style.transform = 'translateX(150%) scale(0.7)';
        }

        // Añadir eventos de click
        cartones.forEach((carton, index) => {
            carton.addEventListener('click', () => {
                // Resetear todos
                cartones.forEach((c, i) => {
                    if (cartones.length === 2) {
                        c.style.transform = i === 0 
                            ? 'translateX(-50%) scale(0.7)' 
                            : 'translateX(50%) scale(0.7)';
                        c.style.opacity = '0.6';
                    }
                    
                    if (cartones.length === 3) {
                        if (i === 0) {
                            c.style.transform = 'translateX(-150%) scale(0.7)';
                        } else if (i === 1) {
                            c.style.transform = 'translateX(0%) scale(1)';
                            c.style.opacity = '1';
                        } else {
                            c.style.transform = 'translateX(150%) scale(0.7)';
                        }
                    }
                });

                // Cambiar el carton clickeado al centro
                if (cartones.length === 2) {
                    carton.style.transform = 'translateX(0) scale(1)';
                    carton.style.opacity = '1';
                }

                if (cartones.length === 3) {
                    if (index === 0) {
                        cartones[0].style.transform = 'translateX(0%) scale(1)';
                        cartones[0].style.opacity = '1';
                        cartones[1].style.transform = 'translateX(150%) scale(0.7)';
                        cartones[2].style.transform = 'translateX(150%) scale(0.7)';
                    } else if (index === 2) {
                        cartones[2].style.transform = 'translateX(0%) scale(1)';
                        cartones[2].style.opacity = '1';
                        cartones[0].style.transform = 'translateX(-150%) scale(0.7)';
                        cartones[1].style.transform = 'translateX(-150%) scale(0.7)';
                    }
                }
            });
        });
    }
});