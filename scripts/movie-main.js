// add submit listener-- when u click submit, console.log what comes back from server
// when you submit, add a get request


var MOVIE_SEARCH = "[data-movie-search]";
var OMDB_ADDRESS = "http://www.omdbapi.com/?apikey=1ca32dee&s=";
// they're using url as way of passing info
// two pieces of info received are: 1) api key ^^ up there
// 2) specify search terms

var RESULT_HOLDER = document.querySelector("#result-holder");

function setUpSubmitListener() {
    var searchInput = document.querySelector(MOVIE_SEARCH);
    console.log(searchInput);
    searchInput.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log(searchInput.elements);
        console.log(searchInput.elements.movieSearch.value);
        var searchURL = OMDB_ADDRESS + searchInput.elements.movieSearch.value;
        return jankQuery(searchURL);
    })
}

function jankQuery(movieURL) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', movieURL);
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Successfully came back!' + xhr.responseText);
            var parsed = JSON.parse(xhr.responseText);
            var messyResults = format(parsed);
            document.body.onload = putDivInDOM(messyResults);
            console.log(parsed);
        }
        else {
            console.log('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}

function format(resultDictionary) {
    var listOfObjects = resultDictionary["Search"];
    return listOfObjects;
}

function putDivInDOM(results) {
    var movieBlob = results.map (function(object) {
        var newDiv = document.createElement("div");
        newDiv.appendChild(document.createTextNode(object));
        RESULT_HOLDER.appendChild(newDiv);
    });
}

setUpSubmitListener();