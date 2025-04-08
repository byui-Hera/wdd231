document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");


    hamburger.addEventListener("click", () => {
        // Alterna a visibilidade do menu de navegação
        navLinks.classList.toggle("active");
        // Alterna o ícone do hambúrguer entre 'abrir' e 'fechar'
        hamburger.classList.toggle("open");


    });
});
