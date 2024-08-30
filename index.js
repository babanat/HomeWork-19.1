const apiKey = "3e68bc44c22a2ba4e90f7832e5085cf5";
const city = "Chicago";
const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

async function fetchWeatherData(apiUrl) {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Error HTTP: ${response.status}`);
  }
  return response.json();
}
function updateWeatherInfo(data) {
  const elements = getWeatherElements();
  if (!elements) {
    console.error("We couldn't find some elements.");
    return;
  }
  const {
    locationElement,
    temperatureElement,
    descriptionElement,
    timeElement,
    dateElement,
    humidityElement,
    pressureElement,
    windElement,
  } = elements;

  const location = `${data.name}, ${data.sys.country}`;
  const temperature = `${data.main.temp} °C`;
  const description = data.weather[0].description;
  const humidity = `${data.main.humidity} %`;
  const pressure = `${data.main.pressure} hPa`;
  const windSpeed = `${data.wind.speed} m/s`;

  const currentTime = new Date();
  const time = currentTime.toLocaleTimeString();
  const date = currentTime.toLocaleDateString();

  locationElement.textContent = location;
  temperatureElement.textContent = temperature;
  descriptionElement.textContent = description;
  timeElement.textContent = `Time: ${time}`;
  dateElement.textContent = `Date: ${date}`;
  humidityElement.textContent = `Humidity: ${humidity}`;
  pressureElement.textContent = `Pressure: ${pressure}`;
  windElement.textContent = `Wind Speed: ${windSpeed}`;
}
function getWeatherElements() {
  const locationElement = document.querySelector(".location");
  const temperatureElement = document.querySelector(".temperature");
  const descriptionElement = document.querySelector(".description");
  const timeElement = document.querySelector(".time");
  const dateElement = document.querySelector(".date");
  const humidityElement = document.querySelector(".humidity");
  const pressureElement = document.querySelector(".pressure");
  const windElement = document.querySelector(".wind");

  if (
    !locationElement ||
    !temperatureElement ||
    !descriptionElement ||
    !timeElement ||
    !dateElement ||
    !humidityElement ||
    !pressureElement ||
    !windElement
  ) {
    return null;
  }

  return {
    locationElement,
    temperatureElement,
    descriptionElement,
    timeElement,
    dateElement,
    humidityElement,
    pressureElement,
    windElement,
  };
}
async function getWeather() {
  try {
    const data = await fetchWeatherData(apiUrl);
    updateWeatherInfo(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

const updateBtn = document.querySelector(".update-weather");
updateBtn.addEventListener("click", getWeather);
getWeather();
