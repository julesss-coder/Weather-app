const locationForm = document.querySelector(".change-location");
const weatherDetailsElement = document.querySelector(".details");
const card = document.querySelector(".card");
const timeOfDay = document.querySelector(".time");
const weatherIcon = document.querySelector(".icon img");
const errorElement = document.querySelector(".error");

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
