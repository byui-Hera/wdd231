const cards = document.querySelector("#buss");
const ham = document.querySelector("#menu");
const nav = document.querySelector("nav");
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

// responsive ham and nav
ham.addEventListener("click", () => {
    ham.classList.toggle("show");
    nav.classList.toggle("show");
});

// grid/list toggle
gridbutton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

listbutton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});

// Instatiate date object
const date = new Date();

// dynamically inject date into doc
document.querySelector("#year").innerHTML = date.getFullYear();
document.querySelector(
    "#lastmodified"
).innerHTML = `Last modified: ${document.lastModified}`;

const url = "./data/members.json";

async function getMemberData(url) {
    const response = await fetch(url);

    const data = await response.json();
    console.table(data);
    cardsMembers(data);
}

const cardsMembers = (members) => {
    members.forEach((member) => {
        // Create elements to add to the bussiness section
        let card = document.createElement("section");

        card.innerHTML = `<h3>${member.name}</h3>
    <p>${member.motto}</p>
    <div class="stuff">
      <img src="${member.image}" alt="${member.name} businness image" />
      <div>
        <p><strong>Email:</strong> ${member.mail}</p>
        <p><strong>Phone:</strong> ${member.number}</p>
        <p><strong>URL:</strong> ${member.url}</p>
      </div>
    </div>`;

        cards.appendChild(card);
    });
};

getMemberData(url);

// ...existing code...

document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const menuLinks = document.querySelector('.menu-links');

    hamburgerBtn.addEventListener('click', function () {
        menuLinks.style.display = 'block';
        closeMenuBtn.style.display = 'block';
        hamburgerBtn.style.display = 'none';
    });

    closeMenuBtn.addEventListener('click', function () {
        menuLinks.style.display = 'none';
        closeMenuBtn.style.display = 'none';
        hamburgerBtn.style.display = 'block';
    });
});

// ...existing code...

