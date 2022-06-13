var form = document.getElementById("form");
var search = document.getElementById("search");
var result = document.getElementById("result");

var apiURL = "https://api.lyrics.ovh";

// Get Search Value
form.addEventListener("submit", e => {
    e.preventDefault();

//  .trim function removes the whitespace from both the ends
    searchValue = search.value.trim();


    if (!searchValue) {
        console.log("Nothing to search. Please enter name of an artist or a song!");
    } else {
        beginSearch(searchValue);
    }
})

// Search function
//The word “async” before a function means that a function always returns a promise
async function beginSearch(searchValue) {
//The await operator is used to wait for a Promise 
//The suggest method is intended to be used by a client application to provide a list of suggested matches as a user enters text in a search box.
    var searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    var data = await searchResult.json();

    displayData(data);
}

// Display Search Result
//The <strong> tag is used to define text with strong importance

function displayData(data) {
    result.innerHTML =  `<div style="font-size: 30px">Search Results:</div> 
                        <img src="./assets/images/music for lyrics.png" alt="music note" width="100" height="100">
    <ul class="songs">
      ${data.data
        .map(song=>  `<li> 
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span style="color: black; font-size: 16px" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
                </li>`
        ) 
        .join('')}
    </ul>
  `;
}

//event listener in get lyrics button
result.addEventListener('click', e=>{
    var clickedElement = e.target;

    //checking clicked elemet is button or not
    if (clickedElement.tagName === 'SPAN'){
        var artist = clickedElement.getAttribute('data-artist');
        var songTitle = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, songTitle)
    }
})

// Get lyric`s for song
async function getLyrics(artist, songTitle) {
    var response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    var data = await response.json();

  //The replace() method returns a new string with some or all matches of a pattern replaced by a replacement. 
  //n order to remove line breaks from text we must deal with all three types of line breaks (Windows, Linux or Apple)
    var lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  
    result.innerHTML = `<h1 style="color: black; font-size: 30px"><strong>&#127908; ${artist}</strong> - ${songTitle} &#127908;</h1>
    <p>${lyrics}</p>`;
  
  }