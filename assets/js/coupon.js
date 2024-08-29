const input = document.querySelector(".input_coupon_code");
const btnRegister = document.querySelector(".btn_register");
const pageNumbers = document.querySelectorAll(".page_number");


window.addEventListener("scroll", function () {
  const browserScroll = window.scrollX;
  header.style.transform = `translateX(-${browserScroll}px)`;
  if (main.getBoundingClientRect().top < 0 ) {
    header.classList.add("js_bg");
  } else {
    header.classList.remove("js_bg");
  }
});

input.onkeyup = (e) => {
  if (e.target.value) {
    btnRegister.removeAttribute("disabled"); 
  } else {
    btnRegister.setAttribute("disabled", "true");
  }
};


pageNumbers.forEach(pageNumber => {
  pageNumber.onclick = (e) => {
    [...pageNumbers].filter((number) => {
      if (number === e.target) {
        number.setAttribute("aria-current", "page");
      } else {
        number.removeAttribute("aria-current");
      }
    })
  }
});