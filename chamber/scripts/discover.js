document.getElementById("last-modified").textContent = document.lastModified;

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

    // Handle last visit message using localStorage
    const lastVisitKey = 'lastVisitDate';
    const visitorMessageElement = document.querySelector('.visitor-message');

    if (visitorMessageElement) {
        const lastVisit = localStorage.getItem(lastVisitKey);
        const currentVisit = now.getTime();

        if (lastVisit) {
            const lastVisitDate = new Date(parseInt(lastVisit));
            const timeDifference = currentVisit - lastVisitDate.getTime();
            const daysSinceLastVisit = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            if (timeDifference < 1000 * 60 * 60 * 24) {
                visitorMessageElement.textContent = "Back so soon! Awesome!";
            } else if (daysSinceLastVisit === 1) {
                visitorMessageElement.textContent = "You last visited 1 day ago.";
            } else {
                visitorMessageElement.textContent = `You last visited ${daysSinceLastVisit} days ago.`;
            }
        } else {
            visitorMessageElement.textContent = "Welcome! Let us know if you have any questions.";
        }

        // Update localStorage with the current visit date
        localStorage.setItem(lastVisitKey, currentVisit.toString());
    }
});

// List of items
const display = document.querySelector(".thirth-part");

async function loadMembers() {
    try {
        const response = await fetch('scripts/punoitems.json');
        const members = await response.json();

        display.innerHTML = "";

        members.forEach((member, index) => {
            if (display.classList.contains("grid")) {
                const card = document.createElement("div");
                card.classList.add("member-card");

                card.innerHTML = `
          <div class="card">
            <div class="image-placeholder">
              <h3>${member.name}</h3>
            </div>
            <hr>
            <div class="info">
              <img src="${member.image}" alt="${member.name}" width="150" loading="lazy" decoding="async" fetchpriority="low" referrerpolicy="no-referrer">
              <div class="description">                      
                <p>"${member.description || 'Business Tag Line'}"</p>
                <p><strong>Address:</strong> ${member.address}</p>
              </div>
              <button>
                <a class="items-link" href="${member.website}" target="_blank">Learn More</a>
              </button>
            </div>
          </div>
        `;
                display.appendChild(card);
            } else if (display.classList.contains("list")) {
                const row = document.createElement("div");
                row.classList.add("member-row");

                row.style.backgroundColor = index % 2 === 0 ? "#9c9c9c93" : "#ffffff93";

                row.innerHTML = `
          <div class="row">
            <h3>${member.name}</h3>
            <p><strong>PHONE:</strong> ${member.phone}</p>
            <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>MEMBERSHIP LEVEL:</strong> ${member.membership_level}</p>
          </div>
        `;
                display.appendChild(row);
            }
        });
    } catch (error) {
        console.error('Error loading members:', error);
    }
}

loadMembers();