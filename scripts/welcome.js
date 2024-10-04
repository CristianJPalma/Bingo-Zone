        // Mostramos el primer contenido después de 2 segundos
        setTimeout(() => {
            document.getElementById('content1').classList.add('show');
        }, 1000);

        // Al hacer clic en el botón, ocultamos el primer contenido y mostramos el segundo
        document.getElementById('btn').addEventListener('click', () => {
            const content1 = document.getElementById('content1');
            const content2 = document.getElementById('content2');
            // Ocultar primer contenido
            content1.classList.add('hidden');
            setTimeout(() => {
                content1.style.display = 'none';

                // Mostrar segundo contenido
                content2.classList.add('show');
            }, 200);
        });
        // Segundo boton
        document.getElementById('btn-1').addEventListener('click', () => {
            const content2 = document.getElementById('content2');
            const content3 = document.getElementById('content3');
            content2.classList.add('hidden');
            setTimeout(() => {
                content2.style.display = 'none';
                content3.classList.add('show');
            }, 200);
        });
           // Tercer boton
           document.getElementById('btn-2').addEventListener('click', () => {
            const content3 = document.getElementById('content3');
            const content4 = document.getElementById('content4');
            content3.classList.add('hidden');
            setTimeout(() => {
                content3.style.display = 'none';
                content4.classList.add('show');
            }, 200);
        });
           // Cuarto boton
           document.getElementById('btn-3').addEventListener('click', () => {
            const content4 = document.getElementById('content4');
            const content5 = document.getElementById('content5');
            content4.classList.add('hidden');
            setTimeout(() => {
                content4.style.display = 'none';
                content5.classList.add('show');
            }, 200);
        });