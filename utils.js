const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId); // clear the previous timeout if it exists
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args); // call the function after the specified delay
    }, delay);
  };
};
