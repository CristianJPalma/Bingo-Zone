function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        numBalls: parseInt(urlParams.get('numBalls')),
        numCards: parseInt(urlParams.get('numCards')),
        mode: urlParams.get('mode')
    };
}

function generateBingoCard(numBalls) {
    let ranges;

    if (numBalls === 75) {
        ranges = [
            { letter: 'B', min: 1, max: 15 },
            { letter: 'I', min: 16, max: 30 },
            { letter: 'N', min: 31, max: 45 },
            { letter: 'G', min: 46, max: 60 },
            { letter: 'O', min: 61, max: 75 }
        ];
    } else if (numBalls === 90) {
        ranges = [
            { letter: 'B', min: 1, max: 18 },
            { letter: 'I', min: 19, max: 36 },
            { letter: 'N', min: 37, max: 54 },
            { letter: 'G', min: 55, max: 72 },
            { letter: 'O', min: 73, max: 90 }
        ];
    }

    const card = {};
    ranges.forEach(range => {
        card[range.letter] = generateColumn(range.min, range.max);
    });

    return card;
}

function generateColumn(min, max) {
    let column = [];
    while (column.length < 5) {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!column.includes(num)) {
            column.push(num);
        }
    }
    return column;
}

function displayBingoCard(card, cardNumber) {
    const gridContainer = document.getElementById('gridContainer');
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
    gridContainer.appendChild(cardTitle);
    gridContainer.appendChild(table);
}

function generateAndDisplayCards() {
    const params = getParams();
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = ''; // Limpiar cartones anteriores

    const cardsData = [];

    for (let i = 0; i < params.numCards; i++) {
        const bingoCard = generateBingoCard(params.numBalls);
        cardsData.push(bingoCard); // Guardar los cartones generados
        displayBingoCard(bingoCard, i + 1); // Mostrar los cartones
    }

    // Guardar los cartones en localStorage
    localStorage.setItem('bingoCards', JSON.stringify(cardsData));

    // Mostrar el botón de continuar
    document.getElementById('continue-btn').style.display = 'block';
}

document.getElementById('continue-btn').addEventListener('click', function() {
    window.location.href = 'juego.html';
});
document.getElementById('regenerate-btn').addEventListener('click', generateAndDisplayCards);

window.onload = generateAndDisplayCards;


const gridContainer = document.getElementById('gridContainer');

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


createGrid(5, 5);