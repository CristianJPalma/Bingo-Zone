//Mostrar datos
document.addEventListener("DOMContentLoaded", function() {
    fetch("../php/usuario/mostrar_datos.php")
        .then(response => response.json())
        .then(data => {
            if (data.nombre) {
                document.getElementById("nombre").value = data.nombre;
                document.getElementById("apellido").value = data.apellido;
                document.getElementById("nombre_pantalla").value = data.nombre_pantalla;
                document.getElementById("correo").value = data.correo;
                document.getElementById("imagen_perfil").src = data.imagen_perfil; // Cargar imagen de perfil
            } else {
                console.error("No se encontraron datos del usuario.");
            }
        })
        .catch(error => console.error("Error al obtener datos:", error));
});



let imagenes = [
    '../imgs/capi/capi-furia.png',
    '../imgs/capi/capi-baño.png',
    '../imgs/capi/capi-fuerte.png',
    '../imgs/capi/capi-idea.png',
    '../imgs/capi/capi-pregunta.png'
];
let indiceImagen = 0;

function cambiarImagen() {
    indiceImagen = (indiceImagen + 1) % imagenes.length; // Cambia al siguiente índice
    document.getElementById("imagen_perfil").src = imagenes[indiceImagen];
}

//Actualizar datos
function actualizarDatos(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const nombre_pantalla = document.getElementById("nombre_pantalla").value;
    const correo = document.getElementById("correo").value;
    const imagen_perfil = imagenes[indiceImagen];

    fetch("../php/usuario/actualizar_datos.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, nombre_pantalla, correo, imagen_perfil })
    })
    .then(response => response.json())
    .then(data => {
        const mensajeDiv = document.getElementById("mensaje-resultado");
        
        if (data.status === "success") {
            mensajeDiv.style.color = "green";
            mensajeDiv.textContent = "Datos actualizados correctamente.";
            setTimeout(() => {
                window.location.reload();  // recargar la página después de 2 segundos
            }, 2000);
        } else {
            mensajeDiv.style.color = "red";
            mensajeDiv.textContent = "Error al actualizar los datos.";
        }
    })
    .catch(error => console.error("Error al actualizar datos:", error));
}