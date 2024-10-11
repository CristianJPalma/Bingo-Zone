// URL del archivo JSON o PHP que devuelve JSON
const url = '../persona.php'; // Cambia a tu URL real

fetch(url)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('cs'); // Crea un contenedor para los datos

    // Iteramos sobre los datos y mostramos la información
    data.forEach(persona => {
      const personaDiv = document.createElement('div'); // Crea un div para cada persona
      personaDiv.innerHTML = `
      <div class ="cosos">
        <h1>${persona.posicion}</h1>
        <h3>${persona.nombre}</h3>
        <p>${persona.porcentaje}</p>
        <p>${persona.bingoCoins}
        <img src="${persona.imagen || '../imgs/iconos/bingocoin.png'}" alt="BingoCoin" width="50" height="50">
        </p>
      </div>
      `;
      container.appendChild(personaDiv); // Añade el div de la persona al contenedor
    });

    document.body.appendChild(container); // Añade el contenedor al cuerpo del documento
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });
