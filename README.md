7-24-17

--Instructions--

Build an app that presents the user with a search form and queries OMDb for movie information. For each result, use promises to run a function that draws the movie information to the DOM. Then, for each of those, make another request to get the movie poster. Add a checkbox or some other UI element so that the user can indicate that they want to add the movie to their personal watch list. Save this movie information to localStorage. For each movie in the watch list, draw that movie to another part of the page, along with a checkbox. When the user clicks the checkbox next to a movie in the watch list, it should be removed from localStorage. (Alternatively, you can flag that movie as being watched - in which case you can visually differentiate it in the UI.)

It would be very helpful to define helper functions. For example:

makeMovieElement
makePosterElement
getMovieData
getPosterData
saveMovie
removeMovie
listMovies
Make sure to use Promises in your code and chain your handlers together with calls to .then (and handle any errors with .catch).