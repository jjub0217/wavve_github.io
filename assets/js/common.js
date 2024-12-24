const main = document.querySelector(".container");
const skip = document.querySelector(".skip > a")
const header = document.querySelector(".header"); 
const mainLogo = document.querySelector(".site_logo");
const btnClosePopup = document.querySelector(".btn_close_popup");
const popupBox = document.querySelector(".popup_box");
const tabItemTitles = document.querySelectorAll(".tab_item_title") ?? "";
const selectBoxes = document.querySelectorAll(".select_box") ?? "";
const commonA11ySettings = {
  enabled: true,
  containerMessage: "프로모션 슬라이드 영역입니다.",
  slideLabelMessage:
    "총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.",
  firstSlideMessage: "첫번째 슬라이드입니다.",
  lastSlideMessage: "마지막 슬라이드입니다.",
  paginationBulletMessage: "{{index}}번째 슬라이드로 이동합니다.",
  containerRoleDescriptionMessage: "Carousel",
  itemRoleDescriptionMessage: "Slide",
  slideRole: "listitem",
};

// document.addEventListener("DOMContentLoaded", () => {
//   if (popupBox.getAttribute("aria-expanded") === "true") {
//     btnClosePopup.focus();
//   }
// })

// popupBox.addEventListener("keydown", (e) => {
//   if (e.key === "Escape") {
//     closePopup();
//   }
// });
popupBox.addEventListener("click", (e) => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" || event.key === "Esc") {
      closePopup();
    }
  }, { once: true }); 
});

const closePopup = () => {
  document.body.classList.remove("scroll_hide");
  popupBox.setAttribute("aria-expanded", "false");
};


btnClosePopup.onclick = (e) => {
  e.target.setAttribute("aria-expanded", "false");
  closePopup()
};

selectBoxes.forEach((selectBox) => {
  const selectBtn = selectBox.querySelector(".select_title") ?? "";
  const optionButtons = selectBox.querySelectorAll(".option_title");

  selectBtn.onclick = (e) => {
    const isExpanded = e.target.getAttribute("aria-expanded") === "true";
    e.target.setAttribute("aria-expanded", isExpanded ? "false" : "true");
  };

  optionButtons.forEach((button) => {
    button.onclick = (e) => {
      optionButtons.forEach((btn) =>
        btn.setAttribute("aria-selected", "false")
      );
      e.target.setAttribute("aria-selected", "true");
      selectBtn.textContent =  e.target.textContent;
      selectBtn.setAttribute("aria-expanded", "false");
      selectBtn.style.color = "#fff";
    };
  });
});


tabItemTitles.forEach((item) => {
  item.onclick = (e) => {
    e.preventDefault();
    [...tabItemTitles].forEach((item) => {
      if (item === e.target) {
        e.target.setAttribute("aria-selected", "true");
        e.target.focus();
      } else {
        item.setAttribute("aria-selected", "false");
      }
    });
  };
});