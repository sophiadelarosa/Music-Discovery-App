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
        alert("Nothing to search");
    } else {
        beginSearch(searchValue);
    }
})

// Search function
//The word “async” before a function means that a function always returns a promise
async function beginSearch(searchValue) {
//The await operator is used to wait for a Promise 
    var searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    var data = await searchResult.json();

    displayData(data);
}

// Display Search Result

function displayData(data) {
    result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span>
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

// Get lyrics for song
async function getLyrics(artist, songTitle) {
    var response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    var data = await response.json();
  
    var lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;
  
  }