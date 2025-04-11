
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const footerCurrentTemp = document.querySelector('#footer-current-temp');
const footerWeatherIcon = document.querySelector('#footer-weather-icon');
const footerHumidity = document.querySelector('#footer-humidity');
const footerWindSpeed = document.querySelector('#footer-wind-speed');
const footerCaptionDesc = document.querySelector('#footer-weather-desc');


const url = 'https://api.openweathermap.org/data/2.5/weather?lat=39.6029&lon=-9.0684&units=metric&appid=d9fd390b08599c25aeeac65b0917294e';


async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json(); 
            console.log(data); 
            displayResults(data); 
        } else {
            throw Error(await response.text()); 
        }
    } catch (error) {
        console.log(error); 
    }
}


function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}`;


    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', data.weather[0].description); // Define a descrição para acessibilidade

    captionDesc.textContent = data.weather[0].description;

    humidity.innerHTML = `${data.main.humidity}`;


    windSpeed.innerHTML = `${data.wind.speed}`;

    footerWeatherIcon.setAttribute('src', iconSrc);
    footerWeatherIcon.setAttribute('alt', data.weather[0].description);
    footerCurrentTemp.innerHTML = `${data.main.temp}`; // Temperatura
    footerHumidity.innerHTML = `${data.main.humidity}`; // Umidade
    footerWindSpeed.innerHTML = `${data.wind.speed}`; // Velocidade do vento
    footerCaptionDesc.textContent = data.weather[0].description; // Descrição
}

apiFetch();