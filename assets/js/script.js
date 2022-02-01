const APIKey = "65686d33b2a24534eb747adcc2cd72d1";
city = "Denver";

weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

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