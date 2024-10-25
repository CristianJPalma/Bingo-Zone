// Función para obtener los parámetros del juego desde localStorage
function getGameSettings() {
    return {
        numBalls: parseInt(localStorage.getItem('numBalls')),
        numCards: parseInt(localStorage.getItem('numCards')),
        mode: localStorage.getItem('mode'),  // Verificamos que se obtenga el modo de juego
        cards: JSON.parse(localStorage.getItem('bingoCards'))
    };
}

function displayGameSettings() {
    const settings = getGameSettings();

    // Verificar que se obtenga el modo de juego antes de mostrarlo
    let mode = localStorage.getItem('mode')
    document.getElementById('gameMode').textContent = mode;

    // Mostrar cada cartón
    const cardsContainer = document.getElementById('cardsContainer');
    settings.cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('bingo-card');
        cardElement.innerHTML = `<h3>Cartón ${index + 1}</h3>`;
        
        // Crear la tabla del cartón
        const table = document.createElement('table');
        table.classList.add('card-table');
        ['B', 'I', 'N', 'G', 'O'].forEach(letter => {
            const th = document.createElement('th');
            th.innerText = letter;
            table.appendChild(th);
        });

        for (let i = 0; i < 5; i++) {
            const row = document.createElement('tr');
            ['B', 'I', 'N', 'G', 'O'].forEach(letter => {
                const cell = document.createElement('td');
                cell.innerText = card[letter][i];
                row.appendChild(cell);
            });
            table.appendChild(row);
        }

        cardElement.appendChild(table);
        cardsContainer.appendChild(cardElement);
    });
}

// Ejecutar la función al cargar la página
window.onload = displayGameSettings;