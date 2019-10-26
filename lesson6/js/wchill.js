var tempF = parseFloat(document.getElementById("temp").textContent);
var velo = parseFloat(document.getElementById("speed").textContent);

if (isNaN(tempF) || isNaN(velo)) {
    document.getElementById("chill").innerHTML = "N/A"
} else {
    document.getElementById("chill").innerHTML = calc(tempF, velo).toFixed(0) + " &#8457;";
}

function calc(t, v) {
    return (35.74 + 0.6215 * t - 35.75 * v ** 0.16 + 0.4275 * t * v ** 0.16);
}