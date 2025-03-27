function toggleContent(id) {
    const content = document.getElementById(id);
    if (content) {
        content.classList.toggle("active");
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-CA');
    const formattedTime = now.toTimeString().split(' ')[0];

    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = `${formattedDate} | ${formattedTime}`;
    }


    const navigation = document.querySelector('.menu');
    const menuBut = document.querySelector('#menu');
    const title = document.querySelector('.title');


    menuBut.addEventListener('click', () => {
        navigation.style.display = navigation.style.display === 'flex' ? 'none' : 'flex';
        title.style.top = title.style.top == '170px' ? '70px' : '170px';
    });



    const yearElement = document.getElementById('currentyear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});



//thankyou part

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    document.getElementById("first-name").textContent = urlParams.get("first-name");
    document.getElementById("last-name").textContent = urlParams.get("last-name");
    document.getElementById("email").textContent = urlParams.get("email");
    document.getElementById("phone").textContent = urlParams.get("phone");
    document.getElementById("organization-name").textContent = urlParams.get("organization-name");
    document.getElementById("timestamp").textContent = urlParams.get("timestamp");
    document.getElementById("currentyear").textContent = new Date().getFullYear();
});