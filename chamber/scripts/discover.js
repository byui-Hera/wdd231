// Update the last modified date
document.getElementById("last-modified").textContent = document.lastModified;

// Toggle content visibility
function toggleContent(id) {
    const content = document.getElementById(id);
    if (content) {
        content.classList.toggle("active");
    }
}

// DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-CA');
    const formattedTime = now.toTimeString().split(' ')[0];

    // Update timestamp field
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = `${formattedDate} | ${formattedTime}`;
    }

    // Toggle navigation menu
    const navigation = document.querySelector('.menu');
    const menuBut = document.querySelector('#menu');
    const title = document.querySelector('.title');

    menuBut.addEventListener('click', () => {
        navigation.style.display = navigation.style.display === 'flex' ? 'none' : 'flex';
        title.style.top = title.style.top === '170px' ? '70px' : '170px';
    });

    // Update current year
    const yearElement = document.getElementById('currentyear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Load and display members
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
                                <a class="items-link" href="${member.website}" target="_blank" aria-label="Learn more about ${member.name}">Learn More</a>
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
                        <p><strong>URL:</strong> <a href="${member.website}" target="_blank" aria-label="Visit ${member.name}'s website">${member.website}</a></p>
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

// Visitor message logic
document.addEventListener("DOMContentLoaded", function () {
    const lastVisitKey = "lastVisitDate";
    const now = Date.now();

    // Select the <h1> element to insert the message below it
    const heading = document.querySelector("h1");

    if (heading) {
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("visitor-message");

        const lastVisit = localStorage.getItem(lastVisitKey);

        if (!lastVisit) {
            // First visit
            messageContainer.innerHTML = "<strong>Welcome! Let us know if you have any questions.</strong>";
        } else {
            const lastVisitDate = new Date(parseInt(lastVisit, 10));
            const timeDifference = now - lastVisitDate.getTime();
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            if (daysDifference < 1) {
                messageContainer.innerHTML = "<strong>Back so soon! Awesome!</strong>";
            } else if (daysDifference === 1) {
                messageContainer.innerHTML = "<strong>You last visited 1 day ago.</strong>";
            } else {
                messageContainer.innerHTML = `<strong>You last visited ${daysDifference} days ago.</strong>`;
            }
        }

        // Insert the message below the <h1> element
        heading.insertAdjacentElement("afterend", messageContainer);

        // Update the last visit date in localStorage
        localStorage.setItem(lastVisitKey, now.toString());
    }
});