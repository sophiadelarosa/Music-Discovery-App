//SOPHIA ENERGY LEVEL SECTION

//variables
var slider = document.getElementById('slider');
//clientId = '60d1e4ee22864c28a9dc3afb6e6a08ee';
//clientSecret = '2ad6cb3ca73043d090a00677b2cabd21';


//SOPHIA PROFILE PAGE JS

//CHANGEABLE PROFILE PICTURE
var loadFile = function (event) {
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
    };
    

//SAVE USERNAME AND PICTURE INFORMATION
let saveButton = document.getElementById("save");


//function for save button
function saveProfile () {
    //establishing variables for the function
    let profilePic = document.getElementById("output");
    let userName = document.getElementById("username").value;
    let profileInfo = " " + profilePic + " " + userName;

    localStorage.setItem('userName', userName);

    //if there is nothing saved at the start then save an empty array
    if(localStorage.getItem('userName') === null) {
        localStorage.setItem('userName', '[]');
    }
    
    //get old leaderboard item and slap it to the new data
    //let oldLeaderboardItem = JSON.parse(localStorage.getItem('leaderboardItem'));
    //oldLeaderboardItem.push(leaderboardItem);

    //save the old and new leaderboard item in local storage
    //localStorage.setItem('leaderboardItem', JSON.stringify(oldLeaderboardItem));

    //if local storage profileInfo is not empty, show contents
    else (
        userName = (localStorage.getItem(userName))
    );


}

saveButton.addEventListener('click', saveProfile);

