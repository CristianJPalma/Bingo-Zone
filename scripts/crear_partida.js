function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        numBalls: parseInt(urlParams.get('numBalls')),
        numCards: parseInt(urlParams.get('numCards')),
        mode: urlParams.get('mode')
    };
}

function generateAndDisplayCards() {
    const params = getParams();
    const cardsContainer = document.getElementById('bingo-cards');
    cardsContainer.innerHTML = ''; // Limpiar cartones anteriores

    for (let i = 0; i < params.numCards; i++) {
        const bingoCard = generateBingoCard(params.numBalls);
        displayBingoCard(bingoCard, i + 1); // Mostrar cartón visualmente
    }

    // Mostrar el botón de continuar después de generar los cartones
    document.getElementById('continue-btn').style.display = 'block';
}

document.getElementById('continue-btn').addEventListener('click', function() {
    // Guardar los cartones en localStorage
    const cardsData = [];
    for (let i = 0; i < getParams().numCards; i++) {
        cardsData.push(generateBingoCard(getParams().numBalls)); // Guardar cada cartón
    }
    localStorage.setItem('bingoCards', JSON.stringify(cardsData)); // Guardar en localStorage

    // Redirigir al juego
    window.location.href = 'juego.html';
});

document.getElementById('regenerate-btn').addEventListener('click', generateAndDisplayCards);

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

window.onload = generateAndDisplayCards;