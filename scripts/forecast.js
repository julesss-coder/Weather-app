/*
TODO
Add place autocomplete so user can choose appropriate city
Add photo of chosen location OR add weather icon
Deal with error / city not found

Separate UI code from API call code
*/

// Accuweather API key
const key = 'xRGf1AI3AgaB1MvKh3QACiNGKpWMwIvR';

const locationForm = document.querySelector(".change-location");
const weatherDetailsElement = document.querySelector(".details");
const card = document.querySelector(".card");
const timeOfDay = document.querySelector(".time");
const weatherIcon = document.querySelector(".icon img");
const errorElement = document.querySelector(".error");

const displayErrorMessage = () => {
  if (card.classList.contains("d-none") === false) {
    card.classList.add("d-none");
  }

  if (errorElement.classList.contains("d-none")) {
    errorElement.classList.remove("d-none");
  }

  errorElement.innerHTML = `<h5>The location you entered was not found.</h5>`;
};

const updateUI = (locationWeatherData) => {
  const {locationDetails, locationWeather} = locationWeatherData;

  weatherDetailsElement.innerHTML = `<h5 class="city-name my-3">${locationDetails.EnglishName}</h5>
    <h6 class="country-name my-3">${locationDetails.Country.EnglishName}</h6>
    <div class="weather-condition my-3">${locationWeather.WeatherText}</div>
    <div class="display-4 my-4">
      <span class="temperature">${locationWeather.Temperature.Metric.Value} <span>&deg;C</span> | ${locationWeather.Temperature.Imperial.Value} <span>&deg;F</span></span>
    </div>`;
  
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  if (errorElement.classList.contains("d-none") === false) {
    errorElement.classList.add("d-none");
  }

  // Update timeOfDay icon
  let timeOfDaySrc = null;
  timeOfDaySrc = locationWeather.isDayTime ? '../img/day.svg' : '../img/night.svg';
  timeOfDay.src = timeOfDaySrc;

  // Update weather icon
  let weatherIconSrc = null;
  weatherIconSrc = `../img/icons/${locationWeather.WeatherIcon}.svg`;
  weatherIcon.src = weatherIconSrc;

};

const getLocationData = async (location) => {
  const baseURL = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${location}`;
  const response = await fetch(baseURL + query);
  const data = await response.json();
  // For now, use the first entry in data array. Later, implement autocomplete or a dropdown with all options
  return data[0];
};

const getCurrentConditions = async (locationKey) => {
  const baseURL = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${locationKey}?apikey=${key}&details=false`;
  const response = await fetch(baseURL + query);
  const data = await response.json();
  return data[0];
};

const updateLocationWeather = async (location) => {
  const locationDetails = await getLocationData(location);
  const locationWeather = await getCurrentConditions(locationDetails.Key);

  return {
    locationDetails,
    locationWeather
  };
};

locationForm.addEventListener('submit', e => {
    e.preventDefault();

    const location = locationForm.city.value.trim();
    locationForm.reset();

    updateLocationWeather(location)
      .then(data => {
        updateUI(data);
      })
      .catch(error => {
        displayErrorMessage();
      });
});








