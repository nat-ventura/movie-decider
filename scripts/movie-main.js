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
            var unpackedList = format(parsed);
            resultExtractor(unpackedList);
            
        }
        else {
            console.log('Request failed. Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}

function format(resultDictionary) {
    var unpackedList = resultDictionary["Search"];
    return unpackedList;
}

function resultExtractor(listOfObjects) {
    var listOfBlobs = listOfObjects.map(function (object) {
        var movieBlob = [];
        movieBlob.push(makeTitle(object["Title"]));
        movieBlob.push(makePoster(object["Poster"]));
        movieBlob.push(tellType(object["Type"]));
        movieBlob.push(tellYear(object["Year"]));
        // var imdbID = object["imdbID"];
        return movieBlob;
    });
    document.body.onload = divGetsDOMReady(listOfBlobs);
}

function makeTitle(titleString) {
    var title = document.createElement("h1");
    title.className = "resultTitle";
    title.appendChild(document.createTextNode(titleString));
    return title;
}

function makePoster(posterLink) {
    var poster = document.createElement("IMG");
    if (posterLink == "N/A") {
        var notice = document.createElement("h3");
        notice.appendChild(document.createTextNode("No image available."));
    } else {
        poster.src = posterLink;
        return poster;
    }
}

function tellType(typeString) {
    var type = document.createElement("h3");
    type.appendChild(document.createTextNode(typeString));
    return type;
}

function tellYear(yearString) {
    var year = document.createElement("h1");
    year.appendChild(document.createTextNode(yearString));
    return year;
}

function divGetsDOMReady(movieDataList) {
    console.log(movieDataList);
    movieDataList.forEach (function(object) {
        var newDiv = document.createElement("div");
        object.forEach( function(element) {
            newDiv.appendChild(element);
        })
        console.log(object);
        RESULT_HOLDER.appendChild(newDiv);
        // return newDiv;
    });
}

setUpSubmitListener();