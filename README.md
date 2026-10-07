# Movie Fight

A browser-based movie comparison application built with JavaScript and the OMDb API.

Movie Fight allows users to search for two movies, view their details, and compare them across several statistics to determine which movie performs better.

## Features

* Search for movies using the OMDb API
* Autocomplete search results with movie titles, release years, and posters
* Select two movies for comparison
* Display movie details including:

  * IMDb rating
  * Box office revenue
  * Metascore
  * Awards
  * IMDb vote count
  * Genre
  * Runtime
  * Plot
* Automatically compare statistics between the two selected movies
* Highlight the stronger result for each comparable statistic
* Responsive layout using Bulma CSS

## Technologies Used

* JavaScript (ES6+)
* HTML5
* CSS3
* Axios
* Bulma CSS
* Font Awesome
* OMDb API

## How It Works

The application uses the OMDb API to retrieve movie search results and detailed movie information.

When a user searches for a movie, the application:

1. Sends a request to the OMDb API.
2. Displays matching movies through an autocomplete interface.
3. Retrieves detailed information when a movie is selected.
4. Displays the movie information in the appropriate comparison panel.
5. Once two movies have been selected, compares their available statistics.
6. Highlights the stronger result for each comparison category.

## Project Structure

```text
movie-site-api/
├── autocomplete.js   # Reusable autocomplete component
├── index.html        # Application markup
├── index_v1.js       # Earlier application implementation
├── index_v2.js       # Current movie comparison implementation
├── style.css         # Custom styling
└── utils.js          # Shared utility functions
```

## What I Learned

This project helped me develop practical experience with:

* Consuming a third-party REST API
* Working with asynchronous JavaScript and Axios
* Handling API responses and errors
* Building reusable JavaScript components
* Manipulating the DOM dynamically
* Managing application state for multiple selections
* Parsing and comparing data returned by an external API
* Using modern JavaScript features such as object spread syntax, template literals, promises, and async/await
* Structuring a small front-end application across multiple JavaScript modules

## API

Movie data is provided by the OMDb API.

An API key is required to run the application. API credentials are intentionally **not included in this repository**.

## Future Improvements

Potential improvements include:

* Moving API requests behind a server-side endpoint so the API key is not exposed to browser code
* Migrating the application to HTTPS API requests
* Improving error handling and loading states
* Adding additional comparison categories
* Improving accessibility
* Refactoring the different JavaScript versions into a single production implementation

## Author

Michael Failagain

* GitHub: https://github.com/nzwebgeek
* Portfolio: https://nzwebgeek.co.nz/
* LinkedIn: https://www.linkedin.com/in/mike-flannigan-723312227/
