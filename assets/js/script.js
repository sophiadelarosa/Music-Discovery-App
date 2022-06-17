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
};

//SAVE USERNAME AND PICTURE INFORMATION
let saveButton = document.getElementById("save");
let userName = document.getElementById("username").value;

//function for save button
function saveProfile (e) {
    e.preventDefault();
    //establishing variables for the function
    let profilePic = document.getElementById("output").src;
    let userName = document.getElementById("username").value;
    let profileInfo = " " + profilePic + " " + userName;

    //Saving username to local storage and displaying it back
    localStorage.setItem('username', JSON.stringify(userName));
    const savedUserName =JSON.parse(localStorage.getItem('username'));
    document.getElementById('nameFromStorage').innerHTML=`<h1 class="display-4 title">@` + `${savedUserName}</h1>`;

    //saving profile photo URL to localStorage and displaying it
    localStorage.setItem('photoURL', JSON.stringify(profilePic.slice(5)));
    const savedPhotoURL = JSON.parse(localStorage.getItem('photoURL'));
    document.getElementById('output').innerHTML = `<img src="${savedPhotoURL}" id="output" class="output" width="200" />`;

    //console.log("*****", document.getElementById("file"))
    console.log(profilePic.slice(5))

}

//if save button is clicked, run saveProfile function
saveButton.onclick = saveProfile

//IF STATEMENTS to keep username and photo on the page even if refreshed
//if username in local storage has contents, display username
if(localStorage.getItem('username') != null) {
    const savedUserName =JSON.parse(localStorage.getItem('username'));
    document.getElementById('nameFromStorage').innerHTML=`<h1 class="display-4 title">@` + `${savedUserName}</h1>`;
};

//if photo URL in local storage has contents, display url
if(localStorage.getItem('photoURL') != null) {
    const savedPhotoURL = JSON.parse(localStorage.getItem('photoURL'));
    document.getElementById('output').innerHTML = `<img src="${savedPhotoURL}" id="output" class="output" width="200" />`;
}


//if username in local storage is empty, display nothing
//} else if(localStorage.getItem('username') = null) {
//    document.getElementById('NameFromStorage').innerHTML=``;
//}


//function for favorites button to save to local storage

function saveFav () {

}


//function to display song info into button
//song title, artist go to innerHTML text
//url is put into a tag href

//function displayFav () {
