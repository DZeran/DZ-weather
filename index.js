let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let dayTime = document.querySelector("#date");
dayTime.innerHTML = `${day} ${hour}:${minute}`;

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#query");
  let apiKey = "bc47f103603664d6fab7435fa24f6df9";
  let city = `${cityInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = 77;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = 25;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = `${temperature}`;
  let cityInput = document.querySelector("#query");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
}

function showCurrentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = `${temperature}`;
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
}

function currentPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "bc47f103603664d6fab7435fa24f6df9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentButton = document.querySelector("#currentLocation");
currentButton.addEventListener("click", getCurrentLocation);

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }01d.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
