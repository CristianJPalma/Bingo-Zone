// Funcion de la barra de carga
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    
    // Esperar un segundo antes de ocultar el loader
    setTimeout(() => {
        loader.style.display = 'none'; // Oculta el loader
        content.style.display = 'block'; // Muestra el contenido
    }, 3000); // Duración de la animación
});

// Validación del formulario y cambio de contenido
document.getElementById('myForm').addEventListener('submit', function(event) {
    // Evitar el envío del formulario
    event.preventDefault();
    
    // Verificar si hay una opción seleccionada
    const selectedOption = document.querySelector('input[name="flexRadioDefault"]:checked');
    
    if (!selectedOption) {
      // Mostrar el mensaje de error si no hay ninguna opción seleccionada
      document.getElementById('error-message').style.display = 'block';
    } else {
      // Si hay una opción seleccionada, se oculta el mensaje de error
      document.getElementById('error-message').style.display = 'none';
      // Cambio de contenido solo si está validado
      const content1 = document.getElementById('content1');
      const content2 = document.getElementById('content2');
      
      // Ocultar primer contenido
      content1.classList.add('hidden');
      setTimeout(() => {
          content1.style.display = 'none';

          // Mostrar segundo contenido
          content2.classList.add('show');
      }, 200);
    }
});

// funcion para hacer cambiar a capi-idea por capi-bebe
document.getElementById('btn-1').addEventListener('mouseover', () => {
  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  const img3 = document.getElementById('img3');

  // Ocultar capi-idea
  img1.classList.add('hidden');
  img3.classList.add('hidden');
  setTimeout(() => {
    img1.style.display = 'none'; // Esconde capi-idea
    img3.style.display = 'none'; // Esconde capi-idea

    // Mostrar capi-bebe
    img2.classList.add('show');
    img2.style.display = 'block'; // Muestra capi-bebe
  }, 100);
});
//funcion para volver a capi-idea
document.getElementById('btn-1').addEventListener('mouseout', () => {
  const img1 = document.getElementById('img1'); // Imagen capi-idea
  const img2 = document.getElementById('img2'); // Imagen capi-bebe

  // Ocultar capi-bebe
  img2.classList.remove('show');
  img2.style.display = 'none'; // Esconde capi-bebe

  // Mostrar capi-idea
  img1.classList.remove('hidden');
  img1.style.display = 'block'; // Muestra capi-idea
});

// funcion para hacer cambiar a capi-idea por capi-fuerte
document.getElementById('btn-2').addEventListener('mouseover', () => {
  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  const img3 = document.getElementById('img3');
  img1.classList.add('hidden');
  img2.classList.add('hidden');
  setTimeout(() => {
    img1.style.display = 'none';
    img2.style.display = 'none';
    img3.classList.add('show');
    img3.style.display = 'block';
  }, 100);
});

//funcion para volver a capi-idea
document.getElementById('btn-2').addEventListener('mouseout', () => {
  const img1 = document.getElementById('img1');
  const img3 = document.getElementById('img3');
  img3.classList.remove('show');
  img3.style.display = 'none';
  img1.classList.remove('hidden');
  img1.style.display = 'block';
});

//Volver a capi-idea hover al contenido (se bugeaba)
document.getElementById('content2').addEventListener('mouseover', () => {
  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  const img3 = document.getElementById('img3');
  img2.classList.remove('show');
  img2.style.display = 'none';
  img3.classList.remove('show');
  img3.style.display = 'none';
  img1.classList.remove('hidden');
  img1.style.display = 'block';
});
document.getElementById('btn-2').addEventListener('click', () => {
  const content2 = document.getElementById('content2');
  const content3 = document.getElementById('content3');
  content2.classList.add('hidden');
  setTimeout(() => {
      content2.style.display = 'none';
      content3.classList.add('show');
  }, 200);
});