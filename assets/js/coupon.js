const input = document.querySelector(".input_coupon_code");
const btnRegister = document.querySelector(".btn_register");
const tabItems = document.querySelectorAll(".tab_item");
const tabContent = document.querySelector(".tab_content");
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
    btnRegister.classList.add("is_active");
  } else {
    btnRegister.classList.remove("is_active");
  }
};



tabItems.forEach((item) => {
  item.onclick = (e) => {
    e.preventDefault();
    [...tabItems].filter((item) => {
      if (item === e.target.parentNode) {
        e.target.parentNode.classList.add("is_active");
        e.target.parentNode.ariaSelected = "true";
      } else {
        item.classList.remove("is_active");
        item.ariaSelected = "false"
      }
    });
  };
});


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