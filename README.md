
# Movie Fight

A browser-based movie comparison application built with JavaScript and the OMDb API.

Users can search for movies, select two films, view their details, and compare their ratings, scores, votes, box office performance, and awards.

## Features

* Movie search with autocomplete
* Select two movies for comparison
* Retrieve movie information from the OMDb API
* Display:

  * IMDb rating
  * IMDb vote count
  * Metascore
  * Box office
  * Awards
  * Genre
  * Runtime
  * Plot
  * Movie poster
* Automatically compare movie statistics
* Highlight the stronger result for each comparison category
* Responsive interface using Bulma
* PHP backend proxy for third-party API requests
* API credentials kept server-side rather than exposed in browser JavaScript
* Error handling for failed API requests

## Technologies

* JavaScript (ES6+)
* PHP
* HTML5
* CSS3
* Axios
* Bulma
* Font Awesome
* OMDb API

## How It Works

The application uses JavaScript in the browser for the user interface and a PHP endpoint to communicate with the OMDb API.

```text
Browser
   |
   v
JavaScript / Axios
   |
   v
api.php
   |
   v
OMDb API
```

The PHP proxy receives the movie search or IMDb ID, adds the server-side OMDb API key, and forwards the request to OMDb.

This prevents the API credential from being included in client-side JavaScript.

## Project Structure

```text
movie-site-api/
│
├── index.html
├── index_v2.js
├── autocomplete.js
├── utils.js
├── api.php
├── style.css
└── README.md
```

## Running Locally

### Requirements

* PHP 8+
* An OMDb API key
* A modern web browser

### 1. Configure the API key

Set the OMDb API key as an environment variable.

PowerShell:

```powershell
$env:OMDB_API_KEY="YOUR_OMDB_API_KEY"
```

The key is intentionally not stored in the repository.

### 2. Start the PHP development server

From the project directory:

```powershell
php -S localhost:8000
```

### 3. Open the application

Visit:

```text
http://localhost:8000/index.html
```

## API Proxy

The application previously made OMDb requests directly from browser-side JavaScript.

The API integration was refactored to use a PHP backend proxy:

```text
index_v2.js
      ↓
    api.php
      ↓
   OMDb API
```

This provides a safer architecture because the OMDb API key is stored in a server-side environment variable rather than being included in JavaScript sent to the browser.

## What I Learned

This project helped me develop practical experience with:

* Consuming third-party REST APIs
* Working with asynchronous JavaScript and Axios
* Building reusable autocomplete functionality
* Manipulating and updating the DOM
* Parsing API response data
* Comparing and presenting structured data
* Handling API errors
* Building a simple PHP API endpoint
* Keeping third-party credentials out of client-side code
* Debugging browser and server-side integration issues

## Future Improvements

Potential future improvements include:

* Add debouncing to movie searches
* Improve loading indicators and error states
* Add more comparison categories
* Improve accessibility
* Refactor older JavaScript code
* Upgrade the Bulma dependency
* Add automated testing
* Add a more advanced backend API structure
* Deploy the application to a production server using HTTPS

## Author

**Michael Flannigan**

Junior Web Developer

* Portfolio: https://nzwebgeek.co.nz/
* GitHub: https://github.com/nzwebgeek
* LinkedIn: https://www.linkedin.com/in/mike-flannigan-723312227/
