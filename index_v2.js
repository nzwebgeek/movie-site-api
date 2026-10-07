const API_URL = 'api.php';

// ------------------------------
// Autocomplete configuration
// ------------------------------

const autoCompleteConfig = {
    renderOption(movie) {
        const poster = movie.Poster !== 'N/A'
            ? movie.Poster
            : '';

        return `
            <img src="${poster}" alt="${movie.Title}" />
            ${movie.Title} (${movie.Year})
        `;
    },

    inputValue(movie) {
        return movie.Title;
    },

    async fetchData(searchTerm) {
        const term = searchTerm.trim();

        if (!term) {
            return [];
        }

        try {
            const response = await axios.get(API_URL, {
                params: {
                    s: term
                }
            });

            if (
                response.data.Error ||
                !response.data.Search
            ) {
                return [];
            }

            return response.data.Search;
        } catch (error) {
            console.error('Movie search failed:', error);
            return [];
        }
    }
};


// ------------------------------
// Create autocomplete inputs
// ------------------------------

createAutocomplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),

    onOptionSelect(movie) {
        onMovieSelect(movie, document.querySelector('#left-summary'));
    }
});

createAutocomplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),

    onOptionSelect(movie) {
        onMovieSelect(movie, document.querySelector('#right-summary'));
    }
});


// ------------------------------
// Movie selection
// ------------------------------

let leftMovie;
let rightMovie;

async function onMovieSelect(movie, summaryElement) {
    // Show loading state
    summaryElement.innerHTML = `
        <div class="notification is-info">
            Loading movie information...
        </div>
    `;

    try {
        const response = await axios.get(API_URL, {
            params: {
                i: movie.imdbID
            }
        });

        if (response.data.Error) {
            throw new Error(response.data.Error);
        }

        summaryElement.innerHTML = movieTemplate(response.data);

        if (summaryElement.id === 'left-summary') {
            leftMovie = response.data;
        } else {
            rightMovie = response.data;
        }

        if (leftMovie && rightMovie) {
            runComparison();
        }

    } catch (error) {
        console.error('Movie details request failed:', error);

        summaryElement.innerHTML = `
            <div class="notification is-danger">
                Unable to load movie information.
                Please try again.
            </div>
        `;
    }
}


// ------------------------------
// Movie template
// ------------------------------

function movieTemplate(movie) {
    const poster = movie.Poster !== 'N/A'
        ? movie.Poster
        : '';

    const boxOffice = parseNumber(movie.BoxOffice);
    const metascore = parseNumber(movie.Metascore);
    const imdbRating = parseFloat(movie.imdbRating) || 0;
    const imdbVotes = parseNumber(movie.imdbVotes);
    const awards = calculateAwards(movie.Awards);

    return `
        <article class="notification is-primary comparison-stat">
            <h1 class="title">
                ${movie.Title}
            </h1>

            <figure class="image">
                ${
                    poster
                        ? `<img src="${poster}" alt="${movie.Title} poster">`
                        : '<div class="notification is-light">No poster available</div>'
                }
            </figure>

            <p class="mt-4">
                ${movie.Plot || 'No plot information available.'}
            </p>

            <div class="content mt-4">
                <p>
                    <strong>Genre:</strong>
                    ${movie.Genre || 'N/A'}
                </p>

                <p>
                    <strong>Runtime:</strong>
                    ${movie.Runtime || 'N/A'}
                </p>
            </div>

            <div class="content">

                <article class="notification is-light comparison-stat">
                    <strong>IMDb Rating:</strong>
                    ${movie.imdbRating || 'N/A'}
                </article>

                <article class="notification is-light comparison-stat">
                    <strong>IMDb Votes:</strong>
                    ${movie.imdbVotes || 'N/A'}
                </article>

                <article class="notification is-light comparison-stat">
                    <strong>Metascore:</strong>
                    ${movie.Metascore || 'N/A'}
                </article>

                <article class="notification is-light comparison-stat">
                    <strong>Box Office:</strong>
                    ${movie.BoxOffice || 'N/A'}
                </article>

                <article class="notification is-light comparison-stat">
                    <strong>Awards:</strong>
                    ${movie.Awards || 'N/A'}
                </article>

            </div>
        </article>
    `;
}


// ------------------------------
// Comparison logic
// ------------------------------

function runComparison() {
    const leftStats = document.querySelectorAll(
        '#left-summary .comparison-stat'
    );

    const rightStats = document.querySelectorAll(
        '#right-summary .comparison-stat'
    );

    if (!leftStats.length || !rightStats.length) {
        return;
    }

    // IMDb rating
    compareStats(
        leftStats[1],
        rightStats[1],
        parseFloat(leftMovie.imdbRating) || 0,
        parseFloat(rightMovie.imdbRating) || 0
    );

    // IMDb votes
    compareStats(
        leftStats[2],
        rightStats[2],
        parseNumber(leftMovie.imdbVotes),
        parseNumber(rightMovie.imdbVotes)
    );

    // Metascore
    compareStats(
        leftStats[3],
        rightStats[3],
        parseNumber(leftMovie.Metascore),
        parseNumber(rightMovie.Metascore)
    );

    // Box office
    compareStats(
        leftStats[4],
        rightStats[4],
        parseNumber(leftMovie.BoxOffice),
        parseNumber(rightMovie.BoxOffice)
    );

    // Awards
    compareStats(
        leftStats[5],
        rightStats[5],
        calculateAwards(leftMovie.Awards),
        calculateAwards(rightMovie.Awards)
    );
}


// ------------------------------
// Compare individual statistics
// ------------------------------

function compareStats(leftElement, rightElement, leftValue, rightValue) {
    if (!leftElement || !rightElement) {
        return;
    }

    if (leftValue > rightValue) {
        rightElement.classList.remove('is-primary');
        rightElement.classList.add('is-warning');
    } else if (rightValue > leftValue) {
        leftElement.classList.remove('is-primary');
        leftElement.classList.add('is-warning');
    }
}


// ------------------------------
// Number parsing helpers
// ------------------------------

function parseNumber(value) {
    if (!value || value === 'N/A') {
        return 0;
    }

    return Number(
        value
            .replace(/[$,]/g, '')
            .replace(/ votes?/gi, '')
            .trim()
    ) || 0;
}


function calculateAwards(awards) {
    if (!awards || awards === 'N/A') {
        return 0;
    }

    const winsMatch = awards.match(/(\d+)\s+win/i);
    const nominationsMatch = awards.match(/(\d+)\s+nomination/i);

    const wins = winsMatch
        ? parseInt(winsMatch[1], 10)
        : 0;

    const nominations = nominationsMatch
        ? parseInt(nominationsMatch[1], 10)
        : 0;

    return wins + nominations;
}