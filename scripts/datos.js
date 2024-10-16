document.addEventListener("DOMContentLoaded", function() {
    fetch('../php/mostrar_datos.php')
    .then(response => response.text())
    .then(data => {
        // Insertamos el dato en un elemento HTML
        document.getElementById("nombrePantalla").innerText = data;
    })
    .catch(error => {
        console.error('Error al obtener el dato:', error);
        document.getElementById("nombrePantalla").innerText = "Error al cargar el nombre.";
    });
});
