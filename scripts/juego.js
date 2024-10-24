window.onload = function() {
    const cardsData = JSON.parse(localStorage.getItem('bingoCards'));
    if (cardsData) {
        cardsData.forEach((card, index) => {
            displayBingoCard(card, index + 1); // Mostrar cada cartón
        });
    }
};

function displayBingoCard(card, cardNumber) {
    const cardsContainer = document.getElementById('bingo-cards');
    const table = document.createElement('table');
    table.classList.add('bingo-card');

    const headerRow = document.createElement('tr');
    ['B', 'I', 'N', 'G', 'O'].forEach(letter => {
        const th = document.createElement('th');
        th.innerText = letter;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
        const row = document.createElement('tr');
        ['B', 'I', 'N', 'G', 'O'].forEach(column => {
            const cell = document.createElement('td');
            cell.innerText = card[column][rowIndex];
            row.appendChild(cell);
        });
        table.appendChild(row);
    }

    const cardTitle = document.createElement('h3');
    cardTitle.innerText = `Cartón ${cardNumber}`;
    cardsContainer.appendChild(cardTitle);
    cardsContainer.appendChild(table);
}
const gridContainer = document.getElementById('bingo-cards');

function createGrid(rows, cols) {
    const grid = document.createElement('table');
    for (let r = 0; r < rows; r++) {
        const row = grid.insertRow();
        for (let c = 0; c < cols; c++) {
            const cell = row.insertCell();
            const cellId = `${r}-${c}`;

            if (localStorage.getItem(cellId)) {
                cell.classList.add('selected');
                cell.style.pointerEvents = 'none'; // Desactivar interacciones
            }
        }
    }
    gridContainer.appendChild(grid);
}

function goToPage1() {
    window.location.href = 'index.html';
}

// Cargar cuadrícula de la primera página
createGrid(5, 5);