//Here I am using  The Movie Database (TMDb) API
// Define the base URL for fetching popular movies
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';

// Define the URL for movie poster images
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

// Define the URL for searching movies
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

// Get  HTML elements by their IDs
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Get default movies by calling the getMovies function with the API_URL
getMovies(API_URL);

// Define an asynchronous function to fetch movies from the specified URL
async function getMovies(url) {
    // Use the fetch function to make a GET request to the specified URL
    const res = await fetch(url);

    // Parse the response as JSON
    const data = await res.json();

    // Call the showMovies function with the results from the API
    showMovies(data.results);
}

// Define a function to display movies on the webpage
function showMovies(movies) {
    // Clear the existing content inside the 'main' element
    main.innerHTML = '';

    // Iterate through each movie in the array
    movies.forEach((movie) => {
        // Destructure movie object to get relevant properties
        const { title, poster_path, vote_average, overview } = movie;

        // Create a new 'div' element with the class 'movie'
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        // Set the HTML content of the 'div' element using template literals
        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;

        // Append the 'div' element to the 'main' element
        main.appendChild(movieEl);
    });
}

// Define a function to determine the CSS class based on the movie rating
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// Add an event listener to the form for the 'submit' event
form.addEventListener('submit', (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the value entered in the search input field
    const searchTerm = search.value;

    // Check if a search term is provided
    if (searchTerm && searchTerm !== '') {
        // If a search term is provided, call getMovies with the SEARCH_API and the search term
        getMovies(SEARCH_API + searchTerm);

        // Clear the search input field
        search.value = '';
    } else {
        // If no search term is provided, reload the page
        window.location.reload();
    }
});
