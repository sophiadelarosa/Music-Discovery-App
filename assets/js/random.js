var randomSearch = document.querySelector("#randomizerSea")

var apiKeyRandom = ""


randomSearch.addEventListener('click', function() {
    fetch('https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi')
    .then((response) => response.json())
    .then((data) => console.log(data))




    .catch((err) => alert("something went wrong!"));

});







