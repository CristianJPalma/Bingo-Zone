// Función para obtener parámetros de la URL
function obtenerParametroUrl(nombre) {
    let url = new URL(window.location.href); // Obtener toda la URL
    return url.searchParams.get(nombre); // Extraer el valor del parámetro
}

// Mostrar mensajes basados en los parámetros y limpiar la URL
window.onload = function() {
    const mensajeDiv = document.getElementById('mensaje'); // Contenedor del mensaje
    const error = obtenerParametroUrl('error'); // Captura 'error' de la URL
    const status = obtenerParametroUrl('status'); // Captura 'status' de la URL

    // Mostrar mensajes
    if (error === 'correo') {
        mensajeDiv.innerHTML = "<p style='color: red; font-size:1.3rem;'>Este correo ya está registrado.</p>";
    } else if (error === 'registro') {
        mensajeDiv.innerHTML = "<p style='color: red; font-size:1.5rem;'>Ocurrió un error en el registro. Inténtalo de nuevo.</p>";
    } else if (status === 'exito') {
        mensajeDiv.innerHTML = "<p style='color: green; font-size:1.5rem;'>Usuario registrado exitosamente.</p>";
    }

    // Eliminar los parámetros de la URL después de mostrar el mensaje
    if (error || status) {
        // history.replaceState() modifica la URL sin recargar la página
        window.history.replaceState(null, "", window.location.pathname);
    }
};
    const contraseña = document.getElementById('contraseña'),
    icono = document.querySelector('.bx');
    icono.addEventListener("click", evento => {
        if(contraseña.type === "password"){
            contraseña.type = "text";
            icono.classList.remove("bx-show-alt");
            icono.classList.add("bx-low-vision");
        }else{
            contraseña.type = "password"
            icono.classList.remove("bx-low-vision");
            icono.classList.add("bx-show-alt");
        }
    })

