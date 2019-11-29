const apiURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=da5cf0072ff1096eaeadd11a0fade922";

const apiURL2 = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&APPID=da5cf0072ff1096eaeadd11a0fade922";

fetchAPI = (apiURL, num) => {
  fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {

      switch (num) {
        case 1:
          this.summaryBox(jsObject);
          break;
        case 2:
          this.fiveDay(jsObject);
          break;
        case 3:
          this.wchill(jsObject);
          break;
      }
    });
}

summaryBox = (jsObject) => {
  var mainObj = jsObject.main;

  let cityName = jsObject.name;
  let current = jsObject.weather[0].description;
  let high = mainObj.temp_max,
    temp = mainObj.temp,
    humidity = mainObj.humidity;
  let windSpeed = jsObject.wind.speed;

  document.getElementById('city-name').textContent = cityName;
  document.getElementById('current').textContent = current;
  document.getElementById('high').textContent = high.toFixed(0);
  document.getElementById('temp').textContent = temp.toFixed(0);
  document.getElementById('humidity').textContent = humidity;
  document.getElementById('wind-speed').textContent = windSpeed;


}

wchill = (jsObject) => {
  var mainObj = jsObject.main;

  let temp = mainObj.temp;
  let velo = jsObject.wind.speed;

  if (isNaN(temp) || isNaN(velo) || temp > 50 || velo < 3) {
    document.getElementById("chill").textContent = "N/A"
  } else {
    document.getElementById("chill").innerHTML = calc(temp, velo).toFixed(0) + " &#8457;";
  }

  function calc(temp, velo) {
    return (35.74 + 0.6215 * temp - 35.75 * velo ** 0.16 + 0.4275 * temp * velo ** 0.16);
  }

  /* 
  var tempF = parseFloat(document.getElementById("temp").textContent);
  var velo = parseFloat(document.getElementById("wind-speed").textContent);

  if (isNaN(tempF) || isNaN(velo) || tempF>50 || velo<3)  {
      document.getElementById("chill").textContent = "N/A"
  } else {
      document.getElementById("chill").innerHTML = calc(tempF, velo).toFixed(0) + " &#8457;";
  }

  function calc(t, v) {
      return (35.74 + 0.6215 * t - 35.75 * v ** 0.16 + 0.4275 * t * v ** 0.16);
  }
  */

}

fiveDay = (jsObject) => {
  var count = 0;

  for (key in jsObject.list) {
    var textCheck = jsObject.list[key].dt_txt;
    if (textCheck.includes("18:00:00")) {
      count++;
      var varDay = "";
      var weekdays = new Date(jsObject.list[key].dt_txt).getDay();
      console.log('Array:', jsObject.list[key].dt_txt);
      console.log(weekdays);

      switch (weekdays) {
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