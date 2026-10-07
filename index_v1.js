const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/' , {
    params: {
      apikey: 'YOUR_API_KEY',
      s: searchTerm
    },
  });
// if the response contains an error, return an empty array
  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
  
};
const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search for a movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;  

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async event => {
  const movies = await fetchData(event.target.value);
  resultsWrapper.innerHTML = '';

  dropdown.classList.add('is-active');
  for (const movie of movies) {
    const option = document.createElement('a');
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

    option.classList.add('dropdown-item');
    option.innerHTML = `
      <h2>${movie.Title}</h2>
      <p>${movie.Year}</p>
      <img src="${imgSrc}" />
    `;

    option.addEventListener('click', () => {
      dropdown.classList.remove('is-active');
       input.value = movie.Title;
       onMovieSelect(movie); // call the onMovieSelect function to fetch and display the movie details
    }); // add click event listener to each option to set the input value and close the dropdown

    resultsWrapper.appendChild(option);
  }
};   

input.addEventListener('input', debounce(onInput, 500));
// use target instead of event.target in the above line to prevent the script from running when input is empty
document.addEventListener('click', event => {
  if (!root.contains(event.target)) { // if the click is outside the root element, close the dropdown
    dropdown.classList.remove('is-active'); // close the dropdown
  }
});

// function to fetch and display the movie details when an option is clicked
const onMovieSelect = async movie => {
  const response = await axios.get('http://www.omdbapi.com/' , {
    params: {
      apikey: 'YOUR_API_KEY',
      i: movie.imdbID
    },
  });
  const summary = document.querySelector('#summary');
  summary.innerHTML = movieTemplate(response.data);
};

const movieTemplate = movieDetail => {
  const imgSrc = movieDetail.Poster === 'N/A' ? '' : movieDetail.Poster;
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre} - ${movieDetail.Runtime}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>
    <article data-value="${movieDetail.imdbRating}">
      <div class="content">
        <p>
          <strong>IMDB Rating:</strong> ${movieDetail.imdbRating}
        </p>
      </div>
    </article>
    <article data-value="${movieDetail.BoxOffice}">
      <div class="content">
        <p>
          <strong>Box Office:</strong> ${movieDetail.BoxOffice}
        </p>
      </div>
    </article>
    <article data-value="${movieDetail.Awards}">
      <div class="content">
        <p>
          <strong>Awards:</strong> ${movieDetail.Awards}
        </p>
      </div>
    </article>  
  `;
};




// prevent below script running when input is empty

/*let timeoutId;
const onInput = event => {
    if (timeoutId) {
        clearTimeout(timeoutId); // clear the previous timeout if it exists
    }
  timeoutId = setTimeout(() => {
        fetchData(event.target.value); // call the fetchData function after 1 second of inactivity
    }, 1000);
};*/



 
