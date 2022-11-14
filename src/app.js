let today = new Date();
let hrs = today.getHours();
let minutes = ("0" + today.getMinutes()).slice(-2);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function displayDateTime() {
  document.querySelector("#current-date-time").innerHTML = `${
    days[today.getDay()]
  } ${hrs}:${minutes}`;
}

displayDateTime();

function showCurrentWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#today-weather").innerHTML =
    response.data.weather[0].main;
}

let weatherApi = "488d30b67f87bf2a4ebdf27315009eaa";
let units = "metric";

function searchCity(city) {
  let weatherUrl = `https://api.openWeathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}&units=${units}`;
  axios.get(weatherUrl).then(showCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchCityButton = document.querySelector("#city-search-bar");
searchCityButton.addEventListener("submit", handleSubmit);

function searchCurrentLocation(position) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${weatherApi}&units=${units}`;

  axios.get(url).then(showCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Brisbane");

// Below code for Fahrenheit Conversion
//function convertToFahrenheit(event) {
//  event.preventDefault();
//  let temperatureValue = document.querySelector(
//    "#current-temperature"
//  ).innerHTML;
//  let fahrenheit = temperatureValue * 1.8 + 32;
//  let currentTemperature = document.querySelector("#current-temperature");
//  currentTemperature.innerHTML = Math.round(fahrenheit);
//}

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

// Below code for Celsius to Fahrenheit Conversion
//function convertToCelsius(event) {
//  event.preventDefault();
//  let temperatureValue = document.querySelector(
//    "#current-temperature"
//  ).innerHTML;
//  let celsius = (temperatureValue - 32) * 0.5556;
//  let currentTemperature = document.querySelector("#current-temperature");
//  currentTemperature.innerHTML = Math.round(celsius);
//}

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", convertToCelsius);
