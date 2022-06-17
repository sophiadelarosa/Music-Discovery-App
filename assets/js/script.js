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

    // localStorage.setItem('imageURL', JSON.stringify(event.target.files[0]));
    // const savedURL =JSON.parse(localStorage.getItem('imageURL'));
    // document.getElementById('output').innerHTML=`
    // <img src='${savedURL}'>`
}

//SAVE USERNAME AND PICTURE INFORMATION
let saveButton = document.getElementById("save");
let userName = document.getElementById("username").value;

//function for save button
function saveProfile (e) {
    e.preventDefault();
    //establishing variables for the function
    let profilePic = document.getElementById("output");
    let userName = document.getElementById("username").value;
    let profileInfo = " " + profilePic + " " + userName;


    localStorage.setItem('username', JSON.stringify(userName));
    const savedUserName =JSON.parse(localStorage.getItem('username'));
    document.getElementById('localStorage').innerHTML=`<h4>${savedUserName}</h4>`;

    console.log("*****", document.getElementById("file"))
    console.log("****", profilePic.img)

}

saveButton.onclick =saveProfile

//function for favorites button to save to local storage

function saveFav () {

}


//function to display song info into button
//song title, artist go to innerHTML text
//url is put into a tag href

function displayFav () {

}

