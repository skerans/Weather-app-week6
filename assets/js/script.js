const APIKey = "65686d33b2a24534eb747adcc2cd72d1";
city = "Denver";

let locationsList = [];

weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;






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
  localStorage.setItem("location", json.stringify(locationsList))
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
  console.log(newLocation);
  locationsList.push(newLocation);
  console.log(locationsList);
  makeLocationsList();
  $("#location-search").val("")
})
//on click for previous searched cities
// $(".locationList").on("click", )


//function to search for current weather data
function weatherNow() {
  
}