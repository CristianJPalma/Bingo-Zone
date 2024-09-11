document.addEventListener("DOMContentLoaded", function() {
    const introImage = document.querySelector(".intro-image");
    const content = document.querySelector(".content");

    setTimeout(function() {
        introImage.style.opacity = "0";
        setTimeout(function() {
            document.querySelector('.intro-container').style.display = 'none';
            content.classList.add("show");
        }, 2000);
    }, 2000);
});
