function formatTime(time) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[time.getDay()];
    let hour = time.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    return `${day}, ${hour}:${minutes}`;
  }

  function formatTemperature(response) {

    document.querySelector("#current-city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = `${Math.round(response.data.main.temp)}<span id="celsius">°C</span>`;
    document.querySelector("#warnings").innerHTML = response.data.weather[0].main;
document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`;
document.querySelector("#wind-speed").innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  }

function searchCity(city) {
  let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
  let domain = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${domain}q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(formatTemperature);
}

function changeCity(event) {
event.preventDefault();
let city = document.querySelector("#search-input").value;
searchCity(city);
}

  function searchLocation(position) {
    let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
    let domain = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${domain}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(formatTemperature);
  }
  
  function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let currentTime = new Date();
  document.querySelector("#local-time").innerHTML = formatTime(currentTime);
  
  let searchInput = document.querySelector("form");
  searchInput.addEventListener("submit", changeCity);
  
  let currentLocationButton = document.querySelector("#location-button");
  currentLocationButton.addEventListener("click", getCurrentPosition);

  searchCity("London");
  