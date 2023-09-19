const weatherEl = document.querySelector(".content__container");
const city_state = localStorage.getItem("city_state")

async function onSearchChange(event) {
    const city_state = event.target.value
    renderWeather(city_state)
}

async function renderWeather(city_state) {
try {
  weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city_state},us&units=imperial&appid=493739d960d677d80b647e3df05e58c5`
  );
  weatherData = await weather.json();

  weatherEl.innerHTML = postHTML()
}
catch(error) {
    weatherEl.innerHTML = errorHTML()
}
}

function getTime(time) {
    var date = new Date(time * 1000);
    var hours = date.getHours() < 10 ? date.getHours() : date.getHours() % 12;
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var formattedTime = hours + ":" + minutes;
    return formattedTime;
}

function postHTML() {
    return `
    <div class="info__column temperature__column">
    <h2 class="city__name">${weatherData.name}</h2>
    <h3 class="temperature__fahrenheit">${Math.round(
      weatherData.main.temp
    )}°F </h3>
    <div class="low-and-high">
        <p class="low__temp">Low: ${Math.round(weatherData.main.temp_min)}°F</p>
        <p class="high__temp">High: ${Math.round(
          weatherData.main.temp_max
        )}°F</p>
    </div>
</div>
<div class="info__column type__column">
    <img src="https://openweathermap.org/img/wn/${
      weatherData.weather[0].icon
    }@2x.png" alt="" class="weather__type--img">
    <p class="weather__type--text">${weatherData.weather[0].main}</p>
    <p class="weather__type--description">${
      weatherData.weather[0].description
    }</p>
</div>
<div class="info__column other__weather--column">
    <div class="other__weather--container">
    <div class="other__weather--content">
            <div class="other__weather--title">
                Sunrise
            </div>
            <div class="other__weather--info">
            ${getTime(weatherData.sys.sunrise)} AM
            </div> 
        </div>
        <div class="other__weather--content">
            <div class="other__weather--title">
                Sunset
            </div>
            <div class="other__weather--info">
            ${getTime(weatherData.sys.sunset)} PM
            </div> 
        </div>
        <div class="other__weather--content">
            <div class="other__weather--title">
                Feels like
            </div>
            <div class="other__weather--info">
            ${Math.round(weatherData.main.feels_like)}°
            </div> 
        </div>
        <div class="other__weather--content">
            <div class="other__weather--title">
                Pressure
            </div>
            <div class="other__weather--info">
                ${weatherData.main.pressure} hPa
            </div> 
        </div>
        <div class="other__weather--content">
            <div class="other__weather--title">
                Wind Speed
            </div>
            <div class="other__weather--info">
            ${Math.round(weatherData.wind.speed)} mph
            </div> 
     </div>
        <div class="other__weather--content">
            <div class="other__weather--title">
               Humidity
            </div>
            <div class="other__weather--info">
            ${weatherData.main.humidity}%
            </div> 
        </div> 
    </div> 
</div> 
`
}

function errorHTML() {
    return `<div class="error__message">
    <p> Error! <br> Please enter in correct format: </p>
    <h4 class="city__error"> City, State </h4>
</div>`
}

renderWeather();
