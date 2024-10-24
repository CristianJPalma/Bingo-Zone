function getParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        numBalls: parseInt(urlParams.get('numBalls')),
        numCards: parseInt(urlParams.get('numCards')),
        mode: urlParams.get('mode')
    };
}

const grid = document.getElementById('gridContainer');
const rows = 5;
const cols = 5;

function createGrid() {
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
}

function showCustomGrid() {
    const mode = document.getElementById('mode').value;
    const customGrid = document.getElementById('custom-grid');
    
    if (mode === 'custom') {
        customGrid.style.display = 'block';
        createGrid();
    } else {
        customGrid.style.display = 'none';
    }
}