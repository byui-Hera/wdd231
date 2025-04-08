document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
});

function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("form").reset();
}