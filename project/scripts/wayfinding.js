document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-links li a");
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
});