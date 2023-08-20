let currentLocation = document.querySelector(".location");

let searchInput = document.querySelector("#searchInput");
let currentDayName = document.querySelector("#current-day-name");
let currentDayDate = document.querySelector("#current-day-date");
let currentDayTemp = document.querySelector("#current-day-temp");
let currentDayImg = document.querySelector("#current-day-img");
let currentDayStatus = document.querySelector("#current-day-status");
let currentDayHumidity = document.querySelector("#current-day-humidity");
let currentDayWind = document.querySelector("#current-day-wind");
let currentDayWindDir = document.querySelector("#current-day-windDir");

let nextDaysNames = document.querySelectorAll(".day-name");
let nextDaysMinTemp = document.querySelectorAll(".min-degree");
let nextDaysMaxTmp = document.querySelectorAll(".max-degree");
let nextDaysStatusImg = document.querySelectorAll(".weather-status-img");
let nextDaysStatus = document.querySelectorAll(".weather-status");


async function getWeatherData(searchCity) {
  let DataResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=fe11d28b5b5d4c18bf3103013231908&q=${searchCity}&days=3`
  );
  let weatherData = await DataResponse.json();
  return weatherData;
}

function displayCurrentDay(currentDay) {
  let dateObj = new Date();
  currentDayName.innerHTML = dateObj.toLocaleDateString("en-us", {weekday: "long"});
  currentDayDate.innerHTML = `${dateObj.getDate()} ${dateObj.toLocaleDateString(
    "en-us",
    { month: "long" }
  )}`;

  currentLocation.innerHTML = currentDay.location.name;
  currentDayTemp.innerHTML = currentDay.current.temp_c;
  currentDayImg.setAttribute("src", currentDay.current.condition.icon);
  currentDayStatus.innerHTML = currentDay.current.condition.text;
  currentDayHumidity.innerHTML = currentDay.current.humidity;
  currentDayWind.innerHTML = currentDay.current.wind_kph;

  let windDir;
  switch (currentDay.current.wind_dir) {
    case "N":
      windDir = "North";
      break;
    case "E":
      windDir = "East";
      break;
    case "S":
      windDir = "South";
      break;
    case "W":
      windDir = "West";
      break;
    case "NE":
      windDir = "Northeast";
      break;
    case "SE":
      windDir = "Southeast";
      break;
    case "SW":
      windDir = "Southwest";
      break;
    case "NW":
      windDir = "Northwest";
      break;
    case "NNE":
      windDir = "North-northeast";
      break;
    case "ENE":
      windDir = "East-northeast";
      break;
    case "ESE":
      windDir = "East-southeast";
      break;
    case "SSE":
      windDir = "South-southeast";
      break;
    case "SSW":
      windDir = "South-southwest";
      break;
    case "WSW":
      windDir = "West-southwest";
      break;
    case "WNW":
      windDir = "West-northwest";
      break;
    case "NNW":
      windDir = "North-northwest";
      break;
  }
  currentDayWindDir.innerHTML = windDir;
}

function displayNextDays(nextDays) {
  for (let i = 0; i < 2; i++) {
    let nextDayDate = new Date(nextDays.forecast.forecastday[i + 1].date);
    nextDaysNames[i].innerHTML = nextDayDate.toLocaleDateString("en-us", {weekday: "long"});
    nextDaysMinTemp[i].innerHTML =
      nextDays.forecast.forecastday[i + 1].day.mintemp_c;
    nextDaysMaxTmp[i].innerHTML =
      nextDays.forecast.forecastday[i + 1].day.maxtemp_c;
    nextDaysStatusImg[i].setAttribute(
      "src",
      nextDays.forecast.forecastday[i + 1].day.condition.icon
    );
    nextDaysStatus[i].innerHTML =
      nextDays.forecast.forecastday[i + 1].day.condition.text;
  }
}

// Main Function to start the program
async function weatherApp (searchCity='cairo') {
  let weatherData = await getWeatherData(searchCity);
  if (!weatherData.error) {
      displayCurrentDay(weatherData);
      displayNextDays(weatherData);    
  }
};

weatherApp();

document.querySelector('.search-btn').addEventListener('click', function(){
    weatherApp(searchInput.value);
});

