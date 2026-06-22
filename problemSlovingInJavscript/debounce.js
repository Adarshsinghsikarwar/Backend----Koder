function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearInterval(timer);

    timer = setTimeout(() => {
      fn(this, args);
    }, delay);
  };
}

function search(query) {
  console.log("Searching : ", query);
}

const debounceSearch = debounce(search, 500);

debounce("r");
debounce("re");
debounce("rea");
debounce("reac");
debounce("react");

function debounce1(fn, delay) {
  let timer;

  return function (...args) {
    clearInterval(timer);

    timer = setInterval(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function search() {
  console.log("Searching");
}

const debounceSearch1 = debounce1(search, 1000);
