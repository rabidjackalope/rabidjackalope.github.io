const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hours: 'numeric', minutes: 'numeric', seconds: 'numeric'};
document.getElementById('lastupdate').innerHTML = new Date(document.lastModified).toLocaleString(options);