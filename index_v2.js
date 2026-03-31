const autoCompleteConfig = {
   renderOption(movie) { 
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
      <h2>${movie.Title}</h2>
      <p>${movie.Year}</p>
      <img src="${imgSrc}" />
      ${movie.Title} (${movie.Year})
    `;
  },
  onOptionSelect(movie) {
    onMovieSelect(movie);
  },
  inputValue(movie) {
    return movie.Title;
  },
  async fetchData(searchTerm) {
    return await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: 'REDACTED',
        s: searchTerm
      }
    }).then(response => {
      if (response.data.Error) {
        return [];
      }
      return response.data.Search;
    });
  }
}

createAutocomplete({
  ...autoCompleteConfig, // spread the autoCompleteConfig object to pass all its properties as arguments to the createAutocomplete function
  root: document.querySelector('#left-autocomplete'),
 
});

createAutocomplete({
  ...autoCompleteConfig, // spread the autoCompleteConfig object to pass all its properties as arguments to the createAutocomplete function
  root: document.querySelector('#right-autocomplete'),
 
});
// function to fetch and display the movie details when an option is clicked
const onMovieSelect = async movie => {
  const response = await axios.get('http://www.omdbapi.com/' , {
    params: {
      apikey: 'REDACTED',
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



 
