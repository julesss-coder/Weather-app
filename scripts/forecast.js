/*
User enters location
Show dropdown of locations
User selects location

Get latitude and longitude of location
Get weather forecast for location
Show weather forecast for location
*/

// Accuweather API key
const key = 'xRGf1AI3AgaB1MvKh3QACiNGKpWMwIvR';

const locationForm = document.querySelector(".change-location");

const city = document.querySelector(".city-name");
const weather = document.querySelector(".weather-condition");
const temperature = document.querySelector(".temperature");

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
  console.log(locationDetails)
  const locationWeather = await getCurrentConditions(locationDetails.Key);
  console.log(locationWeather)
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
      .then(data => console.log(data))
      .catch(error => console.log(error));
});








