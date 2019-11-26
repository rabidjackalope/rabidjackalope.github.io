const apiURL = "https://api.openweathermap.org/data/2.5/weather?id=5585010&units=imperial&APPID=da5cf0072ff1096eaeadd11a0fade922";

const apiURL2 = "https://api.openweathermap.org/data/2.5/forecast?id=5585010&units=imperial&APPID=da5cf0072ff1096eaeadd11a0fade922";

fetchAPI = (apiURL, num) =>  {
  fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {

    switch(num) {
      case 1:
        this.summaryBox(jsObject);
        break;
      case 2:
        this.fiveDay(jsObject);
        break;
    }
  });
}

summaryBox = (jsObject) =>  {
  var mainObj = jsObject.main;

  let cityName = jsObject.name;
  let current = jsObject.weather[0].description;
  let high = mainObj.temp_max,
      temp = mainObj.temp,
      humidity = mainObj.humidity;
  let windSpeed = jsObject.wind.speed;

  document.getElementById('city-name').textContent = "Fish Haven (aka " + cityName + ")";
  document.getElementById('current').textContent = current;
  document.getElementById('high').textContent = high.toFixed(0);
  document.getElementById('temp').textContent = temp.toFixed(0);
  document.getElementById('humidity').textContent = humidity;
  document.getElementById('wind-speed').textContent = windSpeed;

  
}

fiveDay = (jsObject) => {
  var count = 0;

  for(key in jsObject.list) {
    var textCheck = jsObject.list[key].dt_txt;
    if(textCheck.includes("18:00:00")) {
      count++;
      var varDay = "";
      var weekdays = new Date(jsObject.list[key].dt_txt).getDay();
      console.log('Array:', jsObject.list[key].dt_txt);
      console.log(weekdays);

      switch(weekdays) {
        case 1: 
          varDay = "Monday";
          break;
        case 2:
          varDay = "Tuesday";
          break;
        case 3:
          varDay = "Wednesday";
          break;
        case 4:
          varDay = "Thursday";
          break;
        case 5:
          varDay = "Friday";
          break;
        case 6:
          varDay = "Saturday";
          break;
        case 0:
          varDay = "Sunday";
          break;
      }
      

      const imagesrc = 'https://openweathermap.org/img/w/' + jsObject.list[key].weather[0].icon + '.png';
      const desc = jsObject.list[key].weather[0].description;

      document.getElementById('day' + count).textContent = jsObject.list[key].main.temp.toFixed(0);

      document.getElementById('icon' + count).setAttribute('src', imagesrc);
      document.getElementById('icon' + count).setAttribute('alt', desc);
      
      document.getElementById('names' + count).textContent = varDay;
    }
  }
}


fetchAPI(apiURL, 1);
fetchAPI(apiURL2, 2);