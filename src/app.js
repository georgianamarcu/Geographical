import mapboxgl from "mapbox-gl";
import showMap from "./displayInitialMap.js"

//Global variables

let address = document.querySelector(".userInput");
let button = document.querySelector(".search-button");
let tempButton = document.querySelector(".tempButton")

//Display initial static map
showMap();





console.log('hello jojo')

//Temperature button: hidden in the beginning
tempButton.insertAdjacentHTML(
    "beforeend",
    `<button class="weather"><i class="lni lni-cloud"></i>Temperature</button>`
  );
tempButton.style.display = "none";


//Event listener on the "Search button" to retrieve position on the map of searched location from the API

button.addEventListener("click", (e) => {
  tempButton.style.display = "flex";
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address.value}.json?access_token=pk.eyJ1IjoiZ2VvcmdpYW5hbTIyIiwiYSI6ImNrenFycXQ3bjN1MzAydm55cDBoNDk3aHUifQ.80Tl5qxyL8PzPUwxkSXW5w`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZ2VvcmdpYW5hbTIyIiwiYSI6ImNrenFycXQ3bjN1MzAydm55cDBoNDk3aHUifQ.80Tl5qxyL8PzPUwxkSXW5w";
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/georgianam22/ckzs7n3k9000315mrwfzo4y7m", // style URL
        center: data.features[0].center, // starting position [lng, lat]
        zoom: 15, // starting zoom
      });
      const marker1 = new mapboxgl.Marker()
        .setLngLat([
          data.features[0].geometry.coordinates[0],
          data.features[0].geometry.coordinates[1],
        ])
        .addTo(map);

      let coordinates = document.querySelector(".coordinates");
      coordinates.innerHTML = "";
      coordinates.insertAdjacentHTML(
        "beforeend",
        `<h4 class ="longitude">The longitude is: ${data.features[0].geometry.coordinates[0]}</h4>
        <h4 class ="latitude">The latitude is: ${data.features[0].geometry.coordinates[1]}</h4>`
      );
      let weather = document.querySelector(".weather");

      // Event listener on the "Temperature button" to get the current temperature in Celsius of the searched location coordonates 

      weather.addEventListener("click", (e) => {
        let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${data.features[0].geometry.coordinates[1]}&lon=${data.features[0].geometry.coordinates[0]}&appid=cff9720e02718d67f9cecb1197e8923c&units=metric`;
        fetch(url2)
          .then((response) => response.json())
          .then((temperature) => {
            let tempDisplay = document.querySelector(".tempDisplay");
            tempDisplay.innerHTML = "";
            tempDisplay.insertAdjacentHTML(
              "beforeend",
              `<h4 class ="temperature">The current temperature is ${temperature.main.temp}°C</h4>`
            );
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

