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
            var blob = resultExtractor(messyResults);
        }
        else {
            console.log('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}

function format(resultDictionary) {
    var unpackedList = [];
    var movieBlob = resultExtractor(resultDictionary["Search"]);
    unpackedList.push(movieBlob);
    return unpackedList;
}

function resultExtractor(listOfObjects) {
    listOfBlobs = [];
    listOfObjects.map(function (object) {
        var movieBlob = [];
        movieBlob.push(makeTitle(object["Title"]));
        movieBlob.push(makePoster(object["Poster"]));
        movieBlob.push(tellType(object["Type"]));
        movieBlob.push(tellYear(object["Year"]));
        // var imdbID = object["imdbID"];
    });
    return movieBlob;
}

function makePoster(posterLink) {
    var poster = document.createElement("IMG");
    poster.appendChild(document.createTextNode(posterLink));
    return poster;
}

function makeTitle(titleString) {
    var title = document.createElement("h1");
    title.appendChild(document.createTextNode(titleString));
    return title;
}

function tellType(typeString) {
    var type = document.createElement("h3");
    title.appendChild(document.createTextNode(typeString));
    return type;
}

function tellYear(yearString) {
    var year = document.createElement("h1");
    year.appendChild(document.createTextNode(yearString));
    return year;
}

function divGetsDOMReady() {
    var movieBlob = results.map (function(object) {
        var newDiv = document.createElement("div");
        newDiv.appendChild(document.createTextNode(object));
        RESULT_HOLDER.appendChild(newDiv);
    });
}

function putsDivInDOM() {
    document.body.onload = putDivInDOM(messyResults);
}

setUpSubmitListener();