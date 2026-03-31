const createAutocomplete = ({
  root, 
  renderOption, 
  onOptionSelect, 
  inputValue, 
  fetchData
}) => {
root.innerHTML = `
  <label><b>Search</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;  

const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');

const onInput = async event => {
  const items = await fetchData(event.target.value);

  resultsWrapper.innerHTML = '';
  dropdown.classList.add('is-active');
  for (const item of items) {
    const option = document.createElement('a');

    option.classList.add('dropdown-item');
    option.innerHTML = renderOption(item);
    option.addEventListener('click', () => {
      dropdown.classList.remove('is-active');
       input.value = inputValue(item); // set the input value to the selected option's title
       onOptionSelect(item); // call the onOptionSelect function to fetch and display the movie details
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
}