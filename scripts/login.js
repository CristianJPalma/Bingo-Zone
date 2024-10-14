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