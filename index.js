const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/' , {
    params: {
      apikey: 'REDACTED',
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

    resultsWrapper.appendChild(option);
  }
};   

input.addEventListener('input', debounce(onInput, 500));

document.addEventListener('click', event => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
  }
});

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



 
