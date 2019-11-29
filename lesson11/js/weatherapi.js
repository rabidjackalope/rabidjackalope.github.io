const townId = document.getElementById('town').dataset.townid;

const appId = "da5cf0072ff1096eaeadd11a0fade922";
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?id=${townId}&units=imperial&APPID=${appId}`;
const forecastAPIURL = `https://api.openweathermap.org/data/2.5/forecast?id=${townId}&units=imperial&APPID=${appId}`;
const weatherIconPath = "https://openweathermap.org/img/w/";
const dow = new Intl.DateTimeFormat("en-US", {
    weekday: "short"
});

fetch(weatherAPIURL)
    .then((response) => response.json())
    .then((jsObject) => {
        const tempF = jsObject.main.temp.toFixed(0);
        const windSpeedMPH = jsObject.wind.speed.toPrecision(2);
        const windChillF = windChill(tempF, windSpeedMPH);
        document.getElementById('temp').textContent = tempF;
        document.getElementById('high').textContent = jsObject.main.temp_max.toFixed(0);
        document.getElementById('wind-speed').textContent = windSpeedMPH;
        document.getElementById('chill').textContent = windChillF;
        document.getElementById('humidity').textContent = jsObject.main.humidity.toFixed(0);
        document.getElementById('current').textContent = jsObject.weather[0].description;
    });

function windChill(tempF, speed) {
    const maxTempF = 50;
    const minWindSpeed = 3;
    let f = "N/A"
    if ((tempF <= maxTempF) && (speed >= minWindSpeed)) {
        f = (35.74 + (0.6215 * tempF) -
            (35.75 * speed ** 0.16) +
            (0.4275 * tempF * speed ** 0.16)).toFixed(0);
    }
    return f;
}

fetch(forecastAPIURL)
    .then((response) => response.json())
    .then((jsObject) => {
        var count = 0;

        for (key in jsObject.list) {
            var textCheck = jsObject.list[key].dt_txt;
            if (textCheck.includes("18:00:00")) {
                count++;
                var varDay = "";
                var weekdays = new Date(jsObject.list[key].dt_txt).getDay();

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
    });