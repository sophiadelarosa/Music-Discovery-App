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
