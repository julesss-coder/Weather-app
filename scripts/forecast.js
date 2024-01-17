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

const locationInput = document.querySelector(".requested-location");


locationInput.addEventListener('keypress', e => {
  if (e.keyCode === 13) {
    e.preventDefault();
    const location = e.target.value;
    // Why can I access this function expression before its declaration?
    // GitHub CoPilot says: In JavaScript, the order of function execution is determined by the runtime, not the order in which functions are declared. This means that a function isn't invoked until it's actually called.
    // In your code, the getLocationKey function is defined at the time the event listener is triggered, not when the event listener is added. So even though getLocationKey is defined after the event listener in the code, it's already defined by the time the event listener is triggered (i.e., when the user presses the Enter key).

    // This is different from function hoisting, where function declarations are moved to the top of their scope. Function expressions like getLocationKey are not hoisted, but in this case, it doesn't matter because the function isn't called until the event occurs.
    const locationKey = getLocationKey(location);
    getCurrentConditions(locationKey);
  }
});


const getLocationKey = async (location) => {
  const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${location}&alias=Always`);
  const data = await response.json();
  // Data about the requested location. Include city name (EnglishName, LocalizedName), coutnry
  console.log(data);
  // For now, use the first entry in data array. Later, implement autocomplete or a dropdown with all options
  return data[0].Key;
};

const getCurrentConditions = async (locationKey) => {
  const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/30332?apikey=${key}&details=false`);
  const data = await response.json();
  console.log(data[0]);
};



