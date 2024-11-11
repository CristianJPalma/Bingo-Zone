function copiarCodigo() {
    const codigo = document.getElementById('codigoPartida').textContent; // Obtener el texto del código de la partida
    navigator.clipboard.writeText(codigo).then(() => {
    }).catch((err) => {
        console.error('Error al copiar el código: ', err);
    });
}
 async function cargarLobby() {
            try {
                const response = await fetch(`../php/partida/partida.php?codigo=${codigoPartida}`);
                const data = await response.json();
    
                document.getElementById('codigoPartida').textContent = data.codigo;
                
                const listaMiembros = document.getElementById('listaMiembros');
                listaMiembros.innerHTML = '';
    
                // Generar la lista de miembros con sus nombres y fotos de perfil
                data.miembros.forEach(miembro => {
                    const li = document.createElement('li');
                    li.classList.add('miembro-item'); // Clase para estilos en CSS
    
                    // Crear un elemento img para la imagen de perfil
                    const img = document.createElement('img');
                    img.src = miembro.imagen; // URL de la imagen de perfil
                    img.alt = miembro.nombre;  // Texto alternativo en caso de error de carga
                    img.classList.add('imagen-perfil'); // Clase para estilos en CSS
    
                    // Crear un elemento span para el nombre de pantalla
                    const nombre = document.createElement('span');
                    nombre.textContent = miembro.nombre;
                    nombre.classList.add('nombre-pantalla'); // Clase para estilos en CSS
    
                    // Agregar la imagen y el nombre al elemento li
                    li.appendChild(img);
                    li.appendChild(nombre);
                    listaMiembros.appendChild(li);
                });
    
                // Mostrar u ocultar controles específicos para el creador
                if (data.esCreador) {
                    document.querySelectorAll('.solo-creador').forEach(boton => {
                        boton.style.display = 'inline-block'; // Mostrar los botones solo para el creador
                    });
                } else {
                    // Deshabilitar interacción de botones visibles para todos
                    document.querySelectorAll('.solo-interactivo-creador').forEach(boton => {
                        boton.disabled = true;
                    });
                }
            } catch (error) {
                console.error('Error al cargar el lobby:', error);
            }
        }
    
        document.addEventListener('DOMContentLoaded', cargarLobby);
    
        const urlParams = new URLSearchParams(window.location.search);
        const codigoPartida = urlParams.get('codigo');
    
        async function cargarMiembros() {
            try {
                const response = await fetch(`../php/partida/partida.php?codigo=${codigoPartida}`);
                const data = await response.json();
                document.getElementById('codigoPartida').textContent = data.codigo;
                const listaMiembros = document.getElementById('listaMiembros');
                listaMiembros.innerHTML = '';
    
                if (data.miembros.length > 0) {
                    data.miembros.forEach(miembro => {
                        const li = document.createElement('li');
                        li.classList.add('miembro-item'); // Clase para estilos en CSS
    
                        const img = document.createElement('img');
                        img.src = miembro.imagen;
                        img.alt = miembro.nombre;
                        img.classList.add('imagen-perfil'); // Clase para estilos en CSS
    
                        const nombre = document.createElement('span');
                        nombre.textContent = miembro.nombre;
                        nombre.classList.add('nombre-pantalla'); // Clase para estilos en CSS
    
                        li.appendChild(img);
                        li.appendChild(nombre);
                        listaMiembros.appendChild(li);
                    });
                } else {
                    listaMiembros.innerHTML = '<p>No hay miembros en esta partida.</p>';
                }
            } catch (error) {
                console.error('Error al cargar los miembros:', error);
            }
        }
        




        async function salirPartida() {
            try {
                const response = await fetch(`../php/partida/partida.php?codigo=${codigoPartida}&accion=salir`);
                const data = await response.json();
    
                if (data.mensaje) {

                    window.location.href = 'menu.html'; // Redirigir a la sala
                } else if (data.error) {
                    alert(data.error);
                    window.location.href = 'menu.html';
                }
            } catch (error) {
                console.error('Error al salir de la partida:', error);
            }
        }
    

        



        cargarMiembros();
        setInterval(cargarMiembros, 2000);