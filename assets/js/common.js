const main = document.querySelector(".container");
const header = document.querySelector(".header"); 

const btnClosePopup = document.querySelector(".btn_close_pop_up");
const PopupBox = document.querySelector(".pop_up_box");


const selectBoxes = document.querySelectorAll(".select_box") ?? "";

window.addEventListener("scroll", function () {
  const browserScroll = window.scrollX;
  header.style.transform = `translateX(-${browserScroll}px)`;
  if (main.getBoundingClientRect().top < 80 ) {
    header.classList.add("js_bg");
  } else {
    header.classList.remove("js_bg");
  }
});


btnClosePopup.onclick = (e) => {
  document.body.classList.remove("scroll_hide");
  PopupBox.classList.remove("is_active");
  e.target.ariaExpanded = "false"
};

selectBoxes.forEach((selectBox) => {
  const selectBtn = selectBox.querySelector(".select_title") ?? "";
  const optionButtons = selectBox.querySelectorAll(".option_title");

  selectBtn.onclick = (e) => {
    e.target.ariaExpanded =
      e.target.ariaExpanded === "false" ? "true" : "false";
  };

  optionButtons.forEach((button) => {
    button.onclick = (e) => {
      optionButtons.forEach((btn) => (btn.ariaSelected = "false"));
      e.target.ariaSelected = "true";
      selectBtn.textContent =  e.target.textContent;
      selectBtn.ariaExpanded = "false"
    };
  });
});
