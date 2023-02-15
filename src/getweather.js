

const img = document.querySelector('img');
let test = 0
const temp = document.querySelector('.temp');
const feels = document.querySelector('.feels');
const humidity = document.querySelector('.humidity');
const high = document.querySelector('.high');
const low = document.querySelector('.low');
const wind = document.querySelector('.wind');
const description = document.querySelector('.description');
const city = document.querySelector('.city');
let getLat;
let getLon;

export let render = () => {
let getweather = () => {
  const apiKey = '86e9f28d4cb96d5c6b2706d74fd7849d';

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${getLat}&lon=${getLon}&appid=${apiKey}&units=imperial`;
  fetch(url, {mode: 'cors'})
    .then(response => response.json())
    .then(response => {

      let weather = response.main;
      temp.textContent = `Temperature: ${weather.temp}º F`;
      humidity.textContent = `Humidity: ${weather.humidity} %`;
      feels.textContent = `Feels like: ${weather.feels_like}º F`;
      high.textContent = `High: ${weather.temp_max}º F`;
      low.textContent = `Low: ${weather.temp_min}ºF `;
      wind.textContent = `Wind speed : ${response.wind.speed} mph`;
      let descriptionOfWeather = response.weather[0].description;
      let properDescription = descriptionOfWeather.toLowerCase().replace(/(^|\s)\S/g, (firstLetter) => firstLetter.toUpperCase());
      description.textContent = properDescription
      city.textContent = response.name

      console.log(response.wind.speed);
      console.log(response.weather[0].description);
      displayGiphy();
    })
    .catch(error => console.error(error));
};

let displayGiphy = () => {
  const apiKey = '3YS3Iwn1NVfHKLgRHiYp51Q8OAidfFSo';
  let query = description.textContent;
  const url = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${query}`;
  fetch(url, {mode: 'cors'})
    .then(response => response.json())
    .then(response => {
      img.src = response.data.images.original.url;
    })
    .catch(error => console.error(error));
};

const search = document.querySelector('.search');

const submit = document.querySelector('.submit');
submit.addEventListener('click', () => {
  event.preventDefault();
  getLat = 0;
  getLon = 0;
  console.log(search.value);
  converrt();
  search.value = '';
});

let converrt = () => {
  const placename = search.value;
  const apiKey = 'e8002b39f75948ec9b3c46becc847f20';
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    placename
  )}&key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      getLat = data.results[0].geometry.lat;
      getLon = data.results[0].geometry.lng;
      console.log(`The latitude of ${placename} is ${getLat} and the longitude is ${getLon}`);
      getweather();
    })
    .catch(error => console.error(error));
};
search.value = 'Miami'
converrt()
search.value = ''
}
