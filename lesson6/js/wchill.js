var ct = parseFloat(document.getElementById("temp").value);
var sp = parseFloat(document.getElementById("speed").value);

if (isNaN(ct) || isNaN(sp)) {
    document.getElementById("chill").innerHTML = "N/A"
} else {
    document.getElementById("chill").innerHTML = calc(ct, sp) + '&#8457;'
}

function calc(ct, sp) {
    return (35.74 + 0.6215 * ct - 35.75 * sp ** 0.16 + 0.4275 * ct * sp ** 0.16);
}