const APIKey = "65686d33b2a24534eb747adcc2cd72d1";

const currentLocation = document.getElementById('location-search')
let today = moment();
let locationsList = [];


// weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;



// console.log(today.add(5, 'days').format("M/D/YYYY"));


function getApi(requestURL) {
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
}



//sets location into local storage under key "location"
function storeLocation() {
  localStorage.setItem("location", JSON.stringify(locationsList))
}


// adds the last searched city as a button to the list and emptys the saved searches  
function makeLocationsList() {
  $(".locations").empty();
  locationsList.forEach(city => {
    $(".locations").prepend($(`<button class="list-group-item list-group-item-action locationButton" id="${city}">${city}</button>`));
    // $(".locations").empty();
  });
}


// submit button to 
$("form").on("submit", function (event) {
  event.preventDefault();
  let currentLocation = $("#location-search").val().trim();
  if (currentLocation == "") {
    return
  }
  if (locationsList.includes(currentLocation)) {
    return
  }
  locationsList.push(currentLocation);
  console.log(locationsList);
  makeLocationsList();
  storeLocation();
  weatherNow(APIKey, currentLocation)
  $("#location-search").val("")
})




//on click for previous searched cities
$(document).on("click", ".locationButton", function (event) {
  event.preventDefault();
  let currentLocation = $(this).attr("id");
  weatherNow(APIKey, currentLocation)
  if (locationsList.includes(currentLocation)) {
    return
  }
  locationsList.push(currentLocation);
  makeLocationsList();
  storeLocation();
  $("#location-search").val("")
})

//function to search for current weather data
function weatherNow(APIKey, currentLocation) {

  weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&units=imperial&appid=${APIKey}`;

  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $(".forecast").empty();
      $(".weather-box").empty();
      //set daily weather attributes
      $(".weather-box").append(
        `<div class="row">
        <h2 class="mr-3">${data.name} (${moment().format("M/D/YYYY")})</h2>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"></div>`)
      $(".weather-box").append(
        `<p class= "col-3">Temp: ${Math.floor(data.main.temp)} &degF</p>`)
      $(".weather-box").append(
        `<p class= "col-3">Wind: ${data.wind.speed} MPH</p>`)
      $(".weather-box").append(
        `<p class= "col-3">Humidity: ${data.main.humidity}%</p>`)
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      let queryWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={minutely,hourly}&units=imperial&appid=${APIKey}`
      fetch(queryWeather)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          $(".weather-box").append(
            `<p class= "col-3" id="uvi">UVI: ${data.daily[0].uvi}`)

          //set background color of uvi index
          if (data.daily[0].uvi < 3) {
            $("#uvi").addClass("uvi-low")
          } else if (data.daily[0].uvi < 6) {
            $("#uvi").addClass("uvi-moderate")
          } else if (data.daily[0].uvi < 8) {
            $("#uvi").addClass("uvi-high")
          } else if (data.daily[0].uvi < 11) {
            $("#uvi").addClass("uvi-very-high")
          } else {
            $("#uvi").addClass("uvi-extreme")
          }

          //set cards for upcoming forecast
          for (let i = 0; i < 5; i++) {
            let tmpDate = today.add(1, 'd').format("M/D/YYYY")
            $(".forecast").append(
              `<div class="card border">
                <div class="card-body"
                  <h3 class= "card-title">${tmpDate}</h3>
                  <img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png">
                  <p class= "card-text">Temp: ${data.daily[i].temp.max} &degF</p>
                  <p class= "card-text">Wind: ${data.daily[i].wind_speed} MPH</p>
                  <p class= "card-text">Humidity: ${data.daily[i].humidity}%</p>
                </div>
              </div>`)}
        })
    })
}

function init() {
  let storedLocations = JSON.parse(localStorage.getItem("location"))
  if(storedLocations) {
    locationsList = storedLocations;
  }
  makeLocationsList()
}

init()