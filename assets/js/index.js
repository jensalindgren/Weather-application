// Variables
const container = document.querySelector('.container-fluid');
const search = document.querySelector('.input-group button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const forecastContainer = document.querySelector('.forecast-container .forecast');
const currentDayElement = document.querySelector('.current-day');
const temperatureUnitSelect = document.getElementById('temperature-unit');
const windSpeedUnitSelect = document.getElementById('wind-speed-unit');

// Event Listener for the Search Button
search.addEventListener('click', () => {
    const APIKey = 'd8d5d9e6b1ffc2fcbf1c3ab0bec153e6';
    const city = document.querySelector('.form-control').value;
    const temperatureUnit = document.getElementById('temperature-unit').value;
    const windSpeedUnit = document.getElementById('wind-speed-unit').value;

    if (city === '') return;

    // Fetching the data from the API with the selected units
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${temperatureUnit}&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            // Error Handling
            if (json.cod === '404') {
                container.style.minHeight = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');

                // Clear forecast container and hide it
                forecastContainer.innerHTML = '';
                forecastContainer.style.display = 'none';

                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            // Displaying the data
            const weatherImage = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.humidity span');
            const wind = document.querySelector('.wind span');
            const currentDay = document.querySelector('.weather-box .current-day');

            switch (json.weather[0].main) {
                case 'Clouds':
                    weatherImage.src = '/assets/images/cloud.png';
                    break;
                case 'Clear':
                    weatherImage.src = '/assets/images/clear.png';
                    break;
                case 'Rain':
                    weatherImage.src = '/assets/images/rain.png';
                    break;
                case 'Snow':
                    weatherImage.src = '/assets/images/snow.png';
                    break;
                case 'Mist':
                    weatherImage.src = '/assets/images/mist.png';
                    break;
                default:
                    weatherImage.src = '';
            }

            // Display temperature with the selected unit
            if (temperatureUnit === 'metric') {
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            } else if (temperatureUnit === 'imperial') {
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
            }

            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;

            // Fetch wind speed in meters per second
            const windSpeedInMetersPerSecond = json.wind.speed;

            // Convert wind speed to the selected unit
            if (windSpeedUnit === 'metric') {
                wind.innerHTML = `${parseInt(windSpeedInMetersPerSecond)} m/s`;
            } else if (windSpeedUnit === 'imperial') {
                // Convert wind speed to miles per hour
                const windSpeedInMilesPerHour = windSpeedInMetersPerSecond * 2.23694;
                wind.innerHTML = `${parseInt(windSpeedInMilesPerHour)} mph`;
            }

            currentDayElement.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long' });

            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');

            // Call the forecast function from forecast.js
            displayForecast(city, forecastContainer);
        });

    
});

// Event listeners for unit conversion
temperatureUnitSelect.addEventListener('change', updateWeatherData);
windSpeedUnitSelect.addEventListener('change', updateWeatherData);

// Function to fetch weather data and update the display with selected units
function updateWeatherData() {
    const APIKey = 'd8d5d9e6b1ffc2fcbf1c3ab0bec153e6';
    const city = document.querySelector('.form-control').value;
    const temperatureUnit = document.getElementById('temperature-unit').value;
    const windSpeedUnit = document.getElementById('wind-speed-unit').value;

    if (city === '') return;

    // Fetching the data from the API with the selected units
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${temperatureUnit}&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            // Error Handling
            if (json.cod === '404') {
                container.style.minHeight = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');

                // Clear forecast container and hide it
                forecastContainer.innerHTML = '';
                forecastContainer.style.display = 'none';

                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            // Displaying the data
            const weatherImage = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.humidity span');
            const wind = document.querySelector('.wind span');
            const currentDay = document.querySelector('.weather-box .current-day');

            switch (json.weather[0].main) {
                case 'Clouds':
                    weatherImage.src = 'images/cloud.png';
                    break;
                case 'Clear':
                    weatherImage.src = 'images/clear.png';
                    break;
                case 'Rain':
                    weatherImage.src = 'images/rain.png';
                    break;
                case 'Snow':
                    weatherImage.src = 'images/snow.png';
                    break;
                case 'Mist':
                    weatherImage.src = 'images/mist.png';
                    break;
                default:
                    weatherImage.src = '';
            }

            // Display temperature with the selected unit
            if (temperatureUnit === 'metric') {
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            } else if (temperatureUnit === 'imperial') {
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
            }

            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;

            // Fetch wind speed in meters per second and convert if necessary
            const windSpeedInMetersPerSecond = json.wind.speed;

            // Convert wind speed to the selected unit
            if (windSpeedUnit === 'metric') {
                wind.innerHTML = `${parseInt(windSpeedInMetersPerSecond)} m/s`;
            } else if (windSpeedUnit === 'imperial') {
                // Convert wind speed to miles per hour
                const windSpeedInMilesPerHour = windSpeedInMetersPerSecond * 2.23694;
                wind.innerHTML = `${parseInt(windSpeedInMilesPerHour)} mph`;
            }

            currentDayElement.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long' });

            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
        });
}