const APIKey = "65686d33b2a24534eb747adcc2cd72d1";
currentLocation = "Denver";

let locationsList = [];


// weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;


const b = new Date(1643827807000)
let bay = b.getUTCDate();
console.log(bay);


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
  let newLocation = $("#location-search").val().trim();
  if (newLocation == "") {
    return
  }
  if (locationsList.includes(newLocation)) {
    return
  }
  locationsList.push(newLocation);
  console.log(locationsList);
  makeLocationsList();
  storeLocation();
  $("#location-search").val("")
})




//on click for previous searched cities
$(document).on("click", ".locationButton", function (event) {
  event.preventDefault();
  let newLocation = $(this).attr("id");
  if (locationsList.includes(newLocation)) {
    return
  }
  locationsList.push(newLocation);
  console.log(newLocation);
  console.log(locationsList);
  makeLocationsList();
  storeLocation();
  $("#location-search").val("")
})

//function to search for current weather data
function weatherNow(APIKey, currentLocation) {

  weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&units=imperial&appid=${APIKey}`;

  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //set daily weather attributes
      $(".weather-box").append(
        `<div class="row">
        <h2 class="mr-3">${data.name} (${moment().format("M/D/YYYY")})</h2>
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"></div>`)
      $(".weather-box").append(
        `<p>Temp: ${Math.floor(data.main.temp)} &degF</p>`)
      $(".weather-box").append(
        `<p>Wind: ${data.wind.speed} MPH`)
      $(".weather-box").append(
        `<p>Humidity: ${data.main.humidity}%`)
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      let queryWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={minutely,hourly}&units=imperial&appid=${APIKey}`
      fetch(queryWeather)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
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
          $(".weather-box").append(
            `<p id="uvi">UVI: ${data.daily[0].uvi}`)
          //set cards for upcoming forecast
          for (let i = 0; i < 6; i++) {
            
          }

        })
    })

}

//daily[0] = today



weatherNow(APIKey, currentLocation)