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
   onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#left-summary'),'left');
  }
 
});

createAutocomplete({
  ...autoCompleteConfig, // spread the autoCompleteConfig object to pass all its properties as arguments to the createAutocomplete function
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#right-summary'),'right');
  }
});
// function to fetch and display the movie details when an option is clicked
let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
  const response = await axios.get('http://www.omdbapi.com/' , {
    params: {
      apikey: 'REDACTED',
      i: movie.imdbID
    },
  });

  summaryElement.innerHTML = movieTemplate(response.data);

  if (side === 'left') {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runComparison();
  }
};

const runComparison = () => {
  const leftSideStats = document.querySelectorAll('#left-summary .notification');
  const rightSideStats = document.querySelectorAll('#right-summary .notification');

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];

    const leftSideValue = parseFloat(leftStat.dataset.value);
    const rightSideValue = parseFloat(rightStat.dataset.value);

  
    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning'); // if the right side value is greater than the left side value, change the left stat to warning
     
    } 
    else{
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning'); // if the left side value is greater than the right side value, change the right stat to warning
    }
  });
}

const movieTemplate = movieDetail => {
  //const imgSrc = movieDetail.Poster === 'N/A' ? '' : movieDetail.Poster;
const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));;
const metascore = parseInt(movieDetail.Metascore);
const imdbRating = parseFloat(movieDetail.imdbRating);
const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
  const value = parseInt(word);
  if (isNaN(value)) {
    return prev; // if the word is not a number, return the previous value
  } else {
    return prev + value; // if the word is a number, add it to the previous value
  }
}, 0);
console.log(awards);
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

    <article data-value="${imdbRating}">
      <div class="content">
        <p>
          <strong>IMDB Rating:</strong> ${movieDetail.imdbRating}
        </p>
      </div>
    </article>

    <article data-value="${dollars}" class="notification is-primary">
      <div class="content">
        <p>
          <strong>Box Office:</strong> ${movieDetail.BoxOffice}
        </p>
      </div>
    </article>

    
    <article data-value="${metascore}" class="notification is-primary">
      <div class="content">
        <p>
          <strong>Metascore:</strong> ${movieDetail.Metascore}
        </p>
      </div>
    </article>

    <article data-value="${awards}" class="notification is-primary">
      <div class="content">
        <p>
          <strong>Awards:</strong> ${movieDetail.Awards}
        </p>
      </div>
    </article>  

    <article data-value="${imdbVotes}" class="notification is-primary">
      <div class="content">
        <p>
          <strong>IMDB Votes:</strong> ${movieDetail.imdbVotes}
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



 
