document.getElementById("last-modified").textContent = document.lastModified;

//Nav mobil
const navigation = document.querySelector('.menu');
const menuBut = document.querySelector('#menu');
const firstPag = document.querySelector('.first-part');

menuBut.addEventListener('click', () => {
    navigation.style.display = navigation.style.display === 'flex' ? 'none' : 'flex';
    firstPag.style.marginTop = firstPag.style.marginTop === '150px' ? '0' : '150px';
});

document.getElementById('currentyear').textContent = new Date().getFullYear();



const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector(".thirth-part");


display.classList.add("grid");


gridButton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
    loadMembers();
});

listButton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
    loadMembers();
});




async function loadMembers() {
    try {
        const response = await fetch('scripts/members.json')
        const members = await response.json();
        const filteredMembers = members.filter(
            (member) => member.membership_level === "Gold" || member.membership_level === "Silver"
        );
        const shuffledMembers = filteredMembers.sort(() => 0.5 - Math.random());
        const spotlightMembers = shuffledMembers.slice(0, 3);

        display.innerHTML = "";

        spotlightMembers.forEach((member, index) => {
            if (display.classList.contains("grid")) {
                const card = document.createElement("div");
                card.classList.add("member-card");

                card.innerHTML = `
                  <div class="card">
                    <div class="image-placeholder">
                      <h3>${member.name}</h3>
                      <p>${member.description || 'Business Tag Line'}</p>
                    </div>
                    <hr>
                    <div class="info">
                      <img src="${member.image}" alt="${member.name}" width= 80>
                      <div>                      
                        <p><strong>PHONE:</strong> ${member.phone}</p>
                        <p><strong>URL:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                        <p><strong>MEMBERSHIP LEVEL:</strong> ${member.membership_level}</p>
                      </div>
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

const apiKey = "3d039834201b427cfc00f8f1338afbe1";
const lat = -15.8402;
const lon = -70.0219;

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function getWeather() {
    try {
        const currentWeatherResponse = await fetch(currentWeatherUrl);
        const currentData = await currentWeatherResponse.json();

        const currentTemp = Math.round(currentData.main.temp);
        const currentDesc = currentData.weather[0].description.toUpperCase();
        const humidity = currentData.main.humidity;
        const sunrise = new Date(currentData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const sunset = new Date(currentData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const iconImg = currentData.weather[0].icon;
        const iconsrc = `https://openweathermap.org/img/wn/${iconImg}.png`;


        document.getElementById('icon').setAttribute('src', iconsrc);
        document.getElementById('current-temp').textContent = `${currentTemp}°F`;
        document.getElementById('current-desc').textContent = `${currentDesc}`;
        document.getElementById('humidity').textContent = `HUMIDITY: ${humidity}%`;
        document.getElementById('sunrise').textContent = `SUNRISE: ${sunrise}`;
        document.getElementById('sunset').textContent = `SUNSET: ${sunset}`;

        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        const now = new Date();
        const localNow = new Date(now.getTime() - 5 * 60 * 60 * 1000);

        const todayTemps = forecastData.list.filter(item => {
            const itemDate = new Date(item.dt_txt);
            const localItemDate = new Date(itemDate.getTime() - 5 * 60 * 60 * 1000);
            return localItemDate >= localNow && localItemDate <= new Date(localNow.getTime() + 24 * 60 * 60 * 1000);
        });

        const todayHigh = Math.round(Math.max(...todayTemps.map(item => item.main.temp_max)));
        const todayLow = Math.round(Math.min(...todayTemps.map(item => item.main.temp_min)));

        document.getElementById('current-high').textContent = `HIGH: ${todayHigh}°`;
        document.getElementById('current-low').textContent = `LOW: ${todayLow}°`;

        const forecastElement = document.getElementById('forecast');
        forecastElement.innerHTML = '';

        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        for (let i = 1; i <= 3; i++) {
            const start = new Date(localNow.getTime() + i * 24 * 60 * 60 * 1000);
            const end = new Date(localNow.getTime() + (i + 1) * 24 * 60 * 60 * 1000);

            const dayTemps = forecastData.list.filter(item => {
                const itemDate = new Date(item.dt_txt);
                const localItemDate = new Date(itemDate.getTime() - 5 * 60 * 60 * 1000);
                return localItemDate >= start && localItemDate < end;
            });

            const avgTemp = Math.round(
                dayTemps.reduce((sum, item) => sum + item.main.temp, 0) / dayTemps.length
            );

            const dayName = daysOfWeek[start.getDay()];
            const listItem = document.createElement('p');
            listItem.innerHTML = `${dayName}: <strong>${avgTemp}°F</strong>`;
            forecastElement.appendChild(listItem);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

getWeather();