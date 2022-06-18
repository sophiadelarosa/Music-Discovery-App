// Generate playlist based on genre and country:
const APIController = (function() {
    
    const clientId = '0cf7c30ac4f142faadbd13dabe6401b5';
    const clientSecret = '33904478a35d44298f1ad89f3cad34f2';

    // private methods
    const _getToken = async () => {

    	console.log('XX Getting token')
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }
    
    const _getGenres = async (token) => {

    	console.log('XX Getting genres')
        const result = await fetch(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });

        const data = await result.json();
        return data.genres;
    }  

    const _getPlaylistByGenre = async (token) => {
    	console.log('XX start of playlist')
    	console.log(token);
        var countryID = document.querySelector("#select_country");
        var selectedCountry = countryID.options[countryID.selectedIndex].value
    	console.log( selectedCountry )
    
        var genreSeed = document.querySelector("#select_genre");
        console.log( genreSeed );
        var selectedGenre = genreSeed.options[genreSeed.selectedIndex].value
        console.log( selectedGenre )
    
    	console.log('XX Getting playlist')
        const limit = 20;
        
        try {
        const result = await fetch(`https://api.spotify.com/v1/recommendations?limit=${limit}&market=${selectedCountry}&seed_genres=${selectedGenre}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
    
        const data = await result.json();
        return data.tracks;} catch (err) {
            window.alert("not enough data")
        }
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token) {
            return _getPlaylistByGenre(token);
        },
    }
})();


// UI Module
const UIController = (function() {

    //object to hold references to html selectors
    const DOMElements = {
        selectGenre: '#select_genre',
        buttonSubmit: '#btn_submit',
        divSongDetail: '#song-detail',
        hfToken: '#hidden_token',
        divSonglist: '.song-list'
    }

    //public methods
    return {

        //method to get input fields
        inputField() {
            return {
                genre: document.querySelector(DOMElements.selectGenre),
                playlist: document.querySelector(DOMElements.selectPlaylist),
                tracks: document.querySelector(DOMElements.divSonglist),
                submit: document.querySelector(DOMElements.buttonSubmit),
                songDetail: document.querySelector(DOMElements.divSongDetail)
            }
        },

        // need methods to create select list option
        createGenre(text) {
            const html = `<option value="${text}">${text}</option>`;
            document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend', html);
        }, 

        // need method to create a track list group item 
        createTrack(artistName, name, url) {
            const html = 
            `<a href="${url}" target="_blank" rel="noopener noreferrer" class="list-group-item list-group-item-action list-group-item-light col-9">${name}-${artistName}</a>`;
            document.querySelector(DOMElements.divSonglist).insertAdjacentHTML('beforeend', html);
        },
        
        storeToken(value) {
            document.querySelector(DOMElements.hfToken).value = value;
        },

        getStoredToken() {
            return {
                token: document.querySelector(DOMElements.hfToken).value
            }
        }
    }

})();

const APPController = (function(UICtrl, APICtrl) {

    // get input field object ref
    const DOMInputs = UICtrl.inputField();

    // get genres on page load
    const loadGenres = async () => {
    	// log 
    	console.log('XX Loading genres')
        //get the token
        const token = await APICtrl.getToken();           
        //store the token onto the page
        UICtrl.storeToken(token);
        //get the genres
        const genres = await APICtrl.getGenres(token);
        //populate our genres select element
        genres.forEach(element => UICtrl.createGenre(element));
    }

    // create submit button click event listener
    DOMInputs.submit.addEventListener('click', async (e) => {
    	// log 
    	console.log('XX Adding click event listener');
        document.getElementsByClassName(`song-list`).innerHTML = '<div></div>'
        // prevent page reset
        e.preventDefault();
    	console.log( e );
        // clear tracks
    	console.log('XX Reset tracks')
        //get the token
        const token = UICtrl.getStoredToken().token;        
    	console.log( token );

        // get the playlist field
        const token2 = await APICtrl.getToken();
        const playList = await APICtrl.getPlaylistByGenre(token2);
    	console.log( playList )
        const playlistSelect = UICtrl.inputField().playlist;
        playList.forEach(el => UICtrl.createTrack(el.artists[0].name, el.name, el.external_urls.spotify, el.id))
        
    });

    return {
        init() {
            console.log('XX App is starting');
            loadGenres();
        }
    }

})(UIController, APIController);

// will need to call a method to load the genres on page load
APPController.init();

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
