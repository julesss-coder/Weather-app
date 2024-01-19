/*
TODO
Add place autocomplete so user can choose appropriate city
Add photo of chosen location OR add weather icon
Deal with error / city not found

Separate UI code from API call code
*/

// Accuweather API key
const key = 'xRGf1AI3AgaB1MvKh3QACiNGKpWMwIvR';




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

export { updateLocationWeather };








