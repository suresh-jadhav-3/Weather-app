const apiKey = 'a5394ab97fcf15f6e7ef6c2c44563003';
const searchButton = document.querySelector('.search-city');
const searchBox = document.querySelector('.search-box');

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            document.querySelector('.current-weather-info').style.display = "none"
            document.querySelector('.message-img').style.display = "block"
            messageImg = document.querySelector('.message-picture')
            messageImg.src = '/assets/message/not-found.png'
            throw new Error('Entered A Wrong City ');
        }
        const data = await response.json();
        if(data.cod == '404'){
            alert("faild to load data")

        }
        updateWeatherInfo(data);
        
    } catch (error) {
        alert(error.message);
    }
}

function updateWeatherInfo(data) {
    document.querySelector('.message-img').style.display = "none"
    document.querySelector('.current-weather-info').style.display = "block"
    const weatherPicture = document.querySelector('.weather-picture')
    const locationName = document.querySelector('.location-name');
    const currentTemperature = document.getElementById('current-temperature');
    const currentHumidity = document.getElementById('current-humidity');
    const currentWindSpeed = document.getElementById('current-wind-speed');
    
    
    weatherPicture.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    locationName.textContent = data.name;
    currentTemperature.textContent = `${Math.round(data.main.temp)}°C`;
    currentHumidity.textContent = `${data.main.humidity}%`;
    currentWindSpeed.textContent = `${data.wind.speed} Km/H`;
    
}



searchButton.addEventListener('click', () => {
    const city = searchBox.value.trim();
    if (city) {
        getWeatherData(city);
        searchBox.value = ""
    }
    else {
        alert("Please enter a city name");
    }
});
searchBox.addEventListener('keypress', (e) => {
    const city = searchBox.value;
    if (e.key === "Enter") {
        if (city) {
            getWeatherData(city);
            searchBox.value = ""
        }
        else {
            alert("Please enter a city name");

        }
    }


})