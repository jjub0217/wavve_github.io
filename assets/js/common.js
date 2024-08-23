const main = document.querySelector(".container");
const header = document.querySelector(".header"); 


window.addEventListener("scroll", function () {
  const browserScroll = window.scrollX;
  header.style.transform = `translateX(-${browserScroll}px)`;
  if (main.getBoundingClientRect().top < 0 ) {
    header.classList.add("js_bg");
  } else {
    header.classList.remove("js_bg");
  }
});


