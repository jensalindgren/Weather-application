function displayForecast(city, forecastContainer) {
    const APIKey = 'd8d5d9e6b1ffc2fcbf1c3ab0bec153e6';

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
                        forecastImage.src = 'assets/images/cloud.png';
                        break;
                    case 'Clear':
                        forecastImage.src = 'assets/images/clear.png';
                        break;
                    case 'Rain':
                        forecastImage.src = 'assets/images/rain.png';
                        break;
                    case 'Snow':
                        forecastImage.src = 'assets/images/snow.png';
                        break;
                    case 'Mist':
                        forecastImage.src = 'assets/images/mist.png';
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
}
