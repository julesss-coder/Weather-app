import { updateLocationWeather } from "./forecast.js";

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
  let timeOfDaySrc = locationWeather.isDayTime ? '../img/day.svg' : '../img/night.svg';
  timeOfDay.src = timeOfDaySrc;

  // Update weather icon
  let weatherIconSrc = `../img/icons/${locationWeather.WeatherIcon}.svg`;
  weatherIcon.src = weatherIconSrc;

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
