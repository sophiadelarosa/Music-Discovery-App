//SOPHIA PROFILE PAGE JS

//SAVE USERNAME AND PICTURE INFORMATION
let saveButton = document.getElementById("saveButton");
let userName = document.getElementById("username").value;
let favoriteEl = document.getElementById("favorites");

//function for save button
function saveProfile (e) {
    e.preventDefault();
    //establishing variables for the function
    let userName = document.getElementById('username').value;
    var file = document.getElementById('avatar').files[0];
    console.log(file)

    //Saving username to local storage and displaying it back
    localStorage.setItem('username', JSON.stringify(userName));
    const savedUserName =JSON.parse(localStorage.getItem('username'));
    document.getElementById('nameFromStorage').innerHTML=`<h1 class="display-4 title">@` + `${savedUserName}</h1>`;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', (event) => {
        const img = document.createElement('img');
        document.getElementById('imgGrid').appendChild(img);
        img.src = event.target.result;
        img.alt = file.name;

        var save = event.target.result;
        console.log(save) 
        localStorage.setItem("fileLoad", JSON.stringify(save));
    });
    document.location.reload();
};


//if save button is clicked, run saveProfile function
saveButton.onclick = saveProfile

//IF STATEMENTS to keep username and photo on the page even if refreshed
//if username in local storage has contents, display username
if(localStorage.getItem('username') != null) {
    const savedUserName =JSON.parse(localStorage.getItem('username'));
    document.getElementById('nameFromStorage').innerHTML=`<h1 class="display-4 title">@` + `${savedUserName}</h1>`;
};

if(localStorage.getItem("fileLoad")) {
    const fileUrl= JSON.parse(localStorage.getItem("fileLoad"));
    const img = document.createElement('img');
    document.getElementById('imgGrid').appendChild(img);
    img.src = fileUrl;
}
 
//if there are songs saved to favorites in local storage, display songs in favorites section
if(localStorage.getItem('songs') != null) {
    const savedSongs = JSON.parse(localStorage.getItem('songs'));
    document.getElementById('favorites').innerHTML += `<li class="margin">${savedSongs}</li>`;
};
