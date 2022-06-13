//SOPHIA ENERGY LEVEL SECTION

//variables
var submitButton = document.getElementById('submit');
var slider = document.getElementById('slider');
var client_id = '60d1e4ee22864c28a9dc3afb6e6a08ee';
var client_secret = '2ad6cb3ca73043d090a00677b2cabd21';
var access_token = 'BQBKt5WcOsM70IhQ-7gFbf5bdZz9RW2rjZuVTsFHLZz_0k7ik6b3viSbavNp-WU9VwmnZ4qJw04oBNra_fcxsK2YA5iUXBCEPKAVGFt_cnqAjy3cEH5x';



//function for fetching recommendations with 
function getRecommendations(event) {
    //event.preventDefault();

    let energyRecommends = 'https://api.spotify.com/v1/browse/new-releases';
    // + '?target-energy=' + slider.value
    
    fetch(energyRecommends)
    .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            displayRepos(data, user);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
};







//main div in results page




//submit event listener
submitButton.addEventListener('click', getRecommendations);
