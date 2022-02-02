const APIKey = "65686d33b2a24534eb747adcc2cd72d1";
city = "Denver";

weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

let locationsList = [];

function makeLocationsList() {
  $(".locations").empty();
  locationsList.forEach(city => {
    $(".locations").prepend($(`<button class="list-group-item list-group-item-action locationButton" data-location="${city}">${city}</button>`));
    // $(".locations").empty();
  });
}






function getApi(requestURL) {
fetch(requestURL) 
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
}

getApi(weatherURL);


$("form").on("submit", function (event) {
  event.preventDefault();
  console.log("hi");
  let newLocation = $("#location-search").val().trim();
  console.log(newLocation);
  locationsList.push(newLocation);
  console.log(locationsList);
  makeLocationsList();
})