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
let user = document.getElementById("username").value;

//function for save button
function saveProfile (e) {
    e.preventDefault();
    //establishing variables for the function
    let profilePic = document.getElementById("output");
    let userName = document.getElementById("username").value;
    let profileInfo = " " + profilePic + " " + userName;

    localStorage.setItem('username', userName);
    console.log(localStorage.getItem('username'));
}

//let userName = document.getElementById("username").value;

if(localStorage.getItem('username') != null) {
    console.log(localStorage.getItem('username'));
    let text = localStorage.getItem('username');
    user = text;
};

saveButton.addEventListener('click', saveProfile);

