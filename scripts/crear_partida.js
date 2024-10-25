// Obtiene parámetros de la URL y los guarda en localStorage
function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {
        numBalls: parseInt(urlParams.get('numBalls')),
        numCards: parseInt(urlParams.get('numCards')),
        mode: urlParams.get('mode')
    };

    // Guardar en localStorage
    localStorage.setItem('numBalls', params.numBalls);
    localStorage.setItem('numCards', params.numCards);
    localStorage.setItem('mode', params.mode);

    return params;
}

const gridContainer = document.getElementById('gridContainer');
const gridX = document.getElementById('gridX');
const rows = 5;
const cols = 5;

function createGrid() {
    gridContainer.innerHTML = ''; // Limpiar cualquier contenido previo

    const grid = document.createElement('table');
    for (let r = 0; r < rows; r++) {
        const row = grid.insertRow();
        for (let c = 0; c < cols; c++) {
            const cell = row.insertCell();
            const cellId = `${r}-${c}`;

            if (localStorage.getItem(cellId)) {
                cell.classList.add('selected');
            }

            cell.onclick = () => {
                cell.classList.toggle('selected');
                if (cell.classList.contains('selected')) {
                    localStorage.setItem(cellId, 'selected');
                } else {
                    localStorage.removeItem(cellId);
                }
            };
        }
    }
    gridContainer.appendChild(grid);
}

function createXPattern() {
    gridX.innerHTML = ''; // Limpiar cualquier contenido previo

    const grid = document.createElement('table');
    for (let r = 0; r < rows; r++) {
        const row = grid.insertRow();
        for (let c = 0; c < cols; c++) {
            const cell = row.insertCell();
            const isDiagonal = (r === c) || (r + c === rows - 1);
            const cellId = `${r}-${c}`;

            if (isDiagonal) {
                cell.classList.add('selected');
                cell.style.pointerEvents = 'none'; // Desactiva la interacción
                localStorage.setItem(cellId, 'selected');
            } else {
                cell.classList.remove('selected');
                cell.style.pointerEvents = 'auto';
            }
        }
    }
    gridX.appendChild(grid);
}

function clearGridSelection() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cellId = `${r}-${c}`;
            localStorage.removeItem(cellId);
            const cell = document.getElementById(cellId);
            if (cell) cell.classList.remove('selected');
        }
    }
}

function showCustomGrid() {
    const mode = document.getElementById('mode').value;
    const customGrid = document.getElementById('custom-grid');
    const xGrid = document.getElementById('x-grid');
    
    if (mode === 'custom') {
        customGrid.style.display = 'block';
        xGrid.style.display = 'none';
        clearGridSelection();
        createGrid();
    } else if (mode === 'X') {
        xGrid.style.display = 'block';
        customGrid.style.display = 'none';
        clearGridSelection();
        createXPattern();
    } else {
        customGrid.style.display = 'none';
        xGrid.style.display = 'none';
    }
}

// Inicializa el modo de selección
createGrid();
// Llama a getParams al cargar la página para guardar los datos
getParams();