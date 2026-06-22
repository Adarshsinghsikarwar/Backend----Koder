function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    let now = Date.now();

    if (now - lastCall >= delay) {
      fn(this, args);
    }
  };
}

function scroll() {
  console.log("Scrolling is going on");
}

window.addEventListener("scroll", throttle(scroll, 1000));
function throttle1(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    let now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

function handleScroll1() {
  console.log("Scrolling");
}

window.addEventListener("scroll", throttle(handleScroll, 1000));
