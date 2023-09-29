// Variables
const container = document.querySelector('.container-fluid');
const search = document.querySelector('.input-group button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const forecastContainer = document.querySelector('.forecast-container .forecast'); // Select the correct container
const currentDayElement = document.querySelector('.current-day');

// Event Listener for the Search Button
search.addEventListener('click', () => {
    const APIKey = 'd8d5d9e6b1ffc2fcbf1c3ab0bec153e6';
    const city = document.querySelector('.form-control').value;

    if (city === '') return;

    // Fetching the data from the API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
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

            // Converting the temperature from Kelvin to Celsius
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            currentDayElement.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long' });

            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');

            // Show forecast container
            forecastContainer.style.display = 'block';
        });

    // Fetching the data from the API
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Forecast data not available');
            }
            return response.json();
        })
        .then(forecastData => {
            forecastContainer.innerHTML = ''; // Clear previous forecast data

            // Get the forecast for the next days (you can change this number)
            const daysToShow = 4; // Change this to the number of days you want to display

            // Iterate through the forecast data
            // Start at 1 because the first item is for the current day
            for (let i = 1; i < daysToShow; i++) {
                const forecastItem = forecastData.list[i * 8]; // Select every 8th item for each day
                const forecastDate = new Date(forecastItem.dt * 1000);
                const dayOfWeek = forecastDate.toLocaleDateString('en-US', {
                    weekday: 'short'
                });
                const temperature = Math.round(forecastItem.main.temp); // Round temperature
                const description = forecastItem.weather[0].description;

                const forecastItemElement = document.createElement('div');
                forecastItemElement.classList.add('forecast-item');
                forecastItemElement.innerHTML = `
                    <div class="day">${dayOfWeek}</div>
                    <img src="" alt="Weather Icon" class="forecast-image">
                    <div class="temperature">${temperature}°C</div>
                    <div class="description">${description}</div>
                `;

                // Set the forecast image source based on weather
                const forecastImage = forecastItemElement.querySelector('.forecast-image');
                switch (forecastItem.weather[0].main) {
                    case 'Clouds':
                        forecastImage.src = 'images/cloud.png';
                        break;
                    case 'Clear':
                        forecastImage.src = 'images/clear.png';
                        break;
                    case 'Rain':
                        forecastImage.src = 'images/rain.png';
                        break;
                    case 'Snow':
                        forecastImage.src = 'images/snow.png';
                        break;
                    case 'Mist':
                        forecastImage.src = 'images/mist.png';
                        break;
                    default:
                        forecastImage.src = '';
                }

                forecastContainer.appendChild(forecastItemElement);
            }
        })
        .catch(error => {
            // Display an error message to the user
            const errorContainer = document.querySelector('.error-message');
            errorContainer.textContent = 'An error occurred. Please try again later.';
        });
});
