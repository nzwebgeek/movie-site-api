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

const input = document.querySelector('input');
// debounce function to limit the rate at which fetchData is called
const onInput = async event => {
  const movies = await fetchData(event.target.value);
  
  for (const movie of movies) {
    const div = document.createElement('div');
    div.innerHTML = `
      <h2>${movie.Title}</h2>
      <p>${movie.Year}</p>
      <img src="${movie.Poster}" />
    `;
    document.querySelector('#results').appendChild(div);
  }
};   

input.addEventListener('input', debounce(onInput, 500));
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



 
